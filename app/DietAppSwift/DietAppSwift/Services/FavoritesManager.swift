import Foundation

final class FavoritesManager: ObservableObject {
    @Published private(set) var ids: Set<String> = []

    private let key = "dietappswift.favoriteRecipeIDs"

    init() {
        let saved = UserDefaults.standard.stringArray(forKey: key) ?? []
        ids = Set(saved)
    }

    func contains(_ recipe: Recipe) -> Bool {
        ids.contains(recipe.id)
    }

    func toggle(_ recipe: Recipe) {
        if ids.contains(recipe.id) {
            ids.remove(recipe.id)
        } else {
            ids.insert(recipe.id)
        }
        UserDefaults.standard.set(Array(ids), forKey: key)
        HapticsManager.selection()
    }
}

struct ShoppingListItem: Identifiable, Codable, Hashable {
    let id: String
    let title: String
    let source: String
    var isChecked: Bool
}

final class ShoppingListManager: ObservableObject {
    @Published private(set) var items: [ShoppingListItem] = []

    private let key = "dietappswift.shoppingListItems"

    init() {
        guard let data = UserDefaults.standard.data(forKey: key),
              let savedItems = try? JSONDecoder().decode([ShoppingListItem].self, from: data) else {
            return
        }
        items = savedItems
    }

    func add(_ ingredients: [String], from recipe: Recipe) {
        for ingredient in ingredients {
            let id = normalizedID(for: ingredient)
            guard !items.contains(where: { $0.id == id }) else { continue }
            items.append(
                ShoppingListItem(
                    id: id,
                    title: ingredient,
                    source: recipe.title,
                    isChecked: false
                )
            )
        }
        persist()
        HapticsManager.success()
    }

    func toggle(_ item: ShoppingListItem) {
        guard let index = items.firstIndex(where: { $0.id == item.id }) else { return }
        items[index].isChecked.toggle()
        persist()
        HapticsManager.selection()
    }

    func remove(_ item: ShoppingListItem) {
        items.removeAll { $0.id == item.id }
        persist()
        HapticsManager.lightImpact()
    }

    func removeChecked() {
        items.removeAll { $0.isChecked }
        persist()
        HapticsManager.lightImpact()
    }

    func clear() {
        items.removeAll()
        persist()
        HapticsManager.lightImpact()
    }

    private func persist() {
        guard let data = try? JSONEncoder().encode(items) else { return }
        UserDefaults.standard.set(data, forKey: key)
    }

    private func normalizedID(for value: String) -> String {
        value
            .folding(options: [.diacriticInsensitive, .caseInsensitive], locale: .current)
            .lowercased()
            .replacingOccurrences(of: "[^a-z0-9]+", with: "-", options: .regularExpression)
            .trimmingCharacters(in: CharacterSet(charactersIn: "-"))
    }
}

struct AuthSession: Codable, Hashable {
    let email: String
    let accessToken: String
    let refreshToken: String
    let expiresAt: Date
}

@MainActor
final class AuthManager: ObservableObject {
    @Published private(set) var session: AuthSession?
    @Published private(set) var isLoading = false
    @Published var errorMessage: String?

    private let supabaseURL = URL(string: "https://dtitnpbbxyvteotoagoh.supabase.co")!
    private let anonKey = "sb_publishable_yOh1Srad4TTAZ1WaYf7Y0Q_o4msazOd"
    private let sessionKey = "dietappswift.authSession"
    private var metadata: [String: Any] = [:]

    var isAuthenticated: Bool { session != nil }
    var email: String { session?.email ?? "" }

    init() {
        restoreSession()
    }

    func requestEmailCode(email: String) async {
        let cleanEmail = email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard cleanEmail.contains("@") else {
            errorMessage = "Entre une adresse email valide."
            return
        }

        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            var request = baseRequest(path: "/auth/v1/otp", method: "POST")
            request.httpBody = try JSONSerialization.data(withJSONObject: [
                "email": cleanEmail,
                "create_user": true
            ])
            _ = try await perform(request)
            HapticsManager.success()
        } catch {
            errorMessage = message(for: error)
        }
    }

    func verifyCode(email: String, code: String) async {
        let cleanEmail = email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let cleanCode = code.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleanEmail.isEmpty, !cleanCode.isEmpty else {
            errorMessage = "Entre l'email et le code reçu."
            return
        }

        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            var request = baseRequest(path: "/auth/v1/verify", method: "POST")
            request.httpBody = try JSONSerialization.data(withJSONObject: [
                "email": cleanEmail,
                "token": cleanCode,
                "type": "email"
            ])
            let json = try await perform(request)
            try handleSessionResponse(json, fallbackEmail: cleanEmail)
            HapticsManager.success()
        } catch {
            errorMessage = message(for: error)
        }
    }

    func refreshIfNeeded() async {
        guard let session else { return }

        if session.expiresAt.timeIntervalSinceNow > 120 {
            await loadUser()
            return
        }

        isLoading = true
        defer { isLoading = false }

        do {
            var request = baseRequest(path: "/auth/v1/token?grant_type=refresh_token", method: "POST")
            request.httpBody = try JSONSerialization.data(withJSONObject: [
                "refresh_token": session.refreshToken
            ])
            let json = try await perform(request)
            try handleSessionResponse(json, fallbackEmail: session.email)
        } catch {
            signOut()
        }
    }

    func signOut() {
        session = nil
        metadata = [:]
        UserDefaults.standard.removeObject(forKey: sessionKey)
        HapticsManager.lightImpact()
    }

    func remoteTrackingEntries() -> [TrackingEntry] {
        guard let rawEntries = metadata["tracking_entries"] else { return [] }
        guard JSONSerialization.isValidJSONObject(["entries": rawEntries]),
              let data = try? JSONSerialization.data(withJSONObject: rawEntries),
              let entries = try? JSONDecoder().decode([TrackingEntry].self, from: data) else {
            return []
        }
        return entries
    }

    func updateTrackingEntries(_ entries: [TrackingEntry]) async throws {
        guard let accessToken = session?.accessToken else { return }
        let trimmedEntries = Array(entries.sorted { $0.date < $1.date }.suffix(120))
        let data = try JSONEncoder().encode(trimmedEntries)
        let rawEntries = try JSONSerialization.jsonObject(with: data)
        metadata["tracking_entries"] = rawEntries
        try await updateMetadata(accessToken: accessToken)
    }

    private func restoreSession() {
        guard let data = UserDefaults.standard.data(forKey: sessionKey),
              let savedSession = try? JSONDecoder().decode(AuthSession.self, from: data) else {
            return
        }
        session = savedSession
        Task { await refreshIfNeeded() }
    }

    private func loadUser() async {
        guard let accessToken = session?.accessToken else { return }

        do {
            var request = baseRequest(path: "/auth/v1/user", method: "GET")
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
            let json = try await perform(request)
            if let user = json["user"] as? [String: Any] {
                metadata = user["user_metadata"] as? [String: Any] ?? [:]
            } else {
                metadata = json["user_metadata"] as? [String: Any] ?? [:]
            }
        } catch {
            errorMessage = nil
        }
    }

    private func updateMetadata(accessToken: String) async throws {
        var request = baseRequest(path: "/auth/v1/user", method: "PUT")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.httpBody = try JSONSerialization.data(withJSONObject: ["data": metadata])
        let json = try await perform(request)
        if let user = json["user"] as? [String: Any] {
            metadata = user["user_metadata"] as? [String: Any] ?? metadata
        } else {
            metadata = json["user_metadata"] as? [String: Any] ?? metadata
        }
    }

    private func handleSessionResponse(_ json: [String: Any], fallbackEmail: String) throws {
        guard let accessToken = json["access_token"] as? String,
              let refreshToken = json["refresh_token"] as? String else {
            throw AuthError.invalidResponse
        }

        let expiresIn = json["expires_in"] as? TimeInterval ?? 3600
        let user = json["user"] as? [String: Any]
        let userEmail = (user?["email"] as? String) ?? fallbackEmail
        metadata = user?["user_metadata"] as? [String: Any] ?? [:]

        let nextSession = AuthSession(
            email: userEmail,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresAt: Date().addingTimeInterval(expiresIn)
        )
        session = nextSession

        if let data = try? JSONEncoder().encode(nextSession) {
            UserDefaults.standard.set(data, forKey: sessionKey)
        }
    }

    private func baseRequest(path: String, method: String) -> URLRequest {
        let cleanPath = path.hasPrefix("/") ? path : "/\(path)"
        let url = URL(string: supabaseURL.absoluteString + cleanPath)!
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        return request
    }

    private func perform(_ request: URLRequest) async throws -> [String: Any] {
        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw AuthError.invalidResponse }
        let json = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] ?? [:]
        guard (200..<300).contains(http.statusCode) else {
            let message = (json["msg"] as? String) ?? (json["message"] as? String) ?? "Connexion impossible."
            throw AuthError.server(message)
        }
        return json
    }

    private func message(for error: Error) -> String {
        if case AuthError.server(let message) = error { return message }
        return "Impossible de se connecter pour le moment."
    }

    private enum AuthError: Error {
        case invalidResponse
        case server(String)
    }
}

@MainActor
final class TrackingStore: ObservableObject {
    @Published private(set) var entries: [TrackingEntry] = []
    @Published private(set) var isSyncing = false

    private let localKey = "dietappswift.trackingEntries"

    init() {
        loadLocal()
    }

    var todayEntry: TrackingEntry {
        entries.first { $0.date == TrackingEntry.dateID(for: Date()) } ?? TrackingEntry.today()
    }

    var savedDaysCount: Int {
        entries.filter { $0.saved }.count
    }

    var constancyScore: Int {
        let savedCount = weekEntries().filter { $0.saved }.count
        return Int(round((Double(savedCount) / 7.0) * 100))
    }

    func weekEntries() -> [TrackingEntry] {
        let calendar = Calendar.current
        return (0..<7).reversed().map { offset in
            let date = calendar.date(byAdding: .day, value: -offset, to: Date()) ?? Date()
            let id = TrackingEntry.dateID(for: date)
            return entries.first { $0.date == id } ?? TrackingEntry.today(date: date)
        }
    }

    func save(_ entry: TrackingEntry, auth: AuthManager) async {
        var nextEntry = entry
        nextEntry.saved = true
        nextEntry.updatedAt = ISO8601DateFormatter().string(from: Date())

        upsert(nextEntry)
        persistLocal()

        guard auth.isAuthenticated else {
            HapticsManager.success()
            return
        }

        isSyncing = true
        defer { isSyncing = false }

        do {
            try await auth.updateTrackingEntries(entries)
            HapticsManager.success()
        } catch {
            HapticsManager.lightImpact()
        }
    }

    func sync(with auth: AuthManager) async {
        guard auth.isAuthenticated else { return }
        isSyncing = true
        defer { isSyncing = false }

        let remoteEntries = auth.remoteTrackingEntries()
        let merged = merge(local: entries, remote: remoteEntries)
        entries = merged
        persistLocal()

        if merged != remoteEntries {
            try? await auth.updateTrackingEntries(merged)
        }
    }

    private func loadLocal() {
        guard let data = UserDefaults.standard.data(forKey: localKey),
              let savedEntries = try? JSONDecoder().decode([TrackingEntry].self, from: data) else {
            entries = []
            return
        }
        entries = savedEntries.sorted { $0.date < $1.date }
    }

    private func persistLocal() {
        let trimmed = Array(entries.sorted { $0.date < $1.date }.suffix(120))
        entries = trimmed
        guard let data = try? JSONEncoder().encode(trimmed) else { return }
        UserDefaults.standard.set(data, forKey: localKey)
    }

    private func upsert(_ entry: TrackingEntry) {
        if let index = entries.firstIndex(where: { $0.date == entry.date }) {
            entries[index] = entry
        } else {
            entries.append(entry)
        }
        entries.sort { $0.date < $1.date }
    }

    private func merge(local: [TrackingEntry], remote: [TrackingEntry]) -> [TrackingEntry] {
        var merged: [String: TrackingEntry] = [:]
        for entry in remote { merged[entry.date] = entry }
        for entry in local {
            if let current = merged[entry.date] {
                merged[entry.date] = entry.updatedAt >= current.updatedAt ? entry : current
            } else {
                merged[entry.date] = entry
            }
        }
        return Array(merged.values).sorted { $0.date < $1.date }
    }
}

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var favorites: FavoritesManager
    @EnvironmentObject private var shoppingList: ShoppingListManager
    @EnvironmentObject private var auth: AuthManager
    @EnvironmentObject private var tracking: TrackingStore
    @AppStorage("dietappswift.hapticsEnabled") private var hapticsEnabled = true
    @AppStorage("dietappswift.objective") private var objective = "Rééquilibrage"

    private var favoriteRecipes: [Recipe] {
        RecipeData.recipes.filter { favorites.ids.contains($0.id) }
    }

    private var progressText: String {
        if shoppingList.items.isEmpty { return "Liste vide" }
        let checked = shoppingList.items.filter { $0.isChecked }.count
        return "\(checked)/\(shoppingList.items.count) cochés"
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                VStack(alignment: .leading, spacing: 18) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Profil")
                                .font(.system(size: 38, weight: .semibold, design: .serif))
                            Text(auth.isAuthenticated ? "Connecté, synchronisé, prêt à suivre." : "Connecte-toi sans mot de passe pour synchroniser ton suivi.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                        Spacer()
                        Image(systemName: "person.crop.circle.fill")
                            .font(.system(size: 44))
                            .foregroundColor(Theme.sage)
                    }

                    HStack(spacing: 10) {
                        ProfileMetric(value: "\(favoriteRecipes.count)", label: "favoris")
                        ProfileMetric(value: "\(shoppingList.items.count)", label: "courses")
                        ProfileMetric(value: "\(tracking.savedDaysCount)", label: "jours suivis")
                    }
                }
                .padding(20)
                .background(Theme.heroGradient)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))

                SectionCardView("Compte") {
                    if auth.isAuthenticated {
                        VStack(alignment: .leading, spacing: 12) {
                            Label(auth.email, systemImage: "checkmark.seal.fill")
                                .font(.subheadline.weight(.semibold))
                                .foregroundColor(Theme.sage)
                            Text("Le suivi est gardé sur l’app et synchronisé avec le compte Supabase du site.")
                                .font(.caption)
                                .foregroundColor(.secondary)
                                .lineSpacing(2)
                            Button(role: .destructive) {
                                auth.signOut()
                            } label: {
                                Label("Se déconnecter", systemImage: "rectangle.portrait.and.arrow.right")
                                    .font(.subheadline.weight(.semibold))
                            }
                            .buttonStyle(.plain)
                        }
                    } else {
                        AuthPanel()
                    }
                }

                SectionCardView("Liste de courses") {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text(progressText)
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            if !shoppingList.items.isEmpty {
                                Button("Nettoyer") {
                                    shoppingList.removeChecked()
                                }
                                .font(.caption.weight(.semibold))
                                .foregroundColor(Theme.sage)
                            }
                        }

                        if shoppingList.items.isEmpty {
                            EmptyProfileBlock(
                                icon: "cart",
                                title: "Aucun ingrédient",
                                text: "Depuis une recette, coche ce qu’il te manque puis ajoute-le ici."
                            )
                        } else {
                            ForEach(shoppingList.items) { item in
                                ShoppingItemRow(item: item)
                            }

                            Button(role: .destructive) {
                                shoppingList.clear()
                            } label: {
                                Label("Vider la liste", systemImage: "trash")
                                    .font(.subheadline.weight(.semibold))
                            }
                            .buttonStyle(.plain)
                            .padding(.top, 4)
                        }
                    }
                }

                SectionCardView("Favoris") {
                    if favoriteRecipes.isEmpty {
                        EmptyProfileBlock(
                            icon: "heart",
                            title: "Aucun favori",
                            text: "Ajoute une recette depuis sa fiche pour la retrouver ici."
                        )
                    } else {
                        LazyVStack(spacing: 14) {
                            ForEach(favoriteRecipes) { recipe in
                                RecipeCardLink(recipe: recipe)
                            }
                        }
                    }
                }

                SectionCardView("Réglages") {
                    VStack(spacing: 14) {
                        Toggle(isOn: $hapticsEnabled) {
                            Label("Retours haptiques", systemImage: "iphone.radiowaves.left.and.right")
                        }
                        .tint(Theme.sage)

                        HStack {
                            Label("Objectif", systemImage: "target")
                            Spacer()
                            Picker("Objectif", selection: $objective) {
                                Text("Rééquilibrage").tag("Rééquilibrage")
                                Text("Sèche").tag("Sèche")
                                Text("Forme").tag("Forme")
                            }
                            .pickerStyle(.menu)
                            .tint(Theme.sage)
                        }
                    }
                    .font(.subheadline)
                }
            }
            .padding(20)
        }
        .background(Theme.appBackground)
        .navigationTitle("Profil")
        .task {
            await auth.refreshIfNeeded()
            await tracking.sync(with: auth)
        }
    }
}

private struct ShoppingItemRow: View {
    let item: ShoppingListItem
    @EnvironmentObject private var shoppingList: ShoppingListManager

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Button {
                shoppingList.toggle(item)
            } label: {
                Image(systemName: item.isChecked ? "checkmark.circle.fill" : "circle")
                    .font(.title3)
                    .foregroundColor(item.isChecked ? Theme.sage : .secondary)
            }
            .buttonStyle(.plain)

            VStack(alignment: .leading, spacing: 3) {
                Text(item.title)
                    .font(.subheadline.weight(.medium))
                    .foregroundColor(item.isChecked ? .secondary : .primary)
                    .strikethrough(item.isChecked)
                Text(item.source)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }
            Spacer()
            Button {
                shoppingList.remove(item)
            } label: {
                Image(systemName: "xmark")
                    .font(.caption.weight(.bold))
                    .foregroundColor(.secondary)
                    .frame(width: 28, height: 28)
                    .background(Theme.softBackground)
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
        }
        .padding(12)
        .background(Theme.softBackground.opacity(0.7))
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

private struct ProfileMetric: View {
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.headline)
                .lineLimit(1)
                .minimumScaleFactor(0.65)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

private struct EmptyProfileBlock: View {
    let icon: String
    let title: String
    let text: String

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(Theme.sage)
            Text(title)
                .font(.subheadline.weight(.semibold))
            Text(text)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(22)
        .background(Theme.softBackground.opacity(0.7))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

struct FavoritesView: View {
    var body: some View {
        ProfileView()
    }
}

struct TrackingView: View {
    @EnvironmentObject private var auth: AuthManager
    @EnvironmentObject private var tracking: TrackingStore
    @State private var selectedTab = "Aujourd'hui"

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 18) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Suivi")
                                .font(.system(size: 38, weight: .semibold, design: .serif))
                            Text(auth.isAuthenticated ? "Tes données sont synchronisées avec ton compte." : "Suivi local pour l’instant, synchronisable avec un email.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .lineSpacing(3)
                        }
                        Spacer()
                        Image(systemName: "chart.xyaxis.line")
                            .font(.system(size: 30, weight: .semibold))
                            .foregroundColor(Theme.sage)
                            .frame(width: 52, height: 52)
                            .background(.ultraThinMaterial)
                            .clipShape(Circle())
                    }

                    HStack(spacing: 10) {
                        ProfileMetric(value: "\(tracking.constancyScore)%", label: "constance")
                        ProfileMetric(value: "\(tracking.savedDaysCount)", label: "jours")
                        ProfileMetric(value: tracking.isSyncing ? "Sync" : (auth.isAuthenticated ? "OK" : "Local"), label: "statut")
                    }
                }
                .padding(20)
                .background(Theme.heroGradient)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))

                if !auth.isAuthenticated {
                    SectionCardView("Synchronisation") {
                        AuthPanel()
                    }
                }

                HStack(spacing: 8) {
                    TrackingTabButton(title: "Aujourd'hui", icon: "calendar", selectedTab: $selectedTab)
                    TrackingTabButton(title: "Progression", icon: "chart.bar", selectedTab: $selectedTab)
                }

                if selectedTab == "Aujourd'hui" {
                    TodayTrackingEditor()
                } else {
                    TrackingProgressView()
                }
            }
            .padding(20)
        }
        .background(Theme.appBackground)
        .navigationTitle("Suivi")
        .task {
            await auth.refreshIfNeeded()
            await tracking.sync(with: auth)
        }
    }
}

private struct AuthPanel: View {
    @EnvironmentObject private var auth: AuthManager
    @EnvironmentObject private var tracking: TrackingStore
    @State private var email = ""
    @State private var code = ""
    @State private var codeSent = false

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(codeSent ? "Entre le code reçu par email." : "Connexion sans mot de passe.")
                .font(.subheadline)
                .foregroundColor(.secondary)

            TextField("adresse@email.com", text: $email)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
                .padding(12)
                .background(Theme.softBackground.opacity(0.8))
                .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                .disabled(codeSent)

            if codeSent {
                TextField("Code de vérification", text: $code)
                    .keyboardType(.numberPad)
                    .textContentType(.oneTimeCode)
                    .padding(12)
                    .background(Theme.softBackground.opacity(0.8))
                    .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
            }

            if let error = auth.errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundColor(Theme.terracotta)
            }

            Button {
                Task {
                    if codeSent {
                        await auth.verifyCode(email: email, code: code)
                        await tracking.sync(with: auth)
                    } else {
                        await auth.requestEmailCode(email: email)
                        if auth.errorMessage == nil {
                            codeSent = true
                        }
                    }
                }
            } label: {
                Label(codeSent ? "Valider le code" : "Recevoir un code", systemImage: codeSent ? "checkmark.seal" : "envelope")
                    .font(.subheadline.weight(.semibold))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Theme.sage)
                    .foregroundColor(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            }
            .buttonStyle(.plain)
            .disabled(auth.isLoading)

            if codeSent {
                Button("Changer d’email") {
                    codeSent = false
                    code = ""
                }
                .font(.caption.weight(.semibold))
                .foregroundColor(Theme.sage)
            }
        }
    }
}

private struct TodayTrackingEditor: View {
    @EnvironmentObject private var auth: AuthManager
    @EnvironmentObject private var tracking: TrackingStore
    @State private var entry = TrackingEntry.today()

    private let energyLabels = ["Épuisé", "Fatigué", "Normal", "Bien", "Top"]
    private let moods = ["😔", "😐", "🙂", "😊", "🤩"]

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionCardView("Aujourd'hui") {
                VStack(spacing: 14) {
                    TrackingInputRow(icon: "scalemass", title: "Poids") {
                        TextField("72.5", text: $entry.weight)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                    }

                    VStack(alignment: .leading, spacing: 9) {
                        HStack {
                            Label("Hydratation", systemImage: "drop")
                            Spacer()
                            Text("\(entry.water) ml")
                                .foregroundColor(.secondary)
                        }
                        .font(.subheadline.weight(.medium))

                        ProgressView(value: Double(min(entry.water, 2000)), total: 2000)
                            .tint(Theme.sea)

                        HStack {
                            Button("+250 ml") {
                                entry.water += 250
                                HapticsManager.selection()
                            }
                            Spacer()
                            Button("Réinitialiser") {
                                entry.water = 0
                                HapticsManager.lightImpact()
                            }
                        }
                        .font(.caption.weight(.semibold))
                        .foregroundColor(Theme.sage)
                    }
                    .padding(12)
                    .background(Theme.softBackground.opacity(0.65))
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

                    VStack(alignment: .leading, spacing: 10) {
                        Label("Sommeil", systemImage: "moon")
                            .font(.subheadline.weight(.medium))
                        HStack(spacing: 10) {
                            TextField("23:00", text: $entry.sleep.bedtime)
                                .textFieldStyle(.roundedBorder)
                            TextField("07:00", text: $entry.sleep.waketime)
                                .textFieldStyle(.roundedBorder)
                        }
                        if let duration = sleepDuration(bedtime: entry.sleep.bedtime, waketime: entry.sleep.waketime) {
                            Text("\(duration, specifier: "%.1f") h de sommeil")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding(12)
                    .background(Theme.softBackground.opacity(0.65))
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

                    VStack(alignment: .leading, spacing: 10) {
                        Label("Journal repas", systemImage: "fork.knife")
                            .font(.subheadline.weight(.medium))
                        TextEditor(text: $entry.meals)
                            .frame(minHeight: 92)
                            .scrollContentBackground(.hidden)
                            .padding(8)
                            .background(Theme.softBackground.opacity(0.75))
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    }

                    TrackingChoiceRow(title: "Énergie", values: energyLabels, selection: $entry.energy)
                    MoodChoiceRow(values: moods, selection: $entry.mood)

                    Button {
                        Task { await tracking.save(entry, auth: auth) }
                    } label: {
                        Label("Enregistrer la journée", systemImage: "checkmark.circle")
                            .font(.subheadline.weight(.semibold))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 13)
                            .background(Theme.sage)
                            .foregroundColor(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .onAppear {
            entry = tracking.todayEntry
        }
        .onChange(of: tracking.entries) { _ in
            entry = tracking.todayEntry
        }
    }

    private func sleepDuration(bedtime: String, waketime: String) -> Double? {
        let bed = minutes(from: bedtime)
        let wake = minutes(from: waketime)
        guard let bed, var wake else { return nil }
        if wake <= bed { wake += 24 * 60 }
        return Double(wake - bed) / 60.0
    }

    private func minutes(from value: String) -> Int? {
        let parts = value.split(separator: ":").compactMap { Int($0) }
        guard parts.count == 2 else { return nil }
        return parts[0] * 60 + parts[1]
    }
}

private struct TrackingProgressView: View {
    @EnvironmentObject private var tracking: TrackingStore

    private var week: [TrackingEntry] { tracking.weekEntries() }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionCardView("Constance") {
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Text("\(tracking.constancyScore)%")
                            .font(.system(size: 42, weight: .semibold, design: .serif))
                        Spacer()
                        Text("\(week.filter { $0.saved }.count)/7 jours")
                            .font(.subheadline.weight(.semibold))
                            .foregroundColor(Theme.sage)
                    }
                    ProgressView(value: Double(tracking.constancyScore), total: 100)
                        .tint(Theme.sage)
                }
            }

            SectionCardView("Poids – 7 jours") {
                WeekBars(entries: week, value: { Double($0.weight.replacingOccurrences(of: ",", with: ".")) ?? 0 }, label: { $0.weight.isEmpty ? "" : $0.weight }, tint: Theme.sage)
            }

            SectionCardView("Hydratation – 7 jours") {
                WeekBars(entries: week, value: { Double($0.water) }, label: { $0.water == 0 ? "" : String(format: "%.1fL", Double($0.water) / 1000) }, tint: Theme.sea)
            }
        }
    }
}

private struct TrackingTabButton: View {
    let title: String
    let icon: String
    @Binding var selectedTab: String

    var body: some View {
        Button {
            selectedTab = title
            HapticsManager.selection()
        } label: {
            Label(title, systemImage: icon)
                .font(.subheadline.weight(.semibold))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(selectedTab == title ? Theme.sage : Theme.cardBackground)
                .foregroundColor(selectedTab == title ? .white : .primary)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}

private struct TrackingInputRow<Content: View>: View {
    let icon: String
    let title: String
    let content: Content

    init(icon: String, title: String, @ViewBuilder content: () -> Content) {
        self.icon = icon
        self.title = title
        self.content = content()
    }

    var body: some View {
        HStack {
            Label(title, systemImage: icon)
                .font(.subheadline.weight(.medium))
            Spacer()
            content
                .frame(maxWidth: 120)
        }
        .padding(12)
        .background(Theme.softBackground.opacity(0.65))
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

private struct TrackingChoiceRow: View {
    let title: String
    let values: [String]
    @Binding var selection: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 9) {
            Text(title)
                .font(.subheadline.weight(.medium))
            HStack(spacing: 6) {
                ForEach(Array(values.enumerated()), id: \.offset) { index, value in
                    Button(value) {
                        selection = index
                        HapticsManager.selection()
                    }
                    .font(.caption.weight(.semibold))
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 9)
                    .background(selection == index ? Theme.sage : Theme.softBackground)
                    .foregroundColor(selection == index ? .white : .secondary)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
            }
        }
    }
}

private struct MoodChoiceRow: View {
    let values: [String]
    @Binding var selection: Int

    var body: some View {
        HStack(spacing: 10) {
            ForEach(Array(values.enumerated()), id: \.offset) { index, mood in
                Button(mood) {
                    selection = index
                    HapticsManager.selection()
                }
                .font(.title2)
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(selection == index ? Theme.sage.opacity(0.16) : Theme.softBackground.opacity(0.75))
                .clipShape(Circle())
            }
        }
    }
}

private struct WeekBars: View {
    let entries: [TrackingEntry]
    let value: (TrackingEntry) -> Double
    let label: (TrackingEntry) -> String
    let tint: Color

    var body: some View {
        let maxValue = max(entries.map(value).max() ?? 1, 1)
        HStack(alignment: .bottom, spacing: 8) {
            ForEach(entries) { entry in
                VStack(spacing: 6) {
                    Text(label(entry))
                        .font(.caption2)
                        .foregroundColor(.secondary)
                        .frame(height: 14)
                    RoundedRectangle(cornerRadius: 7, style: .continuous)
                        .fill(tint.opacity(0.72))
                        .frame(height: max(8, CGFloat(value(entry) / maxValue) * 96))
                    Text(dayLabel(for: entry.date))
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
            }
        }
        .frame(height: 140)
    }

    private func dayLabel(for id: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        guard let date = formatter.date(from: id) else { return "" }
        formatter.locale = Locale(identifier: "fr_FR")
        formatter.dateFormat = "E"
        return formatter.string(from: date)
    }
}

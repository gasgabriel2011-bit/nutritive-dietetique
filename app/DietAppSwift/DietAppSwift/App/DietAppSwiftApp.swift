import SwiftUI

@main
struct DietAppSwiftApp: App {
    @StateObject private var favorites = FavoritesManager()
    @StateObject private var shoppingList = ShoppingListManager()
    @StateObject private var auth = AuthManager()
    @StateObject private var tracking = TrackingStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(favorites)
                .environmentObject(shoppingList)
                .environmentObject(auth)
                .environmentObject(tracking)
        }
    }
}

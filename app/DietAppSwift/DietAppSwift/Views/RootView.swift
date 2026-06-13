import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            NavigationStack { HomeView() }
                .tabItem { Label("Accueil", systemImage: "leaf") }
            NavigationStack { RecipesView() }
                .tabItem { Label("Recettes", systemImage: "fork.knife") }
            NavigationStack { PlansView() }
                .tabItem { Label("Plans", systemImage: "map") }
            NavigationStack { TrackingView() }
                .tabItem { Label("Suivi", systemImage: "chart.xyaxis.line") }
            NavigationStack { ProfileView() }
                .tabItem { Label("Profil", systemImage: "person.crop.circle") }
        }
        .accentColor(Theme.sage)
        .toolbarBackground(.ultraThinMaterial, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
    }
}

import SwiftUI

struct HomeView: View {
    private let featured = RecipeData.featuredRecipes.first ?? RecipeData.recipes[0]
    private let quickRecipes = Array(RecipeData.featuredRecipes.dropFirst())

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 26) {
                VStack(alignment: .leading, spacing: 18) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("NutriVie")
                                .font(.system(size: 44, weight: .light, design: .serif))
                            Text("Cuisiner équilibré, simple, joli, sans se prendre la tête.")
                                .font(.body)
                                .foregroundColor(.secondary)
                                .lineSpacing(3)
                        }
                        Spacer()
                        Image(systemName: "leaf.fill")
                            .font(.title2)
                            .foregroundColor(Theme.sage)
                            .frame(width: 48, height: 48)
                            .background(.ultraThinMaterial)
                            .clipShape(Circle())
                    }

                    HStack(spacing: 10) {
                        HomeStatView(value: "\(RecipeData.recipes.count)", label: "recettes")
                        HomeStatView(value: "\(RecipeData.blogArticles.count)", label: "articles")
                        HomeStatView(value: "\(RecipeData.mealPrepRecipes.count)", label: "meal prep")
                    }
                }
                .padding(20)
                .background(Theme.heroGradient)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(Color.white.opacity(0.45))
                )

                NavigationLink(destination: RecipeDetailView(recipe: featured)) {
                    VStack(alignment: .leading, spacing: 0) {
                        RecipeImageView(url: featured.imageURL, height: 210)
                        VStack(alignment: .leading, spacing: 10) {
                            Text("À cuisiner maintenant")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(Theme.sage)
                            Text(featured.title)
                                .font(.title3.weight(.semibold))
                                .foregroundColor(.primary)
                            if !featured.description.isEmpty {
                                Text(featured.description)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .lineLimit(2)
                            }
                            HStack {
                                Label("\(featured.totalTime) min", systemImage: "clock")
                                Label(featured.collection, systemImage: "sparkles")
                            }
                            .font(.footnote)
                            .foregroundColor(.secondary)
                        }
                        .padding(18)
                    }
                    .background(Theme.cardBackground)
                    .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                }
                .buttonStyle(.plain)

                VStack(alignment: .leading, spacing: 14) {
                    Text("Explorer")
                        .font(.title3.weight(.semibold))
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                        HomeShortcut(title: "Toutes les recettes", icon: "fork.knife", destination: AnyView(RecipesView()))
                        HomeShortcut(title: "Plans", icon: "map", destination: AnyView(PlansView()))
                        HomeShortcut(title: "Suivi", icon: "chart.xyaxis.line", destination: AnyView(TrackingView()))
                        HomeShortcut(title: "Blog nutrition", icon: "book.closed", destination: AnyView(BlogView()))
                        HomeShortcut(title: "Meal prep", icon: "calendar", destination: AnyView(RecipesView(initialMealPrepOnly: true)))
                        HomeShortcut(title: "Profil", icon: "person.crop.circle", destination: AnyView(ProfileView()))
                    }
                }

                VStack(alignment: .leading, spacing: 14) {
                    Text("Idées rapides")
                        .font(.title3.weight(.semibold))
                    LazyVStack(spacing: 14) {
                        ForEach(quickRecipes) { recipe in
                            RecipeCardLink(recipe: recipe)
                        }
                    }
                }
            }
            .padding(20)
        }
        .background(Theme.appBackground)
        .navigationBarTitleDisplayMode(.inline)
    }
}

private struct HomeStatView: View {
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.headline)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(1)
                .minimumScaleFactor(0.8)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

private struct HomeShortcut: View {
    let title: String
    let icon: String
    let destination: AnyView

    var body: some View {
        NavigationLink(destination: destination) {
            HStack(spacing: 10) {
                Image(systemName: icon)
                    .font(.headline)
                    .foregroundColor(Theme.sage)
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundColor(.primary)
                    .lineLimit(2)
                    .minimumScaleFactor(0.85)
                Spacer(minLength: 0)
            }
            .padding(14)
            .frame(minHeight: 66)
            .background(Theme.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Theme.hairline)
            )
        }
        .buttonStyle(.plain)
    }
}

import SwiftUI

struct RecipesView: View {
    @State private var selectedCategory = "Toutes"
    @State private var selectedCollection = "Toutes"
    @State private var mealPrepOnly = false
    @State private var query = ""
    @EnvironmentObject private var favorites: FavoritesManager

    init(
        initialCollection: String = "Toutes",
        initialCategory: String = "Toutes",
        initialMealPrepOnly: Bool = false
    ) {
        _selectedCollection = State(initialValue: initialCollection)
        _selectedCategory = State(initialValue: initialCategory)
        _mealPrepOnly = State(initialValue: initialMealPrepOnly)
    }

    private var filteredRecipes: [Recipe] {
        let cleanQuery = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return RecipeData.recipes.filter { recipe in
            let matchesCollection = selectedCollection == "Toutes" || recipe.collection == selectedCollection
            let matchesCategory = selectedCategory == "Toutes" || recipe.category == selectedCategory
            let matchesMealPrep = !mealPrepOnly || recipe.isMealPrep
            let searchableText = [
                recipe.title,
                recipe.description,
                recipe.category,
                recipe.collection,
                recipe.ingredients.joined(separator: " "),
                recipe.tags.joined(separator: " ")
            ].joined(separator: " ").lowercased()
            let matchesQuery = cleanQuery.isEmpty || searchableText.contains(cleanQuery)
            return matchesCollection && matchesCategory && matchesMealPrep && matchesQuery
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("\(filteredRecipes.count) recettes")
                        .font(.system(size: 34, weight: .semibold, design: .serif))
                    Text("Toutes les idées du site, rangées pour cuisiner vite sans perdre le fil.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding(.horizontal, 20)

                FilterScroller(
                    items: RecipeData.collections,
                    selection: $selectedCollection
                )

                Button {
                    mealPrepOnly.toggle()
                    HapticsManager.selection()
                } label: {
                    Label("Meal prep", systemImage: mealPrepOnly ? "checkmark.circle.fill" : "calendar")
                        .font(.subheadline.weight(.medium))
                        .padding(.horizontal, 14)
                        .padding(.vertical, 9)
                        .background(mealPrepOnly ? Theme.sage : Theme.cardBackground)
                        .foregroundColor(mealPrepOnly ? .white : .primary)
                        .clipShape(Capsule())
                        .overlay(
                            Capsule()
                                .stroke(mealPrepOnly ? Color.clear : Theme.hairline)
                        )
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 20)

                FilterScroller(
                    items: RecipeData.categories,
                    selection: $selectedCategory
                )

                if filteredRecipes.isEmpty {
                    EmptyRecipesView()
                        .padding(.horizontal, 20)
                        .padding(.top, 24)
                } else {
                    LazyVStack(spacing: 16) {
                        ForEach(filteredRecipes) { recipe in
                            RecipeCardLink(recipe: recipe)
                        }
                    }
                    .padding(.horizontal, 20)
                }
            }
            .padding(.vertical, 16)
        }
        .background(Theme.appBackground)
        .navigationTitle("Recettes")
        .searchable(text: $query, prompt: "Nom, ingrédient, catégorie")
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    selectedCategory = "Toutes"
                    selectedCollection = "Toutes"
                    mealPrepOnly = false
                    query = ""
                    HapticsManager.lightImpact()
                } label: {
                    Image(systemName: "arrow.counterclockwise")
                }
                .disabled(selectedCategory == "Toutes" && selectedCollection == "Toutes" && !mealPrepOnly && query.isEmpty)
            }
        }
    }
}

struct RecipeCardLink: View {
    let recipe: Recipe
    @EnvironmentObject private var favorites: FavoritesManager

    var body: some View {
        ZStack(alignment: .topTrailing) {
            NavigationLink(destination: RecipeDetailView(recipe: recipe)) {
                RecipeCardView(recipe: recipe)
            }
            .buttonStyle(.plain)

            Button {
                favorites.toggle(recipe)
            } label: {
                Image(systemName: favorites.contains(recipe) ? "heart.fill" : "heart")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(favorites.contains(recipe) ? Theme.terracotta : Theme.ink)
                    .frame(width: 40, height: 40)
                    .background(.ultraThinMaterial)
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
            .padding(10)
        }
    }
}

struct FilterScroller: View {
    let items: [String]
    @Binding var selection: String

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(items, id: \.self) { item in
                    Button {
                        selection = item
                        HapticsManager.selection()
                    } label: {
                        Text(item)
                            .font(.subheadline.weight(.medium))
                            .lineLimit(1)
                            .padding(.horizontal, 14)
                            .padding(.vertical, 9)
                            .background(selection == item ? Theme.sage : Theme.cardBackground)
                            .foregroundColor(selection == item ? .white : .primary)
                            .clipShape(Capsule())
                            .overlay(
                                Capsule()
                                    .stroke(selection == item ? Color.clear : Theme.hairline)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 20)
        }
    }
}

private struct EmptyRecipesView: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 34, weight: .light))
                .foregroundColor(Theme.sage)
            Text("Aucune recette trouvée")
                .font(.headline)
            Text("Essaie un autre ingrédient ou remets les filtres à zéro.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(28)
        .background(Theme.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

import SwiftUI

struct RecipeDetailView: View {
    let recipe: Recipe
    @EnvironmentObject private var favorites: FavoritesManager
    @EnvironmentObject private var shoppingList: ShoppingListManager
    @State private var selectedIngredients: Set<String> = []
    @State private var activeSheet: RecipeSheet?
    @State private var showImageViewer = false
    @State private var equipmentNote = ""
    @State private var showEquipmentNote = false

    private var shoppingButtonText: String {
        if selectedIngredients.isEmpty { return "Sélectionne des ingrédients" }
        if selectedIngredients.count == 1 { return "Ajouter 1 ingrédient" }
        return "Ajouter \(selectedIngredients.count) ingrédients"
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                DetailHeroImage(url: recipe.imageURL) {
                    showImageViewer = true
                    HapticsManager.lightImpact()
                }

                VStack(alignment: .leading, spacing: 12) {
                    HStack(spacing: 8) {
                        DetailChip(icon: "sparkles", text: recipe.collection)
                        DetailChip(icon: "leaf", text: recipe.category)
                    }

                    Text(recipe.title)
                        .font(.system(size: 30, weight: .semibold, design: .serif))
                        .lineSpacing(2)
                        .fixedSize(horizontal: false, vertical: true)

                    if !recipe.description.isEmpty {
                        Text(recipe.description)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .lineSpacing(4)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        MetricButton(
                            title: "Temps",
                            value: "\(recipe.totalTime) min",
                            icon: "clock",
                            tint: Theme.sage
                        ) {
                            activeSheet = .time
                        }

                        MetricButton(
                            title: "Calories",
                            value: recipe.calories.map { "\($0) kcal" } ?? "--",
                            icon: "chart.bar",
                            tint: Theme.terracotta
                        ) {
                            activeSheet = .nutrition
                        }

                        MetricButton(
                            title: "Protéines",
                            value: recipe.proteins.map { "\($0) g" } ?? "--",
                            icon: "bolt",
                            tint: Theme.sea
                        ) {
                            activeSheet = .nutrition
                        }
                    }
                    .padding(.horizontal, 1)
                }

                LazyVGrid(columns: [GridItem(.adaptive(minimum: 132), spacing: 8)], alignment: .leading, spacing: 8) {
                    MetaPill(icon: "fork.knife", text: recipe.isNoCook ? "Sans cuisson" : recipe.cookingMethod)
                    if let temperature = recipe.temperature {
                        MetaPill(icon: "thermometer.medium", text: temperature)
                    }
                    MetaPill(icon: "person.2", text: "\(recipe.servings) portion\(recipe.servings > 1 ? "s" : "")")
                    MetaPill(icon: "speedometer", text: recipe.difficulty.capitalized)
                }

                DetailSection(icon: "checklist", title: "Ingrédients") {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("\(selectedIngredients.count)/\(recipe.ingredients.count) cochés")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            Button(selectedIngredients.count == recipe.ingredients.count ? "Tout retirer" : "Tout cocher") {
                                if selectedIngredients.count == recipe.ingredients.count {
                                    selectedIngredients.removeAll()
                                } else {
                                    selectedIngredients = Set(recipe.ingredients)
                                }
                                HapticsManager.selection()
                            }
                            .font(.caption.weight(.semibold))
                            .foregroundColor(Theme.sage)
                        }

                        VStack(spacing: 8) {
                            ForEach(recipe.ingredients, id: \.self) { ingredient in
                                IngredientRow(
                                    ingredient: ingredient,
                                    isSelected: selectedIngredients.contains(ingredient)
                                ) {
                                    toggleIngredient(ingredient)
                                }
                            }
                        }

                        Button {
                            let ingredients = recipe.ingredients.filter { selectedIngredients.contains($0) }
                            shoppingList.add(ingredients, from: recipe)
                        } label: {
                            HStack {
                                Image(systemName: "cart.badge.plus")
                                Text(shoppingButtonText)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.caption.weight(.bold))
                            }
                            .font(.subheadline.weight(.semibold))
                            .padding(.horizontal, 14)
                            .padding(.vertical, 13)
                            .background(selectedIngredients.isEmpty ? Theme.softBackground : Theme.sage)
                            .foregroundColor(selectedIngredients.isEmpty ? .secondary : .white)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        }
                        .buttonStyle(.plain)
                        .disabled(selectedIngredients.isEmpty)
                    }
                }

                DetailSection(icon: "wrench.and.screwdriver", title: "Matériel") {
                    FlexibleTags(items: recipe.equipment) { item in
                        equipmentNote = noteForEquipment(item)
                        showEquipmentNote = true
                    }
                }

                if !recipe.tags.isEmpty || recipe.isMealPrep {
                    DetailSection(icon: "tag", title: "Repères") {
                        FlexibleTags(items: recipe.tags + (recipe.isMealPrep ? ["meal prep"] : [])) { tag in
                            equipmentNote = "Repère utile : \(tag)."
                            showEquipmentNote = true
                        }
                    }
                }

                DetailSection(icon: "list.number", title: "Préparation") {
                    VStack(alignment: .leading, spacing: 14) {
                        ForEach(Array(recipe.steps.enumerated()), id: \.offset) { index, step in
                            StepRowView(number: index + 1, text: step)
                        }
                    }
                }

                DetailSection(icon: "lightbulb", title: "Conseil rapide") {
                    Text(recipe.tip)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            .padding(20)
        }
        .background(Theme.appBackground)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    favorites.toggle(recipe)
                } label: {
                    Image(systemName: favorites.contains(recipe) ? "heart.fill" : "heart")
                        .symbolRenderingMode(.hierarchical)
                        .foregroundColor(favorites.contains(recipe) ? Theme.terracotta : Theme.sage)
                }
            }
        }
        .onAppear {
            if selectedIngredients.isEmpty {
                selectedIngredients = Set(recipe.ingredients)
            }
        }
        .sheet(item: $activeSheet) { sheet in
            RecipeInfoSheet(sheet: sheet, recipe: recipe)
                .presentationDetents([.medium])
        }
        .fullScreenCover(isPresented: $showImageViewer) {
            ImageViewer(url: recipe.imageURL, title: recipe.title)
        }
        .alert("Détail", isPresented: $showEquipmentNote) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(equipmentNote)
        }
    }

    private func toggleIngredient(_ ingredient: String) {
        if selectedIngredients.contains(ingredient) {
            selectedIngredients.remove(ingredient)
        } else {
            selectedIngredients.insert(ingredient)
        }
        HapticsManager.selection()
    }

    private func noteForEquipment(_ item: String) -> String {
        switch item.lowercased() {
        case let value where value.contains("four"):
            return "Préchauffe bien le four : la cuisson sera plus régulière et les légumes rôtissent mieux."
        case let value where value.contains("poêle"):
            return "Une poêle bien chaude évite que les aliments accrochent et donne une meilleure coloration."
        case let value where value.contains("casserole"):
            return "Garde un feu moyen pour mieux contrôler la cuisson et éviter que ça attache."
        case let value where value.contains("blender") || value.contains("mixeur"):
            return "Mixe par impulsions, puis ajuste la texture avec un peu de liquide."
        default:
            return "Prépare ce matériel avant de commencer pour cuisiner plus tranquillement."
        }
    }
}

private struct DetailHeroImage: View {
    let url: URL?
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            ZStack(alignment: .bottomTrailing) {
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(Theme.heroGradient)

                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFit()
                            .padding(2)
                            .transition(.opacity)
                    case .failure(_):
                        VStack(spacing: 10) {
                            Image(systemName: "photo")
                                .font(.title2)
                            Text("Image indisponible")
                                .font(.caption.weight(.medium))
                        }
                        .foregroundColor(Theme.sage)
                    case .empty:
                        ProgressView()
                            .tint(Theme.sage)
                    @unknown default:
                        EmptyView()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                Label("Agrandir", systemImage: "arrow.up.left.and.arrow.down.right")
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.primary)
                    .padding(.horizontal, 11)
                    .padding(.vertical, 8)
                    .background(.ultraThinMaterial)
                    .clipShape(Capsule())
                    .padding(12)
            }
            .frame(height: 248)
            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .stroke(Color.white.opacity(0.45), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }
}

private struct MetricButton: View {
    let title: String
    let value: String
    let icon: String
    let tint: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 11) {
                Image(systemName: icon)
                    .font(.system(size: 15, weight: .semibold))
                    .symbolRenderingMode(.hierarchical)
                    .foregroundColor(tint)
                    .frame(width: 32, height: 32)
                    .background(tint.opacity(0.12))
                    .clipShape(Circle())

                VStack(alignment: .leading, spacing: 2) {
                    Text(value)
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.primary)
                        .lineLimit(1)
                        .minimumScaleFactor(0.75)
                    Text(title)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Image(systemName: "chevron.right")
                    .font(.caption2.weight(.bold))
                    .foregroundColor(.secondary)
            }
            .padding(12)
            .frame(minWidth: 138, alignment: .leading)
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

private struct DetailSection<Content: View>: View {
    let icon: String
    let title: String
    let content: Content

    init(icon: String, title: String, @ViewBuilder content: () -> Content) {
        self.icon = icon
        self.title = title
        self.content = content()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            HStack(spacing: 10) {
                Image(systemName: icon)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(Theme.sage)
                    .frame(width: 30, height: 30)
                    .background(Theme.sage.opacity(0.12))
                    .clipShape(Circle())

                Text(title)
                    .font(.headline)
            }

            content
        }
        .padding(17)
        .background(Theme.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Theme.hairline)
        )
    }
}

private struct IngredientRow: View {
    let ingredient: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 11) {
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(isSelected ? Theme.sage : .secondary)

                Text(ingredient)
                    .font(.subheadline)
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(isSelected ? Theme.sage.opacity(0.08) : Theme.softBackground.opacity(0.6))
            .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}

private struct DetailChip: View {
    let icon: String
    let text: String

    var body: some View {
        Label(text, systemImage: icon)
            .font(.caption.weight(.semibold))
            .lineLimit(1)
            .minimumScaleFactor(0.75)
            .padding(.horizontal, 10)
            .padding(.vertical, 7)
            .foregroundColor(Theme.sage)
            .background(Theme.sage.opacity(0.11))
            .clipShape(Capsule())
    }
}

private struct MetaPill: View {
    let icon: String
    let text: String

    var body: some View {
        Label(text, systemImage: icon)
            .font(.caption.weight(.medium))
            .lineLimit(1)
            .minimumScaleFactor(0.75)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 11)
            .padding(.vertical, 9)
            .foregroundColor(.primary)
            .background(Theme.cardBackground)
            .clipShape(Capsule())
            .overlay(
                Capsule()
                    .stroke(Theme.hairline)
            )
    }
}

private struct FlexibleTags: View {
    let items: [String]
    let onTap: (String) -> Void

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 112), spacing: 8)], alignment: .leading, spacing: 8) {
            ForEach(items, id: \.self) { item in
                Button {
                    onTap(item)
                    HapticsManager.selection()
                } label: {
                    Text(item)
                        .font(.caption.weight(.medium))
                        .lineLimit(1)
                        .minimumScaleFactor(0.75)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 8)
                        .background(Theme.softBackground.opacity(0.78))
                        .foregroundColor(.primary)
                        .clipShape(Capsule())
                }
                .buttonStyle(.plain)
            }
        }
    }
}

private enum RecipeSheet: String, Identifiable {
    case time
    case nutrition

    var id: String { rawValue }
}

private struct RecipeInfoSheet: View {
    let sheet: RecipeSheet
    let recipe: Recipe

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text(sheet == .time ? "Détail du temps" : "Repères nutrition")
                .font(.system(size: 28, weight: .semibold, design: .serif))

            if sheet == .time {
                InfoLine(icon: "timer", title: "Préparation", value: "\(recipe.prepTime) min")
                InfoLine(icon: "flame", title: "Cuisson", value: "\(recipe.cookTime) min")
                if recipe.restTime > 0 {
                    InfoLine(icon: "snowflake", title: "Repos", value: "\(recipe.restTime) min")
                }
                InfoLine(icon: "clock", title: "Total", value: "\(recipe.totalTime) min")
                InfoLine(icon: "fork.knife", title: "Méthode", value: recipe.isNoCook ? "Sans cuisson" : recipe.cookingMethod)
            } else {
                InfoLine(icon: "chart.bar", title: "Calories", value: recipe.calories.map { "\($0) kcal" } ?? "Non renseigné")
                InfoLine(icon: "bolt", title: "Protéines", value: recipe.proteins.map { "\($0) g" } ?? "Non renseigné")
                InfoLine(icon: "leaf", title: "Glucides", value: recipe.carbs.map { "\($0) g" } ?? "Non renseigné")
                InfoLine(icon: "drop", title: "Lipides", value: recipe.fats.map { "\($0) g" } ?? "Non renseigné")
                InfoLine(icon: "person.2", title: "Portions", value: "\(recipe.servings)")
                InfoLine(icon: "speedometer", title: "Difficulté", value: recipe.difficulty.capitalized)
            }
            Spacer()
        }
        .padding(24)
        .background(Theme.appBackground)
    }
}

private struct InfoLine: View {
    let icon: String
    let title: String
    let value: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(Theme.sage)
                .frame(width: 28, height: 28)
                .background(Theme.softBackground)
                .clipShape(Circle())
            Text(title)
                .font(.subheadline)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .font(.subheadline.weight(.semibold))
                .multilineTextAlignment(.trailing)
        }
    }
}

private struct ImageViewer: View {
    let url: URL?
    let title: String
    @Environment(\.dismiss) private var dismiss
    @State private var scale: CGFloat = 1

    var body: some View {
        ZStack(alignment: .topTrailing) {
            Color.black.ignoresSafeArea()
            AsyncImage(url: url) { phase in
                switch phase {
                case .success(let image):
                    image
                        .resizable()
                        .scaledToFit()
                        .scaleEffect(scale)
                        .onTapGesture(count: 2) {
                            withAnimation(.spring()) {
                                scale = scale > 1 ? 1 : 1.35
                            }
                        }
                case .failure(_):
                    VStack(spacing: 12) {
                        Image(systemName: "photo")
                            .font(.largeTitle)
                        Text("Image indisponible")
                    }
                    .foregroundColor(.white)
                case .empty:
                    ProgressView()
                        .tint(.white)
                @unknown default:
                    EmptyView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .padding()

            Button {
                dismiss()
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.white)
                    .frame(width: 44, height: 44)
                    .background(Color.white.opacity(0.18))
                    .clipShape(Circle())
            }
            .padding(18)
        }
        .accessibilityLabel(title)
    }
}

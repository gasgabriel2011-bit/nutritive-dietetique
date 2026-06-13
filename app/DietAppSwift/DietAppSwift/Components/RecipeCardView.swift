import SwiftUI

struct RecipeCardView: View {
    let recipe: Recipe

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ZStack(alignment: .topLeading) {
                RecipeImageView(url: recipe.imageURL, height: 155)
                HStack(spacing: 6) {
                    Text(recipe.collection)
                    if recipe.isMealPrep {
                        Text("Meal prep")
                    }
                }
                .font(.caption2.weight(.semibold))
                .padding(.horizontal, 10)
                .padding(.vertical, 7)
                .background(.ultraThinMaterial)
                .clipShape(Capsule())
                .padding(10)
            }

            VStack(alignment: .leading, spacing: 10) {
                Text(recipe.category.uppercased())
                    .font(.caption2.weight(.semibold))
                    .foregroundColor(Theme.sage)
                Text(recipe.title)
                    .font(.headline)
                    .foregroundColor(.primary)
                    .lineLimit(2)
                if !recipe.description.isEmpty {
                    Text(recipe.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }
                HStack(spacing: 12) {
                    Label("\(recipe.totalTime) min", systemImage: "clock")
                    if let calories = recipe.calories {
                        Label("\(calories) kcal", systemImage: "chart.bar")
                    }
                }
                .font(.caption)
                .foregroundColor(.secondary)
            }
            .padding(14)
        }
        .background(Theme.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .shadow(color: Color.black.opacity(0.06), radius: 12, y: 6)
    }
}

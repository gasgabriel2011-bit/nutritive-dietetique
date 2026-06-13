import SwiftUI

struct BlogView: View {
    @State private var selectedCategory = "Tous"
    @State private var query = ""

    private var filteredArticles: [BlogArticle] {
        let cleanQuery = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return RecipeData.blogArticles.filter { article in
            let matchesCategory = selectedCategory == "Tous" || article.categoryLabel == selectedCategory
            let searchableText = [
                article.title,
                article.excerpt,
                article.categoryLabel,
                article.content
            ].joined(separator: " ").lowercased()
            let matchesQuery = cleanQuery.isEmpty || searchableText.contains(cleanQuery)
            return matchesCategory && matchesQuery
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Blog")
                        .font(.system(size: 38, weight: .semibold, design: .serif))
                    Text("Des repères simples pour comprendre la nutrition et faire de meilleurs choix au quotidien.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(3)
                }
                .padding(.horizontal, 20)

                FilterScroller(
                    items: RecipeData.blogCategories,
                    selection: $selectedCategory
                )

                if filteredArticles.isEmpty {
                    EmptyBlogView()
                        .padding(.horizontal, 20)
                        .padding(.top, 24)
                } else {
                    LazyVStack(spacing: 14) {
                        ForEach(filteredArticles) { article in
                            NavigationLink(destination: BlogDetailView(article: article)) {
                                BlogCardView(article: article)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 20)
                }
            }
            .padding(.vertical, 16)
        }
        .background(Theme.appBackground)
        .navigationTitle("Blog")
        .searchable(text: $query, prompt: "Sujet, fibre, sommeil, protéines")
    }
}

private struct BlogCardView: View {
    let article: BlogArticle

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 8) {
                Text(article.categoryLabel)
                    .font(.caption.weight(.semibold))
                    .foregroundColor(Theme.sage)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(Theme.sage.opacity(0.12))
                    .clipShape(Capsule())
                Label("\(article.readTime) min", systemImage: "clock")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.secondary)
            }

            Text(article.title)
                .font(.headline)
                .foregroundColor(.primary)
                .fixedSize(horizontal: false, vertical: true)

            Text(article.excerpt)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(3)
                .lineSpacing(2)
        }
        .padding(18)
        .background(Theme.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Theme.hairline)
        )
    }
}

private struct BlogDetailView: View {
    let article: BlogArticle

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                VStack(alignment: .leading, spacing: 10) {
                    HStack(spacing: 8) {
                        Text(article.categoryLabel.uppercased())
                        Label("\(article.readTime) min", systemImage: "clock")
                    }
                    .font(.caption.weight(.semibold))
                    .foregroundColor(Theme.sage)

                    Text(article.title)
                        .font(.system(size: 32, weight: .semibold, design: .serif))
                        .lineSpacing(2)

                    Text(article.excerpt)
                        .font(.body)
                        .foregroundColor(.secondary)
                        .lineSpacing(3)
                }
                .padding(20)
                .background(Theme.heroGradient)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))

                SectionCardView("À retenir") {
                    MarkdownLiteView(content: article.content)
                }
            }
            .padding(20)
        }
        .background(Theme.appBackground)
        .navigationBarTitleDisplayMode(.inline)
    }
}

private struct MarkdownLiteView: View {
    let content: String

    private var lines: [String] {
        content.components(separatedBy: .newlines)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ForEach(Array(lines.enumerated()), id: \.offset) { _, line in
                markdownLine(line.trimmingCharacters(in: .whitespaces))
            }
        }
    }

    @ViewBuilder
    private func markdownLine(_ line: String) -> some View {
        if line.isEmpty {
            Spacer()
                .frame(height: 4)
        } else if line.hasPrefix("### ") {
            Text(line.replacingOccurrences(of: "### ", with: ""))
                .font(.headline)
                .padding(.top, 6)
        } else if line.hasPrefix("## ") {
            Text(line.replacingOccurrences(of: "## ", with: ""))
                .font(.title3.weight(.semibold))
                .padding(.top, 8)
        } else if line.hasPrefix("- ") {
            HStack(alignment: .top, spacing: 8) {
                Text("•")
                    .foregroundColor(Theme.sage)
                Text(cleanInline(line.replacingOccurrences(of: "- ", with: "")))
                    .foregroundColor(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .font(.subheadline)
        } else if line.range(of: #"^\d+\. "#, options: .regularExpression) != nil {
            Text(cleanInline(line))
                .font(.subheadline)
                .foregroundColor(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        } else if line.hasPrefix("|") {
            Text(line)
                .font(.caption.monospaced())
                .foregroundColor(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        } else {
            Text(cleanInline(line))
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineSpacing(3)
                .fixedSize(horizontal: false, vertical: true)
        }
    }

    private func cleanInline(_ text: String) -> String {
        text
            .replacingOccurrences(of: "**", with: "")
            .replacingOccurrences(of: "_", with: "")
    }
}

private struct EmptyBlogView: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "book.closed")
                .font(.system(size: 34, weight: .light))
                .foregroundColor(Theme.sage)
            Text("Aucun article trouvé")
                .font(.headline)
            Text("Change de catégorie ou essaie un autre mot-clé.")
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

struct SearchView: View {
    var body: some View {
        BlogView()
    }
}

struct PlansView: View {
    @State private var selectedCategory = "Tous"

    private var filteredPlans: [NutritionPlan] {
        PlanData.plans.filter { selectedCategory == "Tous" || $0.categoryLabel == selectedCategory }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Plans")
                        .font(.system(size: 38, weight: .semibold, design: .serif))
                    Text("Des programmes guidés pour avancer semaine après semaine, avec les recettes liées quand le plan est complet.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(3)
                }
                .padding(.horizontal, 20)

                FilterScroller(items: PlanData.categories, selection: $selectedCategory)

                LazyVStack(spacing: 14) {
                    ForEach(filteredPlans) { plan in
                        NavigationLink(destination: PlanDetailView(plan: plan)) {
                            PlanCardView(plan: plan)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 20)
            }
            .padding(.vertical, 16)
        }
        .background(Theme.appBackground)
        .navigationTitle("Plans")
    }
}

private struct PlanCardView: View {
    let plan: NutritionPlan

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(alignment: .top) {
                Text(plan.icon)
                    .font(.system(size: 34))
                    .frame(width: 52, height: 52)
                    .background(Theme.softBackground.opacity(0.8))
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 7) {
                        Text(plan.categoryLabel.uppercased())
                            .font(.caption2.weight(.semibold))
                            .foregroundColor(Theme.sage)
                        Text(plan.isComplete ? "Complet" : "À compléter")
                            .font(.caption2.weight(.semibold))
                            .foregroundColor(plan.isComplete ? Theme.sage : Theme.terracotta)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background((plan.isComplete ? Theme.sage : Theme.terracotta).opacity(0.12))
                            .clipShape(Capsule())
                    }

                    Text(plan.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                        .fixedSize(horizontal: false, vertical: true)
                }

                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.bold))
                    .foregroundColor(.secondary)
            }

            Text(plan.description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(3)
                .lineSpacing(2)

            HStack(spacing: 10) {
                PlanMiniInfo(icon: "calendar", text: "\(plan.durationWeeks) sem.")
                PlanMiniInfo(icon: "flame", text: "\(plan.caloriesTarget) kcal/j")
                if let collection = plan.recipeCollection {
                    PlanMiniInfo(icon: "fork.knife", text: collection)
                }
            }
        }
        .padding(18)
        .background(Theme.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Theme.hairline)
        )
    }
}

private struct PlanDetailView: View {
    let plan: NutritionPlan
    @State private var expandedWeek: String?

    private var linkedRecipes: [Recipe] {
        Array(PlanData.recipes(for: plan).prefix(3))
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 16) {
                    HStack(alignment: .top) {
                        Text(plan.icon)
                            .font(.system(size: 46))
                        Spacer()
                        Text(plan.isComplete ? "Plan complet" : "Structure prête")
                            .font(.caption.weight(.semibold))
                            .foregroundColor(plan.isComplete ? Theme.sage : Theme.terracotta)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 7)
                            .background(.ultraThinMaterial)
                            .clipShape(Capsule())
                    }

                    Text(plan.title)
                        .font(.system(size: 34, weight: .semibold, design: .serif))
                        .lineSpacing(2)

                    Text(plan.description)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(3)

                    HStack(spacing: 10) {
                        PlanMiniInfo(icon: "calendar", text: "\(plan.durationWeeks) semaines")
                        PlanMiniInfo(icon: "flame", text: "\(plan.caloriesTarget) kcal/j")
                    }
                }
                .padding(20)
                .background(Theme.heroGradient)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))

                SectionCardView("Bénéfices") {
                    VStack(alignment: .leading, spacing: 10) {
                        ForEach(plan.benefits, id: \.self) { benefit in
                            Label(benefit, systemImage: "checkmark.circle.fill")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                    }
                }

                SectionCardView("Conseil") {
                    Text(plan.tips)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(3)
                }

                if plan.weeks.isEmpty {
                    SectionCardView("Contenu à venir") {
                        Text("La carte du plan est déjà prête dans l’app. Il suffira de mettre à jour les données du site, puis de resynchroniser l’app quand le contenu sera rempli.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .lineSpacing(3)
                    }
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Semaines")
                            .font(.title3.weight(.semibold))
                        ForEach(plan.weeks) { week in
                            PlanWeekCard(
                                week: week,
                                isExpanded: expandedWeek == week.id
                            ) {
                                withAnimation(.spring(response: 0.3, dampingFraction: 0.85)) {
                                    expandedWeek = expandedWeek == week.id ? nil : week.id
                                }
                                HapticsManager.selection()
                            }
                        }
                    }
                }

                if !linkedRecipes.isEmpty {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Recettes liées")
                            .font(.title3.weight(.semibold))
                        ForEach(linkedRecipes) { recipe in
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

private struct PlanWeekCard: View {
    let week: PlanWeek
    let isExpanded: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Semaine \(week.number)")
                            .font(.caption.weight(.semibold))
                            .foregroundColor(Theme.sage)
                        Text(week.title)
                            .font(.headline)
                            .foregroundColor(.primary)
                    }
                    Spacer()
                    Image(systemName: "chevron.down")
                        .font(.caption.weight(.bold))
                        .foregroundColor(.secondary)
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }

                Text(week.objective)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(isExpanded ? nil : 2)
                    .fixedSize(horizontal: false, vertical: true)

                if isExpanded {
                    Divider()
                    PlanWeekBlock(title: "Habitudes", lines: week.habits)
                    PlanWeekText(title: "Nutrition", text: week.nutrition)
                    PlanWeekText(title: "Activité", text: week.activity)
                    PlanWeekBlock(title: "Checklist", lines: week.checklist)
                    PlanWeekText(title: "Astuce", text: week.tip)
                }
            }
            .padding(16)
            .background(Theme.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Theme.hairline)
            )
        }
        .buttonStyle(.plain)
    }
}

private struct PlanMiniInfo: View {
    let icon: String
    let text: String

    var body: some View {
        Label(text, systemImage: icon)
            .font(.caption.weight(.medium))
            .lineLimit(1)
            .minimumScaleFactor(0.75)
            .foregroundColor(.secondary)
            .padding(.horizontal, 10)
            .padding(.vertical, 7)
            .background(Theme.softBackground.opacity(0.75))
            .clipShape(Capsule())
    }
}

private struct PlanWeekBlock: View {
    let title: String
    let lines: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundColor(Theme.sage)
            ForEach(lines, id: \.self) { line in
                Label(line, systemImage: "circle.fill")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

private struct PlanWeekText: View {
    let title: String
    let text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundColor(Theme.sage)
            Text(text)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineSpacing(2)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

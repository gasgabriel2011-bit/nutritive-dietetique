import Foundation

struct Recipe: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let imageURL: URL?
    let category: String
    let collection: String
    let prepTime: Int
    let cookTime: Int
    let restTime: Int
    let cookingMethod: String
    let temperature: String?
    let equipment: [String]
    let ingredients: [String]
    let steps: [String]
    let tip: String
    let calories: Int?
    let proteins: Int?
    let carbs: Int?
    let fats: Int?
    let servings: Int
    let difficulty: String
    let tags: [String]
    let isMealPrep: Bool

    var totalTime: Int { prepTime + cookTime + restTime }
    var isNoCook: Bool { cookTime == 0 }

    init(
        id: String,
        title: String,
        description: String = "",
        imageURL: URL?,
        category: String,
        collection: String = "Essentiel",
        prepTime: Int,
        cookTime: Int,
        restTime: Int = 0,
        cookingMethod: String = "",
        temperature: String? = nil,
        equipment: [String] = [],
        ingredients: [String],
        steps: [String],
        tip: String,
        calories: Int? = nil,
        proteins: Int? = nil,
        carbs: Int? = nil,
        fats: Int? = nil,
        servings: Int = 1,
        difficulty: String = "facile",
        tags: [String] = [],
        isMealPrep: Bool = false
    ) {
        self.id = id
        self.title = title
        self.description = description
        self.imageURL = imageURL
        self.category = category
        self.collection = collection
        self.prepTime = prepTime
        self.cookTime = cookTime
        self.restTime = restTime
        self.cookingMethod = cookingMethod
        self.temperature = temperature
        self.equipment = equipment
        self.ingredients = ingredients
        self.steps = steps
        self.tip = tip
        self.calories = calories
        self.proteins = proteins
        self.carbs = carbs
        self.fats = fats
        self.servings = servings
        self.difficulty = difficulty
        self.tags = tags
        self.isMealPrep = isMealPrep
    }
}

struct BlogArticle: Identifiable, Hashable {
    let id: String
    let title: String
    let excerpt: String
    let content: String
    let category: String
    let categoryLabel: String
    let readTime: Int
}

struct NutritionPlan: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let category: String
    let categoryLabel: String
    let icon: String
    let durationWeeks: Int
    let caloriesTarget: Int
    let benefits: [String]
    let tips: String
    let isComplete: Bool
    let recipeCollection: String?
    let weeks: [PlanWeek]
}

struct PlanWeek: Identifiable, Hashable {
    let id: String
    let number: Int
    let title: String
    let objective: String
    let habits: [String]
    let nutrition: String
    let activity: String
    let checklist: [String]
    let tip: String
}

struct TrackingEntry: Identifiable, Codable, Hashable {
    var id: String { date }
    var date: String
    var weight: String
    var water: Int
    var sleep: SleepEntry
    var meals: String
    var energy: Int
    var mood: Int
    var saved: Bool
    var updatedAt: String

    static func today(date: Date = Date()) -> TrackingEntry {
        TrackingEntry(
            date: TrackingEntry.dateID(for: date),
            weight: "",
            water: 0,
            sleep: SleepEntry(),
            meals: "",
            energy: 2,
            mood: 2,
            saved: false,
            updatedAt: ISO8601DateFormatter().string(from: date)
        )
    }

    static func dateID(for date: Date) -> String {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = .current
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }
}

struct SleepEntry: Codable, Hashable {
    var bedtime: String = ""
    var waketime: String = ""
    var interruptions: [SleepInterruption] = []
}

struct SleepInterruption: Codable, Hashable {
    var start: String = ""
    var end: String = ""
}

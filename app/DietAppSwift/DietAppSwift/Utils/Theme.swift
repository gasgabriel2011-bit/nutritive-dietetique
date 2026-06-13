import SwiftUI

enum Theme {
    static let sage = Color(red: 0.39, green: 0.45, blue: 0.31)
    static let sageLight = Color(red: 0.75, green: 0.80, blue: 0.67)
    static let terracotta = Color(red: 0.78, green: 0.55, blue: 0.39)
    static let amber = Color(red: 0.86, green: 0.70, blue: 0.38)
    static let sea = Color(red: 0.36, green: 0.55, blue: 0.57)
    static let cream = Color(red: 0.97, green: 0.95, blue: 0.91)
    static let ink = Color(red: 0.18, green: 0.20, blue: 0.18)

    static var appBackground: Color {
        Color(uiColor: .systemGroupedBackground)
    }

    static var softBackground: Color {
        Color(uiColor: .secondarySystemBackground)
    }

    static var cardBackground: Color {
        Color(uiColor: .secondarySystemGroupedBackground)
    }

    static var hairline: Color {
        Color.primary.opacity(0.08)
    }

    static let heroGradient = LinearGradient(
        colors: [cream, sageLight.opacity(0.32), sea.opacity(0.16)],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

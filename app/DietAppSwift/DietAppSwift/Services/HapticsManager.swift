import UIKit

enum HapticsManager {
    static func selection() {
        guard UserDefaults.standard.object(forKey: "dietappswift.hapticsEnabled") as? Bool ?? true else { return }
        UISelectionFeedbackGenerator().selectionChanged()
    }

    static func lightImpact() {
        guard UserDefaults.standard.object(forKey: "dietappswift.hapticsEnabled") as? Bool ?? true else { return }
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }

    static func success() {
        guard UserDefaults.standard.object(forKey: "dietappswift.hapticsEnabled") as? Bool ?? true else { return }
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }
}

# DietAppSwift

Application iOS native SwiftUI séparée du site web NutriVie.

## Ouvrir dans Xcode

1. Ouvrir `DietAppSwift.xcodeproj` dans Xcode.
2. Sélectionner le schéma `DietAppSwift`.
3. Choisir un simulateur iPhone ou un iPhone connecté.
4. Lancer l'app.

Le projet vise iOS 16 avec SwiftUI compatible Xcode 14. Il utilise `NavigationView`, `TabView`, `AsyncImage`, `UserDefaults` et des retours haptiques UIKit simples.

## Notes

- Les images de recettes reprennent les URLs utilisées par le site, car les photos de recettes du projet web sont principalement distantes.
- Les favoris sont sauvegardés localement avec `UserDefaults`.
- La vérification locale par `xcodebuild` a reconnu la cible et le schéma, mais la compilation complète a été bloquée dans l'environnement Codex par `actool`/CoreSimulator. À vérifier directement dans Xcode sur la machine.

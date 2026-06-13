import SwiftUI

struct RecipeImageView: View {
    let url: URL?
    let height: CGFloat

    var body: some View {
        AsyncImage(url: url) { phase in
            switch phase {
            case .success(let image):
                image
                    .resizable()
                    .scaledToFill()
                    .transition(.opacity)
            case .failure(_):
                ZStack {
                    Theme.heroGradient
                    Image(systemName: "fork.knife")
                        .font(.title)
                        .foregroundColor(Theme.sage)
                }
            case .empty:
                ZStack {
                    Theme.heroGradient
                    ProgressView()
                        .tint(Theme.sage)
                }
            @unknown default:
                Theme.softBackground
            }
        }
        .frame(height: height)
        .clipped()
    }
}

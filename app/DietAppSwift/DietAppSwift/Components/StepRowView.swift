import SwiftUI

struct StepRowView: View {
    let number: Int
    let text: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(number)")
                .font(.footnote.weight(.bold))
                .foregroundColor(.white)
                .frame(width: 28, height: 28)
                .background(Theme.sage)
                .clipShape(Circle())
            Text(text)
                .font(.subheadline)
                .lineSpacing(3)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

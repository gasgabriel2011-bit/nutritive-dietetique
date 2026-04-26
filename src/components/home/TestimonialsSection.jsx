import AnimatedSection from '../ui/AnimatedSection';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie M.',
    text: "Grâce à NutriVie, j'ai enfin trouvé un équilibre alimentaire durable. Pas de frustration, juste du bon sens et de la bienveillance.",
    role: 'Perte de 8kg en 4 mois',
    rating: 5,
  },
  {
    name: 'Thomas L.',
    text: "Les plans alimentaires sont vraiment adaptés à mon rythme de vie d'étudiant. Simple, efficace et délicieux.",
    role: 'Rééquilibrage alimentaire',
    rating: 5,
  },
  {
    name: 'Marie D.',
    text: "Le suivi nutrition m'aide à rester motivée au quotidien. Les recettes sont un vrai bonheur à préparer.",
    role: 'Santé digestive',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-light text-foreground mb-4">
            Ce qu'en disent nos <span className="italic font-semibold text-primary">patients</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des résultats durables, des témoignages sincères
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15}>
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
                <Quote className="w-8 h-8 text-secondary/40 mb-4 group-hover:text-secondary transition-colors" />
                <p className="text-foreground/80 leading-relaxed flex-1 mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
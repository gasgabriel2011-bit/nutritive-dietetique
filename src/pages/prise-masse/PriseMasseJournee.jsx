import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { PRISE_MASSE_DAY } from '../../lib/priseMasseData';

export default function PriseMasseJournee() {
  const day = PRISE_MASSE_DAY;

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/prise-masse-propre" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Journée type <span className="italic font-semibold text-secondary">2800 kcal</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Répartition optimale pour la prise de masse propre : 5 à 6 prises alimentaires.</p>
        </AnimatedSection>

        {/* Hero image */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="relative rounded-3xl overflow-hidden h-48 sm:h-64">
            <img src={day.image} alt="Journée prise de masse" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent flex items-end p-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-primary-foreground">{day.label}</h2>
                <p className="text-sm text-primary-foreground/80">{day.subtitle}</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-secondary/90 text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-full">
              {day.totalKcal} kcal
            </div>
          </div>
        </AnimatedSection>

        {/* Meals */}
        <div className="space-y-4">
          {day.meals.map((meal, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meal.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm">{meal.name}</h3>
                      <p className="text-xs text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  {meal.kcal > 0 && (
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">{meal.kcal} kcal</span>
                  )}
                </div>
                <ul className="space-y-1 mb-3">
                  {meal.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-secondary shrink-0 mt-0.5">•</span>{item}
                    </li>
                  ))}
                </ul>
                {meal.alt && (
                  <p className="text-xs text-muted-foreground bg-muted/60 rounded-xl px-3 py-2">
                    🔄 Alternative végétarienne : {meal.alt}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="mt-8">
          <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5">
            <p className="text-sm font-semibold text-secondary mb-2">📊 Répartition macronutriments indicative</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[['Protéines', '~160g', '23%'], ['Glucides', '~330g', '47%'], ['Lipides', '~90g', '30%']].map(([n, v, p]) => (
                <div key={n} className="bg-card rounded-xl p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground">{n}</p>
                  <p className="font-bold text-foreground">{v}</p>
                  <p className="text-xs text-secondary">{p}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ⚠️ Ces valeurs sont indicatives. Votre répartition idéale dépend de votre poids, activité et tolérance digestive.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
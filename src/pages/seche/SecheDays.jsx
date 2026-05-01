import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { DAY_PLANS } from '../../lib/secheData';

export default function SecheDays() {
  const [selected, setSelected] = useState('a');
  const plan = DAY_PLANS.find(d => d.id === selected);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/seche-progressive" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Journées <span className="italic font-semibold text-primary">types</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            5 journées types différentes pour varier et ne jamais s'ennuyer. Choisissez en fonction de votre situation du jour.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {DAY_PLANS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selected === d.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border text-foreground/70 hover:border-primary/30'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {plan && (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden mb-8 h-52 sm:h-64">
              <img src={plan.image} alt={plan.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-5 text-primary-foreground">
                <p className="font-display text-xl font-semibold">{plan.label}</p>
                <p className="text-sm opacity-90">{plan.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold">{plan.totalKcal} kcal</span>
              </div>
            </div>

            {/* Meals */}
            <div className="space-y-4">
              {plan.meals.map((meal, i) => (
                <AnimatedSection key={meal.name} delay={i * 0.06}>
                  <div className="bg-card rounded-2xl p-5 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meal.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{meal.name}</p>
                          <p className="text-xs text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      {meal.kcal > 0 && (
                        <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                          {meal.kcal} kcal
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {meal.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary shrink-0 mt-0.5">•</span>{item}
                        </li>
                      ))}
                    </ul>
                    {meal.alt && (
                      <div className="bg-muted/60 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">💡 Alternative : </span>{meal.alt}
                        </p>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-8 bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground">
                Ces journées sont des <strong>exemples indicatifs</strong>. Variez les sources de protéines et les légumes selon vos goûts et votre saison.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
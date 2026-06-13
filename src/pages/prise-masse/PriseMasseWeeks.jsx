import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { PRISE_MASSE_WEEKS } from '../../lib/priseMasseData';

export default function PriseMasseWeeks() {
  const [openWeek, setOpenWeek] = useState(null);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/prise-masse-propre" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Programme <span className="italic font-semibold text-secondary">12 semaines</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Cliquez sur chaque semaine pour afficher les détails complets.</p>
        </AnimatedSection>

        <div className="space-y-3">
          {PRISE_MASSE_WEEKS.map((week, i) => (
            <AnimatedSection key={week.num} delay={i * 0.04}>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <button
                  onClick={() => setOpenWeek(openWeek === week.num ? null : week.num)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center shrink-0`}>
                      <span className="font-bold text-sm text-foreground">{week.num}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{week.title}</p>
                      <p className="text-xs text-muted-foreground">{week.objective}</p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: openWeek === week.num ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground text-lg leading-none shrink-0 ml-4"
                  >›</motion.span>
                </button>

                <AnimatePresence>
                  {openWeek === week.num && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border/30 pt-4 space-y-5">
                        {/* Habitudes */}
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Habitudes</h3>
                          <ul className="space-y-1">
                            {week.habits.map((h, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm">
                                <span className="text-secondary shrink-0 mt-0.5">•</span>
                                <span className="text-foreground">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nutrition */}
                        <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">🍽️ Nutrition</h3>
                          <p className="text-sm text-foreground mb-2">{week.nutrition}</p>
                          <ul className="space-y-1">
                            {week.nutritionDetail.map((d, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="shrink-0 mt-0.5">→</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Repas exemple */}
                        {week.mealExample && (
                          <div className="bg-muted/50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-foreground mb-1">Exemple de repas</p>
                            <p className="text-xs text-muted-foreground">{week.mealExample}</p>
                          </div>
                        )}

                        {/* Sport */}
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">💪 Sport</h3>
                          <p className="text-sm text-foreground mb-2">{week.activity}</p>
                          <ul className="space-y-1">
                            {week.activityDetail.map((d, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="shrink-0 mt-0.5">→</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Checklist */}
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">✅ Check-list</h3>
                          <div className="flex flex-wrap gap-2">
                            {week.checklist.map((c, j) => (
                              <span key={j} className="px-3 py-1 rounded-full bg-muted text-xs text-foreground/80">{c}</span>
                            ))}
                          </div>
                        </div>

                        {/* Tip */}
                        <div className="bg-secondary/5 border border-secondary/15 rounded-xl p-3">
                          <p className="text-sm text-foreground"><span className="font-semibold">💡 </span>{week.tip}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { WEEKS } from '../../lib/secheData';

export default function SecheWeeks() {
  const [expandedWeek, setExpandedWeek] = useState(null);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/seche-progressive" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Programme <span className="italic font-semibold text-primary">semaine par semaine</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Cliquez sur chaque semaine pour découvrir en détail les habitudes, conseils nutrition et activité physique.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {WEEKS.map((week, i) => (
            <AnimatedSection key={week.num} delay={i * 0.04}>
              <div className={`rounded-3xl border border-border/50 overflow-hidden bg-gradient-to-r ${week.color} bg-card`}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpandedWeek(expandedWeek === week.num ? null : week.num)}
                >
                  <div className="flex items-center gap-5">
                    <span className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      S{week.num}
                    </span>
                    <div>
                      <p className="font-semibold text-base">{week.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{week.objective}</p>
                    </div>
                  </div>
                  {expandedWeek === week.num
                    ? <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>

                <AnimatePresence>
                  {expandedWeek === week.num && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border/40 space-y-6">
                        {/* Habitudes */}
                        <div className="pt-5">
                          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">🎯 Habitudes de la semaine</h3>
                          <ul className="space-y-2">
                            {week.habits.map((h, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                                <span className="text-foreground">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nutrition détaillée */}
                        <div className="bg-card rounded-2xl p-5 border border-border/50">
                          <h3 className="text-xs font-bold uppercase tracking-wider mb-3">🥦 Nutrition</h3>
                          <p className="text-sm text-muted-foreground mb-3">{week.nutrition}</p>
                          {week.nutritionDetail && (
                            <ul className="space-y-2">
                              {week.nutritionDetail.map((point, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-0.5 shrink-0">•</span>{point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Activité détaillée */}
                        <div className="bg-card rounded-2xl p-5 border border-border/50">
                          <h3 className="text-xs font-bold uppercase tracking-wider mb-3">🏃 Activité physique</h3>
                          <p className="text-sm text-muted-foreground mb-3">{week.activity}</p>
                          {week.activityDetail && (
                            <ul className="space-y-2">
                              {week.activityDetail.map((point, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-secondary mt-0.5 shrink-0">•</span>{point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Check-list */}
                        <div>
                          <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">✅ Check-list de la semaine</h3>
                          <div className="flex flex-wrap gap-2">
                            {week.checklist.map((c, j) => (
                              <span key={j} className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tip */}
                        {week.tip && (
                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <p className="text-sm text-foreground"><span className="font-semibold">💡 </span>{week.tip}</p>
                          </div>
                        )}
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
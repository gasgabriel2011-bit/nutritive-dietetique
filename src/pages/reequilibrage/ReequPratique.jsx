import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { REEQUILIBRAGE_PRATIQUE } from '../../lib/reequilibrageData';

export default function ReequPratique() {
  const [selected, setSelected] = useState(null);
  const tip = REEQUILIBRAGE_PRATIQUE.find(t => t.title === selected);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/reequilibrage-alimentaire" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Conseils <span className="italic font-semibold text-primary">pratiques</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Cliquez sur chaque carte pour des conseils concrets et approfondis.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {REEQUILIBRAGE_PRATIQUE.map((tip, i) => (
            <AnimatedSection key={tip.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setSelected(tip.title)}
                className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tip.icon}</span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{tip.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
                <p className="mt-4 text-primary text-xs font-medium">En savoir plus →</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && tip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-xl my-8 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{tip.icon}</span>
                    <h2 className="font-display text-2xl font-semibold text-foreground">{tip.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors shrink-0 ml-4">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tip.detail.intro}</p>
                <div className="bg-muted/50 rounded-2xl p-4 mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Points clés</h3>
                  <ul className="space-y-2">
                    {tip.detail.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary shrink-0 mt-0.5">•</span>
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {tip.detail.example && (
                  <div className="bg-secondary/10 rounded-2xl p-4 mb-5 border border-secondary/20">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Exemple concret</h3>
                    <p className="text-sm text-muted-foreground">{tip.detail.example}</p>
                  </div>
                )}
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                  <p className="text-sm text-foreground"><span className="font-semibold">💡 </span>{tip.detail.tip}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
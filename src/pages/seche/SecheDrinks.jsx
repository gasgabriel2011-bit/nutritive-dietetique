import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { DRINKS } from '../../lib/secheData';

export default function SecheDrinks() {
  const [selected, setSelected] = useState(null);
  const drink = DRINKS.find(d => d.name === selected);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/seche-progressive" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Boissons <span className="italic font-semibold text-primary">conseillées</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            L'hydratation est aussi importante que l'alimentation. Cliquez sur chaque boisson pour en savoir plus.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4">
          {DRINKS.map((d, i) => (
            <AnimatedSection key={d.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => setSelected(d.name)}
                className={`bg-card rounded-2xl p-5 border cursor-pointer group hover:shadow-lg transition-all duration-300 ${
                  d.ok === false ? 'border-destructive/40 hover:border-destructive/60' :
                  d.ok === null ? 'border-secondary/40 hover:border-secondary/60' :
                  'border-border/50 hover:border-primary/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{d.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">{d.name}</p>
                      {d.ok === true && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">✓ Recommandé</span>}
                      {d.ok === false && <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">✗ À éviter</span>}
                      {d.ok === null && <span className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">⚠ Occasionnel</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{d.rec}</p>
                  </div>
                </div>
                <p className="text-xs text-primary mt-3 font-medium">En savoir plus →</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && drink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{drink.icon}</span>
                    <div>
                      <h2 className="font-display text-xl font-semibold">{drink.name}</h2>
                      <p className="text-xs text-muted-foreground">{drink.rec}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors ml-4 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{drink.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
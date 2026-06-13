import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { PRISE_MASSE_DRINKS } from '../../lib/priseMasseData';

export default function PriseMasseBoissons() {
  const [selected, setSelected] = useState(null);
  const drink = PRISE_MASSE_DRINKS.find(d => d.name === selected);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/prise-masse-propre" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Boissons <span className="italic font-semibold text-secondary">conseillées</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Cliquez sur chaque boisson pour les détails.</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRISE_MASSE_DRINKS.map((d, i) => (
            <AnimatedSection key={d.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => setSelected(d.name)}
                className={`rounded-3xl p-5 border cursor-pointer transition-all duration-300 hover:shadow-xl group ${
                  d.ok === true ? 'bg-card border-primary/20 hover:border-primary/40' :
                  d.ok === false ? 'bg-card border-destructive/20 hover:border-destructive/40 opacity-80' :
                  'bg-card border-border/50 hover:border-secondary/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{d.icon}</span>
                  <div>
                    <h3 className={`font-semibold text-sm mb-1 group-hover:text-secondary transition-colors ${d.ok === false ? 'line-through text-muted-foreground' : ''}`}>{d.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.rec}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-medium text-secondary">Détails →</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && drink && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{drink.icon}</span>
                    <h2 className="font-display text-2xl font-semibold">{drink.name}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-secondary mb-3">{drink.rec}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{drink.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

export default function PlanSport({ tips, backTo, title }) {
  const [selected, setSelected] = useState(null);
  const tip = tips.find(t => t.title === selected);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            <span className="italic font-semibold text-primary">{title || 'Conseils sport'}</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Cliquez sur chaque conseil pour les détails.</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {tips.map((t, i) => (
            <AnimatedSection key={t.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -3 }} onClick={() => setSelected(t.title)}
                className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{t.icon}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors mb-1">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
                <p className="mt-3 text-primary text-xs font-medium">En savoir plus →</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && tip && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-xl my-8 overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{tip.icon}</span>
                    <h2 className="font-display text-2xl font-semibold">{tip.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors ml-4 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tip.detail.intro}</p>
                <div className="bg-muted/50 rounded-2xl p-4 mb-4">
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
                <div className="bg-primary/10 rounded-2xl p-4 mb-4 border border-primary/20">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Exemple concret</h3>
                  <p className="text-sm text-muted-foreground">{tip.detail.example}</p>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-4 border border-secondary/10">
                  <p className="text-sm"><span className="font-semibold">💡 </span>{tip.detail.tip}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
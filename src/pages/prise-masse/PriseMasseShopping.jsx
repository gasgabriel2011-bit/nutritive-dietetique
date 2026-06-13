import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { PRISE_MASSE_SHOPPING } from '../../lib/priseMasseData';

const STORAGE_KEY = 'nutrivie_prise_masse_shopping';

function flatItems() {
  return PRISE_MASSE_SHOPPING.flatMap((cat, ci) => cat.items.map((item, ii) => `${ci}_${ii}`));
}

export default function PriseMasseShopping() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  const toggle = (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const reset = () => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const total = flatItems().length;
  const done = flatItems().filter(k => checked[k]).length;
  const progress = Math.round((done / total) * 100);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/prise-masse-propre" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-2">
                Liste de <span className="italic font-semibold text-secondary">courses</span>
              </h1>
              <p className="text-sm text-muted-foreground">Cochez les articles au fur et à mesure.</p>
            </div>
            <button onClick={reset} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary transition-colors mt-2">
              <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
            </button>
          </div>

          {/* Progress bar */}
          <div className="bg-card rounded-2xl p-5 border border-border/50 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{done}/{total} articles cochés</span>
              <span className="text-secondary font-semibold">{progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {PRISE_MASSE_SHOPPING.map((cat, ci) => (
            <AnimatedSection key={ci} delay={ci * 0.04}>
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <h2 className="font-semibold text-sm mb-4">{cat.cat}</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cat.items.map((item, ii) => {
                    const key = `${ci}_${ii}`;
                    return (
                      <button
                        key={ii}
                        onClick={() => toggle(key)}
                        className={`flex items-center gap-3 text-xs text-left px-3 py-2 rounded-xl transition-all hover:bg-muted/50 ${checked[key] ? 'opacity-50' : ''}`}
                      >
                        <span className={`w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all ${checked[key] ? 'bg-secondary border-secondary' : 'border-muted-foreground'}`}>
                          {checked[key] && <span className="text-secondary-foreground text-xs">✓</span>}
                        </span>
                        <span className={checked[key] ? 'line-through text-muted-foreground' : 'text-foreground'}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-8">
          <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5">
            <p className="text-sm font-semibold text-secondary mb-2">💡 Conseils courses</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Achetez les protéines en gros et congelez les portions non utilisées.</li>
              <li>• Le riz complet et l\'avoine se gardent 6-12 mois dans un bocal hermétique.</li>
              <li>• Les beurres d\'oléagineux (amande, cacahuète) : durée de conservation 3-6 mois.</li>
              <li>• Achetez les bananes à différents stades de maturité pour étaler la consommation.</li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

export default function PlanShopping({ shopping, backTo, storageKey }) {
  const flatItems = () => shopping.flatMap((cat, ci) => cat.items.map((_, ii) => `${ci}_${ii}`));

  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  });

  const toggle = (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const reset = () => { setChecked({}); localStorage.removeItem(storageKey); };

  const total = flatItems().length;
  const done = flatItems().filter(k => checked[k]).length;
  const progress = Math.round((done / total) * 100);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-2">
                Liste de <span className="italic font-semibold text-primary">courses</span>
              </h1>
              <p className="text-sm text-muted-foreground">Cochez au fur et à mesure.</p>
            </div>
            <button onClick={reset} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mt-2">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border/50 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{done}/{total} articles</span>
              <span className="text-primary font-semibold">{progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {shopping.map((cat, ci) => (
            <AnimatedSection key={ci} delay={ci * 0.04}>
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <h2 className="font-semibold text-sm mb-4">{cat.cat}</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cat.items.map((item, ii) => {
                    const key = `${ci}_${ii}`;
                    return (
                      <button key={ii} onClick={() => toggle(key)}
                        className={`flex items-center gap-3 text-xs text-left px-3 py-2 rounded-xl transition-all hover:bg-muted/50 ${checked[key] ? 'opacity-50' : ''}`}>
                        <span className={`w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all ${checked[key] ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                          {checked[key] && <span className="text-primary-foreground text-xs">✓</span>}
                        </span>
                        <span className={checked[key] ? 'line-through text-muted-foreground' : ''}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
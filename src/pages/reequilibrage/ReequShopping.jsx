import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Square, ShoppingCart } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { REEQUILIBRAGE_SHOPPING } from '../../lib/reequilibrageData';

const STORAGE_KEY = 'nutrivie_reequilibrage_shopping';

export default function ReequShopping() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  const toggle = (cat, item) => {
    const key = `${cat}__${item}`;
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isChecked = (cat, item) => !!checked[`${cat}__${item}`];
  const totalItems = REEQUILIBRAGE_SHOPPING.reduce((acc, c) => acc + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/reequilibrage-alimentaire" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">
              Liste de <span className="italic font-semibold text-primary">courses</span>
            </h1>
            <button onClick={() => { setChecked({}); localStorage.removeItem(STORAGE_KEY); }} className="text-xs text-muted-foreground hover:text-destructive transition-colors underline">
              Tout décocher
            </button>
          </div>
          <p className="text-muted-foreground mb-3">Liste hebdomadaire complète du programme. Cochez au fur et à mesure.</p>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }} />
            </div>
            <span className="text-sm font-medium text-primary whitespace-nowrap">{checkedCount}/{totalItems}</span>
          </div>
        </AnimatedSection>

        <div className="space-y-5">
          {REEQUILIBRAGE_SHOPPING.map((cat, ci) => (
            <AnimatedSection key={cat.cat} delay={ci * 0.05}>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30 bg-muted/30">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm">{cat.cat}</h2>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {cat.items.filter(item => isChecked(cat.cat, item)).length}/{cat.items.length}
                  </span>
                </div>
                <ul className="divide-y divide-border/20">
                  {cat.items.map((item, ii) => (
                    <li key={ii}>
                      <button
                        onClick={() => toggle(cat.cat, item)}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-muted/40 transition-colors"
                      >
                        {isChecked(cat.cat, item)
                          ? <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                          : <Square className="w-4 h-4 text-muted-foreground shrink-0" />}
                        <span className={`text-sm ${isChecked(cat.cat, item) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-10 bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-foreground">Astuce :</strong> Faites vos courses le <strong>samedi</strong> et préparez 2-3 repas le <strong>dimanche</strong> pour une semaine sereine.
          </p>
        </div>
      </div>
    </div>
  );
}
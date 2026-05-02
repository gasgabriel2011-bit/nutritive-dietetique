import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';

const STORAGE_KEY = 'nutrivie_reequilibrage_suivi';
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const CHECKS = [
  ['meals', '🍽️ 3 repas structurés'],
  ['veggies', '🥦 Portion de légumes ajoutée'],
  ['water', '💧 Hydratation suffisante'],
  ['slow', '🐌 Mangé lentement'],
  ['nosnack', '🚫 Pas de grignotage automatique'],
];

export default function ReequSuivi() {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  const save = (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const toggle = (dayIdx, field) => {
    save({ ...data, [`${dayIdx}_${field}`]: !data[`${dayIdx}_${field}`] });
  };
  const setEnergy = (dayIdx, val) => save({ ...data, [`${dayIdx}_energy`]: val });
  const setDigestion = (dayIdx, val) => save({ ...data, [`${dayIdx}_digestion`]: val });
  const setNote = (dayIdx, val) => save({ ...data, [`${dayIdx}_note`]: val });

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/reequilibrage-alimentaire" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Mon <span className="italic font-semibold text-primary">suivi rééquilibrage</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Vos données sont sauvegardées localement sur votre appareil, en toute confidentialité.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DAYS.map((day, idx) => (
            <AnimatedSection key={day} delay={idx * 0.05}>
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-center text-primary">{day}</h3>
                <div className="space-y-2">
                  {CHECKS.map(([field, label]) => (
                    <button
                      key={field}
                      onClick={() => toggle(idx, field)}
                      className="w-full flex items-center gap-2 text-xs text-left hover:opacity-80 transition-opacity"
                    >
                      <span className={`w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all ${data[`${idx}_${field}`] ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                        {data[`${idx}_${field}`] && <span className="text-primary-foreground text-xs">✓</span>}
                      </span>
                      <span className={data[`${idx}_${field}`] ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                    </button>
                  ))}

                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-1.5">⚡ Énergie</p>
                    <div className="flex gap-1">
                      {['😔', '🙂', '🤩'].map((e, ei) => (
                        <button
                          key={ei}
                          onClick={() => setEnergy(idx, ei)}
                          className={`flex-1 py-1 rounded-lg text-sm transition-all ${data[`${idx}_energy`] === ei ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted hover:bg-muted/60'}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">🌿 Digestion</p>
                    <div className="flex gap-1">
                      {['😣', '😐', '😊'].map((e, ei) => (
                        <button
                          key={ei}
                          onClick={() => setDigestion(idx, ei)}
                          className={`flex-1 py-1 rounded-lg text-sm transition-all ${data[`${idx}_digestion`] === ei ? 'bg-secondary/20 ring-2 ring-secondary/30' : 'bg-muted hover:bg-muted/60'}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Commentaire..."
                    value={data[`${idx}_note`] || ''}
                    onChange={e => setNote(idx, e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-muted border-0 outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const IMC_ZONES = [
  { label: 'Maigreur sévère', min: 0, max: 16, color: '#93c5fd' },
  { label: 'Maigreur', min: 16, max: 18.5, color: '#6ee7b7' },
  { label: 'Poids normal', min: 18.5, max: 25, color: '#86efac' },
  { label: 'Surpoids', min: 25, max: 30, color: '#fde68a' },
  { label: 'Obésité modérée', min: 30, max: 35, color: '#fca5a5' },
  { label: 'Obésité sévère', min: 35, max: 50, color: '#f87171' },
];

const IMC_MIN = 14;
const IMC_MAX = 42;

function getZone(imc) {
  return IMC_ZONES.find(z => imc >= z.min && imc < z.max) || IMC_ZONES[IMC_ZONES.length - 1];
}

function getBarPosition(imc) {
  const clamped = Math.min(Math.max(imc, IMC_MIN), IMC_MAX);
  return ((clamped - IMC_MIN) / (IMC_MAX - IMC_MIN)) * 100;
}

function getGradient() {
  // Smooth gradient from blue → green → yellow → orange → red
  return 'linear-gradient(to right, #93c5fd 0%, #6ee7b7 18%, #86efac 32%, #86efac 52%, #fde68a 62%, #fca5a5 75%, #f87171 100%)';
}

export default function IMCCalculator() {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [imc, setImc] = useState(null);
  const [zone, setZone] = useState(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    const val = w / (h * h);
    const rounded = Math.round(val * 10) / 10;
    setImc(rounded);
    setZone(getZone(rounded));
  };

  const reset = () => {
    setImc(null);
    setZone(null);
    setHeight('');
    setWeight('');
    setAge('');
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
            <span className="text-lg">📏</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Calculateur d'IMC</p>
            <p className="text-xs text-muted-foreground">Optionnel — calculez rapidement votre IMC</p>
          </div>
        </div>
        <span className="text-muted-foreground text-lg leading-none">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-border/30 pt-4">
          {!imc ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Taille (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    placeholder="170"
                    className="w-full px-3 py-2 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Poids (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full px-3 py-2 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Âge</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="30"
                    className="w-full px-3 py-2 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <button
                onClick={calculate}
                disabled={!height || !weight}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-40"
              >
                Calculer mon IMC
              </button>
              <p className="text-xs text-muted-foreground text-center">
                L'IMC est un indicateur parmi d'autres. Il ne tient pas compte de la composition corporelle.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Result */}
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{imc}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: zone?.color }}>
                  {zone?.label}
                </p>
              </div>

              {/* Gradient bar */}
              <div className="relative">
                <div
                  className="h-4 rounded-full w-full"
                  style={{ background: getGradient() }}
                />
                {/* Marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-foreground border-2 border-card shadow-lg transition-all duration-500"
                  style={{ left: `${getBarPosition(imc)}%` }}
                />
                {/* Labels */}
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">14</span>
                  <span className="text-xs text-muted-foreground font-medium text-primary">18.5 – 25 ✓</span>
                  <span className="text-xs text-muted-foreground">42</span>
                </div>
              </div>

              {/* Zones legend */}
              <div className="grid grid-cols-2 gap-1.5">
                {IMC_ZONES.map(z => (
                  <div
                    key={z.label}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs transition-all ${zone?.label === z.label ? 'ring-2 ring-foreground/30 font-semibold' : 'opacity-60'}`}
                    style={{ backgroundColor: z.color + '30' }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                    <span>{z.label} ({z.min}–{z.max < 50 ? z.max : '+'})</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground bg-muted/60 rounded-xl p-3">
                ⚕️ L'IMC normal se situe entre <strong>18.5 et 25</strong>. Il n'existe pas de valeur "parfaite" : la fourchette entière est saine. Consultez un professionnel pour une analyse personnalisée.
              </p>

              <button
                onClick={reset}
                className="w-full py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted transition-all"
              >
                Recalculer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

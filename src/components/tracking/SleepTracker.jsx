import { Moon, Plus, Trash2 } from 'lucide-react';
import { generateTimeSlots, calcSleepDuration } from '../../lib/trackingStorage';

const BEDTIME_SLOTS = generateTimeSlots(20, 0, 28, 45); // 20h00 → 04h45 (next day)
const WAKETIME_SLOTS = generateTimeSlots(4, 30, 11, 30);

export default function SleepTracker({ sleep, onChange, locked }) {
  const { bedtime = '', waketime = '', interruptions = [] } = sleep || {};
  const duration = calcSleepDuration(bedtime, waketime);

  const update = (field, value) => {
    onChange({ ...sleep, [field]: value });
  };

  const addInterruption = () => {
    const newList = [...interruptions, { start: '', end: '' }];
    onChange({ ...sleep, interruptions: newList });
  };

  const updateInterruption = (i, field, value) => {
    const newList = interruptions.map((it, idx) => idx === i ? { ...it, [field]: value } : it);
    onChange({ ...sleep, interruptions: newList });
  };

  const removeInterruption = (i) => {
    const newList = interruptions.filter((_, idx) => idx !== i);
    onChange({ ...sleep, interruptions: newList });
  };

  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
          <Moon className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Sommeil</h3>
          {duration && (
            <p className="text-xs text-purple-500 font-medium">{duration}h de sommeil</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Heure de coucher</label>
          <select
            value={bedtime}
            onChange={e => update('bedtime', e.target.value)}
            disabled={locked}
            className="w-full px-3 py-2 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          >
            <option value="">Choisir</option>
            {BEDTIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Heure de réveil</label>
          <select
            value={waketime}
            onChange={e => update('waketime', e.target.value)}
            disabled={locked}
            className="w-full px-3 py-2 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          >
            <option value="">Choisir</option>
            {WAKETIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Interruptions */}
      {interruptions.length > 0 && (
        <div className="space-y-2 mb-3">
          <p className="text-xs font-medium text-muted-foreground">Réveils nocturnes</p>
          {interruptions.map((it, i) => {
            const dur = calcSleepDuration(it.start, it.end);
            return (
              <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-xl p-2">
                <select
                  value={it.start}
                  onChange={e => updateInterruption(i, 'start', e.target.value)}
                  disabled={locked}
                  className="flex-1 px-2 py-1.5 rounded-lg bg-muted border-0 text-xs outline-none disabled:opacity-50"
                >
                  <option value="">Début</option>
                  {BEDTIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="text-xs text-muted-foreground">→</span>
                <select
                  value={it.end}
                  onChange={e => updateInterruption(i, 'end', e.target.value)}
                  disabled={locked}
                  className="flex-1 px-2 py-1.5 rounded-lg bg-muted border-0 text-xs outline-none disabled:opacity-50"
                >
                  <option value="">Fin</option>
                  {WAKETIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {dur && <span className="text-xs text-purple-500 whitespace-nowrap">{dur}h</span>}
                {!locked && (
                  <button onClick={() => removeInterruption(i)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!locked && (
        <button
          onClick={addInterruption}
          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <Plus className="w-3.5 h-3.5" />
          Ajouter un réveil nocturne
        </button>
      )}
    </div>
  );
}
import { getWeekEntries } from '../../lib/trackingStorage';
import { useState, useEffect } from 'react';
import SleepTimeline from './SleepTimeline';

export default function WeekChart({ refreshKey }) {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    setWeek(getWeekEntries());
  }, [refreshKey]);

  const maxWeight = Math.max(...week.map(w => parseFloat(w.weight) || 0), 1);
  const maxWater = 2000;

  return (
    <div className="space-y-6">
      {/* Weight chart */}
      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <h3 className="font-display text-lg font-semibold mb-4">Poids – 7 jours</h3>
        <div className="flex items-end gap-2 h-32">
          {week.map((day, i) => {
            const val = parseFloat(day.weight) || 0;
            const height = maxWeight > 0 ? (val / maxWeight) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                {val > 0 && (
                  <span className="text-xs text-muted-foreground">{val}</span>
                )}
                <div className="w-full rounded-t-lg bg-muted relative" style={{ height: '100px' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-primary/60 transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground capitalize">{day.dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water chart */}
      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <h3 className="font-display text-lg font-semibold mb-4">Hydratation – 7 jours</h3>
        <div className="flex items-end gap-2 h-32">
          {week.map((day, i) => {
            const val = day.water || 0;
            const height = (val / maxWater) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                {val > 0 && (
                  <span className="text-xs text-muted-foreground">{(val / 1000).toFixed(1)}L</span>
                )}
                <div className="w-full rounded-t-lg bg-muted relative" style={{ height: '100px' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-blue-400/60 transition-all duration-500"
                    style={{ height: `${Math.min(height, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground capitalize">{day.dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sleep timeline */}
      <SleepTimeline week={week} />
    </div>
  );
}
import { calcSleepDuration } from '../../lib/trackingStorage';

function timeToMinutes(t) {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// Map minutes to % position within a 20h-12h window (next day), total = 16h = 960 min
const WINDOW_START = 20 * 60; // 20:00 in minutes
const WINDOW_END = 36 * 60;   // 12:00 next day = 36*60

function toPercent(minutes) {
  // normalize overnight
  let m = minutes;
  if (m < WINDOW_START) m += 24 * 60;
  return Math.max(0, Math.min(100, ((m - WINDOW_START) / (WINDOW_END - WINDOW_START)) * 100));
}

export default function SleepTimeline({ week }) {
  const hasSleep = week.some(d => d.sleep?.bedtime && d.sleep?.waketime);
  if (!hasSleep) {
    return (
      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <h3 className="font-display text-lg font-semibold mb-2">Sommeil – 7 jours</h3>
        <p className="text-sm text-muted-foreground">Aucune donnée de sommeil enregistrée.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50">
      <h3 className="font-display text-lg font-semibold mb-1">Sommeil – 7 jours</h3>
      <div className="flex justify-between text-xs text-muted-foreground mb-3">
        <span>20h</span><span>00h</span><span>04h</span><span>08h</span><span>12h</span>
      </div>
      <div className="space-y-3">
        {week.map((day, i) => {
          const sleep = day.sleep || {};
          const { bedtime, waketime, interruptions = [] } = sleep;
          const duration = calcSleepDuration(bedtime, waketime);

          let bedMin = timeToMinutes(bedtime);
          let wakeMin = timeToMinutes(waketime);
          if (bedMin !== null && wakeMin !== null && wakeMin < bedMin) wakeMin += 24 * 60;

          const bedPct = bedMin !== null ? toPercent(bedMin) : null;
          const wakePct = wakeMin !== null ? toPercent(wakeMin) : null;

          return (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-7 capitalize shrink-0">{day.dayLabel}</span>
              <div className="flex-1 h-6 bg-muted rounded-full relative overflow-hidden">
                {bedPct !== null && wakePct !== null && (
                  <div
                    className="absolute top-0 h-full bg-purple-400/70 rounded-full"
                    style={{ left: `${bedPct}%`, width: `${wakePct - bedPct}%` }}
                  />
                )}
                {/* Interruptions */}
                {interruptions.map((it, j) => {
                  let sMin = timeToMinutes(it.start);
                  let eMin = timeToMinutes(it.end);
                  if (!sMin || !eMin) return null;
                  if (eMin < sMin) eMin += 24 * 60;
                  const sPct = toPercent(sMin);
                  const ePct = toPercent(eMin);
                  return (
                    <div
                      key={j}
                      className="absolute top-0 h-full bg-muted-foreground/40 rounded-sm"
                      style={{ left: `${sPct}%`, width: `${ePct - sPct}%` }}
                    />
                  );
                })}
              </div>
              {duration && (
                <span className="text-xs text-purple-500 w-8 text-right shrink-0">{duration}h</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        <span className="inline-block w-3 h-3 rounded-sm bg-purple-400/70 mr-1 align-middle" />Sommeil
        <span className="inline-block w-3 h-3 rounded-sm bg-muted-foreground/40 ml-3 mr-1 align-middle" />Réveil nocturne
      </p>
    </div>
  );
}
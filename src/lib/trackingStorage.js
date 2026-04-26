const STORAGE_KEY = 'nutrivie_tracking';

export function getTrackingData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { entries: [] };
  return JSON.parse(raw);
}

export function saveTrackingData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTodayEntry() {
  const today = new Date().toISOString().split('T')[0];
  const data = getTrackingData();
  return data.entries.find(e => e.date === today) || null;
}

export function saveTodayEntry(entry) {
  const today = new Date().toISOString().split('T')[0];
  const data = getTrackingData();
  const idx = data.entries.findIndex(e => e.date === today);
  const fullEntry = { ...entry, date: today };
  if (idx >= 0) {
    data.entries[idx] = fullEntry;
  } else {
    data.entries.push(fullEntry);
  }
  saveTrackingData(data);
  return fullEntry;
}

export function getWeekEntries() {
  const data = getTrackingData();
  const today = new Date();
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const entry = data.entries.find(e => e.date === dateStr);
    week.push({
      date: dateStr,
      dayLabel: d.toLocaleDateString('fr-FR', { weekday: 'short' }),
      ...(entry || {}),
    });
  }
  return week;
}

// Count days with a saved entry (saved flag = true)
export function countSavedDays() {
  const data = getTrackingData();
  return data.entries.filter(e => e.saved).length;
}

export function getConstancyScore() {
  const week = getWeekEntries();
  let filled = 0;
  week.forEach(entry => {
    if (entry.saved) filled++;
  });
  return Math.round((filled / 7) * 100);
}

// Generate time slots (HH:MM) from startH:startM to endH:endM, step 15 min
export function generateTimeSlots(startHour, startMin, endHour, endMin) {
  const slots = [];
  let h = startHour, m = startMin;
  while (h < endHour || (h === endHour && m <= endMin)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += 15;
    if (m >= 60) { m = 0; h++; }
  }
  return slots;
}

// Calculate sleep duration in hours between bedtime and waketime (handles overnight)
export function calcSleepDuration(bedtime, waketime) {
  if (!bedtime || !waketime) return null;
  const [bh, bm] = bedtime.split(':').map(Number);
  const [wh, wm] = waketime.split(':').map(Number);
  let bedMinutes = bh * 60 + bm;
  let wakeMinutes = wh * 60 + wm;
  if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60; // overnight
  const diff = wakeMinutes - bedMinutes;
  return (diff / 60).toFixed(1);
}
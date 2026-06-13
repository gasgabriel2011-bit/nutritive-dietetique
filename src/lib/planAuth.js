// Système de code PIN pour accéder aux plans
const PIN = '$1$$2$$$3"é&';
const STORAGE_KEY = 'nutrivie_plan_auth';

export function isPlanUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function unlockPlan(code) {
  if (code === PIN) {
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }
  return false;
}

export function lockPlan() {
  localStorage.removeItem(STORAGE_KEY);
}

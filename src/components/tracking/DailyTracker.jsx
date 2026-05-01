import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry } from '../../lib/trackingStorage';
import { Droplets, Zap, Smile, Scale, UtensilsCrossed, Save, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import SleepTracker from './SleepTracker';
import { useAuth } from '@/lib/AuthContext';

const MOODS = ['😔', '😐', '🙂', '😊', '🤩'];
const ENERGY_LEVELS = ['Épuisé', 'Fatigué', 'Normal', 'Bien', 'Plein d\'énergie'];

const DEFAULT_ENTRY = {
  weight: '',
  water: 0,
  sleep: { bedtime: '', waketime: '', interruptions: [] },
  meals: '',
  energy: 2,
  mood: 2,
  saved: false,
};

export default function DailyTracker({ onUpdate }) {
  const [entry, setEntry] = useState(DEFAULT_ENTRY);
  const [locked, setLocked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const loadToday = async () => {
      setIsLoading(true);

      try {
        const today = await getTodayEntry(user);
        if (!isMounted) {
          return;
        }

        if (today) {
          setEntry({ ...DEFAULT_ENTRY, ...today, sleep: today.sleep || DEFAULT_ENTRY.sleep });
          setLocked(!!today.saved);
        } else {
          setEntry(DEFAULT_ENTRY);
          setLocked(false);
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setEntry(DEFAULT_ENTRY);
        setLocked(false);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadToday();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const update = (field, value) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const addWater = () => {
    const newVal = (entry.water || 0) + 250;
    update('water', newVal);
  };

  const handleSave = async () => {
    const saved = { ...entry, saved: true };

    setIsSaving(true);

    try {
      await saveTodayEntry(saved, user);
      setEntry(saved);
      setLocked(true);
      onUpdate?.();
      toast.success(isAuthenticated ? 'Données synchronisées ! ✅' : 'Données enregistrées sur cet appareil ! ✅');
    } catch (error) {
      toast.error(error.message || "Impossible d'enregistrer vos données pour le moment.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldClick = () => {
    if (locked) setShowConfirm(true);
  };

  const handleConfirmEdit = () => {
    setLocked(false);
    setShowConfirm(false);
    toast('Modification autorisée. N\'oubliez pas de ré-enregistrer.', { icon: '✏️' });
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-5 border border-border/50 text-sm text-muted-foreground">
        Chargement de votre suivi...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Confirm edit popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border" onClick={e => e.stopPropagation()}>
            <p className="font-semibold text-center mb-2">Déjà enregistré</p>
            <p className="text-sm text-muted-foreground text-center mb-6">Souhaitez-vous modifier les données d'aujourd'hui ?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-all">Non</button>
              <button onClick={handleConfirmEdit} className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">Oui</button>
            </div>
          </div>
        </div>
      )}

      {/* Weight */}
      <div className="bg-card rounded-2xl p-5 border border-border/50" onClick={handleFieldClick}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Poids</h3>
            <p className="text-xs text-muted-foreground">En kg</p>
          </div>
        </div>
        <input
          type="number"
          step="0.1"
          value={entry.weight}
          onChange={e => update('weight', e.target.value)}
          disabled={locked}
          placeholder="72.5"
          className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        />
      </div>

      {/* Water */}
      <div className="bg-card rounded-2xl p-5 border border-border/50" onClick={locked ? handleFieldClick : undefined}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Hydratation</h3>
              <p className="text-xs text-muted-foreground">{entry.water || 0}ml / 2000ml</p>
            </div>
          </div>
          {!locked && (
            <button onClick={addWater} className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
              +250ml
            </button>
          )}
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(((entry.water || 0) / 2000) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Sleep */}
      <div onClick={locked ? handleFieldClick : undefined}>
        <SleepTracker
          sleep={entry.sleep}
          onChange={val => update('sleep', val)}
          locked={locked}
        />
      </div>

      {/* Meals */}
      <div className="bg-card rounded-2xl p-5 border border-border/50" onClick={handleFieldClick}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Journal repas</h3>
            <p className="text-xs text-muted-foreground">Décrivez vos repas</p>
          </div>
        </div>
        <textarea
          value={entry.meals}
          onChange={e => update('meals', e.target.value)}
          disabled={locked}
          placeholder="Petit-déj : Porridge aux fruits&#10;Déjeuner : Salade quinoa...&#10;Dîner : ..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50"
        />
      </div>

      {/* Energy */}
      <div className="bg-card rounded-2xl p-5 border border-border/50" onClick={handleFieldClick}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="font-semibold text-sm">Énergie</h3>
        </div>
        <div className="flex gap-2">
          {ENERGY_LEVELS.map((level, i) => (
            <button
              key={level}
              onClick={() => { if (!locked) update('energy', i); }}
              disabled={locked}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                entry.energy === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              } disabled:opacity-50`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div className="bg-card rounded-2xl p-5 border border-border/50" onClick={handleFieldClick}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            <Smile className="w-5 h-5 text-pink-500" />
          </div>
          <h3 className="font-semibold text-sm">Humeur</h3>
        </div>
        <div className="flex gap-3 justify-center">
          {MOODS.map((mood, i) => (
            <button
              key={i}
              onClick={() => { if (!locked) update('mood', i); }}
              disabled={locked}
              className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all disabled:opacity-50 ${
                entry.mood === i ? 'bg-primary/10 scale-110 ring-2 ring-primary' : 'bg-muted hover:scale-105'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Save button */}
      {!locked ? (
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Enregistrement..." : "Enregistrer la journée"}
        </button>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-foreground/70 text-sm hover:bg-muted transition-all"
        >
          <Pencil className="w-4 h-4" />
          Modifier les données
        </button>
      )}
    </div>
  );
}

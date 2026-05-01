import { useState, useEffect } from 'react';
import { getConstancyScore, countSavedDays } from '../lib/trackingStorage';
import AnimatedSection from '../components/ui/AnimatedSection';
import ConstancyRing from '../components/tracking/ConstancyRing';
import DailyTracker from '../components/tracking/DailyTracker';
import WeekChart from '../components/tracking/WeekChart';
import { TrendingUp, CalendarDays } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Tracking() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [score, setScore] = useState(0);
  const [savedDays, setSavedDays] = useState(0);
  const [tab, setTab] = useState('daily');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const loadTrackingStats = async () => {
      try {
        const [nextScore, nextSavedDays] = await Promise.all([
          getConstancyScore(user),
          countSavedDays(user),
        ]);

        if (!isMounted) {
          return;
        }

        setScore(nextScore);
        setSavedDays(nextSavedDays);
      } catch {
        if (!isMounted) {
          return;
        }

        setScore(0);
        setSavedDays(0);
      }
    };

    loadTrackingStats();

    return () => {
      isMounted = false;
    };
  }, [refreshKey, user]);

  const handleUpdate = () => {
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-4">
            Suivi <span className="italic font-semibold text-primary">nutrition</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Suivez vos habitudes au quotidien. {isAuthenticated ? "Vos données sont synchronisées avec votre compte." : "Vos données restent sur votre appareil tant que vous n'êtes pas connecté."}
          </p>
        </AnimatedSection>

        {/* Constancy Score */}
        <AnimatedSection delay={0.1} className="mb-8">
          {savedDays < 3 ? (
            <div className="bg-muted rounded-3xl p-8 border border-border/50 text-center opacity-60">
              <div className="w-24 h-24 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🔒</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Attendre 3 jours pour voir votre constance</p>
              <p className="text-xs text-muted-foreground mt-1">{savedDays}/3 jours enregistrés</p>
            </div>
          ) : (
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm text-center">
              <ConstancyRing score={score} key={refreshKey} />
              <p className="text-sm text-muted-foreground mt-3">
                Score basé sur les 7 derniers jours
              </p>
            </div>
          )}
        </AnimatedSection>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all ${
              tab === 'daily' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground/70'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Aujourd'hui
          </button>
          <button
            onClick={() => setTab('progress')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all ${
              tab === 'progress' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground/70'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Progression
          </button>
        </div>

        {/* Content */}
        <AnimatedSection delay={0.2}>
          {tab === 'daily' && <DailyTracker onUpdate={handleUpdate} />}
          {tab === 'progress' && <WeekChart refreshKey={refreshKey} />}
        </AnimatedSection>
      </div>
    </div>
  );
}

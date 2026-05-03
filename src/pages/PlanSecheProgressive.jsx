import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, Target, ArrowLeft, ArrowRight, Star, Calendar, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useInstalledAppMode } from '@/lib/appMode';

const STORAGE_KEY = 'nutrivie_seche_tracking';
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function useTracking() {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const save = (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };
  return [data, save];
}

const NAV_CARDS = [
  {
    to: '/plans/seche-progressive/semaines',
    icon: '📅',
    title: 'Programme semaine par semaine',
    desc: 'Les 8 semaines détaillées avec habitudes, nutrition et conseils sport. Cliquez sur chaque semaine pour tout voir.',
    color: 'hover:border-primary/40',
    badge: '8 semaines',
  },
  {
    to: '/plans/seche-progressive/journees',
    icon: '🍽️',
    title: 'Journées types',
    desc: '5 journées types différentes (standard, végétarienne, meal prep, sport, budget) pour ne jamais manquer d\'idées.',
    color: 'hover:border-secondary/40',
    badge: '5 journées',
  },
  {
    to: '/plans/seche-progressive/recettes',
    icon: '👨‍🍳',
    title: 'Recettes du programme',
    desc: '22 recettes adaptées à la sèche : petit-déjeuner, déjeuner, dîner, collation. Filtrables par repas.',
    color: 'hover:border-primary/40',
    badge: '22 recettes',
  },
  {
    to: '/plans/seche-progressive/courses',
    icon: '🛒',
    title: 'Liste de courses',
    desc: 'Liste complète de la semaine à cocher au fur et à mesure. Sauvegarde automatique sur votre appareil.',
    color: 'hover:border-secondary/40',
    badge: 'Interactive',
  },
  {
    to: '/plans/seche-progressive/sport',
    icon: '💪',
    title: 'Conseils activité physique',
    desc: 'Renforcement, marche, cardio, sommeil. Cliquez sur chaque conseil pour des infos approfondies.',
    color: 'hover:border-primary/40',
    badge: '5 thèmes',
  },
  {
    to: '/plans/seche-progressive/boissons',
    icon: '💧',
    title: 'Boissons conseillées',
    desc: 'Ce que boire, en quelle quantité et pourquoi. Chaque boisson expliquée en détail.',
    color: 'hover:border-secondary/40',
    badge: '7 boissons',
  },
];

export default function PlanSecheProgressive() {
  const isInstalledApp = useInstalledAppMode();
  const [trackData, saveTrackData] = useTracking();

  const toggleCheck = (dayIdx, field) => {
    const key = `${dayIdx}_${field}`;
    saveTrackData({ ...trackData, [key]: !trackData[key] });
  };

  const setEnergy = (dayIdx, val) => {
    saveTrackData({ ...trackData, [`${dayIdx}_energy`]: val });
  };

  const setNote = (dayIdx, val) => {
    saveTrackData({ ...trackData, [`${dayIdx}_note`]: val });
  };

  return (
    <div className="pt-20 pb-20 bg-background">

      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <AnimatedSection>
            <Link to="/plans" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux plans
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">🔥 Perte de gras progressive</span>
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">8 semaines</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">1 800 kcal / jour</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
              Programme <span className="italic font-semibold text-primary">sèche progressive</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-5 max-w-2xl">
              8 semaines pour réduire progressivement la masse grasse en conservant l'énergie et la masse musculaire.
            </p>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />8 semaines</span>
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-secondary" />1 800 kcal / jour</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-primary" />Déficit modéré 300-500 kcal</span>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/70 rounded-xl px-4 py-2.5 border border-border inline-block">
              ⚠️ Programme indicatif à adapter selon votre âge, votre taille, votre activité physique et vos besoins personnels.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">

        {/* ── POURQUOI CE PROGRAMME ── */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-6">
            Pourquoi ce <span className="italic font-semibold text-primary">programme</span> ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['📉', 'Déficit calorique progressif', 'Pas de restriction brutale qui entraîne frustration et reprise de poids. Moins 300 à 500 kcal seulement.'],
              ['🥩', 'Apport protéique suffisant', 'Protéines à 1,6 g/kg pour préserver le muscle pendant la perte de poids. Le muscle brûle des calories au repos.'],
              ['🍞', 'Glucides bien placés', "Féculents le matin et à midi pour alimenter l'énergie de la journée. Réduits le soir si vous êtes sédentaire."],
              ['🥗', 'Satiété optimisée', 'Légumes en quantité, fibres, protéines à chaque repas : vous n\'avez pas faim. Pas de fringales incontrôlables.'],
              ['🍱', 'Meal prep compatible', 'Tous les repas sont préparables à l\'avance. Pas d\'improvisation, pas d\'écarts non planifiés par manque de temps.'],
              ['⏳', 'Perte durable', '0,5 à 1 % du poids corporel par semaine. Approche lente mais efficace. Pas de régime yo-yo.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-card rounded-2xl p-5 border border-border/50 flex gap-4 hover:shadow-md transition-shadow duration-300">
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── NAVIGATION HUB ── */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            Explorer le <span className="italic font-semibold text-primary">programme</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Chaque section est accessible en une page dédiée pour plus de clarté.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NAV_CARDS.map((card, i) => (
              <AnimatedSection key={card.to} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={card.to}
                    className={`block bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-400 group ${card.color}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{card.icon}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium">{card.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-medium">
                      Accéder <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* ── MON SUIVI ── */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            <Calendar className="inline w-8 h-8 text-primary mr-2" />
            Mon <span className="italic font-semibold text-primary">suivi</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Vos données sont sauvegardées localement sur votre appareil, en toute confidentialité.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map((day, idx) => {
              const checked = (field) => !!trackData[`${idx}_${field}`];
              return (
                <div key={day} className="bg-card rounded-2xl p-4 border border-border/50">
                  <h3 className="font-semibold text-sm mb-3 text-center text-primary">{day}</h3>
                  <div className="space-y-2">
                    {[
                      ['meals', '🍽️ Repas préparés'],
                      ['water', '💧 Eau suffisante'],
                      ['activity', '🏃 Activité physique'],
                    ].map(([field, label]) => (
                      <button
                        key={field}
                        onClick={() => toggleCheck(idx, field)}
                        className="w-full flex items-center gap-2 text-xs text-left hover:opacity-80 transition-opacity"
                      >
                        {checked(field)
                          ? <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                          : <Square className="w-4 h-4 text-muted-foreground shrink-0" />}
                        <span className={checked(field) ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                      </button>
                    ))}
                    <div className="pt-1">
                      <p className="text-xs text-muted-foreground mb-1.5">Énergie</p>
                      <div className="flex gap-1">
                        {['😔', '🙂', '🤩'].map((e, ei) => (
                          <button
                            key={ei}
                            onClick={() => setEnergy(idx, ei)}
                            className={`flex-1 py-1 rounded-lg text-sm transition-all ${trackData[`${idx}_energy`] === ei ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted hover:bg-muted/60'}`}
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Note..."
                      value={trackData[`${idx}_note`] || ''}
                      onChange={e => setNote(idx, e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-muted border-0 outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ── CTA FINAL ── */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 sm:p-12 text-center border border-border/50">
            <Star className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3">
              Prêt à suivre votre <span className="italic font-semibold text-primary">progression ?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Un suivi personnalisé avec notre diététicienne vous permettra d'adapter ce programme à vos besoins exacts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isInstalledApp ? (
                <Link
                  to="/rendez-vous"
                  className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  Prendre rendez-vous
                </Link>
              ) : null}
              <Link
                to="/plans"
                className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-all"
              >
                Retour aux plans
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

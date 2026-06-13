import PlanGate from '../components/PlanGate';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, Target, ArrowLeft, ArrowRight, Star, Calendar, CheckSquare, Square } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const STORAGE_KEY = 'nutrivie_prise_masse_tracking';
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const NAV_CARDS = [
  { to: '/plans/prise-masse-propre/semaines', icon: '📅', title: 'Programme semaine par semaine', desc: 'Les 12 semaines détaillées avec objectifs, repas type et conseils sport. Cliquez sur chaque semaine.', badge: '12 semaines' },
  { to: '/plans/prise-masse-propre/journee-type', icon: '🍽️', title: 'Journée type à 2800 kcal', desc: 'Répartition complète de la journée : 5 à 6 prises alimentaires pour atteindre l\'objectif sans inconfort.', badge: '2800 kcal' },
  { to: '/plans/prise-masse-propre/recettes', icon: '👨‍🍳', title: 'Recettes prise de masse', desc: '24 recettes denses et savoureuses, filtrables par repas : petit-déjeuner, déjeuner, dîner, collation.', badge: '24 recettes' },
  { to: '/plans/prise-masse-propre/courses', icon: '🛒', title: 'Liste de courses', desc: 'Liste hebdomadaire interactive et cochable, organisée par catégories. Sauvegarde automatique.', badge: 'Interactive' },
  { to: '/plans/prise-masse-propre/sport', icon: '💪', title: 'Conseils sport', desc: 'Renforcement, progression, sommeil, digestion. Cliquez sur chaque conseil pour les détails complets.', badge: '5 thèmes' },
  { to: '/plans/prise-masse-propre/boissons', icon: '💧', title: 'Boissons conseillées', desc: 'Eau, lait, smoothies, café. Ce que boire, en quelle quantité et pourquoi pour soutenir la masse.', badge: '7 boissons' },
];

function PlanPriseMasseContent() {
  const [trackData, setTrackData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  const save = (newData) => {
    setTrackData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const toggleCheck = (dayIdx, field) => save({ ...trackData, [`${dayIdx}_${field}`]: !trackData[`${dayIdx}_${field}`] });
  const setEnergy = (dayIdx, val) => save({ ...trackData, [`${dayIdx}_energy`]: val });
  const setNote = (dayIdx, val) => save({ ...trackData, [`${dayIdx}_note`]: val });
  const checked = (dayIdx, field) => !!trackData[`${dayIdx}_${field}`];

  return (
    <div className="pt-20 pb-20 bg-background">

      {/* HERO */}
      <div className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <AnimatedSection>
            <Link to="/plans" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux plans
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">💪 Masse musculaire</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">12 semaines</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">2 800 kcal / jour</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
              Programme <span className="italic font-semibold text-secondary">prise de masse propre</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-5 max-w-2xl">
              12 semaines pour augmenter les apports de manière structurée et soutenir la progression musculaire.
            </p>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />12 semaines</span>
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-secondary" />2 800 kcal / jour</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-primary" />Surplus modéré +300-500 kcal</span>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/70 rounded-xl px-4 py-2.5 border border-border inline-block">
              ⚠️ Programme indicatif, à adapter selon votre dépense énergétique, votre entraînement et votre évolution.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">

        {/* POURQUOI CE PROGRAMME */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-6">
            Pourquoi ce <span className="italic font-semibold text-primary">programme</span> ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['📈', 'Surplus calorique progressif', 'On augmente les calories doucement (+100-150 kcal/semaine) pour éviter le stockage de graisse rapide.'],
              ['🥩', 'Protéines régulières', '1.8 à 2g/kg de poids. Les protéines sont les briques du muscle. Un apport insuffisant bloque les progrès.'],
              ['🍞', 'Glucides autour de l\'entraînement', 'Avant et après la séance pour alimenter l\'effort et la récupération. Pas de low-carb en prise de masse.'],
              ['🥑', 'Bonnes graisses pour la densité', 'Huile olive, avocat, noix, beurre d\'amande : augmentent les calories sans surcharger le volume des repas.'],
              ['🍎', 'Collations utiles', 'Une 4e prise alimentaire est souvent nécessaire pour atteindre 2800 kcal sans inconfort digestif.'],
              ['⏳', 'Progression lente préférable', '+0.5 à 1 kg/mois maximum. Plus lent = plus propre. Patience et constance sont les vraies clés.'],
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

        {/* NAVIGATION HUB */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            Explorer le <span className="italic font-semibold text-primary">programme</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">Chaque section est accessible en une page dédiée pour plus de clarté.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NAV_CARDS.map((card, i) => (
              <AnimatedSection key={card.to} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link to={card.to} className="block bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-400 group">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{card.icon}</span>
                      <span className="text-xs text-secondary bg-secondary/10 px-2.5 py-1 rounded-full font-medium">{card.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-secondary transition-colors mb-2">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                    <div className="flex items-center gap-1 text-secondary text-xs font-medium">
                      Accéder <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* MON SUIVI */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            <Calendar className="inline w-8 h-8 text-secondary mr-2" />
            Mon <span className="italic font-semibold text-secondary">suivi</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Vos données sont sauvegardées localement sur votre appareil, en toute confidentialité.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map((day, idx) => (
              <div key={day} className="bg-card rounded-2xl p-4 border border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-center text-secondary">{day}</h3>
                <div className="space-y-2">
                  {[
                    ['meals', '🍽️ Repas complets'],
                    ['collation', '🍎 Collation prise'],
                    ['water', '💧 Hydratation ok'],
                    ['training', '🏋️ Entraînement'],
                  ].map(([field, label]) => (
                    <button key={field} onClick={() => toggleCheck(idx, field)} className="w-full flex items-center gap-2 text-xs text-left hover:opacity-80 transition-opacity">
                      {checked(idx, field)
                        ? <CheckSquare className="w-4 h-4 text-secondary shrink-0" />
                        : <Square className="w-4 h-4 text-muted-foreground shrink-0" />}
                      <span className={checked(idx, field) ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                    </button>
                  ))}
                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-1.5">Énergie</p>
                    <div className="flex gap-1">
                      {['😔', '🙂', '🤩'].map((e, ei) => (
                        <button key={ei} onClick={() => setEnergy(idx, ei)}
                          className={`flex-1 py-1 rounded-lg text-sm transition-all ${trackData[`${idx}_energy`] === ei ? 'bg-secondary/10 ring-2 ring-secondary/30' : 'bg-muted hover:bg-muted/60'}`}>
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
                    className="w-full text-xs px-3 py-2 rounded-xl bg-muted border-0 outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-8 sm:p-12 text-center border border-border/50">
            <Star className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3">
              Prêt à construire votre <span className="italic font-semibold text-secondary">progression ?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Un suivi personnalisé avec notre diététicienne pour adapter ce programme à votre dépense réelle et votre entraînement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rendez-vous" className="px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-secondary/20">
                Prendre rendez-vous
              </Link>
              <Link to="/plans" className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-all">
                Retour aux plans
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
export default function PlanPriseMasse() { return <PlanGate><PlanPriseMasseContent /></PlanGate>; }

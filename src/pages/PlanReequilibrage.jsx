import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, Target, ArrowLeft, ArrowRight, Star, Calendar, X } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const STORAGE_KEY = 'nutrivie_reequilibrage_suivi';
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const CHECKS = [
  ['meals', '🍽️ 3 repas structurés'],
  ['veggies', '🥦 Légumes au repas'],
  ['water', '💧 Hydratation ok'],
  ['slow', '🐌 Mangé lentement'],
  ['nosnack', '🚫 Pas de grignotage'],
];

const SPORT_TIPS = [
  {
    icon: '🚶', title: 'Marche quotidienne',
    desc: '20 à 30 minutes par jour. Première habitude à ancrer pour améliorer le transit, la glycémie et l\'humeur.',
    detail: {
      intro: 'La marche est l\'activité la plus adaptée au rééquilibrage alimentaire. Elle est douce, accessible, et ses bénéfices sont prouvés.',
      points: [
        'Objectif progressif : 15 min → 20 min → 30 min sur les premières semaines.',
        'Marche post-repas (15 min après le déjeuner) : réduit le pic glycémique de 30%.',
        'Améliore le transit intestinal : excellent pour le confort digestif.',
        'Libère de la sérotonine : meilleure humeur, moins d\'envies émotionnelles.',
        'Pas besoin de matériel ni de salle de sport.',
      ],
      example: 'Exemple : 10 min à pied pour aller travailler + 15 min de marche post-déjeuner = 25 min sans effort.',
      tip: 'La régularité prime sur l\'intensité. 20 min chaque jour > 2h le dimanche.',
    },
  },
  {
    icon: '🧘', title: 'Yoga & étirements',
    desc: 'Réduisez le stress, améliorez la digestion et retrouvez l\'écoute de votre corps avec 15 min par jour.',
    detail: {
      intro: 'Le yoga doux et les étirements sont parfaitement complémentaires au rééquilibrage alimentaire. Ils agissent sur le stress, premier ennemi des bonnes habitudes alimentaires.',
      points: [
        '15 min de yoga le matin réduit le cortisol (hormone du stress liée aux envies de sucre).',
        'Améliore la conscience corporelle : mieux ressentir la faim et la satiété.',
        'Plusieurs postures améliorent le transit (torsions, positions allongées).',
        'Accessible à tous les niveaux. Applications gratuites disponibles.',
        'Le soir : 10 min de yoga favorise l\'endormissement et un meilleur sommeil.',
      ],
      example: 'Exemple de routine : 10 min de yoga doux au réveil + 5 min de respiration abdominale avant de dormir.',
      tip: 'Le stress alimentaire se traite aussi par le corps. Le yoga est l\'outil le plus sous-estimé du rééquilibrage.',
    },
  },
  {
    icon: '💧', title: 'Natation / vélo doux',
    desc: '1 à 2 séances par semaine pour un cardio sans impact sur les articulations.',
    detail: {
      intro: 'Pour les personnes qui reprennent une activité physique, la natation et le vélo sont les deux cardios les plus bénéfiques sans risque articulaire.',
      points: [
        '1 à 2 séances de 30 min par semaine.',
        'Intensité modérée : vous devez pouvoir parler pendant l\'effort.',
        'Natation : excellent pour le dos, les articulations, et la respiration.',
        'Vélo d\'appartement ou extérieur : idéal pour les journées chargées.',
        'Ne compensez pas en mangeant plus après la séance.',
      ],
      example: 'Exemple de semaine : marche 5 jours + natation ou vélo 1 fois le week-end.',
      tip: 'Le but n\'est pas de brûler des calories. C\'est de prendre soin de votre corps et d\'ancrer une routine active.',
    },
  },
  {
    icon: '😴', title: 'Priorité au sommeil',
    desc: 'Le sommeil régule la ghréline (faim) et la leptine (satiété). 7 à 8h par nuit changent tout.',
    detail: {
      intro: 'Le sommeil est souvent le facteur oublié du rééquilibrage alimentaire. Pourtant, manquer de sommeil sabote directement l\'alimentation.',
      points: [
        'Ghréline (faim) augmente avec le manque de sommeil : vous mangez plus.',
        'Leptine (satiété) diminue : vous n\'êtes jamais vraiment rassasié.',
        'Après une mauvaise nuit : +24% de calories consommées en moyenne.',
        'Routine fixe : même heure de coucher et de lever 7j/7.',
        'Chambre fraîche, obscure, sans écran 1h avant le coucher.',
        'Infusion camomille ou valériane le soir pour faciliter l\'endormissement.',
      ],
      example: 'Rituel du soir : dîner 2h avant le coucher → infusion → lecture ou étirements → lumières tamisées → coucher à heure fixe.',
      tip: '7 à 8h de sommeil par nuit = moins de grignotage, moins d\'envies sucrées, plus de motivation. C\'est la mesure la plus simple et la plus efficace.',
    },
  },
  {
    icon: '🏋️', title: 'Renforcement léger (optionnel)',
    desc: 'Si vous le souhaitez : 1 à 2 séances de 20 min. Pas obligatoire, mais bénéfique pour le tonus.',
    detail: {
      intro: 'Le renforcement musculaire n\'est pas obligatoire dans un programme de rééquilibrage, mais il est bénéfique pour le tonus, la posture et le métabolisme.',
      points: [
        '1 à 2 séances de 20-30 min par semaine maximum.',
        'Exercices au poids du corps : squats, pompes, abdos, fentes.',
        'Pas besoin de salle de sport : une tapis de yoga suffit.',
        'Le muscle améliore la sensibilité à l\'insuline : meilleure gestion de la glycémie.',
        'Commencez progressivement, surtout si vous ne faites plus de sport depuis longtemps.',
      ],
      example: 'Séance simple 20 min : 3x10 squats → 3x8 pompes → 3x10 fentes → 3x30s gainage → étirements.',
      tip: 'Le renforcement n\'est pas une punition. C\'est une façon de prendre soin de son corps qui complète les bonnes habitudes alimentaires.',
    },
  },
];

const NAV_CARDS = [
  { to: '/plans/reequilibrage-alimentaire/semaines', icon: '📅', title: 'Programme semaine par semaine', desc: 'Les 12 semaines progressives détaillées : habitudes, nutrition, activité. Cliquez pour tous les détails.', badge: '12 semaines' },
  { to: '/plans/reequilibrage-alimentaire/journees', icon: '🍽️', title: 'Journées types', desc: '4 journées types différentes (classique, végétarienne, familiale, rapide) pour ne jamais manquer d\'inspiration.', badge: '4 journées' },
  { to: '/plans/reequilibrage-alimentaire/recettes', icon: '👨‍🍳', title: 'Recettes du programme', desc: '22 recettes familiales et équilibrées, filtrables par repas : petit-déjeuner, déjeuner, dîner, collation.', badge: '22 recettes' },
  { to: '/plans/reequilibrage-alimentaire/courses', icon: '🛒', title: 'Liste de courses', desc: 'Liste hebdomadaire complète, interactive et cochable. Organisée par catégories.', badge: 'Interactive' },
  { to: '/plans/reequilibrage-alimentaire/conseils', icon: '💡', title: 'Conseils pratiques', desc: 'Comment composer une assiette, gérer un restaurant, les envies sucrées, une semaine chargée.', badge: '5 conseils' },
];

export default function PlanReequilibrage() {
  const [trackData, setTrackData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const [selectedSport, setSelectedSport] = useState(null);

  const save = (newData) => {
    setTrackData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };
  const toggle = (dayIdx, field) => save({ ...trackData, [`${dayIdx}_${field}`]: !trackData[`${dayIdx}_${field}`] });
  const setEnergy = (dayIdx, val) => save({ ...trackData, [`${dayIdx}_energy`]: val });
  const setNote = (dayIdx, val) => save({ ...trackData, [`${dayIdx}_note`]: val });

  const sportTip = SPORT_TIPS.find(t => t.title === selectedSport);

  return (
    <div className="pt-20 pb-20 bg-background">

      {/* HERO */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <AnimatedSection>
            <Link to="/plans" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux plans
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">⚖️ Habitudes durables</span>
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">12 semaines</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">2 000 kcal / jour</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
              Programme <span className="italic font-semibold text-primary">rééquilibrage alimentaire</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-5 max-w-2xl">
              12 semaines pour retrouver une alimentation plus stable, plus simple et plus durable. Sans restriction, sans frustration.
            </p>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />12 semaines</span>
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-secondary" />2 000 kcal / jour</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-primary" />Pas de restriction stricte</span>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/70 rounded-xl px-4 py-2.5 border border-border inline-block">
              ⚠️ Programme indicatif à adapter selon vos besoins, votre rythme de vie et votre activité physique.
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
          <p className="text-muted-foreground mb-6">
            Le rééquilibrage alimentaire n'est pas un régime. L'objectif est de retrouver une relation sereine avec la nourriture, progressivement et durablement.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['🍽️', 'Repas structurés', 'Retrouver 3 repas par jour à des heures régulières, assis, sans précipitation.'],
              ['🥦', 'Plus de légumes', "Doubler sa consommation de légumes sans frustration. Ils apportent fibres, vitamines et satiété."],
              ['🥩', 'Protéines régulières', 'Une source de protéines à chaque repas : meilleure satiété, moins de grignotage, énergie stable.'],
              ['🔍', 'Portions lisibles', 'Apprendre à calibrer sans peser grâce à la méthode assiette. Simple et durable.'],
              ['🚫', 'Moins de grignotage', 'Identifier les grignotages automatiques (stress, ennui) et les réduire progressivement.'],
              ['❤️', 'Meilleure relation', "Moins de culpabilité, moins de 'tout ou rien', plus de plaisir conscient."],
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

        {/* EXPLORER */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            Explorer le <span className="italic font-semibold text-primary">programme</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">Chaque section est une page dédiée pour plus de clarté.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NAV_CARDS.map((card, i) => (
              <AnimatedSection key={card.to} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link to={card.to} className="block bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-400 group">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{card.icon}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium">{card.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{card.title}</h3>
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

        {/* MON SUIVI INLINE */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            <Calendar className="inline w-8 h-8 text-primary mr-2" />
            Mon <span className="italic font-semibold text-primary">suivi</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Données sauvegardées localement sur votre appareil, en toute confidentialité.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map((day, idx) => (
              <div key={day} className="bg-card rounded-2xl p-4 border border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-center text-primary">{day}</h3>
                <div className="space-y-2">
                  {CHECKS.map(([field, label]) => (
                    <button
                      key={field}
                      onClick={() => toggle(idx, field)}
                      className="w-full flex items-center gap-2 text-xs text-left hover:opacity-80 transition-opacity"
                    >
                      <span className={`w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all ${trackData[`${idx}_${field}`] ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                        {trackData[`${idx}_${field}`] && <span className="text-primary-foreground text-xs">✓</span>}
                      </span>
                      <span className={trackData[`${idx}_${field}`] ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                    </button>
                  ))}
                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-1.5">⚡ Énergie</p>
                    <div className="flex gap-1">
                      {['😔', '🙂', '🤩'].map((e, ei) => (
                        <button key={ei} onClick={() => setEnergy(idx, ei)}
                          className={`flex-1 py-1 rounded-lg text-sm transition-all ${trackData[`${idx}_energy`] === ei ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted hover:bg-muted/60'}`}>
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
            ))}
          </div>
        </AnimatedSection>

        {/* CONSEILS SPORT */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            Conseils <span className="italic font-semibold text-primary">activité physique</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">Adaptés au rééquilibrage : douceur, régularité, bien-être. Cliquez pour les détails.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {SPORT_TIPS.map((tip, i) => (
              <AnimatedSection key={tip.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedSport(tip.title)}
                  className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{tip.icon}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-primary text-xs font-medium">En savoir plus →</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA FINAL */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 sm:p-12 text-center border border-border/50">
            <Star className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3">
              Prêt à retrouver le <span className="italic font-semibold text-primary">plaisir de manger ?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Un accompagnement personnalisé avec notre diététicienne vous permettra d'adapter ce programme à votre quotidien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rendez-vous" className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                Prendre rendez-vous
              </Link>
              <Link to="/plans" className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-all">
                Retour aux plans
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>

      {/* Modal sport */}
      <AnimatePresence>
        {selectedSport && sportTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedSport(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-xl my-8 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{sportTip.icon}</span>
                    <h2 className="font-display text-2xl font-semibold">{sportTip.title}</h2>
                  </div>
                  <button onClick={() => setSelectedSport(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors ml-4 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{sportTip.detail.intro}</p>
                <div className="bg-muted/50 rounded-2xl p-4 mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Points clés</h3>
                  <ul className="space-y-2">
                    {sportTip.detail.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary shrink-0 mt-0.5">•</span>
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-4 mb-5 border border-secondary/20">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Exemple concret</h3>
                  <p className="text-sm text-muted-foreground">{sportTip.detail.example}</p>
                </div>
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                  <p className="text-sm text-foreground"><span className="font-semibold">💡 </span>{sportTip.detail.tip}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
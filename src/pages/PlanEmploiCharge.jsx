import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'emploi',
  titleLine1: 'Programme',
  titleLine2: 'emploi chargé',
  subtitle: '4 semaines pour manger équilibré avec un agenda surchargé. Batch cooking, recettes express, lunch boxes.',
  badges: ['⏰ Efficacité', '4 semaines', '2000 kcal / jour'],
  duration: '4 semaines', calories: '2000 kcal / jour', focus: 'Batch cooking & recettes <15 min',
  reasons: [
    ['📦', 'Batch cooking 1h30/semaine', '5 déjeuners préparés le dimanche. Zéro décision alimentaire en semaine.'],
    ['⚡', 'Recettes en 15 min max', 'Omelette, overnight oats, pasta thon : des recettes ultra-rapides et nutritives.'],
    ['🧠', 'Performance au travail', 'Repas léger à midi = après-midi alerte. Repas lourd = coup de barre garanti.'],
    ['☕', 'Caféine optimisée', 'Café avant 14h seulement. Thé vert l\'après-midi. Sommeil protégé = lendemain productif.'],
    ['🚶', 'Pauses actives', 'Marche déjeuner, micro-pauses bureau : réduisent la sédentarité sans perdre de temps.'],
    ['🌙', 'Récupération prioritaire', 'Le sommeil est le premier facteur de performance. Alimentation du soir optimisée pour ça.'],
  ],
  navCards: [
    { to: '/plans/emploi-charge/semaines', icon: '📅', title: 'Programme 4 semaines', desc: 'Du batch cooking à la performance cognitive.', badge: '4 semaines' },
    { to: '/plans/emploi-charge/journee-type', icon: '🍽️', title: 'Journée type 2000 kcal', desc: 'Maximum nutrition, minimum temps à chaque repas.', badge: '2000 kcal' },
    { to: '/plans/emploi-charge/recettes', icon: '👨‍🍳', title: 'Recettes express', desc: '4 recettes en moins de 15 min pour les actifs.', badge: '4 recettes' },
    { to: '/plans/emploi-charge/courses', icon: '🛒', title: 'Liste de courses', desc: 'Liste organisée pour le batch du dimanche.', badge: 'Interactive' },
    { to: '/plans/emploi-charge/sport', icon: '🧘', title: 'Sport & micro-pauses', desc: 'Yoga 10 min, marche déjeuner, sport week-end.', badge: '4 conseils' },
    { to: '/plans/emploi-charge/boissons', icon: '☕', title: 'Boissons actifs', desc: 'Café, thé vert, eau, smoothie batch. Optimisation cognitive.', badge: '6 boissons' },
  ],
  trackFields: [['batch', '📦 Lunch box prête'], ['marche', '🚶 Marche déjeuner'], ['ecrans', '📵 Déjeuner sans écran'], ['cafe14h', '☕ Café avant 14h']],
};

export default function PlanEmploiCharge() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
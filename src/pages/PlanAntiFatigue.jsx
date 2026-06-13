import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'fatigue',
  titleLine1: 'Programme',
  titleLine2: 'anti-fatigue',
  subtitle: '4 semaines pour identifier et corriger les carences qui vous épuisent et retrouver une énergie durable.',
  badges: ['⚡ Énergie', '4 semaines', '2000 kcal / jour'],
  duration: '4 semaines', calories: '2000 kcal / jour', focus: 'Fer, magnésium, vitamines B & D',
  reasons: [
    ['🩸', 'Corriger les carences', 'Fer, vitamine D, magnésium, B12 : les 4 carences les plus fréquentes de la fatigue chronique.'],
    ['🍳', 'Petit-déjeuner protéiné', 'Pas de sucre le matin. Protéines + bons gras = énergie stable toute la matinée sans crash.'],
    ['☀️', 'Vitamine D et lumière', 'Marche matinale, poissons gras, soleil : la vitamine D manque à 70% des Français en hiver.'],
    ['🌙', 'Optimiser le sommeil', 'Le tryptophane, le magnésium et les rituels du soir pour un sommeil profond et récupérateur.'],
    ['📊', 'Glycémie stable', 'Éviter les montagnes russes glycémiques qui épuisent le pancréas et le cerveau.'],
    ['🧘', 'Cortisol & stress', 'La cohérence cardiaque réduit le cortisol de 23% en 6 semaines. Effet prouvé.'],
  ],
  navCards: [
    { to: '/plans/anti-fatigue/semaines', icon: '📅', title: 'Programme 4 semaines', desc: 'De la correction des carences à l\'optimisation du sommeil.', badge: '4 semaines' },
    { to: '/plans/anti-fatigue/journee-type', icon: '🍽️', title: 'Journée type 2000 kcal', desc: 'Glycémie stable, vitamines optimales, énergie durable.', badge: '2000 kcal' },
    { to: '/plans/anti-fatigue/recettes', icon: '👨‍🍳', title: 'Recettes énergisantes', desc: '4 recettes riches en fer, B12, magnésium et vitamine D.', badge: '4 recettes' },
    { to: '/plans/anti-fatigue/courses', icon: '🛒', title: 'Liste de courses', desc: 'Liste interactive cochable par catégories.', badge: 'Interactive' },
    { to: '/plans/anti-fatigue/sport', icon: '☀️', title: 'Activité & récupération', desc: 'Yoga restauratif, marche soleil, cohérence cardiaque.', badge: '4 conseils' },
    { to: '/plans/anti-fatigue/boissons', icon: '🍵', title: 'Boissons énergisantes', desc: 'Matcha, smoothies fer+vitamine C, eau. Ce qui booste vraiment.', badge: '7 boissons' },
  ],
  trackFields: [['petitdej', '🍳 Petit-déj protéiné'], ['fer', '🥩 Fer du jour'], ['soleil', '☀️ 15 min soleil'], ['sommeil', '🌙 Coucher avant 23h']],
};

export default function PlanAntiFatigue() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
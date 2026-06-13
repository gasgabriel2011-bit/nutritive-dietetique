import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'budget',
  titleLine1: 'Alimentation',
  titleLine2: 'petit budget',
  subtitle: '4 semaines pour manger sainement avec moins de 25€ par semaine. Légumineuses, anti-gaspi, cuisine du monde économique.',
  badges: ['💰 Budget', '4 semaines', '2000 kcal / jour', '<25€/semaine'],
  duration: '4 semaines', calories: '2000 kcal / jour', focus: 'Zéro gaspi & légumineuses',
  reasons: [
    ['🫘', 'Légumineuses = or nutritionnel', 'Lentilles à 0.15€ la portion protéinée vs viande à 2.50€. Même qualité nutritive, 15x moins cher.'],
    ['🥚', 'Les œufs, stars économiques', '0.18€ pièce, protéines complètes, vitamine D, B12, choline. L\'aliment le plus rentable.'],
    ['♻️', 'Zéro gaspillage', '30kg d\'aliments jetés par an en France = 100-150€ gaspillés. FIFO + congélateur + soupes anti-gaspi.'],
    ['🌍', 'Cuisine mondiale économique', 'Mujaddara libanaise, dal indien, ribollita italienne : les cuisines populaires du monde sont économiques et équilibrées.'],
    ['🛒', 'Stratégies d\'achat', 'Marché fin de journée, comparaison prix aux 100g, achats en vrac : économiser 30-40% facilement.'],
    ['🌱', 'Sport gratuit', 'Course, calisthenics, YouTube fitness, vélo : 0€ pour une activité physique complète.'],
  ],
  navCards: [
    { to: '/plans/petit-budget/semaines', icon: '📅', title: 'Programme 4 semaines', desc: 'Du placard intelligent au cuisine du monde économique.', badge: '4 semaines' },
    { to: '/plans/petit-budget/journee-type', icon: '🍽️', title: 'Journée type <3€', desc: 'Équilibrée et savoureuse pour moins de 3€ par jour.', badge: '<3€/jour' },
    { to: '/plans/petit-budget/recettes', icon: '👨‍🍳', title: 'Recettes économiques', desc: '4 recettes mondiales économiques : mujaddara, dal, frittata.', badge: '4 recettes' },
    { to: '/plans/petit-budget/courses', icon: '🛒', title: 'Liste de courses', desc: 'Avec prix indicatifs et budget total estimé.', badge: 'Avec prix' },
    { to: '/plans/petit-budget/sport', icon: '🏃', title: 'Sport gratuit', desc: 'Course, calisthenics, vélo, YouTube. 0€ d\'abonnement.', badge: '4 conseils' },
    { to: '/plans/petit-budget/boissons', icon: '💧', title: 'Boissons économiques', desc: 'Eau robinet, thé vrac, café filtre. Santé + économies.', badge: '6 boissons' },
  ],
  trackFields: [['budget', '💰 Budget respecté'], ['legumes', '🥦 Légumes cuisinés'], ['gaspi', '♻️ Zéro gaspi'], ['sport', '🏃 Sport gratuit']],
};

export default function PlanPetitBudget() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
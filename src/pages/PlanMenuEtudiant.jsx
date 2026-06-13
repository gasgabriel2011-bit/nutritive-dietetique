import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'etudiant',
  titleLine1: 'Menu',
  titleLine2: 'étudiant malin',
  subtitle: '4 semaines pour manger équilibré avec moins de 25€ par semaine. Batch cooking, légumineuses, zéro gaspi.',
  badges: ['📚 Étudiant', '4 semaines', '2100 kcal / jour', '<25€/semaine'],
  duration: '4 semaines', calories: '2100 kcal / jour', focus: 'Budget <25€/semaine',
  reasons: [
    ['💰', 'Budget maîtrisé', 'Lentilles, œufs, flocons d\'avoine, riz complet : les 4 aliments les plus économiques et nutritifs.'],
    ['⏱️', 'Rapide à préparer', '15-20 min maximum par repas. Recettes simples, ingrédients accessibles.'],
    ['🧠', 'Cerveau optimisé', 'Omega-3, glucose stable, choline : l\'alimentation qui soutient la concentration et la mémoire.'],
    ['♻️', 'Zéro gaspillage', 'Batch cooking du dimanche, congélation, frigo organisé = rien ne se perd.'],
    ['💪', 'Protéines complètes', 'Légumineuses + céréales = tous les acides aminés essentiels. Sans viande si voulu.'],
    ['🎓', 'Période d\'examens', 'Stratégies nutritionnelles spécifiques pour les révisions et la veille d\'examen.'],
  ],
  navCards: [
    { to: '/plans/menu-etudiant/semaines', icon: '📅', title: 'Programme 4 semaines', desc: 'Du batch cooking à la nutrition d\'examens, étape par étape.', badge: '4 semaines' },
    { to: '/plans/menu-etudiant/journee-type', icon: '🍽️', title: 'Journée type <5€', desc: 'Équilibrée, rapide, budget moins de 5€ par jour.', badge: '<5€/jour' },
    { to: '/plans/menu-etudiant/recettes', icon: '👨‍🍳', title: 'Recettes étudiantes', desc: '4 recettes rapides, économiques et équilibrées.', badge: '4 recettes' },
    { to: '/plans/menu-etudiant/courses', icon: '🛒', title: 'Liste de courses', desc: 'Courses avec prix indicatifs, cochable.', badge: 'Avec prix' },
    { to: '/plans/menu-etudiant/sport', icon: '🚴', title: 'Sport étudiant gratuit', desc: 'Vélo, SUAPS, YouTube, méditation. Tout gratuit.', badge: '4 conseils' },
    { to: '/plans/menu-etudiant/boissons', icon: '🍵', title: 'Boissons malines', desc: 'Eau robinet, thé vrac, café filtre. Économiques et sains.', badge: '7 boissons' },
  ],
  trackFields: [['batch', '🍳 Batch cooking fait'], ['budget', '💰 Budget respecté'], ['revision', '📖 Révision + pauses'], ['sport', '🚴 Activité du jour']],
};

export default function PlanMenuEtudiant() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
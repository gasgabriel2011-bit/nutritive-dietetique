import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'famille',
  titleLine1: 'Repas',
  titleLine2: 'famille sains',
  subtitle: '4 semaines pour que toute la famille mange mieux : légumes acceptés, protéines variées, goûters sains, moments partagés.',
  badges: ['👨‍👩‍👧‍👦 Famille', '4 semaines', '2200 kcal adulte'],
  duration: '4 semaines', calories: '2200 kcal adulte', focus: 'Légumes & diversité pour tous',
  reasons: [
    ['🥦', 'Légumes acceptés', 'Stratégies basées sur la science : exposition répétée, légumes cachés, participation à la cuisine.'],
    ['🍕', 'Plats améliorés', 'Pizza complète, bolognaise lentilles, cake sans sucre : mêmes plats préférés, meilleur profil nutritionnel.'],
    ['👨‍🍳', 'Cuisiner ensemble', 'Un enfant qui participe à la préparation mange toujours ce qu\'il a fait. La méthode la plus efficace.'],
    ['💪', 'Protéines variées', 'Introduire les légumineuses en douceur. 30% de viande en moins sans que personne s\'en aperçoive.'],
    ['🧁', 'Goûters sains', 'Cake banane-avoine, compote maison, pancakes : aussi bons que les industriels, 3x moins de sucre.'],
    ['🌳', 'Activité familiale', 'Vélo, piscine, jardinage, jeux actifs : bouger ensemble sans que ça ressemble à du sport.'],
  ],
  navCards: [
    { to: '/plans/repas-famille/semaines', icon: '📅', title: 'Programme 4 semaines', desc: 'Des légumes aux goûters sains, semaine par semaine.', badge: '4 semaines' },
    { to: '/plans/repas-famille/journee-type', icon: '🍽️', title: 'Journée type famille', desc: 'Repas appréciés par enfants et adultes.', badge: '4 repas' },
    { to: '/plans/repas-famille/recettes', icon: '👨‍🍳', title: 'Recettes famille', desc: '4 recettes approuvées enfants : bolognaise cachée, pizza, cake.', badge: '4 recettes' },
    { to: '/plans/repas-famille/courses', icon: '🛒', title: 'Liste de courses', desc: 'Courses familiales interactives et cochables.', badge: 'Interactive' },
    { to: '/plans/repas-famille/sport', icon: '🚴', title: 'Activité familiale', desc: 'Vélo, piscine, jardinage, jeux actifs ensemble.', badge: '4 conseils' },
    { to: '/plans/repas-famille/boissons', icon: '💧', title: 'Boissons famille', desc: 'Eau, lait, tisanes, sodas : ce qu\'on dit aux enfants.', badge: '6 boissons' },
  ],
  trackFields: [['legumes', '🥦 Légumes du repas'], ['enfants', '👶 Acceptés enfants'], ['gouter', '🍎 Goûter sain'], ['activite', '🚴 Sortie active']],
};

export default function PlanRepasFamille() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
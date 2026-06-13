import PlanGate from '../components/PlanGate';
import PlanHub from '../components/plans/PlanHub';

const CONFIG = {
  slug: 'digestif',
  titleLine1: 'Programme',
  titleLine2: 'confort digestif',
  subtitle: '6 semaines pour identifier vos déclencheurs, nourrir votre microbiote et retrouver un confort intestinal durable.',
  badges: ['🌿 Digestion', '6 semaines', '1900 kcal / jour'],
  duration: '6 semaines', calories: '1900 kcal / jour', focus: 'Microbiote & FODMAP',
  reasons: [
    ['🔍', 'Identifier vos déclencheurs', 'Journal alimentaire + symptômes pour isoler les aliments qui vous posent problème personnellement.'],
    ['🦠', 'Nourrir le microbiote', 'Prébiotiques, probiotiques, diversité végétale : les 3 piliers d\'un microbiote équilibré.'],
    ['🌿', 'Approche FODMAP progressive', 'Élimination temporaire puis réintroduction méthodique : la méthode la plus validée scientifiquement.'],
    ['🧘', 'Axe intestin-cerveau', 'Le stress impacte directement la digestion. Gestion du stress = gestion du confort intestinal.'],
    ['🚶', 'Mouvement doux', 'Marche post-repas, yoga digestif : les activités physiques les plus bénéfiques pour l\'intestin.'],
    ['⏳', 'Patience & régularité', 'Le microbiote se transforme en 4-6 semaines avec une alimentation cohérente. Pas de miracle rapide.'],
  ],
  navCards: [
    { to: '/plans/confort-digestif/semaines', icon: '📅', title: 'Programme 6 semaines', desc: 'Semaine par semaine : objectifs, aliments, activité.', badge: '6 semaines' },
    { to: '/plans/confort-digestif/journee-type', icon: '🍽️', title: 'Journée type 1900 kcal', desc: 'Alimentation douce et anti-inflammatoire au quotidien.', badge: '1900 kcal' },
    { to: '/plans/confort-digestif/recettes', icon: '👨‍🍳', title: 'Recettes digestives', desc: '6 recettes douces, anti-ballonnements, probiotiques.', badge: '6 recettes' },
    { to: '/plans/confort-digestif/courses', icon: '🛒', title: 'Liste de courses', desc: 'Liste interactive cochable par catégories.', badge: 'Interactive' },
    { to: '/plans/confort-digestif/sport', icon: '🧘', title: 'Activité & bien-être', desc: 'Yoga digestif, marche, respiration : les meilleures activités.', badge: '4 conseils' },
    { to: '/plans/confort-digestif/boissons', icon: '🫖', title: 'Boissons conseillées', desc: 'Tisanes, kéfir, eau : ce qui aide vraiment l\'intestin.', badge: '7 boissons' },
  ],
  trackFields: [['repas', '🍽️ Repas doux'], ['symptoms', '✅ Pas de symptômes'], ['water', '💧 Hydratation ok'], ['yoga', '🧘 Yoga/marche']],
};

export default function PlanConfortDigestif() {
  return <PlanGate><PlanHub config={CONFIG} /></PlanGate>;
}
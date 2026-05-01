import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';

const PLAN_CATEGORIES = [
  { value: '', label: 'Tous', icon: '🍽️' },
  { value: 'seche', label: 'Sèche', icon: '🔥' },
  { value: 'reequilibrage', label: 'Rééquilibrage', icon: '⚖️' },
  { value: 'prise-de-muscle', label: 'Prise de muscle', icon: '💪' },
  { value: 'sante-digestive', label: 'Santé digestive', icon: '🌿' },
  { value: 'fatigue', label: 'Anti-fatigue', icon: '⚡' },
  { value: 'etudiants', label: 'Étudiants', icon: '📚' },
  { value: 'emploi-charge', label: 'Emploi chargé', icon: '⏰' },
  { value: 'famille', label: 'Famille', icon: '👨‍👩‍👧‍👦' },
  { value: 'budget-serre', label: 'Petit budget', icon: '💰' },
];

const PLANS_DATA = [
  { id: '1', title: 'Programme Sèche Progressive', description: 'Un plan alimentaire pour perdre du gras progressivement tout en préservant la masse musculaire. Approche douce et durable.', category: 'seche', duration_weeks: 8, calories_target: 1800, benefits: ['Perte de gras progressive (0.5-1% du poids/semaine)', 'Maintien de la masse musculaire', 'Pas de frustration ni de fringales', "Amélioration de l'énergie"], tips: 'Déficit modéré de 300-500 kcal. Protéines à 1.6g/kg pour préserver le muscle.' },
  { id: '2', title: 'Rééquilibrage Alimentaire', description: "Renouer avec une alimentation saine sans compter les calories. Basé sur l'écoute du corps et la qualité des aliments.", category: 'reequilibrage', duration_weeks: 12, calories_target: 2000, benefits: ['Rééducation des sensations alimentaires', 'Amélioration du transit', 'Stabilisation du poids', 'Meilleure énergie au quotidien'], tips: "Pas de restriction, pas d'interdits. L'objectif est de retrouver une relation saine avec la nourriture." },
  { id: '3', title: 'Prise de Masse Propre', description: 'Gagner du muscle avec un surplus calorique contrôlé et des aliments de qualité.', category: 'prise-de-muscle', duration_weeks: 12, calories_target: 2800, benefits: ['Gain de masse musculaire de 0.5-1kg par mois', 'Amélioration de la force', 'Récupération optimisée', 'Prise de gras minimisée'], tips: "Surplus de +300-500 kcal. Protéines à 1.8-2g/kg. Entraînement régulier indispensable." },
  { id: '4', title: 'Confort Digestif', description: 'Un plan spécifique pour améliorer le confort digestif : ballonnements, transit, sensibilités alimentaires.', category: 'sante-digestive', duration_weeks: 6, calories_target: 1900, benefits: ['Réduction des ballonnements', 'Amélioration du transit', 'Identification des intolérances', 'Meilleur confort au quotidien'], tips: 'Réintroduction progressive des aliments fermentescibles. Tenez un journal alimentaire.' },
  { id: '5', title: 'Plan Anti-Fatigue', description: 'Retrouvez votre énergie grâce à une alimentation ciblée : fer, vitamines B, magnésium.', category: 'fatigue', duration_weeks: 4, calories_target: 2000, benefits: ['Énergie stable toute la journée', 'Meilleure concentration', 'Réduction de la fatigue chronique', 'Amélioration du sommeil'], tips: 'Privilégiez les aliments riches en fer (lentilles, épinards) et en vitamine C pour l\'absorption.' },
  { id: '6', title: 'Menu Étudiant Malin', description: 'Manger équilibré avec un budget et un temps limité. Recettes rapides et batch cooking.', category: 'etudiants', duration_weeks: 4, calories_target: 2100, benefits: ['Budget courses <30€/semaine', 'Préparation rapide (<20min/repas)', 'Equilibre nutritionnel garanti', 'Liste de courses optimisée'], tips: 'Le batch cooking du dimanche est votre meilleur allié.' },
  { id: '7', title: 'Programme Emploi Chargé', description: 'Des repas rapides et équilibrés pour ceux qui manquent de temps.', category: 'emploi-charge', duration_weeks: 4, calories_target: 2000, benefits: ['Repas prêts en <15 minutes', 'Préparation le dimanche pour la semaine', 'Pas de compromis sur la nutrition', 'Fini les repas sautés'], tips: 'Préparez 3-4 lunch boxes le dimanche soir.' },
  { id: '8', title: 'Repas Famille Sains', description: 'Des menus qui plaisent à toute la famille : enfants, ados et adultes.', category: 'famille', duration_weeks: 4, calories_target: 2200, benefits: ['Repas appréciés par tous', 'Introduction douce des légumes', 'Moments de partage en cuisine', 'Moins de plats industriels'], tips: 'Impliquez les enfants dans la préparation.' },
  { id: '9', title: 'Alimentation Petit Budget', description: 'Manger sainement sans se ruiner. Privilégier les aliments de base et cuisiner maison.', category: 'budget-serre', duration_weeks: 4, calories_target: 2000, benefits: ['Budget <25€/semaine/personne', 'Plats rassasiants et nutritifs', 'Réduction du gaspillage', 'Cuisine simple et savoureuse'], tips: 'Les légumineuses sèches coûtent 3x moins cher que la viande pour autant de protéines.' },
];

export default function MealPlans() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedPlan, setExpandedPlan] = useState(null);

  const filtered = PLANS_DATA.filter(p => !selectedCategory || p.category === selectedCategory);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Plans <span className="italic font-semibold text-primary">alimentaires</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des programmes adaptés à chaque objectif et chaque mode de vie. 
            Flexibles, progressifs et fondés sur les preuves.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PLAN_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-card border border-border text-foreground/70 hover:border-primary/30'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plan, i) => {
            const catInfo = PLAN_CATEGORIES.find(c => c.value === plan.category);
            return (
              <AnimatedSection key={plan.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
                  onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{catInfo?.icon || '🍽️'}</span>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expandedPlan === plan.id ? 'rotate-90' : ''}`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {plan.title}
                  </h3>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plan.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {plan.duration_weeks && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {plan.duration_weeks} sem.
                      </span>
                    )}
                    {plan.calories_target && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {plan.calories_target} kcal/j
                      </span>
                    )}
                  </div>

                  {expandedPlan === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-border overflow-hidden"
                    >
                      {plan.benefits?.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Target className="w-4 h-4 text-primary" />
                            Bénéfices
                          </h4>
                          <ul className="space-y-1">
                            {plan.benefits.map((b, j) => (
                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {plan.tips && (
                        <p className="text-xs text-muted-foreground bg-primary/5 rounded-xl p-3">
                          💡 {plan.tips}
                        </p>
                      )}
                      {plan.category === 'seche' && (
                        <Link
                          to="/plans/seche-progressive"
                          onClick={(event) => event.stopPropagation()}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                        >
                          Ouvrir le programme
                        </Link>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Aucun plan disponible pour cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
}

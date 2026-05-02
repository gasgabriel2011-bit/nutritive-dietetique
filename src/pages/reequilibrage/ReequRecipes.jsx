import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import RecipeCard from '../../components/recipes/RecipeCard';
import RecipeDetail from '../../components/recipes/RecipeDetail';
import { REEQUILIBRAGE_RECIPES } from '../../lib/reequilibrageData';

const FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'petitdej', label: 'Petit-déjeuner' },
  { id: 'dejeuner', label: 'Déjeuner' },
  { id: 'diner', label: 'Dîner' },
  { id: 'collation', label: 'Collation / Dessert' },
];

const EXTRA_IDEAS = [
  'Soupe miso légumes', 'Tartines pain noir saumon', 'Flan caramel allégé',
  'Salade poulpe herbes', 'Quiche légère épinards', 'Risotto chou-fleur',
  'Velouté butternut', 'Salade riz estivale', 'Brochettes légumes halloumi',
  'Smoothie bowl mangue', 'Ceviche légumes', 'Tajine agneau légumes',
  'Gratin brocoli', 'Soupe thaïe légère', 'Mini quiches légumes',
  'Salade endives noix', 'Bol vermicelles légumes', 'Soufflé fromage léger',
];

export default function ReequRecipes() {
  const [filter, setFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filtered = filter === 'all'
    ? REEQUILIBRAGE_RECIPES
    : REEQUILIBRAGE_RECIPES.filter(r => r.meal_category === filter);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/reequilibrage-alimentaire" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Recettes <span className="italic font-semibold text-primary">du rééquilibrage</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            {REEQUILIBRAGE_RECIPES.length} recettes familiales, simples et équilibrées pour le programme.
          </p>
        </AnimatedSection>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                filter === f.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border text-foreground/70 hover:border-primary/30'
              }`}
            >
              {f.label} {f.id !== 'all' && `(${REEQUILIBRAGE_RECIPES.filter(r => r.meal_category === f.id).length})`}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filtered.map((recipe, i) => (
            <AnimatedSection key={recipe.id} delay={i * 0.04}>
              <div className="relative">
                {recipe.meal_prep && (
                  <span className="absolute top-3 right-3 z-10 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    🍱 Meal prep
                  </span>
                )}
                <RecipeCard recipe={recipe} onClick={setSelectedRecipe} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.1}>
          <div className="bg-card rounded-3xl p-6 border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">
              ℹ️ <strong className="text-foreground">Ces recettes sont proposées à titre indicatif.</strong> N'hésitez pas à rechercher d'autres idées sur internet !
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Voici d'autres noms de recettes adaptées au rééquilibrage alimentaire :
            </p>
            <div className="flex flex-wrap gap-2">
              {EXTRA_IDEAS.map(idea => (
                <span key={idea} className="px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20">
                  {idea}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          image={selectedRecipe.image_url}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
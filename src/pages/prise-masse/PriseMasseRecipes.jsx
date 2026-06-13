import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import RecipeCard from '../../components/recipes/RecipeCard';
import RecipeDetail from '../../components/recipes/RecipeDetail';
import { PRISE_MASSE_RECIPES } from '../../lib/priseMasseData';

const MEAL_CATEGORIES = [
  { value: '', label: 'Toutes' },
  { value: 'petitdej', label: 'Petit-déjeuner' },
  { value: 'dejeuner', label: 'Déjeuner' },
  { value: 'diner', label: 'Dîner' },
  { value: 'collation', label: 'Collation' },
];

export default function PriseMasseRecipes() {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = PRISE_MASSE_RECIPES.filter(r => !filter || r.meal_category === filter);

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/prise-masse-propre" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au programme
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
            Recettes <span className="italic font-semibold text-secondary">prise de masse</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8">24 recettes denses et savoureuses pour atteindre 2800 kcal sans se forcer.</p>
        </AnimatedSection>

        {/* Filtres */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {MEAL_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  filter === cat.value
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-card border border-border text-foreground/70 hover:border-secondary/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid recettes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe, i) => (
            <AnimatedSection key={recipe.id} delay={i * 0.04}>
              <RecipeCard
                recipe={recipe}
                image={recipe.image_url}
                onClick={setSelected}
              />
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucune recette pour ce filtre</p>
          </div>
        )}
      </div>

      {selected && (
        <RecipeDetail
          recipe={selected}
          image={selected.image_url}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Clock, Flame, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const previewRecipes = [
  {
    title: 'Bowl méditerranéen',
    time: '20 min',
    calories: '420 kcal',
    category: 'Déjeuner',
  },
  {
    title: 'Porridge protéiné',
    time: '10 min',
    calories: '350 kcal',
    category: 'Petit-déjeuner',
  },
  {
    title: 'Saumon grillé aux légumes',
    time: '25 min',
    calories: '480 kcal',
    category: 'Dîner',
  },
];

export default function RecipePreview({ images }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-foreground mb-4">
              Recettes <span className="italic font-semibold text-primary">équilibrées</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              Des idées simples, savoureuses et nutritionnellement optimisées
            </p>
          </div>
          <Link
            to="/recettes"
            className="group inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Voir toutes les recettes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewRecipes.map((recipe, i) => (
            <AnimatedSection key={recipe.title} delay={i * 0.1}>
              <Link to="/recettes" className="group block">
                <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={images[i]}
                      alt={recipe.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                        {recipe.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {recipe.calories}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Clock, Flame, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeCard({ recipe, onClick, image }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(recipe)}
      className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500 cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={image || recipe.image_url || '/placeholder.jpg'}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
            {recipe.category}
          </span>
        </div>
        {recipe.difficulty && (
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              recipe.difficulty === 'facile' ? 'bg-primary/80 text-primary-foreground' :
              recipe.difficulty === 'moyen' ? 'bg-secondary/80 text-secondary-foreground' :
              'bg-foreground/80 text-background'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{recipe.description}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {recipe.prep_time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {recipe.prep_time + (recipe.cook_time || 0)} min
            </span>
          )}
          {recipe.calories && (
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {recipe.calories} kcal
            </span>
          )}
          {recipe.proteins && (
            <span className="flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5" />
              {recipe.proteins}g prot.
            </span>
          )}
        </div>
        {/* Macro bar */}
        {(recipe.proteins || recipe.carbs || recipe.fats) && (
          <div className="mt-3 flex gap-1 h-1.5 rounded-full overflow-hidden bg-muted">
            {recipe.proteins > 0 && (
              <div
                className="bg-primary rounded-full"
                style={{ flex: recipe.proteins }}
              />
            )}
            {recipe.carbs > 0 && (
              <div
                className="bg-secondary rounded-full"
                style={{ flex: recipe.carbs }}
              />
            )}
            {recipe.fats > 0 && (
              <div
                className="bg-foreground/30 rounded-full"
                style={{ flex: recipe.fats }}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
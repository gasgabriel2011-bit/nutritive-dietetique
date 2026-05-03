import { X, Clock, Flame, Dumbbell, ChefHat, Lightbulb, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedImageUrl } from '@/lib/imageOptimization';

export default function RecipeDetail({ recipe, image, onClose }) {
  if (!recipe) return null;

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
  const imageSrc = getOptimizedImageUrl(image || recipe.image_url || '/placeholder.jpg', { width: 900, quality: 78 });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative">
            <img
              src={imageSrc}
              alt={recipe.title}
              decoding="async"
              fetchPriority="high"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
                {recipe.category}
              </span>
              {recipe.difficulty && (
                <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                  {recipe.difficulty}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-2">{recipe.title}</h2>
            {recipe.description && (
              <p className="text-muted-foreground mb-6">{recipe.description}</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {totalTime > 0 && (
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold">{totalTime} min</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              )}
              {recipe.calories && (
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <Flame className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <p className="text-sm font-semibold">{recipe.calories}</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              )}
              {recipe.proteins && (
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <Dumbbell className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold">{recipe.proteins}g</p>
                  <p className="text-xs text-muted-foreground">Protéines</p>
                </div>
              )}
              {recipe.servings && (
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <ChefHat className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <p className="text-sm font-semibold">{recipe.servings}</p>
                  <p className="text-xs text-muted-foreground">Portions</p>
                </div>
              )}
            </div>

            {/* Macros bar */}
            {(recipe.proteins || recipe.carbs || recipe.fats) && (
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-3">Macronutriments</h3>
                <div className="flex gap-4 text-sm mb-2">
                  {recipe.proteins > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary" /> Protéines: {recipe.proteins}g</span>}
                  {recipe.carbs > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-secondary" /> Glucides: {recipe.carbs}g</span>}
                  {recipe.fats > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-foreground/30" /> Lipides: {recipe.fats}g</span>}
                </div>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-muted">
                  {recipe.proteins > 0 && <div className="bg-primary rounded-full" style={{ flex: recipe.proteins }} />}
                  {recipe.carbs > 0 && <div className="bg-secondary rounded-full" style={{ flex: recipe.carbs }} />}
                  {recipe.fats > 0 && <div className="bg-foreground/30 rounded-full" style={{ flex: recipe.fats }} />}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {recipe.ingredients?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-3">Ingrédients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {recipe.steps?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-3">Préparation</h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tips */}
            {recipe.dietitian_tips && (
              <div className="bg-primary/5 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-sm">Conseil du diététicien</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{recipe.dietitian_tips}</p>
              </div>
            )}

            {recipe.allergy_alternatives && (
              <div className="bg-secondary/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-secondary" />
                  <h4 className="font-semibold text-sm">Alternatives allergies</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{recipe.allergy_alternatives}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

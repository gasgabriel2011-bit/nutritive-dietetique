import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import RecipeCard from '../../components/recipes/RecipeCard';
import RecipeDetail from '../../components/recipes/RecipeDetail';
import PlanGate from '../../components/PlanGate';
import { DIGESTIF_RECIPES } from '../../lib/digestifData';

function DigestifRecipesContent() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link to="/plans/confort-digestif" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Retour</Link>
          <h1 className="font-display text-4xl font-light mb-3">Recettes <span className="italic font-semibold text-primary">digestives</span></h1>
          <p className="text-sm text-muted-foreground mb-8">Douces, anti-inflammatoires, prébiotiques.</p>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIGESTIF_RECIPES.map((r, i) => <AnimatedSection key={r.id} delay={i * 0.04}><RecipeCard recipe={r} image={r.image_url} onClick={setSelected} /></AnimatedSection>)}
        </div>
      </div>
      {selected && <RecipeDetail recipe={selected} image={selected.image_url} onClose={() => setSelected(null)} />}
    </div>
  );
}
export default function DigestifRecipes() { return <PlanGate><DigestifRecipesContent /></PlanGate>; }
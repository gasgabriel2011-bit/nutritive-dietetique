import { useState } from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import ReactMarkdown from 'react-markdown';

const BLOG_CATEGORIES = [
  { value: '', label: 'Tous les articles' },
  { value: 'assiette-equilibree', label: 'Assiette équilibrée' },
  { value: 'proteines', label: 'Protéines' },
  { value: 'fibres', label: 'Fibres' },
  { value: 'hydratation', label: 'Hydratation' },
  { value: 'sommeil', label: 'Sommeil & faim' },
  { value: 'envies', label: 'Gestion des envies' },
  { value: 'motivation', label: 'Motivation' },
  { value: 'erreurs', label: 'Erreurs fréquentes' },
];

const ARTICLES_DATA = [
  { id: '1', title: "Comment composer une assiette équilibrée", excerpt: "Découvrez la méthode simple pour construire un repas complet et nutritif, avec les bonnes proportions de chaque groupe alimentaire.", content: "## La méthode de l'assiette\n\nL'assiette idéale se divise en trois parties :\n\n### 1. La moitié : légumes\nCrus ou cuits, les légumes doivent occuper la plus grande place. Ils apportent fibres, vitamines et minéraux essentiels.\n\n### 2. Un quart : protéines\nViande maigre, poisson, œufs, légumineuses ou tofu. Variez les sources tout au long de la semaine.\n\n### 3. Un quart : féculents complets\nRiz complet, quinoa, pâtes complètes, patate douce. Ils fournissent l'énergie durable.\n\n### N'oubliez pas !\n- Une source de bonnes graisses (huile d'olive, avocat, noix)\n- De l'eau comme boisson principale\n- Des épices et herbes pour le goût et les antioxydants", category: 'assiette-equilibree', read_time: 4 },
  { id: '2', title: "Les protéines : combien, quand et lesquelles ?", excerpt: "Guide complet sur les protéines : besoins réels, meilleures sources et stratégies pour optimiser votre apport protéique.", content: "## Vos besoins en protéines\n\nLa plupart des adultes ont besoin de **0.8 à 1.2g par kg** de poids corporel par jour.\n\n### Les meilleures sources\n- **Animales** : poulet, poisson, œufs, produits laitiers\n- **Végétales** : légumineuses, tofu, tempeh, seitan\n\n### Répartition dans la journée\nRépartissez vos protéines sur 3-4 repas plutôt que tout concentrer au dîner.\n\n### Protéines végétales\nCombinez légumineuses + céréales dans la journée pour un profil d'acides aminés complet.", category: 'proteines', read_time: 5 },
  { id: '3', title: "Pourquoi les fibres sont votre meilleur allié", excerpt: "Les fibres alimentaires sont essentielles à votre santé digestive, votre satiété et même votre humeur. Voici comment en manger plus.", content: "## Les fibres, héros méconnus\n\n### Deux types de fibres\n- **Solubles** : avoine, légumineuses, fruits. Ralentissent l'absorption des sucres.\n- **Insolubles** : céréales complètes, légumes. Favorisent le transit.\n\n### Objectif : 25-30g par jour\nLa plupart des Français n'en consomment que 17g.\n\n### Comment augmenter ?\n1. Choisissez des céréales complètes\n2. Ajoutez des légumineuses 3x par semaine\n3. Mangez des fruits entiers plutôt qu'en jus\n4. Augmentez progressivement et buvez plus d'eau.", category: 'fibres', read_time: 4 },
  { id: '4', title: "L'hydratation : au-delà de 2 litres par jour", excerpt: "L'eau est votre premier supplément. Découvrez vos vrais besoins et des astuces pour rester bien hydraté.", content: "## Vos besoins réels\n\nLe fameux \"2 litres\" est une moyenne. Vos besoins dépendent de votre poids, activité physique et température.\n\n### Signes de déshydratation\n- Urines foncées\n- Fatigue\n- Maux de tête\n- Difficultés de concentration\n\n### Astuces pratiques\n1. Gardez une bouteille visible\n2. Buvez un verre au réveil\n3. Mangez des aliments riches en eau\n4. Utilisez une app de suivi", category: 'hydratation', read_time: 3 },
  { id: '5', title: "Sommeil et nutrition : le lien caché", excerpt: "Mal dormir fait grossir ? Découvrez comment le sommeil influence directement vos choix alimentaires et votre métabolisme.", content: "## Le cercle sommeil-alimentation\n\n### Moins de sommeil = plus de faim\nLe manque de sommeil augmente la **ghréline** (hormone de la faim) et diminue la **leptine** (hormone de satiété).\n\n### Ce que montrent les études\n- Dormir <6h augmente le risque d'obésité de 30%\n- Le manque de sommeil favorise les choix alimentaires riches en sucre\n\n### Améliorer son sommeil\n1. Dernière caféine avant 14h\n2. Dîner léger 2-3h avant le coucher\n3. Aliments favorisant le sommeil : cerises, kiwi, noix\n4. Routine régulière de coucher", category: 'sommeil', read_time: 5 },
  { id: '6', title: "Gérer les envies de sucre sans frustration", excerpt: "Les envies de sucré ne sont pas un manque de volonté. Voici des stratégies scientifiques pour les gérer sereinement.", content: "## Comprendre les envies\n\nLes envies de sucre sont souvent liées à un déficit calorique, le stress ou l'habitude.\n\n### Stratégies efficaces\n1. **Ne pas sauter de repas** : la stabilité glycémique évite les fringales\n2. **Protéines + fibres** à chaque repas\n3. **Goûter prévu** : fruits + oléagineux\n4. **Pleine conscience** : pause avant de manger\n5. **Alternatives** : carré de chocolat noir 70%+\n\n### Le piège de la restriction\nPlus vous interdisez un aliment, plus l'envie augmente.", category: 'envies', read_time: 4 },
  { id: '7', title: "Rester motivé sur la durée", excerpt: "La motivation fluctue, et c'est normal. Voici comment construire des habitudes durables plutôt que de dépendre de la motivation.", content: "## La motivation ne suffit pas\n\n### Les habitudes > la motivation\nLa clé n'est pas la motivation mais la **régularité**.\n\n### La règle des 2 minutes\nCommencez par des actions minuscules :\n- \"Manger plus de légumes\" → \"Ajouter 1 légume au déjeuner\"\n- \"Boire plus d'eau\" → \"1 verre au réveil\"\n\n### Accepter l'imperfection\nUne journée \"moins bien\" ne gâche pas tout. Ce qui compte : la tendance générale sur des semaines et des mois.", category: 'motivation', read_time: 4 },
  { id: '8', title: "Les 10 erreurs nutritionnelles les plus fréquentes", excerpt: "De la peur des glucides à l'excès de compléments : les erreurs que nous voyons le plus en consultation.", content: "## Évitez ces pièges\n\n1. **Sauter le petit-déjeuner** : pas obligatoire, mais si vous avez faim, mangez\n2. **Diaboliser les glucides** : votre cerveau en a besoin\n3. **Manger trop peu** : un déficit excessif ralentit le métabolisme\n4. **Compter obsessivement les calories** : la qualité > la quantité\n5. **Négliger les graisses** : les bonnes graisses sont essentielles\n6. **Manger trop vite** : 20 min minimum par repas\n7. **Être trop strict** : la flexibilité est la clé de la durée", category: 'erreurs', read_time: 6 },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openArticle, setOpenArticle] = useState(null);

  const filtered = ARTICLES_DATA.filter(a => !selectedCategory || a.category === selectedCategory);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Blog <span className="italic font-semibold text-primary">scientifique</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Articles pédagogiques fondés sur les preuves pour comprendre 
            la nutrition et faire les bons choix au quotidien.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground/70 hover:border-primary/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group h-full flex flex-col"
                onClick={() => setOpenArticle(article)}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {BLOG_CATEGORIES.find(c => c.value === article.category)?.label || article.category}
                    </span>
                    {article.read_time && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.read_time} min
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{article.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                    Lire l'article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Aucun article dans cette catégorie</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {openArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setOpenArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-card rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl my-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {BLOG_CATEGORIES.find(c => c.value === openArticle.category)?.label || openArticle.category}
                  </span>
                  {openArticle.read_time && (
                    <span className="text-xs text-muted-foreground">{openArticle.read_time} min de lecture</span>
                  )}
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground mb-4">{openArticle.title}</h2>
                {openArticle.content && (
                  <div className="prose prose-sm max-w-none text-foreground/80">
                    <ReactMarkdown>{openArticle.content}</ReactMarkdown>
                  </div>
                )}
                <button
                  onClick={() => setOpenArticle(null)}
                  className="mt-8 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
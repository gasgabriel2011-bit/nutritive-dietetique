import { useState } from 'react';
import { Search } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeDetail from '../components/recipes/RecipeDetail';

const CATEGORIES = [
  { value: '', label: 'Toutes' },
  { value: 'petit-dejeuner', label: 'Petit-déjeuner' },
  { value: 'dejeuner', label: 'Déjeuner' },
  { value: 'diner', label: 'Dîner' },
  { value: 'snack', label: 'Snacks' },
  { value: 'rapide', label: 'Rapide' },
  { value: 'petit-budget', label: 'Petit budget' },
  { value: 'sport', label: 'Sport' },
  { value: 'vegetarien', label: 'Végétarien' },
  { value: 'perte-de-poids', label: 'Perte de poids' },
  { value: 'prise-de-masse', label: 'Prise de masse' },
];

const RECIPES_DATA = [
  // === DÉJEUNER ===
  {
    id: '1', title: 'Bowl Méditerranéen aux pois chiches',
    description: 'Un bowl complet et coloré inspiré de la cuisine méditerranéenne, riche en fibres et protéines végétales.',
    category: 'dejeuner', prep_time: 15, cook_time: 10, calories: 420, proteins: 18, carbs: 52, fats: 16, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    ingredients: ['200g de pois chiches cuits', '100g de quinoa', '1 concombre', '10 tomates cerises', '50g de feta', '1 avocat', "Jus d'un citron", "2 c.à.s. d'huile d'olive"],
    steps: ['Cuire le quinoa.', 'Couper les légumes.', 'Assembler le bowl.', 'Assaisonner et servir.'],
    dietitian_tips: 'Les pois chiches sont une excellente source de protéines végétales et de fibres.',
    tags: ['méditerranéen', 'fibres'],
  },
  {
    id: '1b', title: 'Wrap Thon Avocat Roquette',
    description: 'Un déjeuner express riche en protéines et en bonnes graisses.',
    category: 'dejeuner', prep_time: 10, cook_time: 0, calories: 390, proteins: 28, carbs: 32, fats: 16, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600',
    ingredients: ['1 tortilla complète', '1 boîte de thon', '1/2 avocat', 'Roquette', '1 tomate', 'Moutarde'],
    steps: ['Tartiner la tortilla.', 'Ajouter les ingrédients.', 'Rouler et déguster.'],
    dietitian_tips: 'Le thon apporte des oméga-3 et des protéines complètes.',
    tags: ['rapide', 'protéines'],
  },
  {
    id: '1c', title: 'Salade Niçoise Revisitée',
    description: 'La classique salade niçoise avec une touche moderne et équilibrée.',
    category: 'dejeuner', prep_time: 15, cook_time: 10, calories: 380, proteins: 25, carbs: 22, fats: 20, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600',
    ingredients: ['200g de thon', '4 oeufs', 'Haricots verts', 'Tomates cerises', 'Olives', 'Anchois', 'Vinaigrette moutarde'],
    steps: ['Cuire les oeufs durs.', 'Blanchir les haricots.', 'Assembler la salade.', 'Assaisonner.'],
    dietitian_tips: 'Riche en protéines et en bons acides gras monoinsaturés grâce aux olives.',
    tags: ['protéines', 'méditerranéen'],
  },

  // === PETIT-DÉJEUNER ===
  {
    id: '2', title: 'Porridge Protéiné Banane-Noisettes',
    description: 'Un petit-déjeuner rassasiant et gourmand, parfait pour bien commencer la journée.',
    category: 'petit-dejeuner', prep_time: 5, cook_time: 5, calories: 380, proteins: 15, carbs: 48, fats: 14, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600',
    ingredients: ["50g de flocons d'avoine", '200ml de lait végétal', '1 banane mûre', '1 c.à.s. de beurre de noisettes', 'Cannelle'],
    steps: ['Chauffer le lait.', 'Ajouter les flocons et cuire 5 min.', 'Garnir de banane et noisettes.'],
    dietitian_tips: "Les flocons d'avoine sont riches en bêta-glucanes, bénéfiques pour le cholestérol.",
    tags: ['petit-déjeuner', 'énergie'],
  },
  {
    id: '2b', title: 'Pancakes Avoine & Myrtilles',
    description: "Des pancakes moelleux à base de flocons d'avoine et garnis de myrtilles fraîches.",
    category: 'petit-dejeuner', prep_time: 5, cook_time: 10, calories: 340, proteins: 14, carbs: 50, fats: 10, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
    ingredients: ["80g de flocons d'avoine mixés", '2 oeufs', '100ml de lait', '1 c.à.c. de levure', 'Myrtilles fraîches'],
    steps: ['Mixer les flocons.', 'Mélanger avec les oeufs et le lait.', 'Cuire à la poêle.', 'Garnir de myrtilles.'],
    dietitian_tips: 'Un indice glycémique bas pour une énergie stable toute la matinée.',
    tags: ['petit-déjeuner', 'fibres'],
  },
  {
    id: '2c', title: 'Toast Avocat-Oeuf Poché',
    description: 'Le combo parfait : avocat crémeux et oeuf poché sur pain complet grillé.',
    category: 'petit-dejeuner', prep_time: 5, cook_time: 5, calories: 360, proteins: 16, carbs: 30, fats: 20, servings: 1, difficulty: 'moyen',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600',
    ingredients: ['2 tranches de pain complet', '1 avocat', '2 oeufs', 'Citron', 'Sel, poivre', 'Piment'],
    steps: ['Griller le pain.', "Écraser l'avocat avec citron et sel.", 'Pocher les oeufs 3 min.', 'Assembler et servir.'],
    dietitian_tips: "L'avocat apporte des graisses monoinsaturées bénéfiques pour le coeur.",
    tags: ['protéines', 'graisses saines'],
  },

  // === DÎNER ===
  {
    id: '3', title: 'Saumon Grillé et Légumes Rôtis',
    description: 'Un dîner équilibré et savoureux avec des oméga-3 et des légumes de saison.',
    category: 'diner', prep_time: 10, cook_time: 20, calories: 480, proteins: 35, carbs: 28, fats: 24, servings: 2, difficulty: 'moyen',
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
    ingredients: ['2 pavés de saumon', '2 patates douces', '1 brocoli', '1 poivron rouge', "Huile d'olive", 'Herbes de Provence'],
    steps: ['Préchauffer le four à 200°C.', 'Rôtir les légumes 15 min.', 'Ajouter le saumon, cuire 15 min.', 'Servir avec un filet de citron.'],
    dietitian_tips: "Le saumon est une excellente source d'oméga-3 EPA et DHA.",
    tags: ['oméga-3', 'protéines'],
  },
  {
    id: '3b', title: 'Poulet Rôti Légumes Printaniers',
    description: 'Un dîner simple et nutritif, idéal pour toute la famille.',
    category: 'diner', prep_time: 10, cook_time: 30, calories: 460, proteins: 38, carbs: 24, fats: 18, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600',
    ingredients: ['2 blancs de poulet', 'Courgettes', 'Carottes', 'Poivrons', "Huile d'olive", 'Thym, romarin'],
    steps: ['Mariner le poulet avec les herbes.', 'Couper les légumes.', 'Tout enfourner à 200°C 30 min.'],
    dietitian_tips: "Le poulet est la protéine maigre par excellence. Évitez la peau pour moins de graisses saturées.",
    tags: ['protéines', 'légumes'],
  },
  {
    id: '3c', title: 'Soupe de Lentilles Corail au Curry',
    description: 'Une soupe réconfortante, riche en fibres et en protéines végétales.',
    category: 'diner', prep_time: 10, cook_time: 25, calories: 320, proteins: 16, carbs: 42, fats: 8, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
    ingredients: ['200g de lentilles corail', '1 oignon', '2 gousses ail', '1 c.à.s. de curry', '400ml de lait de coco', 'Coriandre'],
    steps: ['Faire revenir oignon et ail.', 'Ajouter curry et lentilles.', "Couvrir d'eau et cuire 20 min.", 'Ajouter le lait de coco, mixer et servir.'],
    dietitian_tips: 'Les lentilles corail ne nécessitent pas de trempage.',
    tags: ['végétarien', 'fibres'],
  },

  // === SNACKS ===
  {
    id: '4', title: 'Energy Balls Dattes-Cacao',
    description: 'Des snacks sains et énergétiques, parfaits pour le goûter ou après le sport.',
    category: 'snack', prep_time: 10, cook_time: 0, calories: 120, proteins: 4, carbs: 16, fats: 6, servings: 12, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600',
    ingredients: ['150g de dattes Medjool', "100g de flocons d'avoine", '2 c.à.s. de cacao', '2 c.à.s. de beurre amande', 'Noix de coco râpée'],
    steps: ['Mixer les dattes.', 'Mélanger tous les ingrédients.', 'Former des boules.', 'Réfrigérer 30 min.'],
    dietitian_tips: 'Excellent substitut aux barres chocolatées industrielles.',
    tags: ['snack', 'énergie'],
  },
  {
    id: '4b', title: 'Houmous Maison & Crudités',
    description: 'Un houmous onctueux à préparer en 10 minutes, parfait avec des crudités croquantes.',
    category: 'snack', prep_time: 10, cook_time: 0, calories: 180, proteins: 7, carbs: 18, fats: 9, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600',
    ingredients: ['400g de pois chiches cuits', '2 c.à.s. de tahini', '1 citron', '1 gousse ail', "Huile d'olive", 'Cumin'],
    steps: ['Mixer tous les ingrédients.', "Ajuster la consistance avec l'eau de cuisson.", 'Servir avec des bâtonnets de légumes.'],
    dietitian_tips: 'Riche en fibres et en protéines végétales. Excellente alternative aux chips.',
    tags: ['végétarien', 'fibres'],
  },
  {
    id: '4c', title: 'Yaourt Grec Miel & Graines',
    description: 'Un snack protéiné simple et gourmand, prêt en 2 minutes.',
    category: 'snack', prep_time: 2, cook_time: 0, calories: 200, proteins: 12, carbs: 20, fats: 6, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    ingredients: ['200g de yaourt grec 0%', '1 c.à.s. de miel', '2 c.à.s. de graines mélangées', 'Quelques noix', 'Fruits rouges'],
    steps: ['Verser le yaourt dans un bol.', 'Ajouter miel, graines et fruits.', 'Déguster immédiatement.'],
    dietitian_tips: 'Le yaourt grec contient 2x plus de protéines que le yaourt classique.',
    tags: ['protéines', 'probiotiques'],
  },

  // === RAPIDE ===
  {
    id: '5', title: 'Wrap Rapide Poulet-Avocat',
    description: 'Un repas express prêt en 10 minutes, idéal pour les déjeuners pressés.',
    category: 'rapide', prep_time: 10, cook_time: 0, calories: 450, proteins: 30, carbs: 35, fats: 20, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600',
    ingredients: ['1 tortilla complète', '100g de poulet cuit', '1/2 avocat', 'Roquette', '1 tomate', 'Houmous'],
    steps: ['Tartiner la tortilla de houmous.', 'Disposer les ingrédients.', 'Rouler et couper en deux.'],
    dietitian_tips: 'Privilégiez les tortillas complètes pour plus de fibres.',
    tags: ['rapide', 'protéines'],
  },
  {
    id: '5b', title: 'Omelette aux Légumes Express',
    description: 'Une omelette moelleuse garnie de légumes colorés, prête en 8 minutes.',
    category: 'rapide', prep_time: 5, cook_time: 5, calories: 300, proteins: 22, carbs: 8, fats: 20, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1515778767554-195d5a1bc492?w=600',
    ingredients: ['3 oeufs', 'Poivron', 'Champignons', 'Épinards', "Huile d'olive", 'Herbes'],
    steps: ['Battre les oeufs.', 'Faire sauter les légumes 2 min.', 'Verser les oeufs, cuire 3 min.', 'Plier et servir.'],
    dietitian_tips: 'Les oeufs entiers sont une protéine complète avec tous les acides aminés essentiels.',
    tags: ['rapide', 'protéines'],
  },
  {
    id: '5c', title: 'Bol de Riz & Oeuf au Plat',
    description: 'Le plat rapide et rassasiant façon japonaise revisité.',
    category: 'rapide', prep_time: 5, cook_time: 10, calories: 420, proteins: 16, carbs: 55, fats: 14, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600',
    ingredients: ['150g de riz cuit', '2 oeufs', 'Sauce soja', 'Huile de sésame', 'Oignons verts', 'Graines de sésame'],
    steps: ['Cuire les oeufs au plat.', 'Déposer sur le riz chaud.', 'Assaisonner avec sauce soja et huile de sésame.'],
    dietitian_tips: 'Simple et nutritif. Ajoutez des légumes pour équilibrer le repas.',
    tags: ['rapide', 'énergie'],
  },

  // === PETIT BUDGET ===
  {
    id: '6', title: 'Curry de Lentilles et Patate Douce',
    description: 'Un plat réconfortant, économique et riche en protéines végétales.',
    category: 'petit-budget', prep_time: 10, cook_time: 25, calories: 380, proteins: 16, carbs: 55, fats: 10, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
    ingredients: ['200g de lentilles corail', '2 patates douces', '1 boîte de lait de coco', '2 c.à.s. de pâte de curry', 'Coriandre fraîche'],
    steps: ['Faire revenir oignon et ail.', 'Ajouter curry, lentilles et patates.', 'Verser le lait de coco.', 'Mijoter 25 min.'],
    dietitian_tips: 'Revient à moins de 2€ par portion.',
    tags: ['budget', 'végétarien'],
  },
  {
    id: '6b', title: 'Pâtes aux Légumes Rôtis',
    description: 'Un plat de pâtes complet avec légumes de saison rôtis au four.',
    category: 'petit-budget', prep_time: 10, cook_time: 20, calories: 420, proteins: 14, carbs: 62, fats: 12, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600',
    ingredients: ['200g de pâtes complètes', 'Courgettes', 'Tomates cerises', 'Ail', "Huile d'olive", 'Parmesan'],
    steps: ['Rôtir les légumes au four.', 'Cuire les pâtes.', 'Mélanger et servir avec parmesan.'],
    dietitian_tips: 'Les pâtes complètes ont un index glycémique bien plus bas que les blanches.',
    tags: ['budget', 'végétarien'],
  },
  {
    id: '6c', title: 'Soupe Minestrone Économique',
    description: 'Une soupe italienne généreuse avec des légumes de saison et des légumineuses.',
    category: 'petit-budget', prep_time: 15, cook_time: 30, calories: 280, proteins: 12, carbs: 42, fats: 6, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
    ingredients: ['1 boîte de tomates', 'Haricots blancs', 'Carottes', 'Céleri', 'Courgettes', 'Petites pâtes', 'Parmesan'],
    steps: ['Faire revenir les légumes durs.', 'Ajouter tomates et bouillon.', 'Cuire 20 min, ajouter haricots et pâtes.', 'Servir avec parmesan.'],
    dietitian_tips: 'Moins de 1,50€ par portion. Parfait pour des repas de semaine.',
    tags: ['budget', 'fibres'],
  },

  // === SPORT ===
  {
    id: '7', title: 'Smoothie Bowl Post-Entraînement',
    description: 'Un smoothie bowl riche en protéines pour optimiser la récupération après le sport.',
    category: 'sport', prep_time: 5, cook_time: 0, calories: 400, proteins: 25, carbs: 50, fats: 12, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600',
    ingredients: ['1 banane congelée', '150g de fruits rouges', '200ml de lait de soja', '30g de protéine vanille', 'Granola'],
    steps: ['Mixer banane, fruits et lait.', 'Verser dans un bol.', 'Garnir de granola et fruits.'],
    dietitian_tips: "Consommez dans les 30 min suivant l'effort.",
    tags: ['sport', 'récupération'],
  },
  {
    id: '7b', title: 'Poulet Mariné Riz & Brocoli Sport',
    description: 'Le repas classique de sportif : protéines, glucides complexes et légumes verts.',
    category: 'sport', prep_time: 15, cook_time: 25, calories: 520, proteins: 42, carbs: 52, fats: 12, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600',
    ingredients: ['2 blancs de poulet', '150g de riz basmati', '1 brocoli', 'Sauce soja', 'Ail', 'Gingembre', 'Citron'],
    steps: ['Mariner le poulet 30 min.', 'Cuire le riz.', 'Griller le poulet.', 'Cuire le brocoli vapeur.', 'Assembler.'],
    dietitian_tips: 'Ratio idéal protéines/glucides pour la récupération musculaire post-entraînement.',
    tags: ['sport', 'protéines'],
  },
  {
    id: '7c', title: 'Granola Maison Avoine & Noix',
    description: 'Un granola croquant et énergétique à préparer en avance pour la semaine.',
    category: 'sport', prep_time: 10, cook_time: 25, calories: 380, proteins: 10, carbs: 48, fats: 18, servings: 6, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600',
    ingredients: ["300g de flocons d'avoine", '100g de noix mélangées', '3 c.à.s. de miel', '2 c.à.s. huile de coco', 'Cannelle', 'Raisins secs'],
    steps: ['Mélanger avoine, noix, huile et miel.', 'Étaler sur une plaque.', 'Cuire 25 min à 160°C en mélangeant à mi-cuisson.', 'Laisser refroidir.'],
    dietitian_tips: 'Sans additifs ni sucres raffinés. Riche en fibres pour un effet satiété durable.',
    tags: ['sport', 'énergie'],
  },

  // === VÉGÉTARIEN ===
  {
    id: '8', title: 'Buddha Bowl Végétarien',
    description: 'Un bowl 100% végétal, complet et coloré avec une sauce tahini maison.',
    category: 'vegetarien', prep_time: 15, cook_time: 20, calories: 450, proteins: 16, carbs: 55, fats: 18, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
    ingredients: ['200g de pois chiches', '1 patate douce', 'Chou rouge', '1 avocat', 'Riz complet', 'Tahini'],
    steps: ['Cuire le riz.', 'Rôtir pois chiches et patate douce.', 'Préparer la sauce tahini.', 'Assembler le bowl.'],
    dietitian_tips: "Ce bowl combine légumineuses et céréales pour un profil d'acides aminés complet.",
    tags: ['végétarien', 'complet'],
  },
  {
    id: '8b', title: 'Dal de Pois Chiches aux Épinards',
    description: 'Un plat végétarien indien très parfumé, riche en fer et en protéines.',
    category: 'vegetarien', prep_time: 10, cook_time: 20, calories: 380, proteins: 18, carbs: 48, fats: 10, servings: 3, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
    ingredients: ['400g de pois chiches', '200g épinards', '1 boîte de tomates', 'Oignon', 'Ail', 'Curcuma', 'Cumin', 'Garam masala'],
    steps: ['Faire revenir oignon et ail avec les épices.', 'Ajouter tomates et pois chiches.', 'Mijoter 15 min.', 'Ajouter les épinards et cuire 5 min.'],
    dietitian_tips: 'Le curcuma est un puissant anti-inflammatoire. Associez à du poivre noir pour mieux absorber.',
    tags: ['végétarien', 'fer'],
  },
  {
    id: '8c', title: 'Gratin Courgettes & Chèvre',
    description: 'Un gratin léger et savoureux, parfait pour un dîner végétarien gourmand.',
    category: 'vegetarien', prep_time: 15, cook_time: 30, calories: 320, proteins: 14, carbs: 18, fats: 20, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600',
    ingredients: ['4 courgettes', '150g de fromage de chèvre', '2 oeufs', '100ml de crème légère', 'Herbes de Provence', 'Ail'],
    steps: ['Préchauffer le four à 180°C.', 'Couper les courgettes en rondelles.', 'Mélanger oeufs, crème et épices.', 'Assembler avec le chèvre et enfourner 30 min.'],
    dietitian_tips: 'Les courgettes sont très peu caloriques tout en étant rassasiantes grâce à leur teneur en eau.',
    tags: ['végétarien', 'léger'],
  },

  // === PERTE DE POIDS ===
  {
    id: '9', title: 'Salade de Quinoa et Grenade',
    description: 'Une salade légère et rassasiante, parfaite pour un objectif de perte de poids.',
    category: 'perte-de-poids', prep_time: 15, cook_time: 15, calories: 320, proteins: 12, carbs: 40, fats: 12, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600',
    ingredients: ['150g de quinoa', '1 grenade', '1 concombre', '100g de roquette', '50g de noix'],
    steps: ['Cuire le quinoa et laisser refroidir.', 'Égrener la grenade.', 'Mélanger tous les ingrédients.', 'Assaisonner.'],
    dietitian_tips: "Le quinoa a un indice de satiété élevé.",
    tags: ['léger', 'antioxydants'],
  },
  {
    id: '9b', title: 'Soupe Courgette Basilic Légère',
    description: 'Une soupe velouté très légère, rassasiante grâce aux fibres des courgettes.',
    category: 'perte-de-poids', prep_time: 10, cook_time: 15, calories: 180, proteins: 6, carbs: 18, fats: 8, servings: 3, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
    ingredients: ['4 courgettes', '1 oignon', '1 pomme de terre', 'Basilic frais', 'Bouillon de légumes', 'Crème fraîche légère'],
    steps: ['Faire revenir oignon.', 'Ajouter courgettes et pomme de terre.', 'Couvrir de bouillon, cuire 15 min.', 'Mixer avec basilic.'],
    dietitian_tips: "Moins de 200 kcal par portion. Idéale en entrée pour réduire l'apport calorique du repas.",
    tags: ['léger', 'fibres'],
  },
  {
    id: '9c', title: 'Blanc de Poulet Vapeur & Ratatouille',
    description: 'Un plat diététique par excellence : protéines maigres et légumes en abondance.',
    category: 'perte-de-poids', prep_time: 15, cook_time: 30, calories: 310, proteins: 34, carbs: 22, fats: 8, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600',
    ingredients: ['2 blancs de poulet', 'Aubergine', 'Courgette', 'Tomates', 'Poivron', 'Herbes de Provence', 'Ail'],
    steps: ['Cuire le poulet vapeur 20 min.', 'Préparer la ratatouille.', 'Mijoter les légumes 25 min.', 'Servir ensemble.'],
    dietitian_tips: 'La ratatouille est un accompagnement idéal pour la perte de poids : peu calorique et rassasiant.',
    tags: ['protéines', 'léger'],
  },

  // === PRISE DE MASSE ===
  {
    id: '10', title: 'Pancakes Protéinés Banane',
    description: 'Des pancakes moelleux et riches en protéines pour soutenir la prise de masse.',
    category: 'prise-de-masse', prep_time: 5, cook_time: 10, calories: 550, proteins: 35, carbs: 60, fats: 18, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
    ingredients: ['2 bananes mûres', '4 oeufs', "80g de flocons d'avoine", '30g de protéine en poudre'],
    steps: ['Mixer tous les ingrédients.', 'Cuire à la poêle 2-3 min par côté.', 'Garnir de fruits et beurre de cacahuètes.'],
    dietitian_tips: 'Excellent ratio protéines/glucides pour la prise de masse.',
    tags: ['protéines', 'sport'],
  },
  {
    id: '10b', title: 'Riz Complet Steak & Oeufs',
    description: 'Le repas classique de la prise de masse : calories denses et protéines élevées.',
    category: 'prise-de-masse', prep_time: 5, cook_time: 15, calories: 680, proteins: 50, carbs: 65, fats: 20, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600',
    ingredients: ['200g de steak haché 5%', '150g de riz complet', '3 oeufs', 'Huile de coco', 'Sauce soja', 'Légumes verts'],
    steps: ['Cuire le riz.', 'Griller le steak.', 'Cuire les oeufs.', 'Assembler avec les légumes.'],
    dietitian_tips: "Un surplus calorique contrôlé est la clé d'une prise de masse propre.",
    tags: ['protéines', 'masse'],
  },
  {
    id: '10c', title: 'Shake Masse Maison Banane & Arachide',
    description: "Un shake maison hypercalorique et naturel pour augmenter l'apport énergétique.",
    category: 'prise-de-masse', prep_time: 5, cook_time: 0, calories: 620, proteins: 30, carbs: 70, fats: 22, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600',
    ingredients: ['2 bananes', '400ml de lait entier', '2 c.à.s. de beurre arachide', '30g de protéine', "50g de flocons d'avoine", 'Miel'],
    steps: ['Mixer tous les ingrédients.', 'Ajuster la consistance.', "Consommer juste après l'entraînement."],
    dietitian_tips: 'Préférez ce shake maison aux gainers industriels bourrés de sucres raffinés.',
    tags: ['masse', 'sport'],
  },
];

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filtered = RECIPES_DATA.filter(r => {
    const matchCategory = !selectedCategory || r.category === selectedCategory;
    const matchSearch = !searchQuery ||
      r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Recettes <span className="italic font-semibold text-primary">équilibrées</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des recettes validées scientifiquement, inspirées de l'alimentation méditerranéenne.
            Simples, savoureuses et durables.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une recette..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe, i) => (
            <AnimatedSection key={recipe.id} delay={i * 0.05}>
              <RecipeCard
                recipe={recipe}
                image={recipe.image_url}
                onClick={setSelectedRecipe}
              />
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Aucune recette trouvée</p>
            <p className="text-sm text-muted-foreground mt-2">Essayez de modifier vos filtres</p>
          </div>
        )}
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
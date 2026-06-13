export const DIGESTIF_WEEKS = [
  {
    num: 1, title: 'Semaine 1 – Bilan & élimination', color: 'from-emerald-100 to-teal-100',
    objective: 'Identifier les aliments déclencheurs et nettoyer l\'alimentation',
    habits: ['Tenir un journal alimentaire + symptômes digestifs', 'Éliminer temporairement gluten et produits laitiers', 'Manger lentement, mâcher 20 fois par bouchée'],
    nutrition: 'Alimentation douce, pauvre en FODMAP élevés',
    nutritionDetail: ['Éviter : oignons crus, ail, chou, légumineuses en grande quantité', 'Privilégier : carottes cuites, courgettes, riz blanc, bananes mûres', 'Cuire tous les légumes pour faciliter la digestion'],
    mealExample: 'Riz basmati + saumon vapeur + courgettes cuites + huile olive',
    activity: 'Marche douce 20 min après les repas',
    activityDetail: ['La marche post-repas améliore la vidange gastrique', 'Éviter le sport intense dans les 2h après manger', 'Yoga doux du soir : postures de torsion pour masser les intestins'],
    checklist: ['Journal alimentaire', 'Sans gluten', 'Légumes cuits', 'Marche post-repas'],
    tip: 'La première semaine est souvent inconfortable : c\'est normal, votre microbiote s\'adapte.',
  },
  {
    num: 2, title: 'Semaine 2 – Réintroduction douce', color: 'from-green-100 to-emerald-100',
    objective: 'Réintroduire les aliments un par un pour identifier les intolérances',
    habits: ['Réintroduire un aliment tous les 2 jours', 'Noter les symptômes dans les 24-48h après réintroduction', 'Ajouter des probiotiques naturels (yaourt, kéfir si toléré)'],
    nutrition: 'Réintroduction méthodique des FODMAP',
    nutritionDetail: ['Réintroduire d\'abord : lentilles en petite quantité, pain au levain', 'Observer : ballonnements, transit, confort abdominal', 'Conserver les aliments bien tolérés, éliminer les déclencheurs'],
    mealExample: 'Soupe de lentilles corail (petite portion) + pain au levain + salade verte',
    activity: 'Yoga digestif 15 min matin',
    activityDetail: ['Posture de l\'enfant, torsion allongée : excellent pour le transit', 'Respiration abdominale profonde 5 min avant chaque repas', 'Éviter la position allongée dans l\'heure après le repas'],
    checklist: ['Réintroduction ordonnée', 'Journal symptômes', 'Probiotiques naturels', 'Yoga digestif'],
    tip: 'Si un aliment provoque des symptômes, attendez 1 semaine avant de le réintroduire à nouveau.',
  },
  {
    num: 3, title: 'Semaine 3 – Microbiote & prébiotiques', color: 'from-teal-100 to-cyan-100',
    objective: 'Nourrir les bonnes bactéries intestinales',
    habits: ['Introduire des aliments prébiotiques quotidiennement', 'Manger 30 plantes différentes dans la semaine (objectif BBC)', 'Réduire le sucre raffiné qui nourrit les mauvaises bactéries'],
    nutrition: 'Alimentation riche en prébiotiques et fermentés',
    nutritionDetail: ['Prébiotiques : ail cuit, poireaux, banane légèrement verte, avoine', 'Fermentés tolérés : kéfir de lait, yaourt grec, choucroute cuite', 'Diversité végétale : légumes variés, légumineuses tolérées, céréales complètes'],
    mealExample: 'Bowl quinoa + pousses d\'épinards + betterave + graines tournesol + humus',
    activity: 'Marche 30 min / 5 fois par semaine',
    activityDetail: ['L\'exercice modéré améliore la diversité du microbiote', 'Éviter le surentraînement qui peut perturber l\'intestin', 'Le stress réduit la diversité bactérienne : méditez 10 min/jour'],
    checklist: ['30 plantes/semaine', 'Prébiotiques quotidiens', 'Fermentés', 'Méditation anti-stress'],
    tip: 'L\'objectif "30 plantes par semaine" inclut herbes, épices, noix, graines : plus facile qu\'il n\'y paraît !',
  },
  {
    num: 4, title: 'Semaine 4 – Consolidation & habitudes durables', color: 'from-cyan-100 to-blue-100',
    objective: 'Ancrer les nouvelles habitudes digestives pour la vie',
    habits: ['Dresser la liste de vos "safe foods" personnels', 'Planifier vos repas de la semaine avec ces aliments', 'Créer un rituel de repas : table, sans écran, calme'],
    nutrition: 'Alimentation personnalisée et durable',
    nutritionDetail: ['Bâtir vos menus autour des aliments identifiés comme bien tolérés', 'Continuer les fermentés 3-4 fois/semaine', 'Maintenir 25-30g de fibres/jour avec les sources bien tolérées'],
    mealExample: 'Wok de légumes tolérés + tempeh + riz basmati + sauce tamari + gingembre',
    activity: 'Routine de 3 séances/semaine selon vos préférences',
    activityDetail: ['Maintenir la marche post-repas comme rituel permanent', 'Le yoga digestif 2x/semaine pour la santé intestinale long terme', 'Cohérence de l\'horaire des repas : l\'intestin aime la régularité'],
    checklist: ['Liste "safe foods"', 'Planification repas', 'Rituel de table', 'Régularité horaires'],
    tip: 'Le confort digestif n\'est pas un régime : c\'est une façon d\'écouter votre corps définitivement.',
  },
  {
    num: 5, title: 'Semaine 5 – Gestion du stress intestinal', color: 'from-violet-100 to-purple-100',
    objective: 'Axe intestin-cerveau : réduire l\'impact du stress sur la digestion',
    habits: ['Pratiquer la cohérence cardiaque avant les repas (3-6-5)', 'Identifier vos situations de stress qui déclenchent les symptômes', 'Créer un environnement de repas zen : lumière douce, musique calme'],
    nutrition: 'Aliments riches en magnésium et tryptophane',
    nutritionDetail: ['Magnésium : chocolat noir 70%+, noix du Brésil, graines courge, épinards cuits', 'Tryptophane : dinde, œufs, noix, banane (précurseur sérotonine intestinale)', 'Éviter la caféine en excès qui stimule les contractions intestinales'],
    mealExample: 'Omelette épinards + pain au levain + banane + noix + carré de chocolat noir',
    activity: 'Cohérence cardiaque + marche dans la nature',
    activityDetail: ['3 min de cohérence cardiaque = 5 expirations/min stabilise le nerf vague', 'Le nerf vague relie le cerveau à l\'intestin : le stimuler améliore la digestion', 'Bain chaud le soir : relaxe les muscles intestinaux'],
    checklist: ['Cohérence cardiaque x3/jour', 'Magnésium alimentaire', 'Environnement repas calme', 'Bain relaxant soir'],
    tip: '70% des personnes atteintes de syndrome de l\'intestin irritable ont des symptômes aggravés par le stress.',
  },
  {
    num: 6, title: 'Semaine 6 – Bilan final & programme personnalisé', color: 'from-amber-100 to-orange-100',
    objective: 'Consolider les acquis et construire son plan digestif personnel',
    habits: ['Rédiger votre guide personnel : aliments ok, à éviter, rituels', 'Tester un nouveau légume toléré par semaine pour élargir l\'assiette', 'Consulter si les symptômes persistent malgré les 6 semaines'],
    nutrition: 'Plan nutritionnel individualisé',
    nutritionDetail: ['Votre assiette idéale digestive est unique : ne copiez pas celle d\'un autre', 'Continuer à diversifier progressivement', 'Maintenir les probiotiques et prébiotiques comme habitude vie'],
    mealExample: 'Votre repas le mieux toléré de ces 6 semaines, en portion adaptée',
    activity: 'Activité physique régulière de votre choix',
    activityDetail: ['L\'exercice régulier est le meilleur remède contre les troubles fonctionnels', 'Natation, yoga, pilates : particulièrement bénéfiques pour l\'intestin', 'Si les symptômes persistent : consultez un gastro-entérologue ou diététicienne spécialisée'],
    checklist: ['Guide personnel rédigé', 'Consultation si besoin', 'Diversification progressive', 'Activité régulière'],
    tip: 'Vous avez maintenant toutes les clés pour gérer votre confort digestif au quotidien.',
  },
];

export const DIGESTIF_DAY = {
  label: 'Journée type confort digestif',
  subtitle: 'Douce, anti-inflammatoire, riche en prébiotiques',
  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
  totalKcal: '1900 kcal',
  meals: [
    {
      icon: '🌅', name: 'Petit-déjeuner', time: '7h30', kcal: 420,
      items: ['Porridge d\'avoine (40g) + eau ou lait végétal', 'Banane mûre en rondelles', '1 yaourt grec nature', 'Infusion gingembre-citron'],
      alt: 'Riz au lait de coco + compote pommes sans sucre',
    },
    {
      icon: '🍽️', name: 'Déjeuner', time: '12h30', kcal: 580,
      items: ['Riz basmati (150g cuit)', 'Filet de saumon vapeur (130g)', 'Carottes cuites à l\'huile d\'olive', 'Courgettes poêlées', 'Eau plate'],
      alt: 'Tofu grillé + mêmes légumes',
    },
    {
      icon: '🍎', name: 'Collation (si besoin)', time: '16h00', kcal: 180,
      items: ['Compote pomme sans sucre ajouté', '1 poignée de noix (pas d\'amandes si sensible)'],
      alt: 'Banane + 1 c.à.s beurre d\'amande',
    },
    {
      icon: '🌙', name: 'Dîner', time: '19h30', kcal: 480,
      items: ['Soupe de légumes mixée (courgette, carotte, pomme de terre)', '2 tranches de pain au levain grillé', 'Filet de poulet en émincé (100g)', '1 carré de chocolat noir 70%'],
      alt: 'Soupe + galettes de sarrasin + œuf poché',
    },
    {
      icon: '🫖', name: 'Infusion du soir', time: '21h00', kcal: 5,
      items: ['Tisane fenouil, mélisse ou camomille', '1 c.à.c de miel si besoin'],
      alt: null,
    },
  ],
};

export const DIGESTIF_SHOPPING = [
  {
    cat: '🥩 Protéines',
    items: ['Filets de saumon x3', 'Blanc de poulet x4', 'Œufs (6)', 'Yaourt grec nature x4', 'Tofu ferme (si végétarien)'],
  },
  {
    cat: '🌾 Féculents',
    items: ['Riz basmati (500g)', 'Avoine à cuire (500g)', 'Pain au levain', 'Galettes de sarrasin', 'Quinoa (300g)'],
  },
  {
    cat: '🥦 Légumes (cuits de préférence)',
    items: ['Carottes (1kg)', 'Courgettes (1kg)', 'Épinards frais (500g)', 'Pommes de terre (500g)', 'Poireaux (500g cuits)'],
  },
  {
    cat: '🍌 Fruits',
    items: ['Bananes (6)', 'Pommes (6)', 'Compote pomme sans sucre (x4)', 'Myrtilles (200g)'],
  },
  {
    cat: '🛢️ Bonne graisses & condiments',
    items: ['Huile d\'olive extra vierge', 'Noix (150g)', 'Gingembre frais', 'Curcuma moulu', 'Chocolat noir 70%+'],
  },
  {
    cat: '🫖 Infusions & boissons',
    items: ['Tisane fenouil', 'Tisane camomille', 'Tisane mélisse', 'Eau minérale plate'],
  },
];

export const DIGESTIF_SPORT = [
  {
    icon: '🚶', title: 'Marche post-repas',
    desc: '15-20 minutes après le déjeuner ou le dîner. Le remède digestif le plus simple et le plus prouvé.',
    detail: {
      intro: 'La marche après les repas stimule la motilité gastrique (la capacité de l\'estomac à se vider) et réduit la glycémie post-prandiale de 20-30%. C\'est le médicament zéro effet secondaire.',
      points: ['15-20 min suffisent : pas besoin de marcher 1 heure', 'Rythme modéré, pas de sport intense', 'Aide en cas de ballonnements post-repas', 'Réduit les reflux gastriques légers'],
      example: 'Tour du pâté de maisons après le déjeuner, balade dans un parc après le dîner.',
      tip: 'Si vous ne pouvez pas sortir : 100-200 pas dans votre appartement suffisent pour stimuler la vidange gastrique.',
    },
  },
  {
    icon: '🧘', title: 'Yoga digestif',
    desc: 'Postures spécifiques pour masser les intestins, soulager les gaz et améliorer le transit.',
    detail: {
      intro: 'Certaines postures de yoga compriment et massent mécaniquement les organes digestifs, stimulant le transit et soulageant les ballonnements.',
      points: ['Posture de l\'enfant (Balasana) : soulage les crampes intestinales', 'Torsion allongée : masse le côlon ascendant et descendant', 'Pawanmuktasana (genoux sur poitrine) : élimine les gaz', 'Shavasana avec respiration abdominale : active le nerf vague'],
      example: 'Séquence de 15 min le matin à jeun : posture enfant 2 min → torsion droite 2 min → torsion gauche 2 min → genoux poitrine 3 min → respiration abdominale 5 min.',
      tip: 'Pratiquez à jeun ou 2h après le repas pour plus de confort.',
    },
  },
  {
    icon: '🌬️', title: 'Respiration abdominale',
    desc: 'Stimule le nerf vague, réduit le stress intestinal et améliore la motilité digestive.',
    detail: {
      intro: 'La respiration abdominale profonde active le système parasympathique via le nerf vague. Ce nerf est le lien direct entre le cerveau et l\'intestin (axe intestin-cerveau).',
      points: ['5 minutes avant chaque repas en cohérence cardiaque (5 expirations/min)', 'Inspire 5 sec → expire 5 sec, ventre qui bouge (pas la poitrine)', 'Réduit le stress qui aggrave le SII et les troubles fonctionnels', 'Améliore la qualité du sommeil, indirectement bénéfique pour l\'intestin'],
      example: 'Cohérence cardiaque : application RespiRelax, 3 fois par jour, 5 min, inspire 5 sec, expire 5 sec.',
      tip: 'En pratiquant avant chaque repas, vous activez votre "mode digestion" (nerf parasympathique) avant de manger.',
    },
  },
  {
    icon: '🏊', title: 'Natation & pilates',
    desc: 'Activités douces qui renforcent les muscles abdominaux sans choc, idéales pour l\'intestin irritable.',
    detail: {
      intro: 'La natation et le pilates sont les activités les plus recommandées en cas de troubles digestifs fonctionnels. Elles renforcent le core sans impact, sans stress articulaire et sans compression des organes.',
      points: ['Le pilates renforce le plancher pelvien et les muscles abdominaux profonds', 'La natation est anti-inflammatoire et réduit le cortisol (stress)', 'Éviter les abdominaux classiques (crunch) en phase de crise', 'Préférer les gainage et exercices hypopressifs'],
      example: '2 séances de natation de 30-45 min par semaine, ou 1 cours de pilates hebdomadaire.',
      tip: 'Le pilates sur ballon est particulièrement bénéfique : il masse doucement les organes abdominaux.',
    },
  },
];

export const DIGESTIF_DRINKS = [
  { icon: '🫖', name: 'Tisane de fenouil', rec: '2 tasses/jour', ok: true, detail: 'Le fenouil contient de l\'anéthol, un composé antispasmodique qui relâche les muscles intestinaux. Boire après les repas réduit les ballonnements et les crampes. Laisser infuser 10 min pour libérer les principes actifs.' },
  { icon: '💧', name: 'Eau plate tiède', rec: '1.5-2L/jour', ok: true, detail: 'L\'eau tiède (pas froide) facilite la digestion en ne "choquant" pas les sucs digestifs. Boire un grand verre d\'eau tiède le matin à jeun stimule le péristaltisme (mouvements intestinaux) et favorise le transit.' },
  { icon: '🌿', name: 'Tisane de camomille', rec: '1-2 tasses/soir', ok: true, detail: 'La camomille (matricaire) est l\'une des plantes les mieux étudiées pour la digestion. Elle a des propriétés anti-inflammatoires, antispasmodiques et calmantes. Particulièrement utile le soir pour détendre l\'intestin.' },
  { icon: '🫚', name: 'Eau de kéfir', rec: '100-150ml/jour', ok: true, detail: 'Le kéfir d\'eau est une boisson fermentée non laitière, riche en probiotiques naturels. Il améliore la diversité du microbiote, renforce la barrière intestinale et réduit les inflammations. Commencer par 50ml et augmenter progressivement.' },
  { icon: '🍋', name: 'Jus de citron dilué', rec: '1 verre le matin', ok: null, detail: 'Le jus de citron dilué dans l\'eau tiède peut stimuler la production de bile et faciliter la digestion des graisses. À tester selon votre sensibilité : certaines personnes le tolèrent très bien, d\'autres ressentent des brûlures.' },
  { icon: '☕', name: 'Café', rec: 'Maximum 1/jour, après repas', ok: null, detail: 'La caféine stimule les contractions du côlon, ce qui peut accélérer le transit. Pour certains, c\'est bénéfique (constipation). Pour d\'autres (SII, reflux, côlon irritable), cela aggrave les symptômes. Observez votre réaction personnelle.' },
  { icon: '🧃', name: 'Jus de légumes industriels', rec: 'À éviter', ok: false, detail: 'Les jus de légumes du commerce contiennent souvent des additifs, du sel et sont pasteurisés (donc sans probiotiques ni enzymes actives). Le fructose concentré peut aggraver les ballonnements. Préférez les légumes cuits ou une soupe faite maison.' },
];

export const DIGESTIF_RECIPES = [
  {
    id: 'dg1', title: 'Soupe veloutée courgette gingembre', category: 'sante-digestive', meal_category: 'diner',
    calories: 220, proteins: 8, carbs: 28, fats: 9, prep_time: 10, cook_time: 20, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop',
    description: 'Douce, anti-inflammatoire, apaisante. Parfaite pour les soirées difficiles digestivement.',
    ingredients: ['3 courgettes', '1 cm gingembre frais', '1 échalote (bien cuite)', '500ml bouillon légumes', '1 c.à.s huile olive', 'Sel, poivre', 'Crème de coco (optionnel)'],
    steps: ['Faire suer l\'échalote dans l\'huile olive 5 min', 'Ajouter les courgettes coupées et le gingembre râpé', 'Couvrir de bouillon et cuire 15 min', 'Mixer finement', 'Ajuster l\'assaisonnement, servir avec crème de coco si désiré'],
    dietitian_tips: 'Le gingembre est un prokinétique naturel : il accélère la vidange gastrique et réduit les nausées digestives.',
    allergy_alternatives: 'Sans lactose naturellement. Remplacer bouillon par eau + herbes si sensible au sel.',
    tags: ['sans-gluten', 'anti-ballonnements', 'léger'],
  },
  {
    id: 'dg2', title: 'Porridge avoine banane cannelle', category: 'sante-digestive', meal_category: 'petitdej',
    calories: 380, proteins: 12, carbs: 68, fats: 7, prep_time: 5, cook_time: 5, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=600&auto=format&fit=crop',
    description: 'Riche en fibres solubles (bêta-glucane), doux pour l\'intestin et rassasiant.',
    ingredients: ['40g flocons d\'avoine', '250ml lait végétal (avoine ou riz)', '1 banane mûre', '1/2 c.à.c cannelle', '1 c.à.c miel', '1 c.à.s graines de chia'],
    steps: ['Chauffer le lait végétal', 'Ajouter l\'avoine, remuer 5 min à feu doux', 'Éteindre, couvrir 2 min', 'Garnir : banane en rondelles, cannelle, miel, graines de chia'],
    dietitian_tips: 'Le bêta-glucane de l\'avoine est un prébiotique puissant qui nourrit Lactobacillus et Bifidobacterium.',
    allergy_alternatives: 'Sans gluten si avoine certifiée GF. Remplacer miel par sirop d\'érable.',
    tags: ['prébiotique', 'doux', 'transit'],
  },
  {
    id: 'dg3', title: 'Bol de riz aux légumes vapeur', category: 'sante-digestive', meal_category: 'dejeuner',
    calories: 440, proteins: 25, carbs: 55, fats: 12, prep_time: 10, cook_time: 20, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop',
    description: 'Le repas de référence pour l\'intestin sensible : riz basmati, légumes doux cuits, protéine légère.',
    ingredients: ['150g riz basmati (pesé cuit)', '130g filet de saumon', '1 courgette', '2 carottes', '1 c.à.s huile olive', 'Herbes fraîches (ciboulette, persil plat)', 'Sel, curcuma'],
    steps: ['Cuire le riz basmati', 'Couper les légumes et cuire à la vapeur 12 min', 'Cuire le saumon à la vapeur ou poêlé sans matière grasse', 'Assembler, arroser d\'huile olive, saupoudrer de curcuma et herbes'],
    dietitian_tips: 'Le curcuma est anti-inflammatoire intestinal. Le saumon apporte des omega-3 protecteurs de la muqueuse.',
    allergy_alternatives: 'Remplacer saumon par tofu soyeux pour une version végétarienne douce.',
    tags: ['sans-gluten', 'anti-inflammatoire', 'intestin-sensible'],
  },
  {
    id: 'dg4', title: 'Compote pomme fenouil maison', category: 'sante-digestive', meal_category: 'collation',
    calories: 120, proteins: 1, carbs: 28, fats: 1, prep_time: 5, cook_time: 15, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop',
    description: 'Anti-gaz naturel grâce au fenouil, doux pour l\'intestin, idéale en cas de ballonnements.',
    ingredients: ['3 pommes golden', '1/2 bulbe de fenouil', '1 pincée de cannelle', '1 c.à.s d\'eau', 'Miel (optionnel)'],
    steps: ['Éplucher et couper les pommes et le fenouil', 'Cuire à feu doux avec l\'eau 15 min', 'Mixer grossièrement ou finement selon préférence', 'Ajouter cannelle et miel si désiré'],
    dietitian_tips: 'Les pommes cuites sont riches en pectine, une fibre soluble très douce qui apaise l\'intestin irrité.',
    allergy_alternatives: 'Sans allergènes majeurs. Convient aux régimes FODMAP modérés.',
    tags: ['anti-ballonnements', 'FODMAP-low', 'collation'],
  },
  {
    id: 'dg5', title: 'Omelette épinards feta douce', category: 'sante-digestive', meal_category: 'diner',
    calories: 320, proteins: 24, carbs: 8, fats: 22, prep_time: 5, cook_time: 8, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop',
    description: 'Légère, riche en protéines et magnésium, parfaite pour un dîner doux et rapide.',
    ingredients: ['3 œufs', '50g épinards frais', '30g feta (ou chèvre frais)', '1 c.à.c huile olive', 'Poivre, herbes de Provence'],
    steps: ['Faire tomber les épinards 2 min à la poêle', 'Battre les œufs, assaisonner', 'Verser sur les épinards, cuire à feu doux', 'Ajouter la feta émiettée avant de plier', 'Servir avec pain au levain si désiré'],
    dietitian_tips: 'Les œufs sont un des aliments les mieux tolérés en cas de troubles digestifs. Les épinards apportent du magnésium qui régule la motilité.',
    allergy_alternatives: 'Remplacer la feta par de l\'avocat écrasé pour une version sans lactose.',
    tags: ['sans-gluten', 'riche-magnésium', 'dîner-léger'],
  },
  {
    id: 'dg6', title: 'Smoothie vert digestif', category: 'sante-digestive', meal_category: 'petitdej',
    calories: 180, proteins: 6, carbs: 32, fats: 4, prep_time: 5, cook_time: 0, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1610970881699-44a5587cf7e3?w=600&auto=format&fit=crop',
    description: 'Probiotique, prébiotique, anti-inflammatoire : le smoothie triple action pour l\'intestin.',
    ingredients: ['150ml kéfir de lait ou yaourt liquide', '1 banane mûre congelée', '1 poignée épinards frais', '1 cm gingembre frais', '1 c.à.c graines de lin moulues', '100ml eau'],
    steps: ['Mettre tous les ingrédients dans le blender', 'Mixer 60 secondes', 'Boire immédiatement (les graines de lin s\'oxydent)'],
    dietitian_tips: 'Les graines de lin moulues sont riches en oméga-3 et en fibres solubles. Moulues = 10x mieux absorbées que entières.',
    allergy_alternatives: 'Kéfir d\'eau à la place du kéfir de lait pour une version sans lactose.',
    tags: ['probiotique', 'prébiotique', 'anti-inflammatoire'],
  },
];

export const DIGESTIF_BLOGS = [
  {
    id: 'dg-b1', title: 'Le microbiote intestinal : votre deuxième système immunitaire',
    excerpt: '38 000 milliards de bactéries vivent dans votre intestin. Elles influencent votre immunité, votre humeur et votre poids. Voici comment les chouchouter.',
    content: `## Votre microbiote en chiffres\n\n- **38 000 milliards** de bactéries dans votre intestin\n- **1 à 2 kg** de matière bactérienne\n- **70%** de votre système immunitaire est dans l'intestin\n- **90%** de votre sérotonine (hormone du bonheur) est produite dans l'intestin\n\n## Comment nourrir votre microbiote\n\n### Prébiotiques : la nourriture des bonnes bactéries\nLes fibres prébiotiques sont fermentées par vos bactéries intestinales pour produire des acides gras à chaîne courte (butyrate, propionate) qui nourrissent les cellules du côlon.\n\n**Sources :** ail, poireaux, oignons cuits, banane légèrement verte, avoine, topinambour, asperges\n\n### Probiotiques : les bonnes bactéries directement\n**Sources alimentaires :**\n- Yaourt nature avec cultures actives\n- Kéfir (lait ou eau)\n- Choucroute crue\n- Miso, tempeh\n\n## Ce qui détruit votre microbiote\n- Antibiotiques (nécessaires parfois, mais à compenser après)\n- Sucre raffiné en excès\n- Alcool régulier\n- Ultra-transformation alimentaire\n- Manque de fibres\n- Stress chronique`,
    category: 'sante-digestive', read_time: 7,
  },
  {
    id: 'dg-b2', title: 'SII (côlon irritable) : alimentation et stratégies',
    excerpt: 'Le syndrome de l\'intestin irritable touche 1 personne sur 5. Alimentation FODMAP, gestion du stress, probiotiques : ce qui marche vraiment.',
    content: `## Qu'est-ce que le SII ?\n\nLe syndrome de l'intestin irritable (SII ou colopathie fonctionnelle) est un trouble digestif chronique qui touche 15-20% de la population. Il se caractérise par des douleurs abdominales, des ballonnements, un transit irrégulier.\n\n## Le régime FODMAP\n\nLes FODMAP (Fermentable Oligosaccharides Disaccharides Monosaccharides And Polyols) sont des sucres fermentescibles mal absorbés qui produisent des gaz et des ballonnements.\n\n### Aliments riches en FODMAP (à réduire en phase 1)\n- Oignons, ail, poireaux crus\n- Lactose (lait de vache)\n- Fructose en excès (pommes, poires, miel, HFCS)\n- Fructanes (blé, seigle, orge)\n- Polyols (sorbitol des pommes, fruits à noyau)\n\n### Phase 2 : réintroduction\nRéintroduire chaque groupe un par un pendant 3 jours, puis observer les symptômes.\n\n## Ce que dit la science\n- Le régime FODMAP soulage **75% des patients** atteints de SII\n- Les probiotiques (Lactobacillus rhamnosus GG, Bifidobacterium infantis) réduisent les symptômes\n- La gestion du stress est aussi efficace que les médicaments dans les formes modérées`,
    category: 'sante-digestive', read_time: 8,
  },
];
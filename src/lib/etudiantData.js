export const ETUDIANT_WEEKS = [
  {
    num: 1, title: 'Semaine 1 – Le batch cooking du dimanche', color: 'from-blue-100 to-indigo-100',
    objective: 'Maîtriser la préparation hebdomadaire en 1h30 le dimanche',
    habits: ['Préparer 3 légumineuses différentes en grande quantité', 'Cuire une grosse casserole de céréales complètes', 'Préparer 2 sauces de base (vinaigrette + sauce tomate)'],
    nutrition: 'Protéines économiques, glucides complexes, légumes de saison',
    nutritionDetail: ['Légumineuses (lentilles, pois chiches) = protéines à 0.80€/portion vs viande 3-5€/portion', 'Œufs = protéines les moins chères ET les mieux absorbées', 'Légumes de saison et surgelés = qualité nutritionnelle équivalente au frais, prix divisé par 2-3'],
    mealExample: 'Riz complet + pois chiches maison + légumes rôtis + œuf dur',
    activity: 'Vélo ou marche pour les déplacements campus',
    activityDetail: ['Le vélo économise le transport en commun et fait de l\'exercice', '30 min de marche/jour = activité recommandée OMS gratuitement', 'Gymnase universitaire : souvent gratuit ou quasi gratuit'],
    checklist: ['Batch cooking dimanche', 'Légumineuses x3 variétés', 'Céréales cuites', 'Sauces de base'],
    tip: '1h30 de cuisine le dimanche = 5 à 7 repas préparés. Calcul: 15 min par repas en moyenne.',
  },
  {
    num: 2, title: 'Semaine 2 – L\'équilibre sans se ruiner', color: 'from-indigo-100 to-purple-100',
    objective: 'Comprendre les associations nutritionnelles gagnantes',
    habits: ['Associer légumineuses + céréales à chaque repas principal', 'Manger 1 fruit entier par jour minimum', 'Remplacer les snacks industriels par des alternatives maison'],
    nutrition: 'Complémentarité protéique végétale',
    nutritionDetail: ['Lentilles + riz = protéines complètes (tous les acides aminés essentiels)', 'Pois chiches + pain = même chose', 'Coût : riz + lentilles pour 2 repas = ~0.60€ vs menu resto = 8-12€'],
    mealExample: 'Soupe de lentilles maison + tartines de pain complet + fromage blanc',
    activity: 'Sport inter-fac ou associations sportives étudiantes',
    activityDetail: ['Les associations sportives universitaires sont gratuites ou quasi', 'Yoga en ligne YouTube = gratuit, 20 min/jour suffisent', 'Courir dans un parc : 0€, anti-stress prouvé'],
    checklist: ['Légumineuses + céréales combo', 'Fruit entier/jour', 'Zéro snack industriel', 'Sport gratuit'],
    tip: 'La règle d\'or : si un aliment a plus de 5 ingrédients sur l\'étiquette, c\'est ultra-transformé. Fuyez-le.',
  },
  {
    num: 3, title: 'Semaine 3 – Manger bien pendant les examens', color: 'from-purple-100 to-pink-100',
    objective: 'Optimiser la concentration et l\'énergie cérébrale en période de stress',
    habits: ['Ne jamais sauter le petit-déjeuner pendant les examens', 'Manger du poisson gras 2x cette semaine', 'Limiter la caféine à 2 cafés maximum par jour'],
    nutrition: 'Cerveaux & concentration : omega-3, B vitamines, glucose stable',
    nutritionDetail: ['Le cerveau consomme 20% des calories totales : il a besoin de glucose STABLE (pas de pics)', 'Omega-3 DHA : saumon, sardines, maquereaux → mémoire et concentration', 'Théanine du thé vert : concentration calme sans anxiety comme la caféine', 'Hydratation : -2% eau = -20% performance cognitive. Boire !'],
    mealExample: 'Porridge avoine + kiwi + café noir + révisions → plus de concentration que les viennoiseries',
    activity: 'Pauses actives toutes les 45 min',
    activityDetail: ['La règle Pomodoro : 25 min focus, 5 min pause active (marche, étirements)', '20 min de vélo ou marche = autant bon pour la mémoire que la révision selon plusieurs études', 'Éviter les marathons de révision sans pause : rendement décroissant après 90 min'],
    checklist: ['Petit-déj obligatoire révisions', 'Poissons gras 2x', 'Hydratation ++', 'Pomodoro + pauses actives'],
    tip: 'Le sucre rapide avant un examen (barre chocolatée) baisse les performances 30 min après. Préférez une banane + noix.',
  },
  {
    num: 4, title: 'Semaine 4 – Plan anti-gaspillage et budget maîtrisé', color: 'from-green-100 to-teal-100',
    objective: 'Budget <25€/semaine, zéro gaspillage',
    habits: ['Faire sa liste de courses AVANT d\'aller au supermarché', 'Congeler ce qui approche de la date limite', 'Cuisiner en double portions et congeler la moitié'],
    nutrition: 'Alimentation économique et nutritive',
    nutritionDetail: ['Le pain dur → pain perdu, bruschetta, chapelure maison', 'Les légumes mous → soupe, sauce tomate, ratatouille', 'Les fruits trop mûrs → smoothie, compote, cake healthy', 'La viande proche DLC → hacher et faire bolognaise ou congeler'],
    mealExample: 'Ratatouille de fond de frigo + œufs (frittata) + pain rassis grillé',
    activity: 'Objectif : 30 min d\'activité physique / jour',
    activityDetail: ['Marche entre les cours (2 km = 25 min à pied)', 'Escaliers au lieu des ascenseurs', 'Séance de 30 min YouTube le soir : Yoga, pilates, HIIT selon vos goûts'],
    checklist: ['Liste courses avant shopping', 'Congélation anti-DLC', 'Cuisson en double', 'Budget ≤25€'],
    tip: 'Le marché de fin de journée (samedi 18h-19h) : les commerçants bradent les invendus. Économies de 40-60%.',
  },
];

export const ETUDIANT_DAY = {
  label: 'Journée type étudiant malin',
  subtitle: 'Équilibrée, rapide, budget <5€',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
  totalKcal: '2100 kcal',
  meals: [
    {
      icon: '🌅', name: 'Petit-déjeuner', time: '7h30', kcal: 420,
      items: ['Porridge d\'avoine (40g) + lait végétal', '1 banane', '1 café ou thé', 'Option : 2 tranches pain complet + beurre de cacahuète'],
      alt: 'Yaourt nature grand format + flocons avoine + miel',
    },
    {
      icon: '🍽️', name: 'Déjeuner (batch cooking)', time: '12h30', kcal: 680,
      items: ['Riz complet ou quinoa préparé le dimanche (150g)', 'Pois chiches assaisonnés ou lentilles', 'Légumes rôtis (du batch)', '1 yaourt nature'],
      alt: 'Pasta complète + sauce tomate maison + fromage râpé',
    },
    {
      icon: '🍎', name: 'Collation entre les cours', time: '16h00', kcal: 200,
      items: ['Poignée de noix (20g) ou 2 c.à.s beurre cacahuète', '1 fruit de saison'],
      alt: 'Fromage blanc + compote sans sucre',
    },
    {
      icon: '🌙', name: 'Dîner express', time: '20h00', kcal: 600,
      items: ['Omelette 3 œufs (5 min) + légumes surgelés poêlés', 'ou Soupe lentilles corail du batch (réchauffée 2 min)', '1 tranche de pain complet', '1 carré chocolat noir'],
      alt: 'Pâtes complètes + œuf poché + parmesan + huile olive',
    },
    {
      icon: '🫖', name: 'Soirée révisions', time: '22h00', kcal: 100,
      items: ['Thé vert ou tisane', '3-4 noix ou amandes'],
      alt: null,
    },
  ],
};

export const ETUDIANT_SHOPPING = [
  { cat: '🥩 Protéines (budget)', items: ['Œufs (12) ~2.20€', 'Lentilles vertes sèches (1kg) ~1.50€', 'Pois chiches sèches (500g) ~1.20€', 'Sardines conserve x3 boîtes ~2.40€', 'Thon conserve x2 boîtes ~2€', 'Fromage blanc (1kg) ~2.50€'] },
  { cat: '🌾 Féculents économiques', items: ['Flocons avoine (1kg) ~1.80€', 'Riz complet (1kg) ~1.50€', 'Pâtes complètes (1kg) ~1.40€', 'Pain complet ~1.60€'] },
  { cat: '🥦 Légumes malins', items: ['Épinards surgelés (1kg) ~2.20€', 'Mélange légumes surgelés (1kg) ~2€', 'Carottes (1kg) ~0.99€', 'Oignons (1kg) ~1.20€', 'Boîtes tomates pelées x4 ~2.80€'] },
  { cat: '🍌 Fruits accessibles', items: ['Bananes (1kg) ~1.50€', 'Pommes (1kg) ~2€', 'Kiwis (6) ~1.80€'] },
  { cat: '🛢️ Essentiels placard', items: ['Huile olive (500ml) ~3.50€', 'Beurre de cacahuète (500g) ~2.80€', 'Chocolat noir 70% ~1.50€', 'Miel (pot) ~3€', 'Levure de bière ~3.50€'] },
];

export const ETUDIANT_SPORT = [
  {
    icon: '🚴', title: 'Vélo & déplacements actifs',
    desc: '0€, fait de l\'exercice, économise le transport. Le mode de vie étudiant parfait.',
    detail: {
      intro: 'Le vélo est l\'activité physique avec le meilleur rapport coût-bénéfice qui soit. En se déplaçant à vélo, on fait son activité physique recommandée sans temps supplémentaire.',
      points: ['30 min de vélo/jour = objectif OMS atteint (150 min/semaine)', 'Économies : 50-100€/mois de transport en commun', 'Impact cognitif prouvé : améliore la mémorisation dans les 2h suivantes', 'Vélos en libre service dans beaucoup de villes'],
      example: 'Si vous avez 4 km de campus : aller-retour à vélo = 30 min d\'exercice + 0€ de transport.',
      tip: 'Pneus de vélo à gonfler régulièrement, cadenas U = investissement de 20-30€ pour 5 ans d\'économies.',
    },
  },
  {
    icon: '🏫', title: 'Sport universitaire gratuit',
    desc: 'Gymnase, piscine, cours collectifs : l\'université propose souvent des activités gratuites ou quasi.',
    detail: {
      intro: 'Le SUAPS (Service Universitaire des Activités Physiques et Sportives) propose des dizaines d\'activités à des prix symboliques ou gratuitement.',
      points: ['SUAPS : 15-30€/an pour accès à toutes les activités', 'Cours collectifs : yoga, danse, musculation, natation', 'Salles de sport universitaires souvent équipées', 'Associations sportives : sports collectifs, tournois inter-facs'],
      example: 'Renseignez-vous auprès de votre bureau des sports : la plupart des étudiants ignorent ces ressources.',
      tip: 'Les inscriptions au SUAPS ouvrent en septembre. Prenez les devants dès la rentrée, les places partent vite.',
    },
  },
  {
    icon: '💻', title: 'Sport à la maison (YouTube)',
    desc: 'Hima, Fitness Blender, Yoga with Adriene : des milliers de séances gratuites de qualité.',
    detail: {
      intro: 'YouTube a révolutionné l\'accès au sport. Des milliers de cours gratuits de toutes durées et niveaux sont disponibles, sans abonnement.',
      points: ['20-30 min suffisent pour un effet significatif', 'Yoga with Adriene (anglais) : yoga pour tous niveaux, 30 min/séance', 'Fitness Blender (anglais) : HIIT, musculation, étirements', 'Pause Sport (français) : exercices de bureau, 15 min pause active', 'Pas de matériel nécessaire dans un premier temps'],
      example: 'Challenge : 20 min de YouTube fitness 3x/semaine pendant 4 semaines. Observer l\'effet sur le sommeil et la concentration.',
      tip: 'La régularité prime : 20 min 4x/semaine > 90 min 1x/semaine. Habitude > performance.',
    },
  },
  {
    icon: '🧘', title: 'Méditation anti-stress examens',
    desc: 'Aussi efficace que les médicaments anxiolytiques dans les études pour réduire l\'anxiété d\'examen.',
    detail: {
      intro: 'Une méta-analyse de 2021 (JAMA Internal Medicine) montre que la méditation de pleine conscience réduit l\'anxiété, la dépression et la douleur de manière significative.',
      points: ['10 min/jour suffisent pour des effets mesurables en 4-8 semaines', 'App Petit Bambou : gratuite pour les bases, abonnement abordable', 'Méditation MBSR (Mindfulness Based Stress Reduction) : protocole validé', 'Pendant les révisions : 5 min de méditation entre chaque session'],
      example: '5 min de cohérence cardiaque avant un examen (inspire 5 sec, expire 5 sec) = réduction mesurable du cortisol.',
      tip: 'Certains étudiants méditent dans les transports en commun : casque, app de méditation guidée, yeux fermés.',
    },
  },
];

export const ETUDIANT_DRINKS = [
  { icon: '💧', name: 'Eau du robinet', rec: '1.5-2L/jour', ok: true, detail: 'L\'eau du robinet est contrôlée plus rigoureusement que l\'eau en bouteille en France. Elle coûte 200-400x moins cher. Investir dans une bonne gourde (15-20€) rentabilisée en 1 semaine.' },
  { icon: '🍵', name: 'Thé vert', rec: '1-2 tasses/jour', ok: true, detail: 'Le thé vert contient de la caféine + L-théanine : une combinaison qui donne une concentration calme et focalisée, sans les pics et crashes du café. Parfait pour les révisions. Coût : 5-8€ pour 2 mois.' },
  { icon: '☕', name: 'Café', rec: 'Max 2/jour avant 14h', ok: null, detail: 'Efficace en quantité modérée mais contre-productif en excès. Plus de 4 cafés/jour = anxiété, tremblements, mauvais sommeil. Attention à l\'addiction à la caféine : la dépendance s\'installe en 1-2 semaines.' },
  { icon: '🥛', name: 'Lait végétal maison', rec: 'À la place du lait UHT', ok: true, detail: 'Lait d\'avoine maison : mixer 100g flocons avoine + 1L eau + pincée de sel + 1 c.à.c vanille + filtrer. Coût : 0.20€ le litre vs 1.20€ en magasin. 5 minutes de préparation.' },
  { icon: '🧃', name: 'Jus de fruits', rec: 'Maximum 1 petit verre/jour', ok: null, detail: 'Riche en vitamine C mais pauvre en fibres et riche en sucre. 1 verre de jus d\'orange = sucre de 3 oranges sans la satiété. Un fruit entier est toujours préférable.' },
  { icon: '🍺', name: 'Alcool (soirées)', rec: 'Occasionnel, à limiter', ok: false, detail: 'L\'alcool détruit les vitamines B (essentielles à la concentration), fragmente le sommeil et augmente le cortisol le lendemain. Les jours d\'examens, les étudiants qui ont bu la veille ont de moins bons résultats en moyenne de 15% selon plusieurs études.' },
  { icon: '⚡', name: 'Boissons énergisantes', rec: 'À éviter absolument', ok: false, detail: 'Red Bull, Monster etc. : 40g de sucre + 80mg caféine + taurine + colorants. Le cycle sucre-crash aggrave la fatigue. Sur le long terme (>3/semaine), risques cardiaques documentés chez les jeunes adultes.' },
];

export const ETUDIANT_RECIPES = [
  {
    id: 'et1', title: 'Lentilles corail curry minute', category: 'etudiants', meal_category: 'diner',
    calories: 380, proteins: 20, carbs: 52, fats: 10, prep_time: 3, cook_time: 15, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop',
    description: '18 minutes, <1€ par portion, 20g de protéines. Le repas étudiant parfait.',
    ingredients: ['200g lentilles corail', '400ml lait de coco (boîte)', '1 c.à.c curry', '1 c.à.c curcuma', '1 boîte tomates pelées', '1 oignon', '1 c.à.s huile', 'Sel'],
    steps: ['Faire revenir l\'oignon 3 min dans l\'huile', 'Ajouter épices, mélanger 30 sec', 'Ajouter lentilles + tomates + lait de coco', 'Cuire 12-15 min en remuant', 'Servir avec du riz ou du pain'],
    dietitian_tips: 'Le lait de coco peut être remplacé par du bouillon pour diviser les calories par 2 et économiser.',
    allergy_alternatives: 'Sans gluten. Remplacer lait de coco par bouillon légumes pour version moins calorique.',
    tags: ['budget', 'protéines', 'rapide', 'végétarien'],
  },
  {
    id: 'et2', title: 'Pasta e fagioli (pâtes et haricots)', category: 'etudiants', meal_category: 'diner',
    calories: 450, proteins: 18, carbs: 70, fats: 10, prep_time: 5, cook_time: 20, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1551183053-bf91798d832f?w=600&auto=format&fit=crop',
    description: 'Plat traditionnel italien ultra-économique. Complet en protéines végétales.',
    ingredients: ['150g pâtes courtes complètes', '1 boîte haricots blancs (400g)', '1 boîte tomates concassées', '2 gousses ail', '1 branche romarin', '1 c.à.s huile olive', 'Sel, poivre', 'Parmesan (optionnel)'],
    steps: ['Faire revenir l\'ail dans l\'huile', 'Ajouter tomates + haricots + romarin', 'Cuire 10 min', 'Cuire les pâtes séparément', 'Mélanger tout ensemble, ajouter eau de cuisson si trop épais', 'Servir avec parmesan râpé'],
    dietitian_tips: 'La tradition italienne savait ce que la science a confirmé : légumineuses + céréales = protéines complètes.',
    allergy_alternatives: 'Sans lactose sans le parmesan. Sans gluten avec pâtes de riz.',
    tags: ['budget', 'végétarien', 'protéines-complètes', 'italie'],
  },
  {
    id: 'et3', title: 'Riz frit aux œufs style asiatique', category: 'etudiants', meal_category: 'diner',
    calories: 420, proteins: 18, carbs: 58, fats: 14, prep_time: 5, cook_time: 10, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop',
    description: 'Parfait pour utiliser le riz froid du batch cooking. 10 minutes et 1 seule poêle.',
    ingredients: ['150g riz cuit (de la veille de préférence)', '2 œufs', '1 poignée épinards surgelés', '1 c.à.s sauce soja', '1 c.à.c huile sésame ou huile neutre', '1 gousse ail', 'Gingembre en poudre'],
    steps: ['Chauffer l\'huile à feu vif', 'Faire revenir l\'ail 30 sec', 'Ajouter les épinards surgelés, cuire 2 min', 'Ajouter le riz, faire frire en remuant 3 min', 'Creuser un puits, casser les œufs, brouiller', 'Arroser de sauce soja, mélanger et servir'],
    dietitian_tips: 'Le riz réchauffé contient plus d\'amidon résistant que le riz frais : meilleur pour le microbiote.',
    allergy_alternatives: 'Sans gluten avec tamari à la place de la sauce soja.',
    tags: ['budget', 'rapide', 'anti-gaspi', 'batch-cooking'],
  },
  {
    id: 'et4', title: 'Wrap pois chiches épinards', category: 'etudiants', meal_category: 'dejeuner',
    calories: 480, proteins: 20, carbs: 62, fats: 16, prep_time: 10, cook_time: 5, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop',
    description: 'Transportable, équilibré, préparable en 10 min. Idéal pour emporter à la fac.',
    ingredients: ['1 grande tortilla complète', '80g pois chiches (boîte) égouttés', 'Poignée épinards frais', '1/4 avocat', '1 c.à.s houmous', 'Tomates cerises', 'Citron, sel'],
    steps: ['Écraser légèrement les pois chiches avec sel et citron', 'Tartiner la tortilla de houmous', 'Garnir : épinards, pois chiches, avocat, tomates', 'Rouler serré, couper en diagonale', 'Emballer dans film pour emporter'],
    dietitian_tips: 'Le wrap peut se préparer le soir et se conserver jusqu\'au lendemain midi au réfrigérateur sans problème.',
    allergy_alternatives: 'Remplacer la tortilla par une galette de sarrasin pour version sans gluten.',
    tags: ['à-emporter', 'végétarien', 'budget', 'rapide'],
  },
];

export const ETUDIANT_BLOGS = [
  {
    id: 'et-b1', title: 'Bien manger avec 25€ par semaine : le guide complet',
    excerpt: '25€ par semaine pour manger équilibré, c\'est possible. La stratégie des diététiciennes pour les étudiants : légumineuses, œufs, batch cooking et marchés malins.',
    content: `## Le budget étudiant réaliste\n\n25€/semaine = 3.57€/jour = 1.19€ par repas. C'est serré mais possible avec les bonnes stratégies.\n\n## Les aliments stars du budget étudiant\n\n### Protéines économiques (prix pour 20g de protéines)\n- **Œufs** : 0.35€\n- **Lentilles sèches** : 0.15€\n- **Pois chiches secs** : 0.20€\n- **Thon conserve** : 0.80€\n- **Sardines conserve** : 0.60€\n- **Poulet** : 1.20€\n- **Viande rouge** : 2.50-4€\n\n### Les céréales malines\n- Flocons d'avoine (1kg ~1.80€) : 20 petits-déjeuners\n- Riz complet (1kg ~1.50€) : 8-10 portions\n- Pâtes complètes (1kg ~1.40€) : 8-10 portions\n\n## Le batch cooking étudiant (1h30 dimanche)\n\n### Phase 1 (45 min) : Les bases\n1. Cuire 300g de riz complet (15 min + repos)\n2. Cuire 400g de lentilles (20 min)\n3. Rôtir 1 plateau de légumes de saison (30 min au four)\n\n### Phase 2 (30 min) : Les finitions\n4. Faire une grosse sauce tomate\n5. Préparer vinaigrette maison pour la semaine\n6. Cuire 8 œufs durs\n\n### Résultat : 5-6 repas préparés pour la semaine\n\n## Où faire ses courses\n- **Marché de fin de journée** : -40 à -60% sur les invendus\n- **Supermarché en ligne** : promo du jour, drive moins cher\n- **Enseignes discount** : Lidl, Aldi pour les secs et conserves\n- **Surgélés** : légumes nutritifs et économiques`,
    category: 'etudiants', read_time: 7,
  },
  {
    id: 'et-b2', title: 'Concentration et mémoire : ce que vous devriez manger avant de réviser',
    excerpt: 'Le cerveau consomme 20% des calories mais ne stocke pas de réserves. Ce que vous mangez avant de réviser influence directement votre performance.',
    content: `## Le cerveau et la nourriture\n\nLe cerveau consomme **120g de glucose par jour**, soit 20% des apports caloriques totaux. Il ne stocke pas de réserves, donc ce que vous mangez **maintenant** influence directement votre performance **dans 2h**.\n\n## Aliments pour la concentration\n\n### Les omega-3 DHA\nConstituant des membranes neuronales. Améliore la transmission synaptique.\n- Sources : sardines, saumon, maquereau, noix, graines de lin\n- Fréquence recommandée : 2-3 fois/semaine\n\n### Le glucose stable\nNon pas du sucre rapide (qui fait un crash), mais des glucides complexes :\n- Flocons d'avoine\n- Riz complet, quinoa\n- Légumineuses\n- Fruits entiers\n\n### La choline\nPrécurseur de l'acétylcholine (neurotransmetteur de la mémoire)\n- Sources : œufs (surtout le jaune !), foie, soja\n\n## Ce qu'il faut éviter avant de réviser\n- Repas très gras → flux sanguin vers la digestion, moins au cerveau\n- Sucres rapides → pic glycémique, crash 30-45 min après\n- Alcool → même une bière réduit les performances cognitives\n- Saut de repas → hypoglycémie = concentration impossible\n\n## Le repas idéal avant révision\nOmelette 2 œufs + épinards + pain complet + thé vert = protéines + choline + glucose stable + L-théanine`,
    category: 'etudiants', read_time: 6,
  },
];
export const FAMILLE_WEEKS = [
  {
    num: 1, title: 'Semaine 1 – Repas que tout le monde mange', color: 'from-rose-100 to-pink-100',
    objective: 'Trouver 5 repas qui plaisent à toute la famille',
    habits: ['Faire participer les enfants au choix du menu', 'Cuisiner ensemble 1 fois cette semaine', 'Servir les légumes de façon ludique'],
    nutrition: 'Aliments familiers améliorés nutritionnellement',
    nutritionDetail: ['Pizza maison sur pâte complète = 3x plus de fibres', 'Bolognaise avec lentilles mélangées = protéines végétales invisibles', 'Smoothies sucrés avec épinards = légumes sans qu\'on les voit'],
    mealExample: 'Pizza maison pâte complète + légumes colorés + fromage fondu',
    activity: 'Sortie familiale active : marche, vélo, parc',
    activityDetail: ['60 min d\'activité physique/jour pour les enfants (OMS)', 'Les sorties familiales actives remplacent l\'écran + font du sport', 'Cache-cache, football, vélo : les enfants bougent sans le savoir'],
    checklist: ['5 repas approuvés famille', 'Cuisine ensemble', 'Légumes déguisés', 'Sortie active'],
    tip: 'Les enfants acceptent mieux un aliment nouveau si ils participent à sa préparation. Impliquez-les, même pour laver les légumes.',
  },
  {
    num: 2, title: 'Semaine 2 – Les légumes en vedette', color: 'from-orange-100 to-rose-100',
    objective: 'Doubler la consommation de légumes de la famille',
    habits: ['Servir toujours un légume AVANT le reste du repas', 'Proposer 2 légumes différents par repas', 'Couper les légumes en formes amusantes pour les enfants'],
    nutrition: 'Légumes comme base, pas comme accompagnement',
    nutritionDetail: ['Un enfant qui mange des légumes en premier mange moins de féculents : effet de satiété', 'Les légumes colorés différents = nutriments complémentaires', 'Texture croquante vs molle = varier pour accrocher différentes préférences'],
    mealExample: 'Plateau d\'apéro légumes crus + houmous AVANT le repas → enfants qui mangent plus de légumes',
    activity: 'Jardinage ou potager pour les enfants',
    activityDetail: ['Un enfant qui a semé des tomates les mange plus volontiers', 'Herbes aromatiques en pot sur le rebord de fenêtre = premier potager', 'Visiter un marché et laisser l\'enfant choisir un légume inconnu'],
    checklist: ['Légumes en premier', '2 légumes différents/repas', 'Coupes amusantes', 'Potager ou marché'],
    tip: 'La règle de l\'exposition répétée : un enfant doit voir un aliment 10-15 fois avant de l\'accepter. Ne jamais abandonner après 2 refus.',
  },
  {
    num: 3, title: 'Semaine 3 – Protéines et diversité', color: 'from-yellow-100 to-orange-100',
    objective: 'Diversifier les sources de protéines pour toute la famille',
    habits: ['Introduire 1 repas sans viande par semaine', 'Faire découvrir les légumineuses sous forme appétissante', 'Réduire la charcuterie de 50%'],
    nutrition: 'Protéines variées pour tous les membres',
    nutritionDetail: ['Les légumineuses en sauce tomate sont les plus acceptées par les enfants', 'Boulettes de viande avec moitié lentilles = même goût, moins de graisses saturées', 'Houmous, guacamole : légumineuses déguisées en dips appréciés'],
    mealExample: 'Boulettes viande/lentilles en sauce tomate + pâtes = identique visuellement, amélioré nutritionnellement',
    activity: 'Cours de cuisine pour enfants ou atelier du quartier',
    activityDetail: ['De nombreuses villes proposent des ateliers cuisine enfants abordables', 'Cuisine avec les enfants = math, chimie, motricité fine', 'Les enfants qui cuisinent développent moins de troubles alimentaires'],
    checklist: ['1 repas sans viande', 'Légumineuses acceptées', 'Moins de charcuterie', 'Atelier cuisine'],
    tip: 'Remplacez 30% de la viande hachée par des lentilles cuites dans les bolognaises : personne ne le voit, tout le monde y gagne.',
  },
  {
    num: 4, title: 'Semaine 4 – Goûters et desserts rééquilibrés', color: 'from-pink-100 to-purple-100',
    objective: 'Remplacer les goûters ultra-transformés par des alternatives savoureuses',
    habits: ['Préparer le goûter maison le week-end en avance', 'Réduire les céréales sucrées du matin', 'Faire un dessert maison par semaine'],
    nutrition: 'Sucres naturels à la place du sucre raffiné',
    nutritionDetail: ['Yaourt nature + miel + fruits = dessert complet avec 3x moins de sucre qu\'un yaourt aromatisé', 'Compote maison sans sucre : naturellement sucrée par les pommes cuites', 'Cake banane-avoine : aussi moelleux qu\'un gâteau ordinaire, sans sucre ajouté'],
    mealExample: 'Cake banane-avoine maison + lait ou yaourt = goûter équilibré, sans sucre ajouté',
    activity: 'Préparer le goûter ou dessert avec les enfants',
    activityDetail: ['La cuisine = activité créative, apprentissage des proportions', 'Les enfants mangent toujours ce qu\'ils ont préparé', 'Préparer en double et congeler la moitié'],
    checklist: ['Goûter maison', 'Moins céréales sucrées', 'Dessert maison x1', 'Cuisine enfants'],
    tip: 'Un enfant qui ne mange pas ses légumes peut souvent les accepter mixés dans un cake salé ou des galettes. Soyez créatifs !',
  },
];

export const FAMILLE_DAY = {
  label: 'Journée type famille équilibrée',
  subtitle: 'Enfants et adultes, apprécié par tous',
  image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&auto=format&fit=crop',
  totalKcal: '2200 kcal adulte (adapter pour enfants)',
  meals: [
    {
      icon: '🌅', name: 'Petit-déjeuner', time: '7h30', kcal: 480,
      items: ['Pain complet ou pain au levain grillé', 'Œuf à la coque ou brouillé', 'Fromage frais ou tranche de fromage', '1 fruit frais (orange, kiwi, banane)', 'Lait ou yaourt nature'],
      alt: 'Pancakes avoine banane maison + sirop érable',
    },
    {
      icon: '🍽️', name: 'Déjeuner', time: '12h30', kcal: 700,
      items: ['Bolognaise viande/lentilles + pâtes complètes', 'Salade verte assaisonnée', 'Pain au levain', 'Yaourt nature + compote'],
      alt: 'Poulet rôti + riz complet + carottes glacées',
    },
    {
      icon: '🍎', name: 'Goûter (enfants)', time: '16h30', kcal: 250,
      items: ['Compote pomme maison', '3-4 noix ou amandes', '1 carré de chocolat noir'],
      alt: 'Cake banane-avoine maison + lait',
    },
    {
      icon: '🌙', name: 'Dîner', time: '19h30', kcal: 580,
      items: ['Soupe de légumes maison (hiver) ou salade composée (été)', 'Quiche légumes ou tartelettes', 'Pain', 'Fruit de saison'],
      alt: 'Frittata œufs-légumes + pain + fromage',
    },
  ],
};

export const FAMILLE_SHOPPING = [
  { cat: '🥩 Protéines famille', items: ['Poulet entier x1', 'Steak haché 5% (500g)', 'Filets de saumon x4', 'Œufs (18)', 'Fromage (emmental, chèvre)', 'Lentilles vertes (500g)'] },
  { cat: '🌾 Féculents appréciés par tous', items: ['Pâtes complètes (1kg)', 'Riz complet (500g)', 'Quinoa (300g)', 'Pain au levain (2 miches)', 'Farine avoine (cake goûter)'] },
  { cat: '🥦 Légumes polyvalents', items: ['Carottes (1kg)', 'Courgettes (1kg)', 'Tomates (1kg)', 'Épinards frais (500g)', 'Poivrons (3)', 'Brocoli (1)', 'Champignons (500g)'] },
  { cat: '🍌 Fruits', items: ['Pommes (1kg)', 'Bananes (1 régime)', 'Oranges (6)', 'Kiwis (6)', 'Compote pomme sans sucre x6'] },
  { cat: '🧁 Goûters sains', items: ['Noix (200g)', 'Amandes (200g)', 'Chocolat noir 70% (100g)', 'Yaourts nature (x8)', 'Fromage blanc (1kg)'] },
];

export const FAMILLE_SPORT = [
  {
    icon: '🚴', title: 'Sorties vélo en famille',
    desc: 'Activité physique pour tous les âges, moment de partage, aucun écran. 1 heure couvre l\'objectif OMS hebdomadaire d\'un enfant.',
    detail: {
      intro: 'Le vélo est l\'activité familiale idéale : intensité adaptable à chaque membre, économique, et crée des souvenirs partagés.',
      points: ['Enfants : 60 min/jour d\'activité physique recommandée (OMS)', 'Vélo + nature = double bénéfice (exercice + stress réduit)', 'Pique-nique sain au bout du chemin : motivation supplémentaire', 'Voies vertes et pistes cyclables : disponibles dans la plupart des villes'],
      example: 'Sortie le dimanche matin : 45 min à vélo jusqu\'à un parc, pique-nique, retour. 3h d\'activité familiale pour le coût d\'un panier repas.',
      tip: 'Adaptez la difficulté : les plus petits peuvent utiliser des vélos cargo ou des remorques.',
    },
  },
  {
    icon: '🏊', title: 'Piscine familiale',
    desc: 'Activité physique complète, sans impact articulaire, accessible à tous les âges et niveaux.',
    detail: {
      intro: 'La natation est l\'une des rares activités physiques qui convient à tout le monde, des nourrissons aux grands-parents. Les piscines municipales proposent souvent des tarifs familiaux avantageux.',
      points: ['Tarif famille piscine municipale : 5-15€ pour toute la famille', 'Aquagym : idéal pour les parents avec contraintes articulaires', 'Les enfants adorent : jeux d\'eau, plongeons, courses', 'Excellent pour la qualité du sommeil nocturne (surtout des enfants)'],
      example: '1h de piscine en famille le samedi matin. Les enfants dorment mieux le samedi soir.',
      tip: 'Profitez des "séances famille" souvent moins chères que les séances individuelles cumulées.',
    },
  },
  {
    icon: '🌳', title: 'Jardinage et potager',
    desc: 'Les enfants qui ont semé leurs légumes les mangent. Activité physique, éducation, connexion à la nature.',
    detail: {
      intro: 'Le jardinage combine activité physique modérée, éducation alimentaire naturelle et réduction du stress. Les études montrent que les enfants qui participent à la culture de légumes en consomment jusqu\'à 3x plus.',
      points: ['Potager sur balcon (bacs) : tomates cerises, herbes, radis', 'Jardin partagé communautaire : si pas d\'espace personnel', 'Les herbes aromatiques en pot intérieur : facile, peu cher, éducatif', 'Les enfants apprennent la patience, les cycles naturels, la biologie'],
      example: 'Dimanche : planter des tomates cerises dans un bac sur le balcon. Enfant responsable de l\'arrosage. Objectif : déguster dans 2 mois.',
      tip: 'Commencez par des radis (prêts en 3-4 semaines) pour une récompense rapide qui maintient la motivation.',
    },
  },
  {
    icon: '🎮', title: 'Jeux actifs en famille',
    desc: 'Cache-cache, ballon, danse : les enfants bougent sans s\'en rendre compte.',
    detail: {
      intro: 'Les jeux actifs sont la façon la plus naturelle et motivante de faire bouger les enfants. 30 min de jeux intenses peuvent remplacer une séance de sport pour un enfant.',
      points: ['Just Dance en famille : cardio déguisé en jeu vidéo', 'Ballon dans le jardin ou le parc : coordinaton, cardio', 'Chasse au trésor à pied dans le quartier', 'Sports de raquette : badminton, ping-pong (30€ pour la table)'],
      example: 'Défi Just Dance 3 chansons après le dîner : 15 min, 150-200 kcal, fous rires garantis.',
      tip: 'Les enfants imitent leurs parents. Si vous bougez, ils bougent. L\'exemple est le meilleur outil éducatif.',
    },
  },
];

export const FAMILLE_DRINKS = [
  { icon: '💧', name: 'Eau plate', rec: 'La boisson principale', ok: true, detail: 'L\'eau doit être la boisson par défaut à table pour toute la famille. Les enfants qui grandissent avec l\'eau comme boisson principale ont moins de caries, moins de surpoids et de meilleures habitudes durables.' },
  { icon: '🥛', name: 'Lait demi-écrémé', rec: 'Enfants : 2-3 portions/jour', ok: true, detail: 'Le lait est toujours recommandé pour les enfants jusqu\'à 10-12 ans : calcium pour les os, protéines, vitamine D. Demi-écrémé après 2 ans. Pas de lait écrémé pour les enfants (trop peu de graisses).' },
  { icon: '🧃', name: 'Jus de fruits (pur)', rec: '1 petit verre max/jour', ok: null, detail: 'Un seul verre de jus d\'orange (150ml) par jour suffit pour les enfants. Plus = apport en sucre excessif. Préférer le fruit entier qui inclut les fibres et génère plus de satiété.' },
  { icon: '🍵', name: 'Tisanes douces', rec: 'Camomille, tilleul pour enfants', ok: true, detail: 'Les tisanes douces sans théine sont idéales le soir pour les enfants : camomille (apaisante), tilleul (favorise le sommeil). Légèrement sucrées au miel, elles peuvent remplacer les boissons sucrées du soir.' },
  { icon: '🧋', name: 'Sodas', rec: 'Occasions spéciales uniquement', ok: false, detail: 'Un verre de soda contient 40-50g de sucre (l\'équivalent de 10 morceaux). Les enfants qui consomment régulièrement des sodas ont 2x plus de risques de surpoids à 10 ans. Réservez aux fêtes d\'anniversaire et occasions exceptionnelles.' },
  { icon: '🍫', name: 'Chocolat chaud maison', rec: '1-2 fois/semaine', ok: null, detail: 'Chocolat chaud maison (lait + cacao non sucré + pincée de sucre ou miel) = bien meilleur que les préparations industrielles. 3x moins de sucre, plus de magnésium, et les enfants adorent le préparer eux-mêmes.' },
];

export const FAMILLE_RECIPES = [
  {
    id: 'fa1', title: 'Bolognaise viande et lentilles cachées', category: 'famille', meal_category: 'diner',
    calories: 520, proteins: 32, carbs: 58, fats: 16, prep_time: 10, cook_time: 30, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop',
    description: 'Les lentilles sont invisibles dans la sauce. Plus de protéines végétales, moins de graisses saturées.',
    ingredients: ['300g steak haché 5%', '200g lentilles rouges sèches (ou 1 boîte pré-cuites)', '2 boîtes tomates concassées', '1 oignon', '2 gousses ail', 'Herbes de Provence', '1 c.à.s huile olive', 'Sel, poivre'],
    steps: ['Cuire les lentilles 15 min dans de l\'eau bouillante', 'Faire revenir oignon + ail', 'Ajouter la viande, colorer', 'Ajouter tomates + lentilles égouttées + herbes', 'Mijoter 20 min', 'Servir sur pâtes complètes avec parmesan'],
    dietitian_tips: 'Les lentilles rouges fondent dans la sauce et deviennent invisibles. Même texture, mais 40% de protéines animales en moins.',
    allergy_alternatives: 'Version 100% végétale : remplacer viande par 100g lentilles supplémentaires + champignons émincés.',
    tags: ['famille', 'légumineuses-cachées', 'batch-cooking', 'enfants-approuvé'],
  },
  {
    id: 'fa2', title: 'Pizza maison pâte semi-complète', category: 'famille', meal_category: 'diner',
    calories: 480, proteins: 22, carbs: 60, fats: 18, prep_time: 20, cook_time: 15, servings: 4, difficulty: 'moyen',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop',
    description: 'La pizza que toute la famille aime. Pâte semi-complète, légumes colorés, fromage de qualité.',
    ingredients: ['300g farine T80 (semi-complète)', '1 sachet levure de boulanger', '200ml eau tiède', '2 c.à.s huile olive', '200ml sauce tomate maison', '150g mozzarella', 'Légumes au choix : poivrons, champignons, courgettes', 'Origan, basilic'],
    steps: ['Mélanger farine + levure + eau tiède + huile + sel', 'Pétrir 10 min, faire lever 1h', 'Étaler la pâte', 'Garnir : sauce tomate, légumes, mozzarella', 'Cuire 230°C 12-15 min'],
    dietitian_tips: 'La farine T80 contient 3x plus de fibres que la T45. À la dégustation, personne ne fait la différence.',
    allergy_alternatives: 'Sans gluten : farine de riz + fécule de pomme de terre (recette pâte GF). Sans lactose : mozzarella végane.',
    tags: ['famille', 'fait-maison', 'enfants-adorent', 'week-end'],
  },
  {
    id: 'fa3', title: 'Cake banane avoine (sans sucre ajouté)', category: 'famille', meal_category: 'collation',
    calories: 220, proteins: 6, carbs: 36, fats: 7, prep_time: 10, cook_time: 35, servings: 6, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1551879400-111a9087cd86?w=600&auto=format&fit=crop',
    description: 'Goûter sain pour enfants et adultes. Sans sucre ajouté, moelleux, 10 minutes de préparation.',
    ingredients: ['3 bananes très mûres', '2 œufs', '150g flocons d\'avoine', '50g noix concassées', '1 c.à.c cannelle', '1 c.à.c bicarbonate', 'Pépites de chocolat (optionnel)'],
    steps: ['Préchauffer four 180°C', 'Écraser les bananes en purée', 'Ajouter œufs battus, avoine, cannelle, bicarbonate', 'Ajouter noix et pépites chocolat', 'Verser en moule, cuire 35 min', 'Vérifier cuisson avec un couteau'],
    dietitian_tips: 'Les bananes très mûres apportent tout le sucre nécessaire. Plus la banane est mûre et sucrée, meilleur est le cake.',
    allergy_alternatives: 'Sans gluten si avoine certifiée GF. Sans oeufs : remplacer chaque oeuf par 1 c.à.s graines de lin + 3 c.à.s d\'eau.',
    tags: ['sans-sucre-ajouté', 'goûter-sain', 'enfants', 'batch-cooking'],
  },
  {
    id: 'fa4', title: 'Pancakes avoine et banane', category: 'famille', meal_category: 'petitdej',
    calories: 340, proteins: 14, carbs: 48, fats: 10, prep_time: 5, cook_time: 15, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop',
    description: 'Le petit-déjeuner que les enfants adorent préparer. Sans gluten, sans sucre ajouté.',
    ingredients: ['100g flocons d\'avoine mixés ou farine avoine', '1 banane', '2 œufs', '100ml lait ou lait végétal', '1/2 c.à.c levure', '1 pincée de cannelle', 'Sirop d\'érable, fruits frais pour servir'],
    steps: ['Mixer la banane avec les œufs', 'Ajouter la farine avoine, lait, levure, cannelle', 'Chauffer poêle à feu moyen-doux', 'Verser 2-3 c.à.s par pancake, cuire 2-3 min de chaque côté', 'Servir avec fruits frais et un filet de sirop'],
    dietitian_tips: 'Les pancakes à l\'avoine ont un index glycémique 2x plus bas que les pancakes classiques.',
    allergy_alternatives: 'Sans gluten naturellement (avoine). Sans lait : lait de coco ou d\'amande.',
    tags: ['enfants', 'sans-sucre-ajouté', 'rapide', 'week-end'],
  },
];

export const FAMILLE_BLOGS = [
  {
    id: 'fa-b1', title: 'Comment faire manger des légumes à des enfants difficiles',
    excerpt: 'La stratégie basée sur la science : exposition répétée, légumes cachés, participation à la cuisine. Tout ce qui fonctionne vraiment (et ce qui ne fonctionne pas).',
    content: `## Pourquoi les enfants refusent les légumes\n\nC'est normal. Les enfants ont une aversion naturelle aux goûts amers (mécanisme de survie évolutif : les plantes amères peuvent être toxiques). Les légumes verts sont souvent amers.\n\n## Ce qui fonctionne vraiment\n\n### 1. L'exposition répétée (règle des 10-15 expositions)\nUn enfant doit voir et goûter un aliment 10 à 15 fois avant de l'accepter. La plupart des parents abandonnent après 2-3 refus. **Ne jamais abandonner.**\n\n### 2. Les légumes cachés\n- Épinards dans les pancakes (ils deviennent verts et amusants)\n- Courgette râpée dans les galettes, les cakes salés\n- Carottes dans la sauce tomate (fondent et s'y intègrent)\n- Chou-fleur mixé dans la béchamel\n\n### 3. La participation à la cuisine\nUn enfant qui participe à la préparation mange ce qu'il a fait. Il peut commencer par : rincer les légumes, mélanger, garnir une pizza.\n\n### 4. Le modèle parental\nLes enfants mangent ce que leurs parents mangent. Si vous mangez des légumes avec plaisir, ils les mangeront.\n\n### 5. La présentation ludique\n- Légumes en formes (emporte-pièce)\n- Plateau de crudités colorées comme une "assiette arc-en-ciel"\n- Brochettes de légumes colorés\n\n## Ce qui ne fonctionne pas\n- Forcer : crée une aversion durable\n- Négocier ("si tu manges tes légumes, tu auras un dessert") : le dessert devient plus désirable, les légumes moins\n- Se battre à table : les repas deviennent anxiogènes`,
    category: 'famille', read_time: 7,
  },
];
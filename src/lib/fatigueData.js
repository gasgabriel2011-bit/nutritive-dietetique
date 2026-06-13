export const FATIGUE_WEEKS = [
  {
    num: 1, title: 'Semaine 1 – Bilan & urgences nutritionnelles', color: 'from-yellow-100 to-amber-100',
    objective: 'Identifier les carences possibles et stabiliser la glycémie',
    habits: ['Supprimer le sucre le matin (viennoiseries, céréales sucrées)', 'Manger des protéines au petit-déjeuner', 'Se coucher avant 23h et viser 7-9h de sommeil'],
    nutrition: 'Priorité : protéines et glycémie stable',
    nutritionDetail: ['Petit-déjeuner protéiné = énergie stable jusqu\'à 13h', 'Éviter les pics glycémiques : pâtes blanches → riz complet, semoule → quinoa', 'Manger toutes les 4-5h maximum pour éviter les hypoglycémies réactionnelles'],
    mealExample: 'Œufs brouillés + avocat + pain complet + thé vert (pas de jus de fruits)',
    activity: 'Marche 15-20 min le matin au soleil',
    activityDetail: ['La lumière matinale synchronise l\'horloge circadienne', 'L\'exercice léger augmente la dopamine et l\'énergie sans épuiser', 'Éviter le sport intense en cas de fatigue profonde (risque de surmenage)'],
    checklist: ['Petit-déj protéiné', 'Pas de sucre le matin', 'Coucher avant 23h', 'Marche soleil'],
    tip: 'La fatigue après le repas est souvent due à un repas trop riche en glucides simples. Commencez par les protéines et les légumes, les glucides en dernier.',
  },
  {
    num: 2, title: 'Semaine 2 – Fer, B12 et magnésium', color: 'from-amber-100 to-orange-100',
    objective: 'Combler les carences les plus fréquentes de la fatigue',
    habits: ['Manger de la viande rouge ou des lentilles 3x/semaine', 'Associer fer et vitamine C (citron + lentilles)', 'Réduire le café : il bloque l\'absorption du fer de 60%'],
    nutrition: 'Focus fer, B12, magnésium',
    nutritionDetail: ['Fer héminique (mieux absorbé) : viande rouge, foie, moules', 'Fer non-héminique : lentilles, épinards, tofu + toujours avec vitamine C', 'Magnésium : chocolat noir, graines de courge, amandes, légumineuses', 'B12 : œufs, produits laitiers, viandes (si végétalien : supplément indispensable)'],
    mealExample: 'Soupe de lentilles + jus de citron + pain complet + verre d\'eau (thé/café 1h après)',
    activity: 'Yoga doux ou stretching 20 min',
    activityDetail: ['Le yoga doux améliore la circulation et réduit la fatigue chronique', 'Éviter les activités épuisantes en début de protocole', 'La respiration pranayama (yoga) augmente l\'oxygénation des tissus'],
    checklist: ['Fer x3/semaine', 'Vitamine C avec le fer', 'Magnésium quotidien', 'Café après les repas'],
    tip: 'Le café et le thé bloquent l\'absorption du fer. Attendez minimum 1h après un repas riche en fer avant d\'en boire.',
  },
  {
    num: 3, title: 'Semaine 3 – Vitamines D et B complexe', color: 'from-orange-100 to-red-100',
    objective: 'Optimiser les vitamines essentielles à l\'énergie cellulaire',
    habits: ['S\'exposer 15-20 min au soleil sans crème entre 11h et 15h', 'Manger des aliments riches en vitamines B (levure, céréales complètes)', 'Réduire l\'alcool qui détruit les vitamines B'],
    nutrition: 'Vitamines B et D au menu',
    nutritionDetail: ['Vitamine D : sardines, maquereau, saumon, œufs, champignons exposés au soleil', 'Vitamine B1 (énergie) : levure de bière, germe de blé, légumineuses', 'Vitamine B6 (nerfs) : poulet, banane, pois chiches', 'Vitamine B9 (folate) : épinards, asperges, légumineuses, avocat'],
    mealExample: 'Salade de sardines + avocat + asperges + œuf dur + vinaigrette citron',
    activity: 'Natation ou vélo léger 30 min',
    activityDetail: ['Les activités en extérieur combinent exercice et vitamine D solaire', 'Le vélo est excellent : pas d\'impact articulaire, oxygène les muscles', 'Commencer par 20 min et augmenter progressivement si la fatigue s\'améliore'],
    checklist: ['Soleil 15 min/jour', 'Poissons gras 2x/sem', 'Légumes verts foncés', 'Alcool réduit'],
    tip: '70% des Français manquent de vitamine D en hiver. Si la fatigue persiste, faites un bilan sanguin.',
  },
  {
    num: 4, title: 'Semaine 4 – Sommeil & récupération optimisée', color: 'from-purple-100 to-violet-100',
    objective: 'Optimiser la qualité du sommeil pour une récupération maximale',
    habits: ['Alimentation du soir riche en tryptophane (précurseur mélatonine)', 'Blackout total de la chambre, température 18-19°C', 'Arrêter les écrans 1h avant le coucher'],
    nutrition: 'Dîner léger favorisant le sommeil',
    nutritionDetail: ['Tryptophane : dinde, œufs, noix, banane, lait chaud', 'Magnésium le soir : chocolat noir, amandes, eaux Hépar/Contrex', 'Glucides complexes le soir : favorisent l\'entrée du tryptophane dans le cerveau', 'Éviter les repas trop lourds ou trop tardifs (pas après 20h idéalement)'],
    mealExample: 'Dinde rôtie + patate douce + épinards + carré chocolat noir + tisane valériane',
    activity: 'Étirements du soir + routine de coucher',
    activityDetail: ['15 min d\'étirements doux = cortisol réduit, endormissement facilité', 'Lire un livre physique (pas de tablette) dans un éclairage chaud', 'Méditation pleine conscience ou scan corporel (app Petit Bambou)'],
    checklist: ['Dîner tryptophane', 'Chambre noire 18°C', 'Pas d\'écran 1h avant', 'Étirements soir'],
    tip: 'Chaque heure de sommeil avant minuit compte double. Couchez-vous à 22h30, pas 23h30.',
  },
];

export const FATIGUE_DAY = {
  label: 'Journée type anti-fatigue',
  subtitle: 'Énergie stable, glycémie maîtrisée, vitamines optimales',
  image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop',
  totalKcal: '2000 kcal',
  meals: [
    {
      icon: '🌅', name: 'Petit-déjeuner', time: '7h00', kcal: 480,
      items: ['2 œufs brouillés ou pochés', '1/2 avocat', '1 tranche de pain complet', 'Thé vert ou café noir', '1 orange (vitamine C)'],
      alt: 'Yaourt grec 0% + granola maison + fruits rouges',
    },
    {
      icon: '🍎', name: 'Collation matinale', time: '10h30', kcal: 160,
      items: ['1 poignée d\'amandes (20g)', '1 kiwi (vitamine C)'],
      alt: 'Carré de chocolat noir 85% + banane',
    },
    {
      icon: '🍽️', name: 'Déjeuner', time: '12h30', kcal: 620,
      items: ['Riz complet ou quinoa (150g cuit)', 'Escalope de dinde ou sardines (150g)', 'Épinards sautés à l\'ail', 'Tomates cerises + huile olive', 'Eau avec citron'],
      alt: 'Lentilles corail + légumes + tahini',
    },
    {
      icon: '🍌', name: 'Collation', time: '16h30', kcal: 200,
      items: ['Banane + 1 c.à.s beurre d\'amande', 'ou 1 yaourt grec + 1 c.à.c miel'],
      alt: 'Pain complet + fromage frais + concombre',
    },
    {
      icon: '🌙', name: 'Dîner', time: '19h30', kcal: 540,
      items: ['Filet de saumon ou maquereau (150g)', 'Patate douce rôtie (200g)', 'Brocoli vapeur', 'Huile olive + curcuma', 'Carré chocolat noir 85%'],
      alt: 'Omelette 3 œufs + légumes + fromage chèvre',
    },
  ],
};

export const FATIGUE_SHOPPING = [
  { cat: '🥩 Protéines et fer', items: ['Steak haché 5% x2', 'Filets de sardines (conserve)', 'Filet de saumon x2', 'Blanc de dinde x3', 'Œufs (12)', 'Lentilles vertes (500g)'] },
  { cat: '🌾 Féculents énergétiques', items: ['Riz complet (500g)', 'Quinoa (300g)', 'Pain complet au levain', 'Flocons d\'avoine (500g)', 'Patates douces (1kg)'] },
  { cat: '🥦 Légumes riches en vitamines', items: ['Épinards frais (500g)', 'Brocoli (500g)', 'Asperges (500g)', 'Betterave cuite', 'Tomates cerises (500g)'] },
  { cat: '🍌 Fruits énergétiques', items: ['Bananes (6)', 'Oranges (6)', 'Kiwis (6)', 'Myrtilles (200g)', 'Avocat (3)'] },
  { cat: '🫘 Oléagineux et graines', items: ['Amandes (200g)', 'Noix du Brésil (100g)', 'Graines de courge (100g)', 'Chocolat noir 85% (100g)', 'Beurre d\'amande (1 pot)'] },
  { cat: '🫖 Boissons et compléments', items: ['Thé vert bio', 'Tisane valériane', 'Eau Hépar (magnésium)', 'Levure de bière en paillettes'] },
];

export const FATIGUE_SPORT = [
  {
    icon: '☀️', title: 'Marche matinale au soleil',
    desc: 'Synchronise l\'horloge interne, stimule la vitamine D et booste la dopamine en 15 minutes.',
    detail: {
      intro: 'La lumière naturelle matinale est le signal le plus puissant pour synchroniser votre rythme circadien. Elle déclenche la production de cortisol (normal le matin), stoppe la mélatonine et booste la dopamine.',
      points: ['15-20 min suffisent, idéalement avant 10h', 'Sans lunettes de soleil pour les 5 premières minutes', 'Même par temps nuageux : 5x plus de lumière qu\'en intérieur', 'Combiné à la marche : double effet dopaminergique'],
      example: 'Marcher jusqu\'à la boulangerie, faire un tour du quartier, promener son chien avant 9h.',
      tip: 'Ne regardez pas directement le soleil. Regardez le ciel et l\'horizon pour maximiser la stimulation rétinienne.',
    },
  },
  {
    icon: '🧘', title: 'Yoga restauratif',
    desc: 'Réduit le cortisol chronique, améliore la qualité du sommeil et restaure l\'énergie nerveuse.',
    detail: {
      intro: 'La fatigue chronique est souvent accompagnée d\'un cortisol élevé (paradoxalement). Le yoga restauratif active le système parasympathique et brise ce cycle.',
      points: ['Shavasana guidé 15 min = récupération équivalente à 1h de sommeil léger', 'Yoga nidra (yoga du sommeil) : 20 min = 4h de sommeil selon certaines études', 'Postures inversées douces : inversent le flux sanguin, réduisent la fatigue adréna', 'Pas de yoga dynamique (vinyasa) si fatigue profonde'],
      example: 'Application Petit Bambou ou YouTube : "yoga restauratif fatigue chronique". Séance le soir avant de dormir.',
      tip: 'Le yoga nidra est particulièrement recommandé pour les personnes en burnout ou fatigue chronique.',
    },
  },
  {
    icon: '🏊', title: 'Natation douce',
    desc: 'Oxygène les tissus, améliore la circulation et l\'énergie sans épuiser les articulations.',
    detail: {
      intro: 'La natation est souvent contre-indiquée à tort lors de fatigue. En réalité, 30 min de natation douce augmentent significativement l\'énergie perçue dans les 2 heures qui suivent.',
      points: ['Nage lente et régulière : crawl ou dos crawlé, pas de sprint', '30 min 2-3x/semaine suffisent pour voir des effets', 'L\'eau à 28°C a un effet calmant sur le système nerveux', 'Améliore la qualité du sommeil dès la première séance'],
      example: 'Piscine municipale : 30 min de nage tranquille, douche chaude, relaxation. En sortir plus en forme qu\'en y entrant.',
      tip: 'Si vous nagez le soir, privilégiez les eaux à 26-28°C. L\'eau froide est stimulante et peut retarder le sommeil.',
    },
  },
  {
    icon: '💆', title: 'Cohérence cardiaque & méditation',
    desc: 'Réduit le cortisol de 23% en 6 semaines de pratique régulière. Le remède scientifique au stress.',
    detail: {
      intro: 'La cohérence cardiaque est une technique de respiration qui synchronise le cœur et le cerveau, réduisant le cortisol et augmentant la DHEA (hormone de vitalité).',
      points: ['Protocole 365 : 3 fois/jour, 6 respirations/min, 5 min', 'Résultats mesurables en cortisol salivaire dès 4-6 semaines', 'La DHEA (anti-stress, anti-vieillissement) augmente de 100% chez les pratiquants réguliers', 'App : Respirelax (gratuite), Kardia, ou simplement un minuteur'],
      example: 'Avant le petit-déjeuner, avant le déjeuner, et avant le dîner : 5 min de cohérence cardiaque. Inspire 5 sec, expire 5 sec.',
      tip: 'La cohérence cardiaque doit être pratiquée AVANT les repas pour en potentialiser les effets digestifs.',
    },
  },
];

export const FATIGUE_DRINKS = [
  { icon: '🍵', name: 'Thé vert matcha', rec: '1 tasse le matin', ok: true, detail: 'Le matcha contient de la caféine et de la L-théanine, un acide aminé qui donne une énergie calme et focalisée sans les pics et crashes du café. Il contient aussi 137x plus d\'EGCG (antioxydant) que le thé vert en sachet. Idéal pour remplacer le café.' },
  { icon: '💧', name: 'Eau plate (≥1.5L)', rec: 'Toute la journée', ok: true, detail: 'Une déshydratation de 1-2% réduit les performances cognitives de 20% et la fatigue perçue augmente de 30%. La plupart des gens chroniquement fatigués sont légèrement déshydratés. Commencer la journée avec un grand verre d\'eau avant tout.' },
  { icon: '🍹', name: 'Smoothie fer + vitamine C', rec: '1 fois/jour', ok: true, detail: 'Mixer : épinards + orange + banane + graines de lin + eau. La vitamine C de l\'orange triple l\'absorption du fer des épinards. Une habitude de 5 min qui peut corriger une anémie ferriprive légère en 4-6 semaines.' },
  { icon: '🌿', name: 'Jus d\'herbe d\'orge', rec: '1 sachet/matin', ok: null, detail: 'Riche en chlorophylle, vitamines B, fer, et antioxydants. Les études sur le jus d\'herbe d\'orge montrent une amélioration de l\'énergie et de la vitalité après 2-4 semaines. Mélanger dans de l\'eau froide le matin à jeun. Goût herbacé, s\'y habituer progressivement.' },
  { icon: '☕', name: 'Café', rec: 'Max 2/jour avant 14h', ok: null, detail: 'La caféine bloque les récepteurs à l\'adénosine (molécule du sommeil) mais ne supprime pas la fatigue réelle. Elle la masque temporairement. Après 14h, la caféine dégrade le sommeil même si vous ne vous en apercevez pas. Elle bloque aussi l\'absorption du fer.' },
  { icon: '🍺', name: 'Alcool', rec: 'À éviter', ok: false, detail: 'L\'alcool est une des premières causes de fatigue chronique méconnue. Il détruit les vitamines B1, B6, B9, B12 (essentielles à l\'énergie cellulaire). Il fragmente le sommeil (même si vous semblez bien dormir). Il déprime le système nerveux central le lendemain.' },
  { icon: '🧃', name: 'Boissons énergisantes', rec: 'À éviter', ok: false, detail: 'Les boissons énergisantes créent un cercle vicieux : pic d\'énergie artificiel → crash glycémique → fatigue plus profonde → besoin d\'une autre canette. Contiennent souvent 40g+ de sucre, des acides qui érodent l\'émail, et de la taurine dont les effets à long terme sont peu documentés.' },
];

export const FATIGUE_RECIPES = [
  {
    id: 'ft1', title: 'Bol de lentilles corail, épinards et citron', category: 'fatigue', meal_category: 'dejeuner',
    calories: 420, proteins: 22, carbs: 52, fats: 12, prep_time: 5, cook_time: 20, servings: 2, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop',
    description: 'Triple action anti-fatigue : fer des lentilles, vitamine C du citron, magnésium des épinards.',
    ingredients: ['200g lentilles corail', '100g épinards frais', '1 citron (jus)', '1 gousse ail', '1 c.à.c curcuma', '1 c.à.c cumin', '1 c.à.s huile olive', '400ml bouillon légumes'],
    steps: ['Faire revenir l\'ail dans l\'huile olive', 'Ajouter les lentilles, curcuma, cumin', 'Couvrir de bouillon, cuire 15-18 min', 'Ajouter les épinards les 2 dernières minutes', 'Presser le citron au moment de servir'],
    dietitian_tips: 'La vitamine C du citron triple l\'absorption du fer des lentilles. Ne jamais oublier la source de vitamine C avec les légumineuses !',
    allergy_alternatives: 'Sans allergènes majeurs. Remplacer le bouillon par eau + herbes si besoin.',
    tags: ['fer', 'vitamine-C', 'anti-fatigue'],
  },
  {
    id: 'ft2', title: 'Omelette foie de volaille et champignons', category: 'fatigue', meal_category: 'dejeuner',
    calories: 380, proteins: 32, carbs: 8, fats: 24, prep_time: 10, cook_time: 10, servings: 1, difficulty: 'moyen',
    image_url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop',
    description: 'Le foie de volaille est l\'aliment le plus riche en fer héminique et en vitamine B12.',
    ingredients: ['100g foie de poulet (bien cuit)', '3 œufs', '100g champignons de Paris', '1 échalote', '1 c.à.s persil frais', '1 c.à.c huile olive', 'Sel, poivre'],
    steps: ['Faire sauter les foies coupés avec l\'échalote 5 min à feu vif jusqu\'à cuisson complète', 'Retirer, faire sauter les champignons 3 min', 'Battre les œufs, assaisonner', 'Cuire l\'omelette, garnir de foies + champignons', 'Parsemer de persil frais'],
    dietitian_tips: 'Le foie de volaille contient 7mg de fer pour 100g (2x plus que le steak). Bien le cuire : à cœur, jamais rosé.',
    allergy_alternatives: 'Remplacer foie par sardines en boîte (aussi très riches en fer + B12) pour ceux qui n\'aiment pas le foie.',
    tags: ['fer-héminique', 'B12', 'haute-énergie'],
  },
  {
    id: 'ft3', title: 'Granola maison énergisant', category: 'fatigue', meal_category: 'petitdej',
    calories: 320, proteins: 9, carbs: 42, fats: 14, prep_time: 5, cook_time: 20, servings: 4, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&auto=format&fit=crop',
    description: 'Riche en magnésium, fer végétal, vitamines B : le petit-déjeuner anti-fatigue par excellence.',
    ingredients: ['200g flocons d\'avoine', '50g graines de courge', '50g amandes entières', '30g graines de sésame', '3 c.à.s huile coco', '3 c.à.s miel', '1 c.à.c cannelle', '1 pincée de sel'],
    steps: ['Préchauffer le four à 170°C', 'Mélanger tous les ingrédients secs', 'Ajouter huile coco fondue + miel', 'Étaler sur plaque, cuire 20 min en remuant à mi-cuisson', 'Laisser refroidir avant de stocker (reste croustillant jusqu\'à 2 semaines)'],
    dietitian_tips: 'Les graines de courge sont parmi les aliments les plus riches en magnésium : 92mg pour 30g (23% des besoins quotidiens).',
    allergy_alternatives: 'Remplacer amandes par graines de tournesol si allergie aux fruits à coque.',
    tags: ['magnésium', 'énergie-durable', 'batch-cooking'],
  },
  {
    id: 'ft4', title: 'Salade de sardines vitaminée', category: 'fatigue', meal_category: 'dejeuner',
    calories: 380, proteins: 28, carbs: 22, fats: 20, prep_time: 10, cook_time: 0, servings: 1, difficulty: 'facile',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop',
    description: 'Sardines = fer + B12 + vitamine D + oméga-3. La boîte de conserve la plus précieuse de votre placard.',
    ingredients: ['1 boîte sardines à l\'huile d\'olive (120g)', 'Salade verte mélangée', '1 avocat', '1 tomate', '1 œuf dur', '1 citron', 'Olives noires', 'Huile olive, vinaigre balsamique'],
    steps: ['Disposer la salade, tomate, avocat en dés', 'Égoutter les sardines et les disposer', 'Ajouter l\'œuf dur coupé et les olives', 'Assaisonner : jus citron + huile olive + vinaigre balsamique'],
    dietitian_tips: 'Les sardines en conserve (avec arêtes) sont aussi riches en calcium que le lait. Elles contiennent 3µg de B12 (100% des besoins quotidiens).',
    allergy_alternatives: 'Remplacer sardines par maquereau ou thon pour varier. Même profil nutritionnel.',
    tags: ['B12', 'vitamine-D', 'omega-3', 'fer'],
  },
];

export const FATIGUE_BLOGS = [
  {
    id: 'ft-b1', title: 'Les 7 carences qui causent la fatigue chronique',
    excerpt: 'Fer, magnésium, vitamine D, B12, zinc, iode, vitamine C : avant de vous morfondre, vérifiez ces 7 paramètres. Le résultat peut changer votre vie.',
    content: `## Les carences invisibles qui épuisent\n\n### 1. Le fer (anémie ferriprive)\n**Symptômes** : fatigue, essoufflement, pâleur, ongles cassants\n**Prévalence** : 30% des femmes en âge de procréer\n**Bilan** : ferritinémie (pas juste la NFS)\n**Alimentation** : viande rouge, foie, lentilles + vitamine C\n\n### 2. La vitamine D\n**Symptômes** : fatigue profonde, douleurs musculaires, blues hivernal\n**Prévalence** : 70% des Français en fin d'hiver\n**Bilan** : 25-OH vitamine D3 (valeur normale : 40-60 ng/mL, pas juste ">20")\n**Alimentation** : sardines, maquereau, jaune d'œuf + soleil\n\n### 3. Le magnésium\n**Symptômes** : fatigue nerveuse, crampes, anxiété, trouble du sommeil\n**Prévalence** : 70% des Français sous les apports recommandés\n**Bilan** : magnésie érythrocytaire (pas sérique, faussement normal)\n**Alimentation** : chocolat noir, oléagineux, légumineuses, eaux riches\n\n### 4. La vitamine B12\n**Symptômes** : fatigue, picotements, troubles cognitifs\n**Prévalence** : fréquent chez végétaliens, personnes âgées, metformine\n**Bilan** : B12 sérique + homocystéinémie\n**Alimentation** : foie, moules, sardines, œufs (ou supplémentation si végétalien)\n\n### 5. Le zinc\n**Symptômes** : fatigue, infections fréquentes, cicatrisation lente\n**Aliments** : huîtres, viande rouge, graines courge, noix de cajou\n\n### 6. Le fer végétal seul ne suffit pas\nAssociez toujours fer végétal + vitamine C au même repas pour tripler l'absorption.\n\n### 7. L'iode\nFatigues thyroïdiennes souvent liées à l'iode. Sources : poissons, algues, sel iodé.`,
    category: 'fatigue', read_time: 8,
  },
  {
    id: 'ft-b2', title: 'Fatigue ou burnout ? Comment faire la différence et quoi manger',
    excerpt: 'La fatigue chronique et le burnout sont deux états différents avec des stratégies nutritionnelles distinctes. Un guide pour vous y retrouver.',
    content: `## Fatigue vs Burnout vs Fatigue chronique\n\n### La fatigue normale\nSe résout après une bonne nuit de sommeil. Cause identifiable (effort, mauvaise nuit).\n\n### Le burnout\nFatigue émotionnelle profonde. Le repos ne suffit pas. Perte de sens et de motivation.\n**Nutrition spécifique** : aliments riches en tryptophane (sérotonine), magnésium, omega-3.\n\n### Le syndrome de fatigue chronique (SFC/EM)\nFatigue invalidante depuis +6 mois, aggravée par l'effort. D'origine possiblement post-virale.\n**Nutrition** : anti-inflammatoire, éviter gluten et sucre, omega-3 ++\n\n## Stratégies nutritionnelles communes\n\n1. **Glycémie stable** : éviter les montagnes russes glycémiques\n2. **Protéines à chaque repas** : soutiennent les neurotransmetteurs\n3. **Anti-inflammatoire** : poissons gras, curcuma, légumes colorés\n4. **Côté sommeil** : tryptophane le soir, magnésium, pas de caféine après 14h\n5. **Hydratation** : 1.5-2L/jour, déshydratation = fatigue amplifiée`,
    category: 'fatigue', read_time: 6,
  },
];

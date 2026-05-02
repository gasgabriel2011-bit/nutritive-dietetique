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
  // ── ASSIETTE ÉQUILIBRÉE ──
  {
    id: 'ae1', title: "Comment composer une assiette équilibrée",
    excerpt: "Découvrez la méthode simple pour construire un repas complet et nutritif, avec les bonnes proportions de chaque groupe alimentaire.",
    content: "## La méthode de l'assiette\n\nL'assiette idéale se divise en trois parties :\n\n### 1. La moitié : légumes\nCrus ou cuits, les légumes doivent occuper la plus grande place. Ils apportent fibres, vitamines et minéraux essentiels.\n\n### 2. Un quart : protéines\nViande maigre, poisson, œufs, légumineuses ou tofu. Variez les sources tout au long de la semaine.\n\n### 3. Un quart : féculents complets\nRiz complet, quinoa, pâtes complètes, patate douce. Ils fournissent l'énergie durable.\n\n### N'oubliez pas !\n- Une source de bonnes graisses (huile d'olive, avocat, noix)\n- De l'eau comme boisson principale\n- Des épices et herbes pour le goût et les antioxydants",
    category: 'assiette-equilibree', read_time: 4,
  },
  {
    id: 'ae2', title: "La méthode du repas en pleine conscience",
    excerpt: "Manger lentement transforme votre relation à la nourriture. Voici comment appliquer la pleine conscience à table, concrètement.",
    content: "## Pourquoi manger lentement change tout\n\nLa satiété met **20 minutes** à atteindre le cerveau. Si vous finissez votre assiette en 8 minutes, vous passez à côté de ce signal.\n\n### Les 5 règles du repas conscient\n\n1. **Posez la fourchette** entre chaque bouchée\n2. **Mâchez 15 à 20 fois** avant d'avaler\n3. **Mangez sans écran** au moins une fois par jour\n4. **Évaluez votre faim** avant et après (de 1 à 5)\n5. **Arrêtez à 80%** de satiété\n\n### Les bénéfices prouvés\n- Moins de calories consommées naturellement\n- Meilleure digestion (la digestion commence dans la bouche)\n- Plus de satisfaction avec moins de nourriture\n- Réduction du stress lié à l'alimentation\n\n### Par où commencer ?\nCommencez par UN seul repas par jour sans téléphone. C'est suffisant pour observer une différence en quelques semaines.",
    category: 'assiette-equilibree', read_time: 5,
  },
  {
    id: 'ae3', title: "Faut-il peser ses aliments pour manger équilibré ?",
    excerpt: "La balance alimentaire : outil utile ou source d'obsession ? Tout dépend de la façon dont vous l'utilisez.",
    content: "## Peser ou ne pas peser ?\n\nLa balance alimentaire est un outil, pas une obligation. Voici quand elle est utile et quand elle devient contre-productive.\n\n### Quand la balance est utile\n- En phase initiale pour calibrer ses portions (1 à 2 semaines)\n- Pour estimer les graisses (huile, noix : on surestime facilement)\n- Pour les recettes précises\n\n### Quand la balance devient nocive\n- Quand elle génère de l'anxiété au restaurant\n- Quand elle remplace l'écoute des sensations\n- Quand elle contrôle chaque repas au gramme près\n\n### L'alternative : la méthode de la main\n- Protéines : taille de la paume\n- Féculents : poing fermé\n- Légumes : deux mains en coupe\n- Graisses : pouce\n\nCette méthode est moins précise mais **infiniment plus durable** à long terme.",
    category: 'assiette-equilibree', read_time: 4,
  },

  // ── PROTÉINES ──
  {
    id: 'p1', title: "Les protéines : combien, quand et lesquelles ?",
    excerpt: "Guide complet sur les protéines : besoins réels, meilleures sources et stratégies pour optimiser votre apport protéique.",
    content: "## Vos besoins en protéines\n\nLa plupart des adultes ont besoin de **0.8 à 1.2g par kg** de poids corporel par jour.\n\n### Les meilleures sources\n- **Animales** : poulet, poisson, œufs, produits laitiers\n- **Végétales** : légumineuses, tofu, tempeh, seitan\n\n### Répartition dans la journée\nRépartissez vos protéines sur 3-4 repas plutôt que tout concentrer au dîner.\n\n### Protéines végétales\nCombinez légumineuses + céréales dans la journée pour un profil d'acides aminés complet.",
    category: 'proteines', read_time: 5,
  },
  {
    id: 'p2', title: "Protéines végétales : le guide complet",
    excerpt: "Lentilles, tofu, pois chiches, quinoa… Les protéines végétales sont complètes, économiques et excellentes pour la santé.",
    content: "## Les protéines végétales en détail\n\n### Pourquoi les protéines végétales ?\n- Moins de graisses saturées que la viande\n- Riches en fibres (bonus)\n- Plus économiques\n- Impact environnemental réduit\n\n### Les meilleures sources\n| Aliment | Protéines/100g |\n|---------|---------------|\n| Lentilles cuites | 9g |\n| Pois chiches cuits | 8g |\n| Tofu ferme | 15g |\n| Edamames | 11g |\n| Quinoa cuit | 4g |\n\n### La complémentarité\nLes légumineuses manquent de méthionine, les céréales de lysine. Mangez les deux dans la journée (pas forcément au même repas) pour un profil complet.\n\n### Recette rapide\nDal de lentilles corail + riz complet = repas végétarien parfaitement protéiné.",
    category: 'proteines', read_time: 6,
  },
  {
    id: 'p3', title: "Petit-déjeuner protéiné : pourquoi et comment ?",
    excerpt: "Un petit-déjeuner protéiné réduit les fringales de la matinée et stabilise l'énergie jusqu'au déjeuner. Voici comment y parvenir facilement.",
    content: "## Pourquoi protéinifier son petit-déjeuner ?\n\nUn petit-déjeuner riche en sucres simples provoque un pic glycémique suivi d'un coup de barre à 10h. Les protéines évitent ce cycle.\n\n### Ce que dit la science\n- Un petit-déjeuner protéiné réduit l'apport calorique total de la journée\n- Il améliore la concentration matinale\n- Il réduit les envies de sucre l'après-midi\n\n### Options pratiques\n**Rapides (5 min)**\n- Yaourt grec + fruits + noix\n- 2 œufs brouillés + tartine complète\n- Skyr + granola + fruits rouges\n\n**Préparées la veille**\n- Overnight oats + graines chia + protéines\n- Pancakes avoine (à réchauffer)\n\n### Objectif : 15 à 20g de protéines au petit-déjeuner",
    category: 'proteines', read_time: 4,
  },

  // ── FIBRES ──
  {
    id: 'f1', title: "Pourquoi les fibres sont votre meilleur allié",
    excerpt: "Les fibres alimentaires sont essentielles à votre santé digestive, votre satiété et même votre humeur.",
    content: "## Les fibres, héros méconnus\n\n### Deux types de fibres\n- **Solubles** : avoine, légumineuses, fruits. Ralentissent l'absorption des sucres.\n- **Insolubles** : céréales complètes, légumes. Favorisent le transit.\n\n### Objectif : 25-30g par jour\nLa plupart des Français n'en consomment que 17g.\n\n### Comment augmenter ?\n1. Choisissez des céréales complètes\n2. Ajoutez des légumineuses 3x par semaine\n3. Mangez des fruits entiers plutôt qu'en jus\n4. Augmentez progressivement et buvez plus d'eau.",
    category: 'fibres', read_time: 4,
  },
  {
    id: 'f2', title: "Fibres et microbiote : le duo gagnant pour votre santé",
    excerpt: "Les fibres nourrissent vos 38 000 milliards de bactéries intestinales. Un microbiote équilibré influence votre humeur, immunité et poids.",
    content: "## Votre deuxième cerveau : le microbiote\n\n### Qu'est-ce que le microbiote ?\nL'ensemble des micro-organismes (bactéries, levures) qui vivent dans votre intestin. Ils pèsent **1 à 2 kg** et influencent votre santé bien au-delà de la digestion.\n\n### Fibres et microbiote\nLes fibres prébiotiques (inuline, FOS) nourrissent les bonnes bactéries intestinales.\n\n**Aliments prébiotiques**\n- Ail, oignon, poireaux\n- Banane (surtout légèrement verte)\n- Asperges, artichauts\n- Avoine\n\n### Les bénéfices d'un microbiote équilibré\n- Meilleure immunité (70% des cellules immunitaires dans l'intestin)\n- Humeur plus stable (90% de la sérotonine produite dans l'intestin)\n- Meilleure gestion du poids\n- Réduction de l'inflammation\n\n### Attention à l'augmentation progressive\nAugmentez les fibres progressivement pour éviter les ballonnements.",
    category: 'fibres', read_time: 6,
  },
  {
    id: 'f3', title: "10 aliments ultra-riches en fibres à ajouter dès maintenant",
    excerpt: "Haricots, graines de chia, avocats, framboises... Ces aliments banals sont des concentrés de fibres. Votre liste de courses de la semaine.",
    content: "## Les champions des fibres\n\n| Aliment | Fibres pour 100g |\n|---------|------------------|\n| Graines de chia | 34g |\n| Lentilles cuites | 8g |\n| Haricots rouges cuits | 7g |\n| Avoine (flocons) | 10g |\n| Framboises | 7g |\n| Avocat | 7g |\n| Brocoli cuit | 3g |\n| Pâtes complètes cuites | 4g |\n\n### Comment les intégrer facilement\n- **Chia** : 1 c.à.s. dans le yaourt ou le porridge = +5g de fibres\n- **Lentilles** : 2x par semaine en soupe ou salade\n- **Avoine** : porridge du matin\n- **Framboises** : sur le yaourt ou en smoothie\n\n### Rappel\nAugmentez les fibres progressivement et buvez plus d'eau en parallèle.",
    category: 'fibres', read_time: 4,
  },

  // ── HYDRATATION ──
  {
    id: 'h1', title: "L'hydratation : au-delà de 2 litres par jour",
    excerpt: "L'eau est votre premier supplément. Découvrez vos vrais besoins et des astuces pour rester bien hydraté.",
    content: "## Vos besoins réels\n\nLe fameux \"2 litres\" est une moyenne. Vos besoins dépendent de votre poids, activité physique et température.\n\n### Signes de déshydratation\n- Urines foncées\n- Fatigue\n- Maux de tête\n- Difficultés de concentration\n\n### Astuces pratiques\n1. Gardez une bouteille visible\n2. Buvez un verre au réveil\n3. Mangez des aliments riches en eau\n4. Utilisez une app de suivi",
    category: 'hydratation', read_time: 3,
  },
  {
    id: 'h2', title: "Eau, café, thé, sodas : quelles boissons vraiment hydratent ?",
    excerpt: "Toutes les boissons ne s'équivalent pas en terme d'hydratation. Voici ce que dit vraiment la science sur le café, le thé, l'eau pétillante et les jus.",
    content: "## Le classement des boissons\n\n### Eau plate : la référence\nAbsorption maximale, zéro calorie, zéro additif. Priorité absolue.\n\n### Thé et café\nContrairement aux idées reçues, le café et le thé **hydratent** malgré leur effet diurétique léger. L'eau contenue dans la boisson compense largement.\n\n### Eau pétillante\nMême hydratation que l'eau plate. Peut légèrement gêner la digestion chez certaines personnes.\n\n### Jus de fruits\n- Un verre de jus d'orange = 20g de sucre, sans les fibres du fruit\n- Hydrate mais avec un pic glycémique\n- Préférez le fruit entier\n\n### Sodas\n- Sucre + caféine + additifs\n- N'hydratent pas efficacement\n- Le sucre augmente les besoins en eau\n\n### Boissons light\n- Caloriquement neutres\n- Entretiennent la dépendance au goût sucré\n- Pas une boisson principale",
    category: 'hydratation', read_time: 4,
  },
  {
    id: 'h3', title: "La déshydratation : effets cachés sur l'appétit et la cognition",
    excerpt: "Une légère déshydratation (1-2%) réduit vos capacités cognitives de 20% et est souvent confondue avec la faim. Ce que la science révèle.",
    content: "## Déshydratation légère : plus d'impact que vous ne le pensez\n\n### Les chiffres\n- 1% de déshydratation = fatigue légère\n- 2% de déshydratation = réduction de 20% des performances cognitives\n- 3% = maux de tête, crampes\n\n### Déshydratation et fausse faim\nLes signaux de soif et de faim viennent du même mécanisme hypothalamique. Résultat : on mange quand on devrait boire.\n\n**Test simple** : envie de grignoter ? Buvez un grand verre d'eau et attendez 10 minutes.\n\n### Déshydratation et transit\n- Les fibres ont besoin d'eau pour fonctionner\n- Sans eau suffisante, les fibres peuvent au contraire constiper\n- Objectif : urines jaune pâle tout au long de la journée\n\n### Stratégie anti-déshydratation\n1. Verre d'eau au réveil (le corps est toujours légèrement déshydraté le matin)\n2. Bouteille de 1L visible sur le bureau\n3. 1 verre avant chaque repas\n4. Tisane ou eau chaude le soir",
    category: 'hydratation', read_time: 5,
  },

  // ── SOMMEIL ──
  {
    id: 's1', title: "Sommeil et nutrition : le lien caché",
    excerpt: "Mal dormir fait grossir ? Découvrez comment le sommeil influence directement vos choix alimentaires et votre métabolisme.",
    content: "## Le cercle sommeil-alimentation\n\n### Moins de sommeil = plus de faim\nLe manque de sommeil augmente la **ghréline** (hormone de la faim) et diminue la **leptine** (hormone de satiété).\n\n### Ce que montrent les études\n- Dormir <6h augmente le risque d'obésité de 30%\n- Le manque de sommeil favorise les choix alimentaires riches en sucre\n\n### Améliorer son sommeil\n1. Dernière caféine avant 14h\n2. Dîner léger 2-3h avant le coucher\n3. Aliments favorisant le sommeil : cerises, kiwi, noix\n4. Routine régulière de coucher",
    category: 'sommeil', read_time: 5,
  },
  {
    id: 's2', title: "Les aliments qui améliorent la qualité du sommeil",
    excerpt: "Tryptophane, magnésium, mélatonine… Certains aliments favorisent l'endormissement et le sommeil profond. Votre guide nutrition du soir.",
    content: "## Nutrition et qualité du sommeil\n\n### Le tryptophane : précurseur de la mélatonine\nLe tryptophane est un acide aminé converti en sérotonine puis en mélatonine (hormone du sommeil).\n\n**Aliments riches en tryptophane**\n- Dinde, poulet\n- Oeufs\n- Produits laitiers\n- Noix et amandes\n- Banane\n\n### Le magnésium : minéral de la relaxation\nDéficit très fréquent (70% des Français). Le magnésium améliore la qualité du sommeil profond.\n\n**Sources de magnésium**\n- Chocolat noir 70%+\n- Légumineuses\n- Épinards\n- Graines de courge\n\n### Le dîner idéal pour bien dormir\n- Léger (pas de grosse digestion nocturne)\n- Pris 2 à 3h avant le coucher\n- Avec des glucides complexes (favorisent le tryptophane cérébral)\n- Tisane camomille ou valériane après le repas",
    category: 'sommeil', read_time: 5,
  },
  {
    id: 's3', title: "Chrononutrition : manger selon son horloge biologique",
    excerpt: "Le QUAND vous mangez est presque aussi important que le QUOI. La chrononutrition révolutionne l'approche nutritionnelle.",
    content: "## Votre horloge interne et l'alimentation\n\n### Qu'est-ce que la chrononutrition ?\nL'adaptation de l'alimentation aux rythmes circadiens de l'organisme. Chaque organe a une heure de fonctionnement optimal.\n\n### Les principes clés\n**Le matin**\n- Métabolisme le plus actif\n- Insulino-sensibilité élevée : les glucides sont mieux utilisés\n- Repas le plus copieux de la journée possible\n\n**Le midi**\n- Digestion optimale\n- Repas complet recommandé\n\n**Le soir**\n- Métabolisme ralenti\n- Insulino-résistance plus élevée\n- Repas plus léger, moins de glucides\n\n### Ce que montrent les études\n- Manger la même quantité de calories le matin vs le soir = résultats différents\n- Le petit-déjeuner copieux favorise la perte de poids vs le dîner copieux\n- Couper l'alimentation 2-3h avant le coucher améliore le sommeil et la composition corporelle",
    category: 'sommeil', read_time: 6,
  },

  // ── ENVIES ──
  {
    id: 'e1', title: "Gérer les envies de sucre sans frustration",
    excerpt: "Les envies de sucré ne sont pas un manque de volonté. Voici des stratégies scientifiques pour les gérer sereinement.",
    content: "## Comprendre les envies\n\nLes envies de sucre sont souvent liées à un déficit calorique, le stress ou l'habitude.\n\n### Stratégies efficaces\n1. **Ne pas sauter de repas** : la stabilité glycémique évite les fringales\n2. **Protéines + fibres** à chaque repas\n3. **Goûter prévu** : fruits + oléagineux\n4. **Pleine conscience** : pause avant de manger\n5. **Alternatives** : carré de chocolat noir 70%+\n\n### Le piège de la restriction\nPlus vous interdisez un aliment, plus l'envie augmente.",
    category: 'envies', read_time: 4,
  },
  {
    id: 'e2', title: "Alimentation émotionnelle : comprendre et sortir du cycle",
    excerpt: "Manger pour gérer le stress, l'ennui ou la tristesse : c'est l'alimentation émotionnelle. Voici comment l'identifier et la transformer.",
    content: "## L'alimentation émotionnelle\n\n### Qu'est-ce que c'est ?\nManger en réponse à des émotions (stress, ennui, tristesse, joie) plutôt qu'à la faim physique.\n\n### Différencier faim physique et faim émotionnelle\n\n| Faim physique | Faim émotionnelle |\n|---------------|-------------------|\n| Apparaît progressivement | Arrive soudainement |\n| Accepte n'importe quel aliment | Veut un aliment spécifique |\n| Disparaît une fois rassasié | Continue même après avoir mangé |\n| Sans culpabilité | Souvent suivie de culpabilité |\n\n### Stratégies\n1. **Identifier l'émotion** : 'Ai-je vraiment faim ?' (de 1 à 5)\n2. **Attendre 10 minutes** avant de manger\n3. **Trouver une alternative** : marche, appel, respiration\n4. **Tenir un journal** : noter les déclencheurs émotionnels\n5. **Consulter** si le comportement est récurrent et incontrôlable",
    category: 'envies', read_time: 5,
  },
  {
    id: 'e3', title: "Le sucre : dépendance, biologie et stratégies de réduction",
    excerpt: "Le sucre active les mêmes circuits de récompense que certaines drogues. Comprendre la biologie du sucre est la première étape pour en reprendre le contrôle.",
    content: "## La biologie du sucre\n\n### Comment le sucre agit sur le cerveau\nLe sucre libère de la **dopamine** dans le noyau accumbens (centre de la récompense). Ce mécanisme est identique à celui des drogues, à une intensité moindre.\n\n### La tolérance au sucre\nComme pour la caféine, le corps développe une tolérance : il faut de plus en plus de sucre pour obtenir le même plaisir.\n\n### Réduire le sucre progressivement\n\n**Semaine 1** : Supprimez le sucre du café/thé\n**Semaine 2** : Remplacez les boissons sucrées par de l'eau aromatisée\n**Semaine 3** : Remplacez les desserts sucrés par des fruits\n**Semaine 4** : Lisez les étiquettes et évitez les sucres cachés\n\n### Sucres cachés\n- Sauce tomate industrielle : 5g/100g\n- Yaourt aromatisé : 12g/100g\n- Muesli 'sain' : 20g/100g\n- Pain de mie : 4g/100g",
    category: 'envies', read_time: 5,
  },

  // ── MOTIVATION ──
  {
    id: 'm1', title: "Rester motivé sur la durée",
    excerpt: "La motivation fluctue, et c'est normal. Voici comment construire des habitudes durables plutôt que de dépendre de la motivation.",
    content: "## La motivation ne suffit pas\n\n### Les habitudes > la motivation\nLa clé n'est pas la motivation mais la **régularité**.\n\n### La règle des 2 minutes\nCommencez par des actions minuscules :\n- \"Manger plus de légumes\" → \"Ajouter 1 légume au déjeuner\"\n- \"Boire plus d'eau\" → \"1 verre au réveil\"\n\n### Accepter l'imperfection\nUne journée \"moins bien\" ne gâche pas tout. Ce qui compte : la tendance générale sur des semaines et des mois.",
    category: 'motivation', read_time: 4,
  },
  {
    id: 'm2', title: "La science des habitudes alimentaires : comment en créer de nouvelles",
    excerpt: "Une habitude se forme en 21 à 66 jours selon la recherche. Voici le système le plus efficace pour créer de nouvelles habitudes alimentaires qui durent.",
    content: "## La boucle habitude\n\nToute habitude fonctionne selon 3 éléments :\n**Déclencheur → Routine → Récompense**\n\n### Exemples pratiques\n\n**Habitude : boire de l'eau au réveil**\n- Déclencheur : réveil qui sonne\n- Routine : boire un verre d'eau posé sur la table de nuit\n- Récompense : sensation de fraîcheur, rituel positif\n\n**Habitude : manger des légumes à chaque repas**\n- Déclencheur : préparation du repas\n- Routine : couper les légumes en premier\n- Récompense : assiette colorée, énergie après le repas\n\n### La règle de la constance (pas de la perfection)\n- 80% de constance sur 12 semaines > 100% pendant 2 semaines puis abandon\n- Une journée ratée ≠ échec du programme\n- L'objectif est la direction, pas la perfection\n\n### Empiler les habitudes\nAssociez une nouvelle habitude à une existante :\n_'Après mon café du matin, je mange une portion de fruits'_",
    category: 'motivation', read_time: 5,
  },
  {
    id: 'm3', title: "Dépasser les plateaux et les moments de découragement",
    excerpt: "Tout le monde traverse des phases de stagnation. Voici comment les comprendre, les traverser et en ressortir plus fort.",
    content: "## Les plateaux : normal et prévisible\n\n### Pourquoi ça arrive ?\nAprès quelques semaines, le corps s'adapte aux changements. C'est un signe de succès, pas d'échec.\n\n### La bonne réaction face à un plateau\n1. **Ne paniquez pas** : attendez 2 semaines minimum avant de réagir\n2. **Analysez** : avez-vous relâché certaines habitudes ?\n3. **Ajustez** légèrement (pas radicalement)\n4. **Regardez au-delà du poids** : énergie, sommeil, digestion\n\n### Les signes de progrès invisibles\n- Meilleur transit\n- Énergie plus stable\n- Moins d'envies sucrées\n- Meilleur sommeil\n- Peau plus lumineuse\n- Vêtements moins serrés (sans changement de poids)\n\n### Le piège du 'tout ou rien'\nArrêtez complètement parce que ça ne marche plus assez vite = l'erreur la plus fréquente. La constance bat l'intensité sur le long terme.",
    category: 'motivation', read_time: 5,
  },

  // ── ERREURS ──
  {
    id: 'er1', title: "Les 10 erreurs nutritionnelles les plus fréquentes",
    excerpt: "De la peur des glucides à l'excès de compléments : les erreurs que nous voyons le plus en consultation.",
    content: "## Évitez ces pièges\n\n1. **Sauter le petit-déjeuner** : pas obligatoire, mais si vous avez faim, mangez\n2. **Diaboliser les glucides** : votre cerveau en a besoin\n3. **Manger trop peu** : un déficit excessif ralentit le métabolisme\n4. **Compter obsessivement les calories** : la qualité > la quantité\n5. **Négliger les graisses** : les bonnes graisses sont essentielles\n6. **Manger trop vite** : 20 min minimum par repas\n7. **Être trop strict** : la flexibilité est la clé de la durée",
    category: 'erreurs', read_time: 6,
  },
  {
    id: 'er2', title: "Aliments 'sains' qui ne le sont pas vraiment",
    excerpt: "Barres de céréales, jus de fruits, yaourts 0%... Ces aliments souvent présentés comme sains cachent des surprises. Le guide pour s'y retrouver.",
    content: "## Les faux-amis nutritionnels\n\n### Barres de céréales 'sport'\n- Souvent : 25-35g de sucre par barre\n- Autant de sucre qu'une barre chocolatée\n- Alternative : poignée de noix + fruit\n\n### Jus de fruits 'frais'\n- 1 verre = sucre de 3-4 fruits sans les fibres\n- Index glycémique très élevé\n- Alternative : fruit entier\n\n### Yaourts 0% aromatisés\n- '0% MG' ne signifie pas 0 sucre\n- Souvent 10-15g de sucre par pot\n- Alternative : yaourt grec nature + fruits frais\n\n### Salades de restaurant\n- La sauce César peut contenir 500 kcal à elle seule\n- Sauce à part, toujours\n\n### Pain de mie 'complet'\n- Vérifiez que la 1ère farine listée est bien la farine complète\n- Sinon, c'est du pain blanc coloré en brun\n\n### Comment s'y retrouver ?\nLisez les 3 premiers ingrédients de la liste. Si c'est du sucre, sirop ou farine blanche : méfiez-vous.",
    category: 'erreurs', read_time: 5,
  },
  {
    id: 'er3', title: "Les régimes restrictifs : pourquoi ils échouent presque toujours",
    excerpt: "95% des régimes très restrictifs échouent à long terme. La science explique pourquoi, et ce qui fonctionne vraiment.",
    content: "## Pourquoi les régimes ne marchent pas\n\n### Les chiffres\n- 95% des personnes reprennent le poids perdu dans les 5 ans\n- Les régimes très restrictifs ralentissent le métabolisme\n- L'effet yo-yo est réel et documenté\n\n### Ce qui se passe biologiquement\n1. **Restriction calorique sévère** → baisse du métabolisme de 20 à 30%\n2. **Perte de muscle** (le corps utilise les protéines musculaires)\n3. **Augmentation de la ghréline** (hormone de la faim)\n4. **Reprise de poids** souvent supérieure à la perte initiale\n\n### Ce qui fonctionne vraiment\n- Déficit modéré (300-500 kcal max)\n- Maintien ou augmentation des protéines\n- Changements progressifs et durables\n- Pas d'interdits, mais des choix éclairés\n- Activité physique régulière et plaisante\n\n### Le rééquilibrage vs le régime\nLe rééquilibrage alimentaire n'est pas un régime. C'est l'apprentissage d'une alimentation qui vous convient, à votre rythme, sans date de fin.",
    category: 'erreurs', read_time: 6,
  },
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
            <AnimatedSection key={article.id} delay={i * 0.04}>
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
                        <Clock className="w-3 h-3" />{article.read_time} min
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
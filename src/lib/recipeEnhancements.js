const NO_COOK_METHODS = ['sans cuisson', 'frais'];

const MAIN_RECIPE_STEPS = {
  '1': [
    'Rincer le quinoa, puis le cuire dans une casserole d’eau frémissante 10 à 12 min. Égoutter et laisser tiédir.',
    'Rincer les pois chiches et les égoutter soigneusement.',
    'Couper le concombre, les tomates cerises et l’avocat en morceaux réguliers.',
    'Répartir le quinoa dans deux bols, puis ajouter pois chiches, légumes, feta et avocat.',
    'Mélanger le jus de citron avec l’huile d’olive, saler légèrement, poivrer et verser sur les bols.',
  ],
  '1b': [
    'Égoutter le thon et l’émietter dans un bol avec une cuillère à café de moutarde.',
    'Écraser l’avocat à la fourchette avec quelques gouttes de citron si disponible.',
    'Tartiner la tortilla avec l’avocat, puis ajouter le thon, la roquette et la tomate coupée en fines tranches.',
    'Rouler serré, couper en deux et servir froid. Aucune cuisson n’est nécessaire.',
  ],
  '1c': [
    'Porter une casserole d’eau à ébullition et cuire les œufs 9 à 10 min pour obtenir des œufs durs.',
    'Cuire les haricots verts 6 à 8 min dans l’eau bouillante salée, puis les refroidir sous l’eau froide.',
    'Couper les tomates cerises et les œufs durs en deux.',
    'Disposer le thon, les haricots verts, les tomates, les olives, les anchois et les œufs dans un plat.',
    'Ajouter la vinaigrette moutarde juste avant de servir.',
  ],
  '2': [
    'Verser le lait végétal dans une petite casserole et chauffer à feu doux.',
    'Ajouter les flocons d’avoine et cuire 4 à 5 min en remuant jusqu’à texture crémeuse.',
    'Écraser la moitié de la banane dans le porridge pour sucrer naturellement.',
    'Verser dans un bol, ajouter le reste de banane en rondelles, le beurre de noisettes et la cannelle.',
  ],
  '2b': [
    'Mixer les flocons d’avoine si besoin pour obtenir une farine grossière.',
    'Mélanger dans un bol l’avoine, les œufs, le lait et la levure jusqu’à obtenir une pâte fluide.',
    'Chauffer une poêle antiadhésive à feu moyen et la graisser très légèrement.',
    'Former de petits pancakes et cuire 2 à 3 min par face, jusqu’à ce qu’ils soient dorés.',
    'Servir avec les myrtilles fraîches sur le dessus.',
  ],
  '2c': [
    'Griller les tranches de pain complet au grille-pain ou à la poêle.',
    'Écraser l’avocat avec un peu de citron, du sel, du poivre et une pincée de piment.',
    'Porter une petite casserole d’eau à frémissement et pocher les œufs 3 min.',
    'Tartiner le pain avec l’avocat, déposer les œufs pochés et servir immédiatement.',
  ],
  '3b': [
    'Préchauffer le four à 200 °C.',
    'Couper les courgettes, carottes et poivrons en morceaux de taille proche.',
    'Déposer les légumes et les blancs de poulet dans un plat allant au four.',
    'Ajouter l’huile d’olive, le thym, le romarin, le sel et le poivre, puis mélanger.',
    'Cuire 25 à 30 min, jusqu’à ce que le poulet soit bien cuit à cœur.',
  ],
  '4b': [
    'Égoutter les pois chiches en gardant un peu d’eau de conservation.',
    'Mixer les pois chiches avec le tahini, le jus de citron, l’ail, le cumin et un filet d’huile d’olive.',
    'Ajouter progressivement un peu d’eau réservée jusqu’à obtenir une texture onctueuse.',
    'Goûter, ajuster sel et citron, puis servir froid avec des crudités.',
  ],
  '5c': [
    'Réchauffer le riz déjà cuit dans un bol ou une petite casserole avec une cuillère d’eau.',
    'Chauffer une poêle avec un peu d’huile de sésame.',
    'Cuire les œufs au plat 3 à 4 min selon la texture souhaitée.',
    'Déposer les œufs sur le riz chaud, puis ajouter sauce soja, oignons verts et graines de sésame.',
  ],
  '6b': [
    'Préchauffer le four à 200 °C.',
    'Couper les courgettes et les tomates cerises, puis les mélanger avec l’ail et l’huile d’olive.',
    'Étaler les légumes sur une plaque et rôtir 18 à 20 min.',
    'Pendant ce temps, cuire les pâtes complètes dans une casserole d’eau bouillante salée.',
    'Mélanger pâtes et légumes rôtis, puis servir avec le parmesan.',
  ],
  '7': [
    'Placer la banane congelée, les fruits rouges, le lait de soja et la protéine vanille dans un blender.',
    'Mixer jusqu’à obtenir une texture épaisse et lisse. Ajouter un peu de lait si nécessaire.',
    'Verser dans un bol froid.',
    'Ajouter le granola et quelques fruits sur le dessus. Servir immédiatement, sans cuisson.',
  ],
  '10c': [
    'Mettre les bananes, le lait, le beurre d’arachide, la protéine et les flocons d’avoine dans un blender.',
    'Mixer 30 à 45 secondes jusqu’à obtenir une texture homogène.',
    'Ajuster avec un peu de lait si le shake est trop épais.',
    'Ajouter le miel seulement si besoin, puis boire frais, idéalement après l’entraînement.',
  ],
};

const RECIPE_OVERRIDES = {
  '3': { cooking_method: 'four', temperature: '200 °C', equipment: ['four', 'plaque ou plat', 'couteau', 'planche'] },
  '3b': { cooking_method: 'four', temperature: '200 °C', equipment: ['four', 'plat à gratin', 'couteau', 'planche'] },
  '4': { cooking_method: 'sans cuisson', rest_time: 30, equipment: ['mixeur', 'bol', 'réfrigérateur'] },
  '7c': { cooking_method: 'four', temperature: '160 °C', equipment: ['four', 'plaque', 'papier cuisson', 'grand bol'] },
  '8c': { cooking_method: 'four', temperature: '180 °C', equipment: ['four', 'plat à gratin', 'bol'] },
  r5: { cooking_method: 'four', temperature: '180 °C', equipment: ['four', 'plat à gratin', 'bol', 'couteau'] },
  r20: { cooking_method: 'four', temperature: '200 °C', equipment: ['four', 'plaque', 'bol'] },
  s5: { cooking_method: 'four', temperature: '200 °C', equipment: ['four', 'plaque ou plat', 'couteau'] },
  s14: { cooking_method: 'four + poêle', temperature: '200 °C', equipment: ['four', 'plaque', 'poêle'] },
};

function inferCookingMethod(recipe) {
  const text = `${recipe.title} ${(recipe.steps || []).join(' ')}`.toLowerCase();
  if ((recipe.cook_time || 0) === 0) return recipe.rest_time ? 'frais' : 'sans cuisson';
  if (text.includes('four') || text.includes('enfourner') || text.includes('rôtir') || text.includes('rôtis') || text.includes('gratin')) return 'four';
  if (text.includes('vapeur')) return 'vapeur';
  if (text.includes('soupe') || text.includes('mijoter') || text.includes('casserole') || text.includes('bouillon')) return 'casserole';
  if (text.includes('poêl') || text.includes('griller') || text.includes('omelette') || text.includes('pancake') || text.includes('galette')) return 'poêle';
  if (text.includes('mixer') || text.includes('smoothie') || text.includes('shake')) return 'blender';
  return 'poêle ou casserole';
}

function inferEquipment(recipe, method) {
  if (recipe.equipment?.length) return recipe.equipment;
  if (NO_COOK_METHODS.includes(method)) return ['bol', 'couteau', 'planche'];
  if (method.includes('four')) return ['four', 'plaque ou plat', 'couteau', 'planche'];
  if (method.includes('poêle')) return ['poêle antiadhésive', 'spatule', 'bol'];
  if (method.includes('casserole')) return ['casserole', 'cuillère', 'mixeur plongeant si besoin'];
  if (method.includes('vapeur')) return ['panier vapeur', 'casserole', 'couteau'];
  if (method.includes('blender')) return ['blender', 'bol'];
  return ['couteau', 'planche', 'bol'];
}

function ensureTemperature(recipe, method) {
  if (recipe.temperature) return recipe.temperature;
  const text = (recipe.steps || []).join(' ');
  const match = text.match(/(\d{3})\s?°\s?C/i);
  if (match) return `${match[1]} °C`;
  return method.includes('four') ? '180-200 °C' : '';
}

function totalTime(recipe) {
  return (recipe.prep_time || 0) + (recipe.cook_time || 0) + (recipe.rest_time || 0);
}

export function enhanceRecipe(recipe) {
  const override = RECIPE_OVERRIDES[recipe.id] || {};
  const steps = MAIN_RECIPE_STEPS[recipe.id] || recipe.steps || [];
  const withOverride = { ...recipe, ...override, steps };
  const cooking_method = withOverride.cooking_method || inferCookingMethod(withOverride);
  const rest_time = withOverride.rest_time || (steps.join(' ').toLowerCase().includes('réfrig') ? 15 : 0);

  return {
    ...withOverride,
    cooking_method,
    rest_time,
    temperature: ensureTemperature(withOverride, cooking_method),
    equipment: inferEquipment(withOverride, cooking_method),
    total_time: withOverride.total_time || totalTime({ ...withOverride, rest_time }),
  };
}

export function enhanceRecipes(recipes) {
  return recipes.map(enhanceRecipe);
}

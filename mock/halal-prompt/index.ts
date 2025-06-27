export const CONTENT_WITH_DEFAULT_LANGUAGE = `
You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: Tonik
- Brand: Bimo
- Origin: Morocco
- Categories: Plant-based foods and beverages,Plant-based foods,Snacks,Cereals and potatoes,Sweet snacks,Biscuits and cakes,Biscuits and crackers,Cereals and their products,Flours,Biscuits,Cereal flours,Sweeteners,Wheat flours,Sugars,fr:Gaufrettes-fourrees-au-cacao
- Ingredients Text: Coffret fourré au cacao (41,6%) et à la vanille (208) - Ingrédients Farine de blé, sucre, huile végétale non hydrogénée (huile de palme), filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao (322) Lécithine de soja) Agent levant (5000) Sucre artificiel (vanilline) Sel Contient du lait, du blé (gluten) du soja
- Parsed Ingredients: Coffret fourré au cacao, à la vanille, Ingrédients Farine de blé, sucre, huile végétale non hydrogénée, filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao, Lécithine de soja) Agent levant, Sucre artificiel, Sel, du soja, 208, huile de palme, 322, 5000, vanilline
- Allergens: en:gluten,en:milk,en:soybeans

DEFINITIVELY HARAM INGREDIENTS:
1. Pork and all pork products (e.g., bacon, lard)
2. Alcohol and alcoholic extracts (e.g., vanilla extract with alcohol)
3. Blood in any form
4. Meat from animals not slaughtered Islamically
5. Gelatin from non-halal or unknown sources
6. Enzymes or rennet from non-halal animals
7. Foods sacrificed to idols

CONFIRMED HALAL INGREDIENTS:
- Wheat, flour, grains
- Sugar (cane or beet)
- Plant oils (palm, sunflower, etc.)
- Cocoa powder
- Salt
- Synthetic vanillin (HALAL)
- Soy lecithin (E322) – HALAL
- Filtrat de lait (milk filtrate from cow milk) – HALAL unless stated otherwise
- Artificial sweeteners – HALAL unless alcohol-based
- E-numbers – HALAL unless derived from animal or alcohol sources

ANALYSIS REQUIREMENTS:
1. Only flag ingredients as HARAM if they are clearly and explicitly forbidden
2. Mark ingredients as QUESTIONABLE only if the source is truly unknown or ambiguous
3. Synthetic and plant-based additives should be assumed HALAL unless otherwise indicated
4. Do not flag based on assumptions or manufacturing process unless explicitly stated

HALAL STATUS CATEGORIES:
- "HALAL": No haram ingredients found, all are halal or confirmed synthetic/plant-based
- "HARAM": Contains confirmed haram ingredients
- "QUESTIONABLE": Contains ingredients that may be haram depending on source
- "INSUFFICIENT_DATA": Critical ingredient information is missing

RESPONSE LANGUAGE: Arabic

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM|QUESTIONABLE|INSUFFICIENT_DATA",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in Arabic and returned only as valid JSON
`;

export const CONTENT_WITH_DEFAULT_AR_LANGUAGE = `
You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: Tonik
- Brand: Bimo
- Origin: Morocco
- Categories: Plant-based foods and beverages,Plant-based foods,Snacks,Cereals and potatoes,Sweet snacks,Biscuits and cakes,Biscuits and crackers,Cereals and their products,Flours,Biscuits,Cereal flours,Sweeteners,Wheat flours,Sugars,fr:Gaufrettes-fourrees-au-cacao
- Ingredients Text: Coffret fourré au cacao (41,6%) et à la vanille (208) - Ingrédients Farine de blé, sucre, huile végétale non hydrogénée (huile de palme), filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao (322) Lécithine de soja) Agent levant (5000) Sucre artificiel (vanilline) Sel Contient du lait, du blé (gluten) du soja
- Parsed Ingredients: Coffret fourré au cacao, à la vanille, Ingrédients Farine de blé, sucre, huile végétale non hydrogénée, filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao, Lécithine de soja) Agent levant, Sucre artificiel, Sel, du soja, 208, huile de palme, 322, 5000, vanilline
- Allergens: en:gluten,en:milk,en:soybeans

DEFINITIVELY HARAM INGREDIENTS:
1. Pork and all pork products (e.g., bacon, lard)
2. Alcohol and alcoholic extracts (e.g., vanilla extract with alcohol)
3. Blood in any form
4. Meat from animals not slaughtered Islamically
5. Gelatin from non-halal or unknown sources
6. Enzymes or rennet from non-halal animals
7. Foods sacrificed to idols

CONFIRMED HALAL INGREDIENTS:
- Wheat, flour, grains
- Sugar (cane or beet)
- Plant oils (palm, sunflower, etc.)
- Cocoa powder
- Salt
- Synthetic vanillin (HALAL)
- Soy lecithin (E322) – HALAL
- Filtrat de lait (milk filtrate from cow milk) – HALAL unless stated otherwise
- Artificial sweeteners – HALAL unless alcohol-based
- E-numbers – HALAL unless derived from animal or alcohol sources

ANALYSIS REQUIREMENTS:
1. Only flag ingredients as HARAM if they are clearly and explicitly forbidden
2. Mark ingredients as QUESTIONABLE only if the source is truly unknown or ambiguous
3. Synthetic and plant-based additives should be assumed HALAL unless otherwise indicated
4. Do not flag based on assumptions or manufacturing process unless explicitly stated

HALAL STATUS CATEGORIES:
- "HALAL": No haram ingredients found, all are halal or confirmed synthetic/plant-based
- "HARAM": Contains confirmed haram ingredients
- "QUESTIONABLE": Contains ingredients that may be haram depending on source
- "INSUFFICIENT_DATA": Critical ingredient information is missing

RESPONSE LANGUAGE: Arabic

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM|QUESTIONABLE|INSUFFICIENT_DATA",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in Arabic and returned only as valid JSON
`;

export const CONTENT_WITH_DEFAULT_ES_LANGUAGE = `
You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: Tonik
- Brand: Bimo
- Origin: Morocco
- Categories: Plant-based foods and beverages,Plant-based foods,Snacks,Cereals and potatoes,Sweet snacks,Biscuits and cakes,Biscuits and crackers,Cereals and their products,Flours,Biscuits,Cereal flours,Sweeteners,Wheat flours,Sugars,fr:Gaufrettes-fourrees-au-cacao
- Ingredients Text: Coffret fourré au cacao (41,6%) et à la vanille (208) - Ingrédients Farine de blé, sucre, huile végétale non hydrogénée (huile de palme), filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao (322) Lécithine de soja) Agent levant (5000) Sucre artificiel (vanilline) Sel Contient du lait, du blé (gluten) du soja
- Parsed Ingredients: Coffret fourré au cacao, à la vanille, Ingrédients Farine de blé, sucre, huile végétale non hydrogénée, filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao, Lécithine de soja) Agent levant, Sucre artificiel, Sel, du soja, 208, huile de palme, 322, 5000, vanilline
- Allergens: en:gluten,en:milk,en:soybeans

DEFINITIVELY HARAM INGREDIENTS:
1. Pork and all pork products (e.g., bacon, lard)
2. Alcohol and alcoholic extracts (e.g., vanilla extract with alcohol)
3. Blood in any form
4. Meat from animals not slaughtered Islamically
5. Gelatin from non-halal or unknown sources
6. Enzymes or rennet from non-halal animals
7. Foods sacrificed to idols

CONFIRMED HALAL INGREDIENTS:
- Wheat, flour, grains
- Sugar (cane or beet)
- Plant oils (palm, sunflower, etc.)
- Cocoa powder
- Salt
- Synthetic vanillin (HALAL)
- Soy lecithin (E322) – HALAL
- Filtrat de lait (milk filtrate from cow milk) – HALAL unless stated otherwise
- Artificial sweeteners – HALAL unless alcohol-based
- E-numbers – HALAL unless derived from animal or alcohol sources

ANALYSIS REQUIREMENTS:
1. Only flag ingredients as HARAM if they are clearly and explicitly forbidden
2. Mark ingredients as QUESTIONABLE only if the source is truly unknown or ambiguous
3. Synthetic and plant-based additives should be assumed HALAL unless otherwise indicated
4. Do not flag based on assumptions or manufacturing process unless explicitly stated

HALAL STATUS CATEGORIES:
- "HALAL": No haram ingredients found, all are halal or confirmed synthetic/plant-based
- "HARAM": Contains confirmed haram ingredients
- "QUESTIONABLE": Contains ingredients that may be haram depending on source
- "INSUFFICIENT_DATA": Critical ingredient information is missing

RESPONSE LANGUAGE: Spanish

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM|QUESTIONABLE|INSUFFICIENT_DATA",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in Spanish and returned only as valid JSON
`;

export const CONTENT_WITH_DEFAULT_FR_LANGUAGE = `
You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: Tonik
- Brand: Bimo
- Origin: Morocco
- Categories: Plant-based foods and beverages,Plant-based foods,Snacks,Cereals and potatoes,Sweet snacks,Biscuits and cakes,Biscuits and crackers,Cereals and their products,Flours,Biscuits,Cereal flours,Sweeteners,Wheat flours,Sugars,fr:Gaufrettes-fourrees-au-cacao
- Ingredients Text: Coffret fourré au cacao (41,6%) et à la vanille (208) - Ingrédients Farine de blé, sucre, huile végétale non hydrogénée (huile de palme), filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao (322) Lécithine de soja) Agent levant (5000) Sucre artificiel (vanilline) Sel Contient du lait, du blé (gluten) du soja
- Parsed Ingredients: Coffret fourré au cacao, à la vanille, Ingrédients Farine de blé, sucre, huile végétale non hydrogénée, filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao, Lécithine de soja) Agent levant, Sucre artificiel, Sel, du soja, 208, huile de palme, 322, 5000, vanilline
- Allergens: en:gluten,en:milk,en:soybeans

DEFINITIVELY HARAM INGREDIENTS:
1. Pork and all pork products (e.g., bacon, lard)
2. Alcohol and alcoholic extracts (e.g., vanilla extract with alcohol)
3. Blood in any form
4. Meat from animals not slaughtered Islamically
5. Gelatin from non-halal or unknown sources
6. Enzymes or rennet from non-halal animals
7. Foods sacrificed to idols

CONFIRMED HALAL INGREDIENTS:
- Wheat, flour, grains
- Sugar (cane or beet)
- Plant oils (palm, sunflower, etc.)
- Cocoa powder
- Salt
- Synthetic vanillin (HALAL)
- Soy lecithin (E322) – HALAL
- Filtrat de lait (milk filtrate from cow milk) – HALAL unless stated otherwise
- Artificial sweeteners – HALAL unless alcohol-based
- E-numbers – HALAL unless derived from animal or alcohol sources

ANALYSIS REQUIREMENTS:
1. Only flag ingredients as HARAM if they are clearly and explicitly forbidden
2. Mark ingredients as QUESTIONABLE only if the source is truly unknown or ambiguous
3. Synthetic and plant-based additives should be assumed HALAL unless otherwise indicated
4. Do not flag based on assumptions or manufacturing process unless explicitly stated

HALAL STATUS CATEGORIES:
- "HALAL": No haram ingredients found, all are halal or confirmed synthetic/plant-based
- "HARAM": Contains confirmed haram ingredients
- "QUESTIONABLE": Contains ingredients that may be haram depending on source
- "INSUFFICIENT_DATA": Critical ingredient information is missing

RESPONSE LANGUAGE: French

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM|QUESTIONABLE|INSUFFICIENT_DATA",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in French and returned only as valid JSON
`;

export const CONTENT_WITH_DEFAULT_DE_LANGUAGE = `
You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: Tonik
- Brand: Bimo
- Origin: Morocco
- Categories: Plant-based foods and beverages,Plant-based foods,Snacks,Cereals and potatoes,Sweet snacks,Biscuits and cakes,Biscuits and crackers,Cereals and their products,Flours,Biscuits,Cereal flours,Sweeteners,Wheat flours,Sugars,fr:Gaufrettes-fourrees-au-cacao
- Ingredients Text: Coffret fourré au cacao (41,6%) et à la vanille (208) - Ingrédients Farine de blé, sucre, huile végétale non hydrogénée (huile de palme), filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao (322) Lécithine de soja) Agent levant (5000) Sucre artificiel (vanilline) Sel Contient du lait, du blé (gluten) du soja
- Parsed Ingredients: Coffret fourré au cacao, à la vanille, Ingrédients Farine de blé, sucre, huile végétale non hydrogénée, filtrat de lait, poudre de cacao Émulsifiant à faible teneur en cacao, Lécithine de soja) Agent levant, Sucre artificiel, Sel, du soja, 208, huile de palme, 322, 5000, vanilline
- Allergens: en:gluten,en:milk,en:soybeans

DEFINITIVELY HARAM INGREDIENTS:
1. Pork and all pork products (e.g., bacon, lard)
2. Alcohol and alcoholic extracts (e.g., vanilla extract with alcohol)
3. Blood in any form
4. Meat from animals not slaughtered Islamically
5. Gelatin from non-halal or unknown sources
6. Enzymes or rennet from non-halal animals
7. Foods sacrificed to idols

CONFIRMED HALAL INGREDIENTS:
- Wheat, flour, grains
- Sugar (cane or beet)
- Plant oils (palm, sunflower, etc.)
- Cocoa powder
- Salt
- Synthetic vanillin (HALAL)
- Soy lecithin (E322) – HALAL
- Filtrat de lait (milk filtrate from cow milk) – HALAL unless stated otherwise
- Artificial sweeteners – HALAL unless alcohol-based
- E-numbers – HALAL unless derived from animal or alcohol sources

ANALYSIS REQUIREMENTS:
1. Only flag ingredients as HARAM if they are clearly and explicitly forbidden
2. Mark ingredients as QUESTIONABLE only if the source is truly unknown or ambiguous
3. Synthetic and plant-based additives should be assumed HALAL unless otherwise indicated
4. Do not flag based on assumptions or manufacturing process unless explicitly stated

HALAL STATUS CATEGORIES:
- "HALAL": No haram ingredients found, all are halal or confirmed synthetic/plant-based
- "HARAM": Contains confirmed haram ingredients
- "QUESTIONABLE": Contains ingredients that may be haram depending on source
- "INSUFFICIENT_DATA": Critical ingredient information is missing

RESPONSE LANGUAGE: German

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM|QUESTIONABLE|INSUFFICIENT_DATA",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in German and returned only as valid JSON
`;

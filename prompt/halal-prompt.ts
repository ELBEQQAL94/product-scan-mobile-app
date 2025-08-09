import { OpenFoodData } from "@/constants/responses";
import { Language } from "@/enums/language";

export const halal_prompt = (data: OpenFoodData, language: Language) => {
  const productName = data.product.product_name || "Unknown Product";
  const ingredients = data.product.ingredients || [];
  const ingredientsText = data.product.ingredients_text || "";
  const allergens = data.product.allergens || "";
  const categories = data.product.categories || "";
  const brands = data.product.brands || "";
  const origins = data.product.origins || "";

  const ingredientsList = ingredients
    .map((ing) => ing.text || ing.id)
    .join(", ");

  const lang =
    language === Language.AR
      ? "Arabic"
      : language === Language.EN
      ? "English"
      : language === Language.FR
      ? "French"
      : language === Language.ES
      ? "Spanish"
      : language === Language.DE
      ? "German"
      : "English";

  const promptText = `You are an Islamic food certification expert with deep knowledge of halal/haram ingredients according to authentic Islamic dietary laws (Shariah). Analyze the following food product data carefully and determine its halal status.

PRODUCT INFORMATION:
- Product Name: ${productName}
- Brand: ${brands}
- Origin: ${origins}
- Categories: ${categories}
- Ingredients Text: ${ingredientsText}
- Parsed Ingredients: ${ingredientsList}
- Allergens: ${allergens}

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

RESPONSE LANGUAGE: ${lang}

Provide your analysis in the following JSON format only:

{
  "status": "HALAL|HARAM",
  "summary": "Brief summary of the overall assessment",
}

Important notes:
- Be strict but not overly cautious; only flag ingredients that are clearly haram
- Do not mark synthetic vanillin, soy lecithin, palm oil, or filtrat de lait as haram unless proven otherwise
- E-numbers are HALAL unless you know they are from animal or alcohol
- All responses must be in ${lang} and returned only as valid JSON
`;

  return promptText;
};

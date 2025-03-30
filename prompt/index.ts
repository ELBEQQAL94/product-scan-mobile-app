import { OpenFoodData } from "@/constants/responses";

export const prompt = (data: OpenFoodData) => {
    return `Analyze the following product JSON data and generate a health/safety score from 0-100, where 0 is potentially harmful and 100 is optimally healthy/safe for human use or consumption.

Adapt your analysis based on the product type:

FOR FOOD PRODUCTS:
1. NOVA classification (if available)
2. Nutrient profile (fat, saturated fat, sugar, salt, protein, fiber)
3. Ingredients list (additives, processing level)
4. Nutriscore grade (if available)
5. Presence of artificial additives, colors, flavors
6. Proportion of whole food ingredients vs processed ingredients

FOR COSMETICS/PERSONAL CARE PRODUCTS:
1. Presence of harmful ingredients (parabens, phthalates, formaldehyde releasers, etc.)
2. Number of synthetic chemicals vs natural ingredients
3. Presence of known allergens or irritants
4. Environmental impact of ingredients
5. Presence of endocrine disruptors

FOR HOUSEHOLD PRODUCTS:
1. Presence of toxic chemicals
2. Environmental impact
3. Biodegradability
4. Irritant or corrosive properties
5. VOC content

General scoring guidelines:
- Products with many synthetic additives or chemicals should score lower
- Products with known harmful ingredients should receive significant penalties
- Products with clean, minimal ingredient lists should score higher
- Consider both human health impact and environmental impact
- Products with transparency issues (missing data) should receive some penalty

return final score (0-100) only as response.

${JSON.stringify(data)}
`
};
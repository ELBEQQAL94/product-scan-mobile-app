import { OpenFoodData, OpenFoodResponseAPI } from "@/constants/responses";
import { Language } from "@/enums/language";
import { UserHealthSetupProfile } from "@/types/health-setup";

// Language-specific instructions
const languageInstructions = {
  en: {
    responseLanguage: "English",
    instruction: "Respond in English using clear, concise language.",
  },
  ar: {
    responseLanguage: "Arabic",
    instruction:
      "Respond in Arabic using clear, natural Arabic language. Write all text in Arabic script.",
  },
  fr: {
    responseLanguage: "French",
    instruction: "Respond in French using clear, natural French language.",
  },
  de: {
    responseLanguage: "German",
    instruction: "Respond in German using clear, natural German language.",
  },
  es: {
    responseLanguage: "Spanish",
    instruction: "Respond in Spanish using clear, natural Spanish language.",
  },
};

// Generate personalized health instructions based on user profile
const generatePersonalizedInstructions = (
  diseases: string[] = [],
  allergies: string[] = []
): string => {
  let instructions = "";

  // Disease-specific instructions
  if (diseases.length > 0) {
    instructions += "\nUSER HEALTH CONDITIONS - CRITICAL PRIORITY:\n";

    diseases.forEach((disease) => {
      switch (disease) {
        case "diabetes":
          instructions +=
            "- DIABETES: Focus heavily on sugar content, carbohydrates, glycemic index. Flag high sugar (>15g) as HIGH or CRITICAL severity. Recommend low-sugar alternatives.\n";
          break;
        case "hypertension":
          instructions +=
            "- HIGH BLOOD PRESSURE: Prioritize sodium content analysis. Flag high sodium (>400mg) as HIGH severity, >600mg as CRITICAL. Emphasize low-sodium alternatives.\n";
          break;
        case "heart_disease":
          instructions +=
            "- HEART DISEASE: Focus on saturated fats, trans fats, cholesterol, sodium. Flag trans fats as CRITICAL. Recommend heart-healthy options.\n";
          break;
        case "kidney_disease":
          instructions +=
            "- KIDNEY DISEASE: Focus on sodium, protein, phosphorus, potassium levels. Flag high levels as HIGH to CRITICAL severity.\n";
          break;
        case "liver_disease":
          instructions +=
            "- LIVER DISEASE: Focus on additives, preservatives, alcohol content, processing level. Flag heavily processed foods as HIGH severity.\n";
          break;
        case "pregnancy_nursing":
          instructions +=
            "- PREGNANCY/NURSING: Flag caffeine, alcohol, high mercury fish, unpasteurized products, artificial additives as HIGH to CRITICAL severity.\n";
          break;
        case "arthritis":
          instructions +=
            "- ARTHRITIS: Focus on anti-inflammatory properties, omega-3 content, processed foods. Flag pro-inflammatory ingredients as MODERATE to HIGH severity.\n";
          break;
        case "osteoporosis":
          instructions +=
            "- OSTEOPOROSIS: Focus on calcium content, vitamin D, phosphorus. Flag high sodium (calcium depletion) as MODERATE to HIGH severity.\n";
          break;
        case "anemia":
          instructions +=
            "- ANEMIA: Focus on iron content, vitamin B12, folate. Recommend iron-rich foods. Flag iron inhibitors as MODERATE severity.\n";
          break;
      }
    });
  }

  // Allergy-specific instructions
  if (allergies.length > 0) {
    instructions +=
      "\nUSER ALLERGIES & DIETARY RESTRICTIONS - CRITICAL PRIORITY:\n";

    allergies.forEach((allergy) => {
      switch (allergy) {
        case "tree_nuts":
        case "peanuts":
          instructions +=
            "- NUT ALLERGY: Flag ANY presence of nuts, tree nuts, or 'may contain nuts' as CRITICAL severity. This is a life-threatening concern.\n";
          break;
        case "dairy":
          instructions +=
            "- DAIRY ALLERGY: Flag milk, cheese, butter, whey, casein, lactose as CRITICAL severity.\n";
          break;
        case "gluten":
        case "gluten_free":
          instructions +=
            "- GLUTEN SENSITIVITY/CELIAC: Flag wheat, barley, rye, gluten-containing ingredients as CRITICAL severity.\n";
          break;
        case "eggs":
          instructions +=
            "- EGG ALLERGY: Flag eggs, albumin, lecithin as CRITICAL severity.\n";
          break;
        case "shellfish":
        case "mollusks":
          instructions +=
            "- SHELLFISH ALLERGY: Flag any shellfish, crustaceans, mollusks as CRITICAL severity.\n";
          break;
        case "soy":
          instructions +=
            "- SOY ALLERGY: Flag soy, soybean oil, soy lecithin, tofu as CRITICAL severity.\n";
          break;
        case "fish":
          instructions +=
            "- FISH ALLERGY: Flag any fish products, fish oil as CRITICAL severity.\n";
          break;
        case "sesame":
          instructions +=
            "- SESAME ALLERGY: Flag sesame seeds, tahini, sesame oil as CRITICAL severity.\n";
          break;
        case "vegetarian":
          instructions +=
            "- VEGETARIAN: Flag any meat, poultry, fish as HIGH severity. Recommend plant-based alternatives.\n";
          break;
        case "vegan":
          instructions +=
            "- VEGAN: Flag any animal products (meat, dairy, eggs, honey) as HIGH severity. Recommend plant-based alternatives.\n";
          break;
        case "keto":
          instructions +=
            "- KETO DIET: Flag high carbohydrate content (>5g net carbs) as MODERATE to HIGH severity. Focus on fat/protein content.\n";
          break;
        case "low_carb":
          instructions +=
            "- LOW CARB: Flag high carbohydrate content (>20g) as MODERATE severity. Recommend low-carb alternatives.\n";
          break;
        case "low_sodium":
          instructions +=
            "- LOW SODIUM DIET: Flag high sodium (>200mg) as MODERATE, >400mg as HIGH severity.\n";
          break;
        case "low_sugar":
          instructions +=
            "- LOW SUGAR DIET: Flag high sugar content (>5g) as MODERATE, >10g as HIGH severity.\n";
          break;
        case "corn":
          instructions +=
            "- CORN ALLERGY: Flag corn, corn syrup, corn starch as CRITICAL severity.\n";
          break;
        case "citrus":
          instructions +=
            "- CITRUS ALLERGY: Flag citrus fruits, citric acid as CRITICAL severity.\n";
          break;
        case "chocolate":
          instructions +=
            "- CHOCOLATE ALLERGY: Flag cocoa, chocolate, cacao as CRITICAL severity.\n";
          break;
        case "artificial_colors":
          instructions +=
            "- ARTIFICIAL COLORS SENSITIVITY: Flag any artificial food coloring as HIGH severity.\n";
          break;
        case "msg":
          instructions +=
            "- MSG SENSITIVITY: Flag monosodium glutamate, flavor enhancers as HIGH severity.\n";
          break;
        case "sulfites":
          instructions +=
            "- SULFITE SENSITIVITY: Flag sulfur dioxide, sulfites as HIGH severity.\n";
          break;
      }
    });
  }

  return instructions;
};

export const ai_product_scan_prompt = (
  data: OpenFoodResponseAPI,
  userHealthSetupProfile: UserHealthSetupProfile | null = null,
  language: Language = Language.AR
) => {
  const langConfig = languageInstructions[language];

  // Extract user health data (with defaults)
  const diseases = userHealthSetupProfile?.diseases || [];
  const allergies = userHealthSetupProfile?.allergies || [];

  // Generate personalized instructions only if user has health conditions
  const personalizedInstructions =
    diseases.length > 0 || allergies.length > 0
      ? generatePersonalizedInstructions(diseases, allergies)
      : "";

  // Build the complete prompt
  return `LANGUAGE INSTRUCTION: ${langConfig.instruction}

${personalizedInstructions}

${
  personalizedInstructions
    ? `PERSONALIZATION REQUIREMENTS:
- User health conditions and allergies take ABSOLUTE PRIORITY in recommendations
- Allergies should ALWAYS be flagged as CRITICAL severity if the ingredient is present
- Health conditions should heavily influence scoring and recommendations
- Provide specific, actionable advice based on user's health profile

`
    : ""
}Analyze the following product JSON data and generate a health/safety score from 0-100, where 0 is potentially harmful and 100 is optimally healthy/safe for human use or consumption.

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

NUTRITIONAL CONCERNS:
- High sodium content (>400mg per serving = moderate, >600mg = high concern)
- Trans fats presence (any amount is concerning)
- High sugar content (>15g per serving = moderate, >25g = high concern)
- High saturated fat (>5g per serving = moderate, >10g = high concern)
- Low fiber content (<3g per serving)
- High calorie density
- Artificial additives and preservatives
- High processed ingredients (NOVA classification)

HEALTH CONDITIONS TO CONSIDER:
- Diabetes (focus on sugar, carbs, glycemic impact)
- Hypertension (focus on sodium)
- Heart disease (focus on trans fats, saturated fats, sodium)
- Obesity (focus on calories, portion size, satiety)
- Digestive issues (focus on fiber, additives)
- Food allergies and intolerances
- Kidney disease (focus on sodium, protein, phosphorus)

SEVERITY LEVELS:
- "low": Minor concern, occasional consumption okay
- "moderate": Should limit intake, better alternatives available
- "high": Significant health concern, avoid regular consumption
- "critical": Major health risk, avoid completely for certain conditions

${
  diseases.length > 0 || allergies.length > 0
    ? `USER HEALTH PROFILE:
- Health Conditions: ${diseases.length > 0 ? diseases.join(", ") : "None"}
- Allergies/Restrictions: ${
        allergies.length > 0 ? allergies.join(", ") : "None"
      }

`
    : ""
}CRITICAL: All recommendation text and explanations must be written in ${
    langConfig.responseLanguage
  }. Use natural, clear language that is easy to understand for native speakers.${
    personalizedInstructions
      ? " Focus heavily on the user's specific health conditions and allergies."
      : ""
  }

IMPORTANT: Return your response as a JSON object with the following structure:
{
  "score": <number between 0-100>,
  "recommendations": [
    {
      "recommendation": "Specific recommendation text in ${
        langConfig.responseLanguage
      }",
      "severity": "low|moderate|high|critical",
      "explanation": "Detailed explanation in ${
        langConfig.responseLanguage
      } of why this recommendation is important"
    }
  ]
}

Product data to analyze:
${JSON.stringify(data)}
`;
};

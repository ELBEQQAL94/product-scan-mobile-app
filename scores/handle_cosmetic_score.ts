import { OpenFoodResponseAPI } from "@/constants/responses";

interface CosmeticCategoryDefaults {
  [category: string]: {
    baseScore: number;
    expectedConcerns: string[];
    riskLevel: "low" | "medium" | "high";
  };
}

interface CosmeticSafetyProfile {
  allergenRisk: number;
  irritationRisk: number;
  sensitizationRisk: number;
  endocrineDisruptorRisk: number;
  preservativeLoad: number;
  naturalness: number;
}

// Enhanced ingredient interface for cosmetic products
interface CosmeticIngredient {
  id: string;
  text?: string;
  rank?: number;
  percent_estimate?: number;
  is_in_taxonomy?: number;
}

const COSMETIC_CATEGORY_DEFAULTS: CosmeticCategoryDefaults = {
  "en:creams": {
    baseScore: 70,
    expectedConcerns: ["fragrance", "preservatives"],
    riskLevel: "low",
  },
  "en:shampoos": {
    baseScore: 65,
    expectedConcerns: ["sulfates", "preservatives", "fragrance"],
    riskLevel: "medium",
  },
  "en:makeup": {
    baseScore: 60,
    expectedConcerns: ["talc", "parabens", "heavy-metals"],
    riskLevel: "medium",
  },
  "en:deodorants": {
    baseScore: 50,
    expectedConcerns: ["aluminum", "parabens", "fragrance"],
    riskLevel: "high",
  },
  "en:hair-dyes": {
    baseScore: 30,
    expectedConcerns: ["ammonia", "peroxide", "ppd"],
    riskLevel: "high",
  },
  "en:sunscreens": {
    baseScore: 75,
    expectedConcerns: ["chemical-filters", "nanoparticles"],
    riskLevel: "low",
  },
};

// Ingredient risk database with proper typing
interface IngredientRisk {
  risk: number;
  concern: string;
}

const INGREDIENT_RISKS: Record<string, IngredientRisk> = {
  // High risk ingredients
  "en:parabens": { risk: 15, concern: "endocrine-disruption" },
  "en:sulfates": { risk: 10, concern: "skin-irritation" },
  "en:formaldehyde-releasers": { risk: 20, concern: "carcinogen-risk" },
  "en:phthalates": { risk: 18, concern: "endocrine-disruption" },

  // Medium risk ingredients
  "en:parfum": { risk: 8, concern: "allergenic-potential" },
  "en:silicones": { risk: 5, concern: "pore-clogging" },
  "en:alcohols": { risk: 7, concern: "skin-drying" },

  // Beneficial ingredients
  "en:hyaluronic-acid": { risk: -5, concern: "hydrating" },
  "en:ceramides": { risk: -3, concern: "barrier-repair" },
  "en:niacinamide": { risk: -4, concern: "anti-inflammatory" },
  "en:retinol": { risk: 3, concern: "photosensitizing" }, // Beneficial but needs caution
};

// Allergenic fragrances (EU list of 26 allergens)
const ALLERGENIC_FRAGRANCES = [
  "en:amyl-cinnamal",
  "en:benzyl-alcohol",
  "en:benzyl-cinnamate",
  "en:benzyl-salicylate",
  "en:citronellol",
  "en:coumarin",
  "en:eugenol",
  "en:geraniol",
  "en:hydroxycitronellal",
  "en:linalool",
  "en:methyl-2-octynoate",
];

export const calculate_cosmetic_safety_score = (
  cosmeticResponse: OpenFoodResponseAPI // Same interface, different data
): {
  score: number;
  riskFactors: string[];
  safetyProfile: CosmeticSafetyProfile;
  confidence: number;
  warnings: string[];
} => {
  const product = cosmeticResponse.product;
  const categories = product.categories_tags || [];
  const ingredients = (product.ingredients || []) as CosmeticIngredient[];
  const ingredientTags = product.ingredients_tags || [];

  // Initialize scoring
  let score: number;
  const riskFactors: string[] = [];
  const warnings: string[] = [];
  let confidence = 1.0;

  // 1. DETERMINE BASE SCORE FROM CATEGORY
  const categoryMatch = findBestCosmeticCategory(categories);
  if (categoryMatch) {
    score = categoryMatch.baseScore;
  } else {
    score = 50;
  }

  // 2. CALCULATE CONFIDENCE BASED ON DATA AVAILABILITY
  confidence = calculateCosmeticDataConfidence(product);

  // 3. ANALYZE INGREDIENT SAFETY
  const safetyProfile: CosmeticSafetyProfile = {
    allergenRisk: 0,
    irritationRisk: 0,
    sensitizationRisk: 0,
    endocrineDisruptorRisk: 0,
    preservativeLoad: 0,
    naturalness: 0,
  };

  // 4. INGREDIENT-BY-INGREDIENT ANALYSIS

  // Check for high-risk ingredients with proper type checking
  ingredientTags.forEach((tag) => {
    const ingredientRisk = INGREDIENT_RISKS[tag];
    if (ingredientRisk) {
      const risk = ingredientRisk;
      score -= risk.risk;

      if (risk.risk > 10) {
        riskFactors.push(`High risk: ${tag} (${risk.concern})`);
      }

      // Update safety profile
      switch (risk.concern) {
        case "endocrine-disruption":
          safetyProfile.endocrineDisruptorRisk += risk.risk;
          break;
        case "skin-irritation":
          safetyProfile.irritationRisk += risk.risk;
          break;
        case "allergenic-potential":
          safetyProfile.allergenRisk += risk.risk;
          break;
      }
    }
  });

  // 5. SPECIFIC RISK ASSESSMENTS

  // Allergenic fragrances (EU regulation)
  const allergenicFragranceCount = ingredientTags.filter((tag) =>
    ALLERGENIC_FRAGRANCES.includes(tag)
  ).length;

  if (allergenicFragranceCount > 0) {
    const fragrancePenalty = allergenicFragranceCount * 3;
    score -= fragrancePenalty;
    safetyProfile.allergenRisk += fragrancePenalty;
    riskFactors.push(`${allergenicFragranceCount} allergenic fragrance(s)`);
  }

  // Preservative load assessment
  const preservatives = ingredientTags.filter(
    (tag) =>
      tag.includes("paraben") ||
      tag.includes("formaldehyde") ||
      tag.includes("methylisothiazolinone") ||
      tag.includes("phenoxyethanol")
  );

  if (preservatives.length > 3) {
    const preservativePenalty = (preservatives.length - 3) * 4;
    score -= preservativePenalty;
    safetyProfile.preservativeLoad = preservatives.length;
    riskFactors.push(`High preservative load (${preservatives.length})`);
  }

  // 6. POSITIVE FACTORS

  // Natural/organic ingredients bonus with proper null checking
  const naturalIngredients = ingredients.filter((ing) => {
    const text = ing.text?.toLowerCase();
    return (
      text &&
      (text.includes("organic") ||
        text.includes("natural") ||
        text.includes("plant") ||
        text.includes("botanical"))
    );
  }).length;

  if (naturalIngredients > 0) {
    const naturalBonus = Math.min(15, naturalIngredients * 2);
    score += naturalBonus;
    safetyProfile.naturalness = (naturalIngredients / ingredients.length) * 100;
  }

  // Beneficial active ingredients
  const beneficialActives = ingredientTags.filter(
    (tag) =>
      tag.includes("hyaluronic") ||
      tag.includes("ceramide") ||
      tag.includes("niacinamide") ||
      tag.includes("vitamin-e") ||
      tag.includes("vitamin-c")
  ).length;

  if (beneficialActives > 0) {
    const activeBonus = Math.min(12, beneficialActives * 3);
    score += activeBonus;
  }

  // 7. REGULATORY COMPLIANCE CHECKS

  // Check for banned ingredients (varies by region)
  const bannedInEU = ingredientTags.filter(
    (tag) =>
      tag.includes("hydroquinone") ||
      tag.includes("triclosan") ||
      tag.includes("microbeads")
  );

  if (bannedInEU.length > 0) {
    score -= 30;
    riskFactors.push(
      `Contains ingredients banned in EU: ${bannedInEU.join(", ")}`
    );
    warnings.push("REGULATORY CONCERN: Contains banned substances");
  }

  // 8. CONCENTRATION CONCERNS

  // Check ingredient order (first ingredients = highest concentration)
  if (ingredients.length > 0) {
    const firstFiveIngredients = ingredients.slice(0, 5);
    const concernsInTopFive = firstFiveIngredients.filter((ing) => {
      const text = ing.text?.toLowerCase();
      return (
        text &&
        ALLERGENIC_FRAGRANCES.some((allergen) =>
          text.includes(allergen.replace("en:", ""))
        )
      );
    });

    if (concernsInTopFive.length > 0) {
      score -= concernsInTopFive.length * 5;
      riskFactors.push(`High-concentration allergens detected`);
    }
  }

  // 9. CONFIDENCE ADJUSTMENTS
  if (confidence < 0.6) {
    warnings.push(
      "Limited ingredient data - safety assessment may be incomplete"
    );
    // Move score towards neutral when confidence is low
    score = score * confidence + 50 * (1 - confidence);
  }

  // 10. PRODUCT-SPECIFIC ADJUSTMENTS

  // Leave-on vs rinse-off products
  const isLeaveOn = categories.some(
    (cat) =>
      cat.includes("cream") ||
      cat.includes("lotion") ||
      cat.includes("makeup") ||
      cat.includes("deodorant")
  );

  if (isLeaveOn) {
    // Leave-on products need stricter safety standards
    score *= 0.95;
    safetyProfile.irritationRisk *= 1.2;
  }

  // Ensure score stays within 0-100 range
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    riskFactors,
    safetyProfile,
    confidence,
    warnings,
  };
};

// Helper Functions

function findBestCosmeticCategory(
  categories: string[]
): CosmeticCategoryDefaults[string] | null {
  // Prioritize more specific categories
  const specificCategories = ["en:hair-dyes", "en:deodorants", "en:sunscreens"];

  for (const specific of specificCategories) {
    if (categories.includes(specific) && COSMETIC_CATEGORY_DEFAULTS[specific]) {
      return COSMETIC_CATEGORY_DEFAULTS[specific];
    }
  }

  // Fall back to general categories
  for (const category of categories) {
    if (COSMETIC_CATEGORY_DEFAULTS[category]) {
      return COSMETIC_CATEGORY_DEFAULTS[category];
    }
  }

  return null;
}

function calculateCosmeticDataConfidence(product: any): number {
  let dataPoints = 0;
  let maxPoints = 5;

  if (product.ingredients && product.ingredients.length > 0) dataPoints++;
  if (product.categories_tags && product.categories_tags.length > 0)
    dataPoints++;
  if (product.brands) dataPoints++;
  if (product.ingredients_text) dataPoints++;
  if (product.image_ingredients_url) dataPoints++;

  return Math.max(0.3, dataPoints / maxPoints);
}

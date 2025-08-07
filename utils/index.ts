import { AsyncStorageKey } from "@/constants/keys";
import { OpenFoodResponseAPI, ProductScanResult } from "@/constants/responses";
import { ProductTypeFromDB } from "@/types/products";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkOnboardingStatus = async () => {
  const hasCompletedOnboarding = await AsyncStorage.getItem(
    AsyncStorageKey.HAS_COMPLETED_ONBOARDING
  );
  return hasCompletedOnboarding;
};

export const set_item = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const get_item = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const remove_item = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error(`Error remove item with value: ${key} get an error: `, error);
  }
};

export const clear_items = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clear all cache: ", error);
    return null;
  }
};

const PRODUCT_PREFIX = "product_";

export const save_product_by_bar_code = async (
  bar_code: string,
  product: ProductScanResult
) => {
  try {
    console.log(`saved product ${PRODUCT_PREFIX}${bar_code}`);
    await AsyncStorage.setItem(
      `${PRODUCT_PREFIX}${bar_code}`,
      JSON.stringify(product)
    );
  } catch (error) {
    console.error(`Error saving product ${bar_code}:`, error);
  }
};

export const get_all_cached_products = async (): Promise<
  ProductScanResult[]
> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const productKeys = allKeys.filter((key) => key.startsWith(PRODUCT_PREFIX));

    const keyValuePairs = await AsyncStorage.multiGet(productKeys);

    const products: ProductScanResult[] = [];
    keyValuePairs.forEach(([key, value]) => {
      if (value) {
        try {
          const product = JSON.parse(value) as ProductScanResult;
          products.push(product);
        } catch (parseError) {
          console.error(`Error parsing product for key ${key}:`, parseError);
        }
      }
    });
    return products;
  } catch (error) {
    console.error("Error getting all cached products:", error);
    return [];
  }
};

export const get_product_by_bar_code = async (
  bar_code: string
): Promise<ProductScanResult | undefined> => {
  try {
    const product = await AsyncStorage.getItem(`${PRODUCT_PREFIX}${bar_code}`);
    return product != null ? JSON.parse(product) : undefined;
  } catch (error) {
    console.error(
      `get product by bar_code: ${bar_code} get an error: ${error}`
    );
  }
};

export const format_date_to_timestamp = (): number => {
  const current_date = Date.now();
  return current_date;
};

export const format_date_to_custom_string = (): string => {
  const localTimeZone = "Africa/Casablanca";
  const now = new Date();

  const localDate = now
    .toLocaleDateString("en-US", {
      timeZone: localTimeZone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const localTime = now.toLocaleTimeString("en-US", {
    timeZone: localTimeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${localDate} ${localTime}`;
};

export const is_email_valid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const map_to_product_db = (
  user_id: string,
  bar_code: string,
  product: ProductScanResult
): ProductTypeFromDB => {
  const product_db: ProductTypeFromDB = {
    user_id: user_id,
    bar_code,
    product_scan_result: {
      status: product.status,
      score: product.score,
      image_url: product.image_url,
      recommendations: product.recommendations,
      product_name: product.product_name,
    },
    created_at: format_date_to_custom_string(),
  };

  return product_db;
};

export const format_date = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};

export const load_saved_language = async () => {
  try {
    const savedLanguage = await get_item(AsyncStorageKey.LANGUAGE_CODE);
    if (savedLanguage) {
      return savedLanguage;
    }
  } catch (error) {
    console.error("Error loading saved language:", error);
  }
};

interface CategoryDefaults {
  [category: string]: {
    baseScore: number;
    expectedNutrients: Partial<NutrientProfile>;
  };
}

interface NutrientProfile {
  sugars: number;
  saturated_fat: number;
  salt: number;
  calories: number;
  protein: number;
  fiber: number;
  fruits_veg: number;
}

const CATEGORY_DEFAULTS: CategoryDefaults = {
  "en:milks": {
    baseScore: 65,
    expectedNutrients: {
      sugars: 4.8,
      saturated_fat: 1.0,
      salt: 0.1,
      calories: 42,
      protein: 3.4,
      fiber: 0,
    },
  },
  "en:fruits": {
    baseScore: 85,
    expectedNutrients: {
      sugars: 10,
      saturated_fat: 0.1,
      salt: 0.01,
      calories: 50,
      protein: 1,
      fiber: 3,
      fruits_veg: 100,
    },
  },
  "en:vegetables": {
    baseScore: 90,
    expectedNutrients: {
      sugars: 3,
      saturated_fat: 0.1,
      salt: 0.02,
      calories: 25,
      protein: 2,
      fiber: 3,
      fruits_veg: 100,
    },
  },
  "en:sodas": {
    baseScore: 15,
    expectedNutrients: {
      sugars: 35,
      saturated_fat: 0,
      salt: 0.02,
      calories: 140,
      protein: 0,
      fiber: 0,
    },
  },
  "en:nuts": {
    baseScore: 75,
    expectedNutrients: {
      sugars: 4,
      saturated_fat: 5,
      salt: 0.01,
      calories: 600,
      protein: 20,
      fiber: 8,
    },
  },
  "en:yogurts": {
    baseScore: 70,
    expectedNutrients: {
      sugars: 12,
      saturated_fat: 2,
      salt: 0.1,
      calories: 80,
      protein: 4,
      fiber: 0,
    },
  },
  "en:breakfast-cereals": {
    baseScore: 45,
    expectedNutrients: {
      sugars: 20,
      saturated_fat: 1,
      salt: 1,
      calories: 350,
      protein: 8,
      fiber: 6,
    },
  },
  "en:breads": {
    baseScore: 55,
    expectedNutrients: {
      sugars: 3,
      saturated_fat: 0.5,
      salt: 1.2,
      calories: 250,
      protein: 8,
      fiber: 3,
    },
  },
};

export const calculate_enhanced_health_score = (
  openFoodResponseAPI: OpenFoodResponseAPI
): number => {
  const nutrients = openFoodResponseAPI.product.nutriments || {};
  const categories = openFoodResponseAPI.product.categories_tags || [];
  const isWater = categories.some((cat) => cat.includes("water"));

  if (isWater) {
    return 95; // Water is excellent for health
  }
  let score = 50;
  let confidence = 1.0;
  const penalties: { [key: string]: number } = {};
  const bonuses: { [key: string]: number } = {};
  const warnings: string[] = [];

  // 1. DETERMINE BASE SCORE FROM CATEGORY
  const categoryMatch = findBestCategoryMatch(categories);
  if (categoryMatch) {
    score = categoryMatch.baseScore;
    confidence *= 0.8; // Reduce confidence when using category defaults
  }

  // 2. EXTRACT NUTRIENTS WITH FALLBACKS
  const extractedNutrients = extractNutrients(
    nutrients,
    categoryMatch?.expectedNutrients
  );

  // 3. CALCULATE CONFIDENCE BASED ON DATA AVAILABILITY
  confidence *= calculateDataConfidence(nutrients, extractedNutrients);

  // 4. APPLY ENHANCED SCORING LOGIC

  // NEGATIVE FACTORS (Enhanced)

  // 1. Sugar content (0-35 points penalty) - Enhanced with better curve
  const sugars = extractedNutrients.sugars;
  if (sugars > 0) {
    let sugarPenalty = 0;
    if (sugars <= 5) sugarPenalty = 0;
    else if (sugars <= 12)
      sugarPenalty = (sugars - 5) * 1.5; // Natural sugars tolerance
    else if (sugars <= 25) sugarPenalty = 10.5 + (sugars - 12) * 1.8;
    else sugarPenalty = Math.min(35, 33.9 + (sugars - 25) * 0.5);

    penalties.sugar = sugarPenalty;
    score -= sugarPenalty;
  }

  // 2. Saturated fat (0-25 points penalty) - Enhanced with WHO guidelines
  const satFat = extractedNutrients.saturated_fat;
  if (satFat > 0) {
    let fatPenalty = 0;
    if (satFat <= 1.5) fatPenalty = 0;
    else if (satFat <= 5) fatPenalty = (satFat - 1.5) * 2;
    else if (satFat <= 10) fatPenalty = 7 + (satFat - 5) * 2.5;
    else fatPenalty = Math.min(25, 19.5 + (satFat - 10) * 1.1);

    penalties.saturatedFat = fatPenalty;
    score -= fatPenalty;
  }

  // 3. Salt/Sodium (0-25 points penalty) - Enhanced with health thresholds
  const saltContent = extractedNutrients.salt;
  if (saltContent > 0) {
    let saltPenalty = 0;
    if (saltContent <= 0.3) saltPenalty = 0;
    else if (saltContent <= 1.5) saltPenalty = (saltContent - 0.3) * 8;
    else saltPenalty = Math.min(25, 9.6 + (saltContent - 1.5) * 15);

    penalties.salt = saltPenalty;
    score -= saltPenalty;
  }

  // 4. Calories (context-aware penalty)
  const calories = extractedNutrients.calories;
  if (calories > 0) {
    let caloriePenalty = 0;
    // Different thresholds for different food types
    const isSnack = categories.some((cat) => cat.includes("snack"));
    const isBeverage = categories.some((cat) => cat.includes("beverage"));

    if (isBeverage && calories > 50) {
      caloriePenalty = Math.min(20, (calories - 50) / 10);
    } else if (isSnack && calories > 300) {
      caloriePenalty = Math.min(15, (calories - 300) / 30);
    } else if (!isBeverage && !isSnack && calories > 400) {
      caloriePenalty = Math.min(10, (calories - 400) / 50);
    }

    if (caloriePenalty > 0) {
      penalties.calories = caloriePenalty;
      score -= caloriePenalty;
    }
  }

  // 5. Processing level (Enhanced NOVA penalties)
  const novaGroup = openFoodResponseAPI.product.nova_group || 1;
  const processingPenalties = { 1: 0, 2: 2, 3: 8, 4: 18 };
  const processingPenalty =
    processingPenalties[novaGroup as keyof typeof processingPenalties] || 0;

  if (processingPenalty > 0) {
    penalties.processing = processingPenalty;
    score -= processingPenalty;
  }

  // 6. Additives (Enhanced with harmful additive detection)
  const additives = openFoodResponseAPI.product.additives_n || 0;
  const additivesTags = openFoodResponseAPI.product.additives_tags || [];

  let additivesPenalty = additives * 0.8; // Base penalty

  // Extra penalty for controversial additives
  const harmfulAdditives = [
    "en:e102",
    "en:e110",
    "en:e124",
    "en:e129",
    "en:e951",
    "en:e952",
  ];
  const harmfulCount = additivesTags.filter((tag) =>
    harmfulAdditives.includes(tag)
  ).length;
  additivesPenalty += harmfulCount * 3;

  if (additivesPenalty > 0) {
    penalties.additives = Math.min(15, additivesPenalty);
    score -= penalties.additives;
  }

  // POSITIVE FACTORS (Enhanced)

  // 1. Protein content (Enhanced with quality assessment)
  const protein = extractedNutrients.protein;
  if (protein > 0) {
    let proteinBonus = 0;
    if (protein >= 3) proteinBonus = Math.min(20, protein * 1.8);
    if (protein >= 20) proteinBonus += 5; // High protein bonus

    bonuses.protein = proteinBonus;
    score += proteinBonus;
  }

  // 2. Fiber content (Enhanced)
  const fiber = extractedNutrients.fiber;
  if (fiber > 0) {
    let fiberBonus = Math.min(18, fiber * 2.5);
    if (fiber >= 6) fiberBonus += 3; // High fiber bonus

    bonuses.fiber = fiberBonus;
    score += fiberBonus;
  }

  // 3. Fruits/Vegetables content (Enhanced)
  const fruitsVeg = extractedNutrients.fruits_veg;
  if (fruitsVeg > 0) {
    let fruitVegBonus = Math.min(25, fruitsVeg / 4);
    if (fruitsVeg >= 80) fruitVegBonus += 5; // Very high F&V bonus

    bonuses.fruitsVegetables = fruitVegBonus;
    score += fruitVegBonus;
  }

  // 4. Micronutrient bonuses (New)
  const vitaminC = +nutrients["vitamin-c_100g"] || 0;
  const calcium = +nutrients.calcium_100g || 0;
  const iron = +nutrients.iron_100g || 0;

  let micronutrientBonus = 0;
  if (vitaminC > 10) micronutrientBonus += 2;
  if (calcium > 100) micronutrientBonus += 2;
  if (iron > 2) micronutrientBonus += 2;

  if (micronutrientBonus > 0) {
    bonuses.micronutrients = micronutrientBonus;
    score += micronutrientBonus;
  }

  // 5. Healthy fats bonus (New)
  const omega3 = +nutrients["omega-3-fat_100g"] || 0;
  const monounsaturatedFat = +nutrients["monounsaturated-fat_100g"] || 0;

  let healthyFatBonus = 0;
  if (omega3 > 0.5) healthyFatBonus += 3;
  if (monounsaturatedFat > 5) healthyFatBonus += 2;

  if (healthyFatBonus > 0) {
    bonuses.healthyFats = healthyFatBonus;
    score += healthyFatBonus;
  }

  // 6. Low calorie bonus (Enhanced)
  if (calories > 0 && calories < 100) {
    const lowCalBonus = Math.min(8, (100 - calories) / 12);
    bonuses.lowCalorie = lowCalBonus;
    score += lowCalBonus;
  }

  // CONFIDENCE ADJUSTMENTS
  if (confidence < 0.6) {
    warnings.push("Low data confidence - score may be inaccurate");
  }

  if (confidence < 0.4) {
    // Very low confidence - move score towards neutral
    score = score * 0.7 + 50 * 0.3;
    warnings.push("Very limited nutritional data available");
  }

  // Ensure score stays within 0-100 range
  score = Math.max(0, Math.min(100, score));

  return Math.round(score);
};

// Helper Functions

function findBestCategoryMatch(
  categories: string[]
): CategoryDefaults[string] | null {
  for (const category of categories) {
    if (CATEGORY_DEFAULTS[category]) {
      return CATEGORY_DEFAULTS[category];
    }
  }
  return null;
}

function extractNutrients(
  nutrients: any,
  expectedNutrients?: Partial<NutrientProfile>
): NutrientProfile {
  return {
    sugars:
      +nutrients.sugars_100g ||
      +nutrients.sugars ||
      expectedNutrients?.sugars ||
      0,
    saturated_fat:
      +nutrients["saturated-fat_100g"] ||
      +nutrients["saturated-fat"] ||
      expectedNutrients?.saturated_fat ||
      0,
    salt:
      +nutrients.salt_100g ||
      +nutrients.salt ||
      (+nutrients.sodium_100g || +nutrients.sodium || 0) * 2.5 ||
      expectedNutrients?.salt ||
      0,
    calories:
      +nutrients["energy-kcal_100g"] ||
      +nutrients["energy-kcal"] ||
      expectedNutrients?.calories ||
      0,
    protein:
      +nutrients.proteins_100g ||
      +nutrients.proteins ||
      expectedNutrients?.protein ||
      0,
    fiber:
      +nutrients.fiber_100g ||
      +nutrients.fiber ||
      expectedNutrients?.fiber ||
      0,
    fruits_veg:
      +nutrients["fruits-vegetables-legumes-estimate-from-ingredients_100g"] ||
      expectedNutrients?.fruits_veg ||
      0,
  };
}

function calculateDataConfidence(
  nutrients: any,
  extracted: NutrientProfile
): number {
  const criticalNutrients = [
    "sugars",
    "saturated_fat",
    "salt",
    "calories",
    "protein",
  ];
  let availableCount = 0;

  criticalNutrients.forEach((nutrient) => {
    const key100g = `${nutrient.replace("_", "-")}_100g`;
    if (nutrients[key100g] || nutrients[nutrient]) {
      availableCount++;
    }
  });

  return Math.max(0.2, availableCount / criticalNutrients.length);
}

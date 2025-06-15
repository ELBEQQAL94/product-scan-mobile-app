import { describe, test, expect } from "@jest/globals";
import { prompt } from "@/prompt";
import { Language } from "@/enums/language";
import { OpenFoodData } from "@/constants/responses";
import { UserHealthSetupProfile } from "@/types/health-setup";
import { openFoodResponseMockData } from "@/mock/openFoodResponseData";

describe("Prompt Generation Function", () => {
  describe("Language Instructions", () => {
    test("should generate Arabic prompt by default", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in Arabic using clear, natural Arabic language. Write all text in Arabic script."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in Arabic"
      );
    });

    test("should generate English prompt when language is EN", () => {
      const result = prompt(openFoodResponseMockData, null, Language.EN);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in English using clear, concise language."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in English"
      );
    });

    test("should generate Arabic prompt when language is AR", () => {
      const result = prompt(openFoodResponseMockData, null, Language.AR);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in Arabic using clear, natural Arabic language. Write all text in Arabic script."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in Arabic"
      );
    });

    test("should generate French prompt when language is FR", () => {
      const result = prompt(openFoodResponseMockData, null, Language.FR);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in French using clear, natural French language."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in French"
      );
    });

    test("should generate German prompt when language is DE", () => {
      const result = prompt(openFoodResponseMockData, null, Language.DE);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in German using clear, natural German language."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in German"
      );
    });

    test("should generate Spanish prompt when language is ES", () => {
      const result = prompt(openFoodResponseMockData, null, Language.ES);

      expect(result).toContain(
        "LANGUAGE INSTRUCTION: Respond in Spanish using clear, natural Spanish language."
      );
      expect(result).toContain(
        "All recommendation text and explanations must be written in Spanish"
      );
    });
  });

  describe("Health Conditions", () => {
    test("should include diabetes instructions when user has diabetes", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["diabetes"],
        allergies: [],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("USER HEALTH CONDITIONS - CRITICAL PRIORITY:");
      expect(result).toContain(
        "DIABETES: Focus heavily on sugar content, carbohydrates, glycemic index"
      );
      expect(result).toContain(
        "Flag high sugar (>15g) as HIGH or CRITICAL severity"
      );
      expect(result).toContain("Health Conditions: diabetes");
    });

    test("should include hypertension instructions when user has hypertension", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["hypertension"],
        allergies: [],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "HIGH BLOOD PRESSURE: Prioritize sodium content analysis"
      );
      expect(result).toContain(
        "Flag high sodium (>400mg) as HIGH severity, >600mg as CRITICAL"
      );
      expect(result).toContain("Health Conditions: hypertension");
    });

    test("should include heart disease instructions when user has heart disease", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["heart_disease"],
        allergies: [],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "HEART DISEASE: Focus on saturated fats, trans fats, cholesterol, sodium"
      );
      expect(result).toContain("Flag trans fats as CRITICAL");
      expect(result).toContain("Health Conditions: heart_disease");
    });

    test("should include multiple health conditions", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["diabetes", "hypertension", "heart_disease"],
        allergies: [],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("DIABETES: Focus heavily on sugar content");
      expect(result).toContain(
        "HIGH BLOOD PRESSURE: Prioritize sodium content"
      );
      expect(result).toContain("HEART DISEASE: Focus on saturated fats");
      expect(result).toContain(
        "Health Conditions: diabetes, hypertension, heart_disease"
      );
    });

    test("should include all supported health conditions", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [
          "diabetes",
          "hypertension",
          "heart_disease",
          "kidney_disease",
          "liver_disease",
          "pregnancy_nursing",
          "arthritis",
          "osteoporosis",
          "anemia",
        ],
        allergies: [],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("DIABETES: Focus heavily on sugar content");
      expect(result).toContain(
        "KIDNEY DISEASE: Focus on sodium, protein, phosphorus, potassium levels"
      );
      expect(result).toContain(
        "LIVER DISEASE: Focus on additives, preservatives, alcohol content"
      );
      expect(result).toContain(
        "PREGNANCY/NURSING: Flag caffeine, alcohol, high mercury fish"
      );
      expect(result).toContain(
        "ARTHRITIS: Focus on anti-inflammatory properties"
      );
      expect(result).toContain(
        "OSTEOPOROSIS: Focus on calcium content, vitamin D"
      );
      expect(result).toContain(
        "ANEMIA: Focus on iron content, vitamin B12, folate"
      );
    });
  });

  describe("Allergies and Dietary Restrictions", () => {
    test("should include nut allergy instructions", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [],
        allergies: ["tree_nuts", "peanuts"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "USER ALLERGIES & DIETARY RESTRICTIONS - CRITICAL PRIORITY:"
      );
      expect(result).toContain(
        "NUT ALLERGY: Flag ANY presence of nuts, tree nuts"
      );
      expect(result).toContain("This is a life-threatening concern");
      expect(result).toContain("Allergies/Restrictions: tree_nuts, peanuts");
    });

    test("should include dairy allergy instructions", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [],
        allergies: ["dairy"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "DAIRY ALLERGY: Flag milk, cheese, butter, whey, casein, lactose as CRITICAL severity"
      );
      expect(result).toContain("Allergies/Restrictions: dairy");
    });

    test("should include gluten restrictions", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [],
        allergies: ["gluten", "gluten_free"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "GLUTEN SENSITIVITY/CELIAC: Flag wheat, barley, rye, gluten-containing ingredients as CRITICAL severity"
      );
      expect(result).toContain("Allergies/Restrictions: gluten, gluten_free");
    });

    test("should include dietary preferences", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [],
        allergies: ["vegetarian", "vegan", "keto"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain(
        "VEGETARIAN: Flag any meat, poultry, fish as HIGH severity"
      );
      expect(result).toContain(
        "VEGAN: Flag any animal products (meat, dairy, eggs, honey) as HIGH severity"
      );
      expect(result).toContain(
        "KETO DIET: Flag high carbohydrate content (>5g net carbs) as MODERATE to HIGH severity"
      );
    });

    test("should include all supported allergies", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: [],
        allergies: [
          "tree_nuts",
          "peanuts",
          "dairy",
          "gluten",
          "eggs",
          "shellfish",
          "soy",
          "fish",
          "sesame",
          "corn",
          "citrus",
          "chocolate",
          "artificial_colors",
          "msg",
          "sulfites",
        ],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("NUT ALLERGY: Flag ANY presence of nuts");
      expect(result).toContain("DAIRY ALLERGY: Flag milk, cheese, butter");
      expect(result).toContain("EGG ALLERGY: Flag eggs, albumin, lecithin");
      expect(result).toContain(
        "SHELLFISH ALLERGY: Flag any shellfish, crustaceans"
      );
      expect(result).toContain("SOY ALLERGY: Flag soy, soybean oil");
      expect(result).toContain("FISH ALLERGY: Flag any fish products");
      expect(result).toContain("SESAME ALLERGY: Flag sesame seeds, tahini");
      expect(result).toContain("CORN ALLERGY: Flag corn, corn syrup");
      expect(result).toContain(
        "CITRUS ALLERGY: Flag citrus fruits, citric acid"
      );
      expect(result).toContain(
        "CHOCOLATE ALLERGY: Flag cocoa, chocolate, cacao"
      );
      expect(result).toContain(
        "ARTIFICIAL COLORS SENSITIVITY: Flag any artificial food coloring"
      );
      expect(result).toContain("MSG SENSITIVITY: Flag monosodium glutamate");
      expect(result).toContain(
        "SULFITE SENSITIVITY: Flag sulfur dioxide, sulfites"
      );
    });
  });

  describe("Combined Health Conditions and Allergies", () => {
    test("should include both health conditions and allergies", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["diabetes", "hypertension"],
        allergies: ["tree_nuts", "dairy"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("USER HEALTH CONDITIONS - CRITICAL PRIORITY:");
      expect(result).toContain("DIABETES: Focus heavily on sugar content");
      expect(result).toContain(
        "HIGH BLOOD PRESSURE: Prioritize sodium content"
      );
      expect(result).toContain(
        "USER ALLERGIES & DIETARY RESTRICTIONS - CRITICAL PRIORITY:"
      );
      expect(result).toContain("NUT ALLERGY: Flag ANY presence of nuts");
      expect(result).toContain("DAIRY ALLERGY: Flag milk, cheese, butter");
      expect(result).toContain("Health Conditions: diabetes, hypertension");
      expect(result).toContain("Allergies/Restrictions: tree_nuts, dairy");
    });
  });

  describe("No Health Profile", () => {
    test("should not include personalized instructions when no health profile", () => {
      const result = prompt(openFoodResponseMockData, null);

      expect(result).not.toContain(
        "USER HEALTH CONDITIONS - CRITICAL PRIORITY:"
      );
      expect(result).not.toContain(
        "USER ALLERGIES & DIETARY RESTRICTIONS - CRITICAL PRIORITY:"
      );
      expect(result).not.toContain("PERSONALIZATION REQUIREMENTS:");
      expect(result).not.toContain(
        "Focus heavily on the user's specific health conditions"
      );
      // When no health profile, the USER HEALTH PROFILE section is not included at all
      expect(result).not.toContain("USER HEALTH PROFILE:");
    });
  });

  describe("Personalization Requirements", () => {
    test("should include personalization requirements when health profile exists", () => {
      const userProfile: UserHealthSetupProfile = {
        diseases: ["diabetes"],
        allergies: ["tree_nuts"],
      };

      const result = prompt(openFoodResponseMockData, userProfile);

      expect(result).toContain("PERSONALIZATION REQUIREMENTS:");
      expect(result).toContain(
        "User health conditions and allergies take ABSOLUTE PRIORITY"
      );
      expect(result).toContain(
        "Allergies should ALWAYS be flagged as CRITICAL severity"
      );
      expect(result).toContain(
        "Health conditions should heavily influence scoring"
      );
      expect(result).toContain(
        "Focus heavily on the user's specific health conditions and allergies"
      );
    });
  });

  describe("Product Data Integration", () => {
    test("should include the provided product data in JSON format", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain("Product data to analyze:");
      expect(result).toContain(JSON.stringify(openFoodResponseMockData));
    });

    test("should handle different product data structures", () => {
      const customProductData: OpenFoodData = {
        status: 1,
        product: {
          countries: "France",
          image_url: "https://example.com/custom.jpg",
          ingredients: [
            {
              id: "en:organic-flour",
              text: "Organic flour",
              rank: 1,
              is_in_taxonomy: 1,
              percent: 70,
              percent_estimate: 70,
              percent_max: 70,
              percent_min: 70,
              has_sub_ingredients: "no",
              vegan: "yes",
              vegetarian: "yes",
              from_palm_oil: "no",
            },
          ],
          labels: "Organic, Gluten-free",
          product_name: "Custom Product",
          product_name_ar: "منتج مخصص",
          product_name_en: "Custom Product",
          product_name_fr: "Produit personnalisé",
          product_type: "food",
        },
      };

      const result = prompt(customProductData);

      // Check that the product data is included in the JSON format
      expect(result).toContain("Product data to analyze:");
      expect(result).toContain("Custom Product");
      expect(result).toContain("France");
      expect(result).toContain("Organic flour");
    });
  });

  describe("JSON Response Structure", () => {
    test("should specify correct JSON response structure", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain(
        "Return your response as a JSON object with the following structure:"
      );
      expect(result).toContain('"score": <number between 0-100>');
      expect(result).toContain('"recommendations": [');
      expect(result).toContain(
        '"recommendation": "Specific recommendation text'
      );
      expect(result).toContain('"severity": "low|moderate|high|critical"');
      expect(result).toContain('"explanation": "Detailed explanation');
    });
  });

  describe("General Content Verification", () => {
    test("should include all major analysis categories", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain("FOR FOOD PRODUCTS:");
      expect(result).toContain("FOR COSMETICS/PERSONAL CARE PRODUCTS:");
      expect(result).toContain("FOR HOUSEHOLD PRODUCTS:");
      expect(result).toContain("NUTRITIONAL CONCERNS:");
      expect(result).toContain("HEALTH CONDITIONS TO CONSIDER:");
      expect(result).toContain("SEVERITY LEVELS:");
    });

    test("should include severity level definitions", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain(
        '"low": Minor concern, occasional consumption okay'
      );
      expect(result).toContain(
        '"moderate": Should limit intake, better alternatives available'
      );
      expect(result).toContain(
        '"high": Significant health concern, avoid regular consumption'
      );
      expect(result).toContain(
        '"critical": Major health risk, avoid completely for certain conditions'
      );
    });

    test("should include scoring guidelines", () => {
      const result = prompt(openFoodResponseMockData);

      expect(result).toContain("generate a health/safety score from 0-100");
      expect(result).toContain(
        "Products with many synthetic additives or chemicals should score lower"
      );
      expect(result).toContain(
        "Products with clean, minimal ingredient lists should score higher"
      );
    });
  });

  describe("Edge Cases", () => {
    test("should handle undefined health profile gracefully", () => {
      const result = prompt(openFoodResponseMockData, undefined);

      expect(result).toBeDefined();
      expect(result).toContain("LANGUAGE INSTRUCTION:");
      expect(result).not.toContain("USER HEALTH CONDITIONS");
    });

    test("should handle empty product data", () => {
      const emptyProductData: OpenFoodData = {
        status: 0,
        product: {
          countries: "",
          image_url: "",
          ingredients: [],
          labels: "",
          product_name: "",
          product_name_ar: "",
          product_name_en: "",
          product_name_fr: "",
          product_type: "",
        },
      };

      const result = prompt(emptyProductData);

      expect(result).toBeDefined();
      expect(result).toContain("Product data to analyze:");
      // Check that the empty product data is included
      expect(result).toContain('"status":0');
      expect(result).toContain('"product_name":""');
    });

    test("should handle unknown language by throwing an error or defaulting", () => {
      // The function currently doesn't handle unknown languages gracefully
      // This test documents the current behavior - it should either be fixed in the function
      // or this test should expect an error
      expect(() => {
        prompt(openFoodResponseMockData, null, "unknown" as Language);
      }).toThrow();

      // Alternative: If the function should handle unknown languages gracefully,
      // it would need to be updated to have a fallback mechanism
    });
  });
});

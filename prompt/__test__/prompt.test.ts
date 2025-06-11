import { OpenFoodData } from "@/constants/responses";
import { prompt } from "..";

describe("prompt function", () => {
  const mockFoodProduct: OpenFoodData = {
    status: 1,
    product: {
      image_url: "https://example.com/cereal.jpg",
      labels: "Organic, Non-GMO",
      product_name: "Test Cereal",
      product_name_ar: "حبوب الإفطار",
      product_name_en: "Test Cereal",
      product_name_fr: "Céréales Test",
      product_type: "food",
      countries: "United States",
      ingredients: [
        {
          id: "1",
          text: "Whole grain oats",
          percent: 0,
        },
        {
          id: "2",
          text: "Sugar",
          percent: 0,
        },
        {
          id: "3",
          text: "Salt",
          percent: 0,
        },
      ],
    },
  };

  const mockMinimalProduct: OpenFoodData = {
    status: 1,
    product: {
      image_url: "https://example.com/product.jpg",
      labels: "",
      product_name: "Simple Product",
      product_name_ar: "منتج بسيط",
      product_name_en: "Simple Product",
      product_name_fr: "Produit simple",
      product_type: "unknown",
    },
  };

  describe("Basic functionality", () => {
    it("should return a string", () => {
      const result = prompt(mockFoodProduct);
      expect(typeof result).toBe("string");
    });

    it("should not return empty string", () => {
      const result = prompt(mockFoodProduct);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Prompt content verification", () => {
    it("should contain the main instruction about health/safety score", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("health/safety score from 0-100");
      expect(result).toContain("0 is potentially harmful");
      expect(result).toContain("100 is optimally healthy/safe");
    });

    it("should contain food product analysis criteria", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("FOR FOOD PRODUCTS:");
      expect(result).toContain("NOVA classification");
      expect(result).toContain("Nutrient profile");
      expect(result).toContain("Ingredients list");
      expect(result).toContain("Nutriscore grade");
    });

    it("should contain cosmetics analysis criteria", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("FOR COSMETICS/PERSONAL CARE PRODUCTS:");
      expect(result).toContain("harmful ingredients");
      expect(result).toContain("parabens, phthalates, formaldehyde");
      expect(result).toContain("endocrine disruptors");
    });

    it("should contain household products analysis criteria", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("FOR HOUSEHOLD PRODUCTS:");
      expect(result).toContain("toxic chemicals");
      expect(result).toContain("Environmental impact");
      expect(result).toContain("Biodegradability");
    });

    it("should contain general scoring guidelines", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("General scoring guidelines:");
      expect(result).toContain(
        "synthetic additives or chemicals should score lower"
      );
      expect(result).toContain(
        "harmful ingredients should receive significant penalties"
      );
    });

    it("should contain final response instruction", () => {
      const result = prompt(mockFoodProduct);
      expect(result).toContain("return final score (0-100) only as response");
    });
  });

  describe("Prompt structure consistency", () => {
    it("should generate identical prompts for identical input", () => {
      const result1 = prompt(mockFoodProduct);
      const result2 = prompt(mockFoodProduct);
      expect(result1).toBe(result2);
    });

    it("should maintain consistent structure with all required sections", () => {
      const result = prompt(mockMinimalProduct);
      expect(result).toContain("FOR FOOD PRODUCTS:");
      expect(result).toContain("FOR COSMETICS/PERSONAL CARE PRODUCTS:");
      expect(result).toContain("FOR HOUSEHOLD PRODUCTS:");
      expect(result).toContain("General scoring guidelines:");
    });

    it("should start with the analysis instruction", () => {
      const result = prompt(mockFoodProduct);
      expect(result.startsWith("Analyze the following product JSON data")).toBe(
        true
      );
    });
  });

  describe("JSON formatting", () => {
    it("should handle special characters in product data", () => {
      const productWithSpecialChars: OpenFoodData = {
        status: 1,
        product: {
          image_url: "https://example.com/special.jpg",
          labels: 'Contains "quotes" and symbols',
          product_name: "Product with special chars & symbols",
          product_name_ar: "منتج خاص",
          product_name_en: "Special Product",
          product_name_fr: "Produit spécial",
          product_type: "food",
        },
      };

      const result = prompt(productWithSpecialChars);
      expect(result).toContain('Contains \\"quotes\\" and symbols');
      expect(result).toContain("Product with special chars & symbols");
    });
  });
});

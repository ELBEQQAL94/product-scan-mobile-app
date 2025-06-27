import { Language } from "@/enums/language";
import { openFoodResponseMockData } from "@/mock/openFoodResponseData";
import { halal_prompt } from "../halal-prompt";
import { CONTENT_WITH_DEFAULT_LANGUAGE } from "@/mock/halal-prompt";

describe("halal prompt", () => {
  // Test prompt content
  it("should return prompt with correct content", () => {
    const content = halal_prompt(openFoodResponseMockData);

    expect(content.trim()).toEqual(CONTENT_WITH_DEFAULT_LANGUAGE.trim());
    expect(content).toContain(Language.AR);
  });

  // Test english language
  it("should return prompt with correct content", () => {
    const content = halal_prompt(openFoodResponseMockData, Language.EN);

    expect(content).toContain(Language.EN);
  });

  // Test spain language
  it("should return prompt with correct content", () => {
    const content = halal_prompt(openFoodResponseMockData, Language.ES);

    expect(content).toContain(Language.ES);
  });

  // Test germany language
  it("should return prompt with correct content", () => {
    const content = halal_prompt(openFoodResponseMockData, Language.DE);

    expect(content).toContain(Language.DE);
  });

  // Test french language
  it("should return prompt with correct content", () => {
    const content = halal_prompt(openFoodResponseMockData, Language.FR);

    expect(content).toContain(Language.FR);
  });
});

// __tests__/i18n.test.ts
import { LanguageKey } from "@/constants/keys";
import { i18n } from "..";

// Type definitions
type SupportedLanguage = "en" | "ar" | "fr" | "es" | "de";
type TranslationValue = string;
type TranslationKeys = keyof typeof LanguageKey;
type LanguageTranslations = Record<string, TranslationValue>;
type AllTranslations = Record<SupportedLanguage, LanguageTranslations>;

interface ValidationError {
  type: "missing" | "extra" | "empty" | "structure";
  message: string;
  language?: SupportedLanguage;
  key?: string;
}

interface TranslationReport {
  language: SupportedLanguage;
  totalKeys: number;
  missingKeys: string[];
  extraKeys: string[];
  emptyKeys: string[];
}

describe("i18n Translation Validation", () => {
  const supportedLanguages: SupportedLanguage[] = [
    "en",
    "ar",
    "fr",
    "es",
    "de",
  ];
  const translations: AllTranslations = i18n.translations as AllTranslations;

  describe("LanguageKey Consistency", () => {
    test("All LanguageKey values should exist in all language translations", () => {
      const languageKeyValues: string[] = Object.values(LanguageKey);
      const missingTranslations: ValidationError[] = [];

      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const langTranslations: LanguageTranslations | undefined =
          translations[lang];

        languageKeyValues.forEach((key: string) => {
          if (
            !langTranslations ||
            !Object.prototype.hasOwnProperty.call(langTranslations, key)
          ) {
            missingTranslations.push({
              type: "missing",
              message: `Missing key "${key}" in language "${lang}"`,
              language: lang,
              key,
            });
          }
        });
      });

      if (missingTranslations.length > 0) {
        console.error("Missing translations found:");
        missingTranslations.forEach((error: ValidationError) => {
          console.error(`  - ${error.message}`);
        });
      }

      expect(missingTranslations).toHaveLength(0);
    });

    test("All translation keys should have corresponding LanguageKey constants", () => {
      const languageKeyValues: string[] = Object.values(LanguageKey);
      const extraKeys: ValidationError[] = [];

      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const langTranslations: LanguageTranslations | undefined =
          translations[lang];
        if (!langTranslations) return;

        Object.keys(langTranslations).forEach((translationKey: string) => {
          if (!languageKeyValues.includes(translationKey)) {
            extraKeys.push({
              type: "extra",
              message: `Extra key "${translationKey}" in language "${lang}" not found in LanguageKey constants`,
              language: lang,
              key: translationKey,
            });
          }
        });
      });

      if (extraKeys.length > 0) {
        console.warn("Extra translation keys found (not in LanguageKey):");
        extraKeys.forEach((error: ValidationError) => {
          console.warn(`  - ${error.message}`);
        });
      }

      expect(extraKeys).toHaveLength(0);
    });
  });

  describe("Translation Completeness", () => {
    test("All languages should have the same number of translation keys", () => {
      const keyCounts: Record<SupportedLanguage, number> = {} as Record<
        SupportedLanguage,
        number
      >;

      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const langTranslations: LanguageTranslations | undefined =
          translations[lang];
        keyCounts[lang] = langTranslations
          ? Object.keys(langTranslations).length
          : 0;
      });

      const uniqueCounts: number[] = [...new Set(Object.values(keyCounts))];

      if (uniqueCounts.length > 1) {
        console.error("Translation key count mismatch:");
        Object.entries(keyCounts).forEach(([lang, count]: [string, number]) => {
          console.error(`  ${lang}: ${count} keys`);
        });
      }

      expect(uniqueCounts).toHaveLength(1);
    });

    test("No translation values should be empty or undefined", () => {
      const emptyTranslations: ValidationError[] = [];

      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const langTranslations: LanguageTranslations | undefined =
          translations[lang];
        if (!langTranslations) return;

        Object.entries(langTranslations).forEach(
          ([key, value]: [string, TranslationValue]) => {
            if (!value || value.trim() === "") {
              emptyTranslations.push({
                type: "empty",
                message: `Empty translation for key "${key}" in language "${lang}"`,
                language: lang,
                key,
              });
            }
          }
        );
      });

      if (emptyTranslations.length > 0) {
        console.error("Empty translations found:");
        emptyTranslations.forEach((error: ValidationError) => {
          console.error(`  - ${error.message}`);
        });
      }

      expect(emptyTranslations).toHaveLength(0);
    });
  });

  describe("Translation Key Structure", () => {
    test("All translation keys should match LanguageKey constant structure", () => {
      const languageKeyConstants: string[] = Object.keys(LanguageKey);
      const structureMismatches: ValidationError[] = [];

      languageKeyConstants.forEach((constant: string) => {
        const expectedValue: string = LanguageKey[constant as TranslationKeys];
        if (constant !== expectedValue) {
          structureMismatches.push({
            type: "structure",
            message: `LanguageKey.${constant} should equal "${constant}" but equals "${expectedValue}"`,
            key: constant,
          });
        }
      });

      expect(structureMismatches).toHaveLength(0);
    });
  });

  describe("Specific Key Validations", () => {
    test("HEALTH_PROFILE_SETUP should exist in all languages", () => {
      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const translation: TranslationValue | undefined =
          translations[lang]?.[LanguageKey.HEALTH_PROFILE_SETUP];
        expect(translation).toBeDefined();
        expect(translation).not.toBe("");
        expect(typeof translation).toBe("string");
      });
    });

    test("Required action keys should exist", () => {
      const requiredActionKeys: string[] = [
        LanguageKey.CONTINUE,
        LanguageKey.CANCEL,
        LanguageKey.DONE,
        LanguageKey.NEXT,
        LanguageKey.SKIP,
      ];

      supportedLanguages.forEach((lang: SupportedLanguage) => {
        requiredActionKeys.forEach((key: string) => {
          const translation: TranslationValue | undefined =
            translations[lang]?.[key];
          expect(translation).toBeDefined();
          expect(translation).not.toBe("");
          expect(typeof translation).toBe("string");
        });
      });
    });
  });

  describe("Type Safety Validations", () => {
    test("All LanguageKey values should be strings", () => {
      const languageKeyValues: string[] = Object.values(LanguageKey);

      languageKeyValues.forEach((value: string) => {
        expect(typeof value).toBe("string");
        expect(value.length).toBeGreaterThan(0);
      });
    });

    test("All translation values should be non-empty strings", () => {
      supportedLanguages.forEach((lang: SupportedLanguage) => {
        const langTranslations: LanguageTranslations | undefined =
          translations[lang];
        if (!langTranslations) return;

        Object.entries(langTranslations).forEach(
          ([key, value]: [string, TranslationValue]) => {
            expect(typeof value).toBe("string");
            expect(value.length).toBeGreaterThan(0);
            expect(value.trim().length).toBeGreaterThan(0);
          }
        );
      });
    });

    test("Supported languages should match expected type", () => {
      const expectedLanguages: SupportedLanguage[] = [
        "en",
        "ar",
        "fr",
        "es",
        "de",
      ];

      expectedLanguages.forEach((lang: SupportedLanguage) => {
        expect(supportedLanguages).toContain(lang);
        expect(translations[lang]).toBeDefined();
      });
    });
  });
});

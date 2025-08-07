// hooks/useTranslation.ts
import { useLanguage } from "@/context/LanguageProvider";
import { i18n } from "@/i18n";

export const useTranslation = () => {
  const { language } = useLanguage();
  return {
    t: i18n.t.bind(i18n),
    locale: language,
  };
};

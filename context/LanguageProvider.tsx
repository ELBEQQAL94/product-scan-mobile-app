import React, { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/enums/language";
import { i18n } from "@/i18n";
import { get_item, set_item } from "@/utils";
import { AsyncStorageKey } from "@/constants/keys";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>({
  language: Language.EN,
  setLanguage: async () => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>(Language.EN);

  const setLanguage = async (lang: Language) => {
    i18n.locale = lang;
    await set_item(AsyncStorageKey.LANGUAGE_CODE, lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    (async () => {
      const savedLang = await get_item(AsyncStorageKey.LANGUAGE_CODE);
      const lang = savedLang || Language.EN;
      i18n.locale = lang;
      setLanguageState(lang);
    })();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

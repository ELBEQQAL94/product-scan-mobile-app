import { Language } from "@/enums/language";
import { i18n } from "@/i18n";
import { useEffect, useState } from "react";

export const useSelectedLanguage = () => {
  // States
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    i18n.locale as Language
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const change_language = (languageCode: string) => {
    i18n.locale = languageCode;
    setCurrentLanguage(languageCode as Language);
    setModalVisible(false);
  };

  const is_arabic = () => currentLanguage === Language.AR;

  useEffect(() => {
    setCurrentLanguage(i18n.locale as Language);
  }, [currentLanguage]);

  return {
    modalVisible,
    setModalVisible,
    currentLanguage,
    change_language,
    is_arabic,
  };
};

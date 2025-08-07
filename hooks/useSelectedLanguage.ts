import { AsyncStorageKey } from "@/constants/keys";
import { Language } from "@/enums/language";
import { i18n } from "@/i18n";
import { get_item, set_item } from "@/utils";
import { useEffect, useState } from "react";

export const useSelectedLanguage = () => {
  // States
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    i18n.locale as Language
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const change_language = async (languageCode: string) => {
    i18n.locale = languageCode;
    await set_item(AsyncStorageKey.LANGUAGE_CODE, languageCode);
    setCurrentLanguage(languageCode as Language);
    setModalVisible(false);
  };

  const load_saved_language = async () => {
    try {
      const savedLanguage = await get_item(AsyncStorageKey.LANGUAGE_CODE);
      if (savedLanguage) {
        i18n.locale = savedLanguage;
        setCurrentLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error("Error loading saved language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const is_arabic = () => currentLanguage === Language.AR;

  useEffect(() => {
    load_saved_language();
  }, []);

  return {
    modalVisible,
    setModalVisible,
    currentLanguage,
    change_language,
    is_arabic,
    isLoading,
    load_saved_language,
  };
};

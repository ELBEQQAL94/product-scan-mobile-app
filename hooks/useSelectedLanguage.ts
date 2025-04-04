import { i18n } from "@/i18n";
import { useEffect, useState } from "react";

export const useSelectedLanguage = () => {
    // States
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.locale);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const change_language = (languageCode: string) => {
        i18n.locale = languageCode;
        setModalVisible(false);
    };

    useEffect(() => {
        setCurrentLanguage(i18n.locale);
    }, [currentLanguage]);
    
    return {modalVisible, setModalVisible, currentLanguage, change_language};
};
import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, StyleSheet } from "react-native";

const Terms: FC = () => {
  // Hooks
  const { t } = useTranslation();

  return (
    <Text style={styles.termsText}>
      {t(LanguageKey.BY_CONTINUING_YOU_AGREE_TO_OUR)}{" "}
      <Text style={styles.linkText}>{t(LanguageKey.TERMS_OF_SERVICE)}</Text>{" "}
      {t(LanguageKey.AND)}{" "}
      <Text style={styles.linkText}>{t(LanguageKey.PRIVACY_POLICY)}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  termsText: {
    fontSize: 12,
    color: Colors.BLUE_GRAY,
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: Colors.YELLOW,
    textDecorationLine: "underline",
  },
});

export default Terms;

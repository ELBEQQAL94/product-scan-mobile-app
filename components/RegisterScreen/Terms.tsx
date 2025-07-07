import { LanguageKey } from "@/constants/keys";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, StyleSheet } from "react-native";

const Terms: FC = () => {
  return (
    <Text style={styles.termsText}>
      {i18n.t(LanguageKey.BY_CONTINUING_YOU_AGREE_TO_OUR)}{" "}
      <Text style={styles.linkText}>
        {i18n.t(LanguageKey.TERMS_OF_SERVICE)}
      </Text>{" "}
      {i18n.t(LanguageKey.AND)}{" "}
      <Text style={styles.linkText}>{i18n.t(LanguageKey.PRIVACY_POLICY)}</Text>
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

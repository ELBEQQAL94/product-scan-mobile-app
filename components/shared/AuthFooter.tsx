import { LanguageKey } from "@/constants/keys";
import { Language } from "@/enums/language";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface AuthFooterProps {
  label: string;
  link: string;
  isArabic: boolean;
  redirectTo: () => void;
}

const AuthFooter: FC<AuthFooterProps> = ({
  label,
  link,
  isArabic,
  redirectTo,
}) => {
  return (
    <View style={styles.footer}>
      <View
        style={[
          styles.footer_text_container,
          { flexDirection: isArabic ? "row-reverse" : "row" },
        ]}
      >
        <Text style={styles.footer_text}>{label}</Text>

        <TouchableOpacity onPress={redirectTo}>
          <Text
            style={[
              styles.link_text,
              { marginRight: isArabic ? 5 : 0, marginLeft: isArabic ? 0 : 5 },
            ]}
          >
            {link}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  footer_text_container: {
    display: "flex",
    alignItems: "center",
  },
  footer_text: {
    color: Colors.BLUE_GRAY,
    ...Typography.bodyLarge,
  },
  link_text: {
    color: Colors.YELLOW,
    textDecorationLine: "underline",
    ...Typography.bodyMedium,
  },
});

export default AuthFooter;

import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

const Devider: FC = () => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{t(LanguageKey.OR)}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.DARK_SLATE_GRAY,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.BLUE_GRAY,
  },
});

export default Devider;

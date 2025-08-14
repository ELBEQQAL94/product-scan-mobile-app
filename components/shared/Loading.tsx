import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const Loading: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.loading_container}>
      <Text style={styles.loading_text}>{t(LanguageKey.LOADING)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading_text: {
    fontWeight: "bold",
    ...Typography.bodyMedium,
  },
});

export default Loading;

import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

interface ProductNameProps {
  name: string;
}

const ProductName: FC<ProductNameProps> = ({ name }) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {name !== "Chargement…" && name !== ""
          ? name
          : t(LanguageKey.PRODUC_NAME_NOT_FOUND)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: { fontWeight: "bold", ...Typography.h3 },
});

export default ProductName;

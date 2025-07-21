import Products from "@/components/ProductListScreen/Products";
import AuthButtons from "@/components/shared/AuthButtons";
import { LanguageKey } from "@/constants/keys";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { cacheProductData } from "@/mock/cacheProductData";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductList: FC = () => {
  // Hooks
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  return (
    <View style={styles.container}>
      <AuthButtons isArabic={is_arabic()} redirectTo={redirect_to} />
      <Text style={styles.text}>{i18n.t(LanguageKey.SCANNED_PRODUCTS)}</Text>
      <Products
        products={[
          cacheProductData,
          cacheProductData,
          cacheProductData,
          cacheProductData,
          cacheProductData,
          cacheProductData,
          cacheProductData,
          cacheProductData,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    ...Typography.bodyLarge,
  },
});

export default ProductList;

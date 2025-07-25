import Products from "@/components/ProductListScreen/Products";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthButtons from "@/components/shared/AuthButtons";
import ScanningLoader from "@/components/shared/ScanningLoader";
import { LanguageKey } from "@/constants/keys";
import { ProductScanResult } from "@/constants/responses";
import { useAuth } from "@/hooks/useAuth";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { cacheProductData } from "@/mock/cacheProductData";
import { Typography } from "@/themes/typography";
import { get_all_cached_products } from "@/utils";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductList: FC = () => {
  // Hooks
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();
  const { user } = useAuth();

  // States
  const [products, setProducts] = useState<ProductScanResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isAuth = user?.displayName !== null;

  const fetch_all_cached_products = async () => {
    try {
      setLoading(true);
      const result = await get_all_cached_products();
      setProducts(result);
    } catch (error: unknown) {
      // TODO call log instead
      console.log(
        `error get when try to fecth chached product on ProductList: ${error}`
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_all_cached_products();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <Text>{i18n.t(LanguageKey.LOADING)}</Text>
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <AuthButtons
          isArabic={is_arabic()}
          redirectTo={redirect_to}
          isAuth={isAuth}
        />
        <Text style={styles.text}>{i18n.t(LanguageKey.SCANNED_PRODUCTS)}</Text>
        <Products products={products} />
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    ...Typography.bodyLarge,
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;

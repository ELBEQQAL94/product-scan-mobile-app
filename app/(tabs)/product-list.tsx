import Products from "@/components/ProductListScreen/Products";
import ProtectedRoute from "@/components/ProtectedRoute";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import ScreenTitle from "@/components/shared/ScreenTitle";
import { LanguageKey } from "@/constants/keys";
import { get_products } from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { ProductTypeFromDB } from "@/types/products";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductList: FC = () => {
  // Hooks
  const { user } = useAuth();
  const { modalVisible, setModalVisible, currentLanguage, change_language } =
    useSelectedLanguage();

  // States
  const [products, setProducts] = useState<ProductTypeFromDB[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch_all_products = async () => {
    try {
      setLoading(true);
      const user_id = user?.uid;
      if (user_id) {
        const result = (await get_products(user_id)) ?? [];
        setProducts(result);
      }
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
    fetch_all_products();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <Text>{i18n.t(LanguageKey.LOADING)}</Text>
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={currentLanguage}
        setModalVisible={setModalVisible}
        changeLanguage={change_language}
      />
      <View style={styles.container}>
        <ScreenTitle title={i18n.t(LanguageKey.SCANNED_PRODUCTS)} />
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
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;

import Products from "@/components/ProductListScreen/Products";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/shared/Loading";
import ScreenTitle from "@/components/shared/ScreenTitle";
import { LanguageKey } from "@/constants/keys";
import {
  get_products,
  remove_product_from_db,
} from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { Typography } from "@/themes/typography";
import { ProductTypeFromDB } from "@/types/products";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

const ProductList: FC = () => {
  // Hooks
  const { user } = useAuth();
  const { t } = useTranslation();

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

  const removeProduct = async (code_bar: string) => {
    Alert.alert(
      t(LanguageKey.CONFIRM_ACTION),
      t(LanguageKey.WANT_TO_PROCEED),
      [
        {
          text: t(LanguageKey.CANCEL),
          style: "cancel",
        },
        {
          text: t(LanguageKey.OK),
          onPress: async () => {
            try {
              if (user?.uid) {
                await remove_product_from_db(code_bar, user?.uid);
                await fetch_all_products();
              }
            } catch (error) {
              console.log("remove product get an error: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetch_all_products();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        {products.length === 0 ? (
          <View style={styles.no_product_found_container}>
            <Text style={styles.no_product_found_container_text}>
              {t(LanguageKey.DONT_HAVE_SCANNED_PRODUCT)}
            </Text>
          </View>
        ) : (
          <>
            <ScreenTitle title={t(LanguageKey.SCANNED_PRODUCTS)} />
            <Products products={products} removeProduct={removeProduct} />
          </>
        )}
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
  },
  no_product_found_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  no_product_found_container_text: {
    fontWeight: "bold",
    ...Typography.h3,
  },
});

export default ProductList;

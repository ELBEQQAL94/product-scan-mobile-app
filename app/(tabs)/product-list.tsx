import Products from "@/components/ProductListScreen/Products";
import ProtectedRoute from "@/components/ProtectedRoute";
import ActionButton from "@/components/shared/ActionButton";
import SearchInput from "@/components/shared/form/SearchInput";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import Loading from "@/components/shared/Loading";
import ScreenTitle from "@/components/shared/ScreenTitle";
import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { useLanguage } from "@/context/LanguageProvider";
import {
  get_products,
  remove_product_from_db,
} from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { ProductTypeFromDB } from "@/types/products";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

const ProductList: FC = () => {
  // Hooks
  const { user } = useAuth();
  const { is_arabic } = useLanguage();
  const { t } = useTranslation();
  const { redirect_to } = useCustomRouter();
  const { modalVisible, language, setModalVisible, setLanguage } =
    useLanguage();

  // States
  const [products, setProducts] = useState<ProductTypeFromDB[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const filteredProducts = products.filter((product) =>
    product.product_scan_result.product_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const redirect = () => redirect_to(Screens.HOME_SCREEN);

  useEffect(() => {
    fetch_all_products();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={language}
        setModalVisible={setModalVisible}
        changeLanguage={setLanguage}
      />
      <View style={styles.container}>
        {products.length === 0 ? (
          <View style={styles.no_product_found_container}>
            <Text style={styles.no_product_found_container_text}>
              {t(LanguageKey.DONT_HAVE_SCANNED_PRODUCT)}
            </Text>
            <ActionButton
              label={LanguageKey.START_SCANNING}
              onPress={redirect}
              isArabic={is_arabic}
              buttonStyles={{ backgroundColor: Colors.GLOVO_GREEN }}
            />
          </View>
        ) : (
          <>
            <ScreenTitle title={t(LanguageKey.SCANNED_PRODUCTS)} />
            <SearchInput
              value={searchQuery}
              setValue={setSearchQuery}
              label={t(LanguageKey.SEARCH_YOUR_PRODUCT)}
            />
            {filteredProducts.length === 0 ? (
              <View style={styles.no_product_found_container}>
                <Text style={styles.no_product_found_container_text}>
                  {t(LanguageKey.DONT_HAVE_SCANNED_PRODUCT)}
                </Text>
              </View>
            ) : (
              <Products
                products={filteredProducts}
                removeProduct={removeProduct}
              />
            )}
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
  searchInput: {
    flex: 1,
  },
});

export default ProductList;

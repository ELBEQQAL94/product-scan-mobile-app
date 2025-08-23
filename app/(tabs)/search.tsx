import Product from "@/components/ProductListScreen/Product";
import SearchInput from "@/components/shared/form/SearchInput";
import ScreenTitle from "@/components/shared/ScreenTitle";
import { LanguageKey } from "@/constants/keys";
import { get_unique_products } from "@/external-services/firebase-config";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { UniqueProduct } from "@/types/products";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SearchScreen = () => {
  // Hooks
  const { t } = useTranslation();

  // States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<UniqueProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const result = await get_unique_products(searchQuery);
      setProducts(result);
      console.log(`products: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSearchDisabled = !searchQuery.trim() || isLoading;

  return (
    <View style={styles.container}>
      <ScreenTitle title={t(LanguageKey.SEARCH_PRODUCT)} />

      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          setValue={setSearchQuery}
          label={t(LanguageKey.SEARCH_PRODUCT)}
        />

        <TouchableOpacity
          style={[
            styles.searchButton,
            isSearchDisabled && styles.searchButtonDisabled,
          ]}
          onPress={onSearch}
          disabled={isSearchDisabled}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.WHITE} size="small" />
          ) : (
            <Text style={styles.searchButtonText}>
              {t(LanguageKey.SEARCH_PRODUCT)}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.productsContainer}>
        {products.map((product: UniqueProduct) => (
          <Product
            key={product.product_scan_result.product_name}
            product={product}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.LIGHT_GRAY,
    shadowOpacity: 0,
    elevation: 0,
  },
  searchButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  productsContainer: {
    flex: 1,
  },
});

export default SearchScreen;

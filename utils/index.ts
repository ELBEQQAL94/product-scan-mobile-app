import { AsyncStorageKey } from "@/constants/keys";
import {
  CachedProduct,
  OpenFoodData,
  ProductScanResult,
} from "@/constants/responses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkOnboardingStatus = async () => {
  const hasCompletedOnboarding = await AsyncStorage.getItem(
    AsyncStorageKey.HAS_COMPLETED_ONBOARDING
  );
  return hasCompletedOnboarding;
};

export const set_item = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const get_item = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const remove_item = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error(`Error remove item with value: ${key} get an error: `, error);
  }
};

export const clear_items = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clear all cache: ", error);
    return null;
  }
};

// export const save_product_by_bar_code = async (
//   bar_code: string,
//   product: ProductScanResult
// ) => {
//   try {
//     await AsyncStorage.setItem(bar_code, JSON.stringify(product));
//   } catch (error) {
//     console.error(
//       `get an error set item: ${bar_code} in local storage: ${error}`
//     );
//   }
// };

const PRODUCT_PREFIX = "product_";

export const save_product_by_bar_code = async (
  bar_code: string,
  product: ProductScanResult
) => {
  try {
    console.log(`saved product ${PRODUCT_PREFIX}${bar_code}`);
    await AsyncStorage.setItem(
      `${PRODUCT_PREFIX}${bar_code}`,
      JSON.stringify(product)
    );
  } catch (error) {
    console.error(`Error saving product ${bar_code}:`, error);
  }
};

export const get_all_cached_products = async (): Promise<
  ProductScanResult[]
> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const productKeys = allKeys.filter((key) => key.startsWith(PRODUCT_PREFIX));

    const keyValuePairs = await AsyncStorage.multiGet(productKeys);

    const products: ProductScanResult[] = [];
    keyValuePairs.forEach(([key, value]) => {
      if (value) {
        try {
          const product = JSON.parse(value) as ProductScanResult;
          products.push(product);
        } catch (parseError) {
          console.error(`Error parsing product for key ${key}:`, parseError);
        }
      }
    });
    console.log(`products: ${JSON.stringify(products)}`);
    return products;
  } catch (error) {
    console.error("Error getting all cached products:", error);
    return [];
  }
};

export const get_product_by_bar_code = async (
  bar_code: string
): Promise<ProductScanResult | undefined> => {
  try {
    const product = await AsyncStorage.getItem(bar_code);
    return product != null ? JSON.parse(product) : undefined;
  } catch (error) {
    console.error(
      `get product by bar_code: ${bar_code} get an error: ${error}`
    );
  }
};

export const format_date_to_timestamp = (): number => {
  const current_date = Date.now();
  return current_date;
};

export const format_date_to_custom_string = (): string => {
  const localTimeZone = "Africa/Casablanca";
  const now = new Date();

  const localDate = now
    .toLocaleDateString("en-US", {
      timeZone: localTimeZone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const localTime = now.toLocaleTimeString("en-US", {
    timeZone: localTimeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${localDate} ${localTime}`;
};

export const is_email_valid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

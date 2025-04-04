import { CachedProduct, Product } from "@/constants/responses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkOnboardingStatus = async () => {
  const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");
  return hasCompletedOnboarding;
};

export const set_item = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const get_item = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
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
    console.error('Error clear all cache: ', error);
    return null;
  }
};

export const save_product_by_bar_code = async (bar_code: string, product: CachedProduct) => {
  try {
    await AsyncStorage.setItem(bar_code, JSON.stringify(product));
  } catch (error) {
    console.error(`get an error set item: ${bar_code} in local storage: ${error}`);
  }
};

export const get_product_by_bar_code = async (bar_code: string): Promise<CachedProduct|null|undefined> => {
  try {
    const product = await AsyncStorage.getItem(bar_code);
    return product != null ? JSON.parse(product) : null;
  } catch (error) {
    console.error(`get product by bar_code: ${bar_code} get an error: ${error}`);
  }
};
import ProductNotFound from "@/components/ProductDetailsScreen/ProductNotFound";
import { ProductScanResult } from "@/constants/responses";
import { Screens } from "@/constants/screens";
import { ai_scan, product_details } from "@/services";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import ConnectionError from "@/components/ProductDetailsScreen/ConnectionError";
import {
  calculate_enhanced_health_score,
  get_product_by_bar_code,
  get_score,
  map_to_product_db,
  save_product_by_bar_code,
} from "@/utils";
import ScanResult from "@/components/ScanResultScreen";
import { ai_product_scan_prompt } from "@/prompt";
import ScanningLoader from "@/components/shared/ScanningLoader";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import {
  check_user_exists,
  save_product_in_db,
} from "@/external-services/firebase-config";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserSchema } from "@/types/auth";
import { useLanguage } from "@/context/LanguageProvider";
import { ScanResultResponse } from "@/types/scan-result";

const ScanResultScreen: FC = () => {
  // Hooks
  const router = useRouter();
  const local = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { is_arabic, language } = useLanguage();
  const { redirect_to } = useCustomRouter();

  const bar_code = local.bar_code as string;
  const user_id = local.user_id as string;

  // states
  const [product, setProduct] = useState<ProductScanResult>();
  const [user, setUser] = useState<UserSchema | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // handle dark mode
  const colors = {
    background: colorScheme === "dark" ? "#121212" : "white",
    text: colorScheme === "dark" ? "white" : "black",
    border: colorScheme === "dark" ? "#333333" : "black",
    card: colorScheme === "dark" ? "#1E1E1E" : "white",
  };

  const fetch_current_user = async () => {
    setUserLoading(true);
    try {
      const user_data = await check_user_exists(user_id);
      setUser(user_data);
      setUserLoading(false);
    } catch (error: any) {
      setUserLoading(false);
      console.log(`error when fetch user data: ${error.message}`);
    } finally {
      setUserLoading(false);
    }
  };

  // fetch product logic
  const fetch_product_details = async () => {
    setLoading(true);
    try {
      let product = await get_product_by_bar_code(bar_code);
      if (!product) {
        console.log("new product: ");
        const response = await product_details(bar_code);
        if (response?.status === 1) {
          const grade = response.product.grade;
          const nutriscore_grade = response.product.nutriscore_grade;
          const ecoscore_score = response.product.ecoscore_score;
          const nutriscore_score = response.product.nutriscore_score;

          const score = get_score(
            ecoscore_score,
            nutriscore_score,
            nutriscore_grade,
            grade
          );

          if (!userLoading) {
            const content = ai_product_scan_prompt(response, user, language);
            const ai_scan_result = (await ai_scan(
              content
            )) as ScanResultResponse;

            if (ai_scan_result) {
              console.log("you call a chat");
              console.log(`ai_scan_result: ${ai_scan_result}`);
              product = {
                status: response.status,
                image_url: response.product.image_url,
                recommendations: ai_scan_result.recommendations,
                product_name:
                  response.product.product_name ||
                  response.product.product_name_en,
                score,
              };
              const product_db = map_to_product_db(user_id, bar_code, product);
              await save_product_in_db(product_db);
              await save_product_by_bar_code(bar_code, product);
            }
          }
        }
      }

      if (product) {
        setProduct(product);
      }
    } catch (error: any) {
      console.log("fetch product details get an error: ", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const retryScan = () => router.push(Screens.HOME_SCREEN as Href);

  useEffect(() => {
    fetch_product_details();
    fetch_current_user();
  }, [bar_code, user_id]);

  if (loading) {
    return <ScanningLoader isVisible={loading} />;
  }

  if ((product && product.status === 0) || !product)
    return <ProductNotFound textColor={colors.text} retryScan={retryScan} />;

  if (error || !product)
    return <ConnectionError error={error} textColor={colors.text} />;

  return (
    <ProtectedRoute>
      <ScanResult
        data={product}
        user={user}
        isArabic={is_arabic}
        redirectTo={redirect_to}
      />
    </ProtectedRoute>
  );
};

export default ScanResultScreen;

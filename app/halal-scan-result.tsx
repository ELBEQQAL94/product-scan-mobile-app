import ProductNotFound from "@/components/ProductDetailsScreen/ProductNotFound";
import { IHalalScanResult } from "@/constants/responses";
import { Screens } from "@/constants/screens";
import { ai_scan, product_details } from "@/services";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import ConnectionError from "@/components/ProductDetailsScreen/ConnectionError";
import { calculate_enhanced_health_score } from "@/utils";
import ScanningLoader from "@/components/shared/ScanningLoader";
import {} from "@/external-services/firebase-config";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageProvider";
import { halal_prompt } from "@/prompt/halal-prompt";
import { HalalScanResultResponse } from "@/types/scan-result";
import HalalScanResult from "@/components/HalalScanResultScreen/HalalScanResult";

const HalalScanResultScreen: FC = () => {
  // Hooks
  const router = useRouter();
  const local = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { language } = useLanguage();

  const bar_code = local.bar_code as string;

  // states
  const [halalResult, setHalalResult] = useState<IHalalScanResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // handle dark mode
  const colors = {
    background: colorScheme === "dark" ? "#121212" : "white",
    text: colorScheme === "dark" ? "white" : "black",
    border: colorScheme === "dark" ? "#333333" : "black",
    card: colorScheme === "dark" ? "#1E1E1E" : "white",
  };

  // fetch product logic
  const fetch_product_details = async () => {
    setLoading(true);
    try {
      console.log("new product: ");
      const response = await product_details(bar_code);
      if (response?.status === 1) {
        const score = calculate_enhanced_health_score(response);
        let content = halal_prompt(response, language);

        const ai_scan_result = (await ai_scan(
          content
        )) as HalalScanResultResponse;
        console.log("you call ia for hala check");
        const result: IHalalScanResult = {
          product_status: response.status,
          status: ai_scan_result.status,
          summary: ai_scan_result.summary,
          image_url: response.product.image_url || null,

          product_name:
            response.product.product_name ||
            response.product.product_name_en ||
            "",
          score,
        };
        setHalalResult(result);
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
  }, [bar_code]);

  if (loading) {
    return <ScanningLoader isVisible={loading} />;
  }

  if ((halalResult && halalResult.product_status === 0) || !halalResult)
    return <ProductNotFound textColor={colors.text} retryScan={retryScan} />;

  if (error || !halalResult)
    return <ConnectionError error={error} textColor={colors.text} />;

  return (
    <ProtectedRoute>
      <HalalScanResult data={halalResult} />
    </ProtectedRoute>
  );
};

export default HalalScanResultScreen;

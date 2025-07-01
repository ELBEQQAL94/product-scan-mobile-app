import { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { clear_items, get_item, get_product_by_bar_code } from "@/utils";
import Scan from "@/components/ScanScreen/Scan";
import { ai_scan } from "@/services";
import { openFoodResponseMockData } from "@/mock/openFoodResponseData";
import { get_products } from "@/external-services/firebase";
import { AsyncStorageKey } from "@/constants/keys";
import { halal_prompt } from "@/prompt/halal-prompt";
import { Language } from "@/enums/language";
import HalalResultScan from "@/components/HalalResultScanScreen/HalalResultScan";
import { checkHalalProductResponseInAr } from "@/mock/checkHalalProductResponse";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";

const HomeScreen = () => {
  // Hooks
  const router = useRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const { currentLanguage } = useSelectedLanguage();

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
      redirect_to_scan_result(bar_code);
    }
  };

  const redirect_to_scan_result = (bar_code: string) =>
    router.push(`${Screens.SCAN_RESULT_SCREEN}?bar_code=${bar_code}`);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await get_item(
        AsyncStorageKey.HAS_COMPLETED_ONBOARDING
      );
      if (hasCompletedOnboarding) {
        const convertToBool = Boolean(hasCompletedOnboarding);
        setHasCompletedOnboarding(convertToBool);
      }
    } catch (error) {
      console.log("checkOnboardingStatus get an error: ", error);
    }
  };

  useEffect(() => {
    router.push(Screens.REGISTER_SCREEN);
  }, []);

  if (hasCompletedOnboarding) {
    return <OnBoarding />;
  }

  return (
    <Scan
      scanned={scanned}
      handleBarcodeScanned={handleBarcodeScanned}
      redirectToScanResult={redirect_to_scan_result}
    />
  );
};

export default HomeScreen;

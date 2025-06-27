import { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { get_item } from "@/utils";
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
      router.push(
        `${Screens.PRODUCT_DETAILS_SCREEN}?bar_code=${bar_code}` as Href
      );
    }
  };

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

  const all_products = async () => await get_products();

  const redirectTo = () => router.push(Screens.REGISTER_SCREEN);
  const content = halal_prompt(openFoodResponseMockData, Language.DE);

  console.log("content: ", content);

  if (hasCompletedOnboarding) {
    return <OnBoarding />;
  }

  // return (
  //   <MainScreen scanned={scanned} handleBarcodeScanned={handleBarcodeScanned} />
  // );
  // return <HealthSetup />;
  return (
    <HalalResultScan
      imageUri={
        "https://images.openfoodfacts.org/images/products/611/103/100/5064/front_fr.9.200.jpg"
      }
      halaScanResult={checkHalalProductResponseInAr}
      currentLanguage={currentLanguage}
    />
  );
  // return <Scan scanned={false} handleBarcodeScanned={handleBarcodeScanned} />;
  // return <Button title="login" onPress={redirectTo} />;
};

export default HomeScreen;

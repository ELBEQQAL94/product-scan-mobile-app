import { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { get_item } from "@/utils";
import Scan from "@/components/ScanScreen/Scan";
import { get_nutri_score, get_score } from "@/services";
import { openFoodResponseMockData } from "@/mock/openFoodResponseData";
import { get_products } from "@/external-services/firebase";

const HomeScreen = () => {
  // Hooks
  const router = useRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);

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
      const hasCompletedOnboarding = await get_item("hasCompletedOnboarding");
      if (hasCompletedOnboarding) {
        const convertToBool = Boolean(hasCompletedOnboarding);
        setHasCompletedOnboarding(convertToBool);
      }
    } catch (error) {
      console.log("checkOnboardingStatus get an error: ", error);
    }
  };

  const all_products = async () => await get_products();

  useEffect(() => {
    console.log("fetch all products");
    all_products();
  }, []);

  if (hasCompletedOnboarding) {
    return <OnBoarding />;
  }

  // return (
  //   <MainScreen scanned={scanned} handleBarcodeScanned={handleBarcodeScanned} />
  // );
  // return <HealthSetup />;
  return <Scan scanned={false} handleBarcodeScanned={handleBarcodeScanned} />;
};

export default HomeScreen;

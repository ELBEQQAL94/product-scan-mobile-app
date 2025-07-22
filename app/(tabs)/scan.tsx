import { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { clear_items, get_all_cached_products, get_item } from "@/utils";
import Scan from "@/components/ScanScreen/Scan";
import { AsyncStorageKey } from "@/constants/keys";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import auth from "@react-native-firebase/auth";

const ScanScreen = () => {
  const currentUser = auth().currentUser;

  // Hooks
  const router = useRouter();

  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);

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

  const clearAllCache = async () => clear_items();
  const get_all_products = async () => get_all_cached_products();

  useEffect(() => {
    console.log("clear ceche ====");
    get_all_products();
    // clearAllCache();
  }, []);

  if (hasCompletedOnboarding) {
    return <OnBoarding />;
  }

  if (currentUser) {
    console.log("auth user =========: ", currentUser.displayName);
  }

  return (
    <>
      <Scan
        scanned={scanned}
        handleBarcodeScanned={handleBarcodeScanned}
        redirectToScanResult={redirect_to_scan_result}
        isArabic={is_arabic()}
        redirectTo={redirect_to}
      />
    </>
  );
};

export default ScanScreen;

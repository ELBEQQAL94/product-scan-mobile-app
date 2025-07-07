import { useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { get_item } from "@/utils";
import Scan from "@/components/ScanScreen/Scan";
import { AsyncStorageKey } from "@/constants/keys";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/external-services/firebase";

const ScanScreen = () => {
  // Hooks
  const router = useRouter();
  const [user] = useAuthState(auth);

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

  if (hasCompletedOnboarding) {
    return <OnBoarding />;
  }

  if (user) {
    console.log("auth user: ", user.displayName);
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

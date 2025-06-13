import { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import OnBoarding from "@/components/HomeScreen/OnBoarding";
import { get_item } from "@/utils";
import { View, Text } from "react-native";
import HealthSetup from "../health-setup";
import ScanResultScreen from "@/components/ScanResultScreen/ScanResultScreen";
import * as Location from "expo-location";
import Scan from "@/components/ScanScreen/Scan";

const HomeScreen = () => {
  // Hooks
  const router = useRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

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

  useEffect(() => {
    checkOnboardingStatus();
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

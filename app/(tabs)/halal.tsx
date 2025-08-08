import Scan from "@/components/ScanScreen/Scan";
import { Screens } from "@/constants/screens";
import { useAuth } from "@/hooks/useAuth";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { FC, useState } from "react";

const HalalScreen: FC = () => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();

  // States
  const [scanned, setScanned] = useState<boolean>(false);

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
      router.push(`${Screens.SCAN_RESULT_SCREEN}?bar_code=${bar_code}`);
    }
  };

  const redirect_to_scan_result = (bar_code: string) =>
    router.push(
      `${Screens.SCAN_RESULT_SCREEN}?bar_code=${bar_code}&user_id=${user?.uid}`
    );

  return (
    <Scan
      scanned={scanned}
      handleBarcodeScanned={handleBarcodeScanned}
      redirectToScanResult={redirect_to_scan_result}
    />
  );
};

export default HalalScreen;

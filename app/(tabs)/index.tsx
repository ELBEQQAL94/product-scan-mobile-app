import { useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import Scan from "@/components/ScanScreen/Scan";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

const ScanScreen = () => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();

  // States
  const [scanned, setScanned] = useState<boolean>(false);

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
      redirect_to_scan_result(bar_code);
    }
  };

  const redirect_to_scan_result = (bar_code: string) =>
    router.push(
      `${Screens.SCAN_RESULT_SCREEN}?bar_code=${bar_code}&user_id=${user?.uid}`
    );

  return (
    <ProtectedRoute>
      <Scan
        scanned={scanned}
        handleBarcodeScanned={handleBarcodeScanned}
        redirectToScanResult={redirect_to_scan_result}
      />
    </ProtectedRoute>
  );
};

export default ScanScreen;

import Scan from "@/components/ScanScreen/Scan";
import { Screens } from "@/constants/screens";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { FC, useState } from "react";

const HalalScreen: FC = () => {
  // Hooks
  const router = useRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
      router.push(`${Screens.SCAN_RESULT_SCREEN}?bar_code=${bar_code}`);
    }
  };

  return (
    <Scan
      scanned={scanned}
      handleBarcodeScanned={handleBarcodeScanned}
      isArabic={false}
      redirectTo={function (screen: string): void {
        throw new Error("Function not implemented.");
      }}
      redirectToScanResult={function (bar_code: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default HalalScreen;

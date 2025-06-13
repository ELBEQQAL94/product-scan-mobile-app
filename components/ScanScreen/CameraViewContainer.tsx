import { FC } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { LanguageKey } from "@/constants/keys";

interface CameraViewContainerProps {
  handleBarcodeScanned: (result: BarcodeScanningResult) => Promise<void>;
  isManualMode: boolean;
  scanned: boolean;
}

export const CAMERA_VIEW_CONTAINER_TEST_ID = "CAMERA_VIEW_CONTAINER_TEST_ID";

const CameraViewContainer: FC<CameraViewContainerProps> = ({
  handleBarcodeScanned,
  isManualMode,
  scanned,
}) => {
  return (
    <View
      style={[styles.camera_container, isManualMode && styles.hidden]}
      testID={CAMERA_VIEW_CONTAINER_TEST_ID}
    >
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "ean13",
            "ean8",
            "code39",
            "code128",
            "itf14",
            "datamatrix",
            "aztec",
          ],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scan_window_container}>
            <View style={styles.corner_tl} />
            <View style={styles.corner_tr} />
            <View style={styles.corner_bl} />
            <View style={styles.corner_br} />
          </View>

          {/* Instruction Text */}
          <Text style={styles.instruction_text}>
            {i18n.t(LanguageKey.POSITION_BARCODE_IN_FRAME)}
          </Text>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  camera_container: {
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scan_window_container: {
    width: 250,
    height: 250,
    backgroundColor: "transparent",
    position: "relative",
  },
  corner_tl: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: Colors.LIGHT_GREEN,
    borderTopLeftRadius: 10,
  },
  corner_tr: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: Colors.LIGHT_GREEN,
    borderTopRightRadius: 10,
  },
  corner_bl: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: Colors.LIGHT_GREEN,
    borderBottomLeftRadius: 10,
  },
  corner_br: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: Colors.LIGHT_GREEN,
    borderBottomRightRadius: 10,
  },
  instruction_text: {
    color: Colors.WHITE,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: Colors.SEMI_TRANSPARENT_BLACK,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Typography.bodyMedium,
  },
});

export default CameraViewContainer;

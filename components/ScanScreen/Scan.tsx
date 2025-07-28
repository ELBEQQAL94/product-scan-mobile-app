import { i18n } from "@/i18n";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import CameraViewContainer from "./CameraViewContainer";
import ManualEntryView from "./ManualEntryView";
import { Colors } from "@/themes/colors";
import BottomControls from "./BottomControls";
import { LanguageKey } from "@/constants/keys";

interface ScanProps {
  scanned: boolean;
  isArabic: boolean;
  isAuth?: boolean;
  redirectTo: (screen: string) => void;
  handleBarcodeScanned: (result: BarcodeScanningResult) => Promise<void>;
  redirectToScanResult: (bar_code: string) => void;
}

const Scan: React.FC<ScanProps> = ({
  scanned,
  isArabic,
  isAuth,
  redirectTo,
  handleBarcodeScanned,
  redirectToScanResult,
}) => {
  // Hooks
  const [permission, requestPermission] = useCameraPermissions();
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [manualBarcode, setManualBarcode] = useState<string>("");

  // Animation
  const slideAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isManualMode ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isManualMode) {
      // Focus input when switching to manual mode
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isManualMode]);

  const handleManualSubmit = async () => {
    if (manualBarcode.length < 8) {
      Alert.alert(
        i18n.t(LanguageKey.INVALID_BARCODE),
        i18n.t(LanguageKey.BARCODE_TOO_SHORT)
      );
      return;
    }

    try {
      redirectToScanResult(manualBarcode);
      setManualBarcode("");
    } catch (error) {
      console.error("Manual barcode processing error:", error);
    }
  };

  const toggleMode = () => {
    setIsManualMode(!isManualMode);
    setManualBarcode("");
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>{i18n.t(LanguageKey.REQUEST_CAMERA_PERMISSION)}</Text>
      </View>
    );
  }

  if (!permission.granted) {
    Alert.alert(
      i18n.t(LanguageKey.CAMERA_PERMISSION_REQUIRED),
      i18n.t(LanguageKey.NEED_CAMERA_PERMISSION),
      [
        {
          text: i18n.t(LanguageKey.CANCEL),
          style: "cancel",
        },
        {
          text: i18n.t(LanguageKey.GRANT_PERMISSION),
          onPress: requestPermission,
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CameraViewContainer
        handleBarcodeScanned={handleBarcodeScanned}
        isManualMode={isManualMode}
        scanned={scanned}
      />

      <ManualEntryView
        slideAnim={slideAnim}
        isManualMode={isManualMode}
        inputRef={inputRef}
        manualBarcode={manualBarcode}
        setManualBarcode={setManualBarcode}
        handleManualSubmit={handleManualSubmit}
      />

      {/* Bottom Controls */}
      <BottomControls isManualMode={isManualMode} toggleMode={toggleMode} />
    </KeyboardAvoidingView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BLACK,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  barcodeInput: {
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    textAlign: "center",
    backgroundColor: "white",
  },
  characterCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  bottomControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
  },
  modeToggleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  tipText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
});

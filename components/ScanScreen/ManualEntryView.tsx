import { FC } from "react";
import { i18n } from "@/i18n";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CameraViewContainer from "./CameraViewContainer";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { LanguageKey } from "@/constants/keys";

interface ManualEntryViewProps {
  slideAnim: Animated.Value;
  isManualMode: boolean;
  inputRef?: React.RefObject<TextInput>;
  manualBarcode: string;
  setManualBarcode: (text: string) => void;
  handleManualSubmit: () => void;
}

export const MANUAL_ENTRY_VIEW_CONTAINER_TEST_ID =
  "MANUAL_ENTRY_VIEW_CONTAINER_TEST_ID";

const ManualEntryView: FC<ManualEntryViewProps> = ({
  slideAnim,
  isManualMode,
  inputRef,
  manualBarcode,
  setManualBarcode,
  handleManualSubmit,
}) => {
  return (
    <Animated.View
      style={[
        styles.manual_container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 0], // Slide up from bottom
              }),
            },
          ],
          opacity: slideAnim,
        },
      ]}
      pointerEvents={isManualMode ? "auto" : "none"}
      testID={MANUAL_ENTRY_VIEW_CONTAINER_TEST_ID}
    >
      <View style={styles.manual_content}>
        <View style={styles.manual_header}>
          <Ionicons
            name="keypad-outline"
            size={48}
            color={Colors.GLOVO_GREEN}
          />
          <Text style={styles.manual_title}>
            {i18n.t(LanguageKey.ENTER_BARCODE_MANUALLY)}
          </Text>
          <Text style={styles.manual_subtitle}>
            {i18n.t(LanguageKey.TYPE_BARCODE_NUMBERS)}
          </Text>
        </View>

        <View style={styles.input_container}>
          <TextInput
            ref={inputRef}
            style={styles.barcode_input}
            value={manualBarcode}
            onChangeText={(text) => setManualBarcode(text.replace(/\D/g, ""))}
            placeholder={i18n.t(LanguageKey.BARCODE_PLACEHOLDER)}
            placeholderTextColor={Colors.MEDIUM_GRAY}
            keyboardType="numeric"
            maxLength={13}
            autoFocus={false}
            returnKeyType="done"
            onSubmitEditing={handleManualSubmit}
          />
          <Text style={styles.character_count}>
            {manualBarcode.length}/13 {i18n.t(LanguageKey.DIGITS)}
          </Text>
        </View>

        {/* <TouchableOpacity
          style={[
            styles.submit_button,
            manualBarcode.length < 8 && styles.submit_button_disabled,
          ]}
          onPress={handleManualSubmit}
          disabled={manualBarcode.length < 8}
        >
          <Text
            style={[
              styles.submit_button_text,
              manualBarcode.length < 8 && styles.submit_button_text_disabled,
            ]}
          >
            {i18n.t(LanguageKey.SCAN_PRODUCT)}
          </Text>
        </TouchableOpacity> */}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  manual_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.VERY_LIGHT_GRAY,
    justifyContent: "center",
    alignItems: "center",
  },
  manual_content: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  manual_header: {
    alignItems: "center",
    marginBottom: 40,
  },
  manual_title: {
    fontWeight: "600",
    color: Colors.CHARCOAL,
    marginTop: 16,
    textAlign: "center",
    ...Typography.bodyMedium,
  },
  manual_subtitle: {
    color: Colors.DARK_GRAY,
    marginTop: 8,
    textAlign: "center",
    ...Typography.bodySmall,
  },
  input_container: {
    width: "100%",
    marginBottom: 30,
  },
  barcode_input: {
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: Colors.GLOVO_GREEN,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    textAlign: "center",
    backgroundColor: "white",
  },
  character_count: {
    fontSize: 12,
    color: Colors.DARK_GRAY,
    textAlign: "center",
    marginTop: 8,
  },
  submit_button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  submit_button_disabled: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  submit_button_text: {
    color: Colors.WHITE,
    fontWeight: "600",
    ...Typography.bodyLarge,
  },
  submit_button_text_disabled: {
    color: Colors.MEDIUM_GRAY,
  },
});

export default ManualEntryView;

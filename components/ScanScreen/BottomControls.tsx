import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Typography } from "@/themes/typography";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface BottomControlsProps {
  isManualMode: boolean;
  toggleMode: () => void;
}

export const BOTTOM_CONTROLS_TEST_ID = "BOTTOM_CONTROLS_TEST_ID";

const BottomControls: FC<BottomControlsProps> = ({
  isManualMode,
  toggleMode,
}) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View style={styles.bottom_controls} testID={BOTTOM_CONTROLS_TEST_ID}>
      <TouchableOpacity style={styles.mode_toggle} onPress={toggleMode}>
        <Ionicons
          name={isManualMode ? "camera-outline" : "keypad-outline"}
          size={20}
          color="white"
        />
        <Text style={styles.mode_toggle_text}>
          {isManualMode ? t(LanguageKey.CAMERA) : t(LanguageKey.MANUAL)}
        </Text>
      </TouchableOpacity>

      {/* Tip Text */}
      <Text style={styles.tip_text}>
        {isManualMode
          ? t(LanguageKey.FIND_NUMBERS_BELOW_BARCODE)
          : t(LanguageKey.TAP_MANUAL_TO_TYPE_BARCODE)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom_controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  mode_toggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
  },
  mode_toggle_text: {
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
    ...Typography.bodyMedium,
  },
  tip_text: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    ...Typography.bodyMedium,
  },
});

export default BottomControls;

import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ActionButtonProps {
  containerStyles?: Record<string, string | number>;
  buttonStyles?: Record<string, string>;
  icon?: string;
  label: string;
  onPress: () => void;
  disabled?: boolean; // Add disabled state for better UX
}

const TEST_ID = "action-button";

const ActionButton: FC<ActionButtonProps> = ({
  label,
  containerStyles,
  buttonStyles,
  icon,
  onPress,
  disabled = false,
}) => {
  return (
    <View
      style={[styles.container, { ...containerStyles }]}
      testID={`${TEST_ID}-container`}
    >
      <TouchableOpacity
        style={[
          styles.button_container,
          { ...buttonStyles },
          disabled && styles.disabled_button,
        ]}
        onPress={onPress}
        disabled={disabled}
        testID={`${TEST_ID}-touchable`}
        accessibilityRole="button"
        accessibilityLabel={`${label} ${icon || ""}`.trim()}
        accessibilityState={{ disabled }}
      >
        <Text
          style={[styles.button_text, disabled && styles.disabled_text]}
          testID={`${TEST_ID}-text`}
        >
          {i18n.t(label)} {icon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: "100%",
    padding: 16,
    paddingTop: 10,
  },
  button_container: {
    backgroundColor: Colors.LIGHT_GREEN,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button_text: {
    color: Colors.WHITE,
    textAlign: "center",
    ...Typography.button,
  },
  disabled_button: {
    backgroundColor: Colors.GRAY,
    opacity: 0.6,
  },
  disabled_text: {
    opacity: 0.7,
  },
});

export default ActionButton;

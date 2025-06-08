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
  testID?: string; // Add testID for testing
  disabled?: boolean; // Add disabled state for better UX
}

const ActionButton: FC<ActionButtonProps> = ({
  label,
  containerStyles,
  buttonStyles,
  icon,
  onPress,
  testID = "action-button",
  disabled = false,
}) => {
  return (
    <View
      style={[styles.container, { ...containerStyles }]}
      testID={`${testID}-container`}
    >
      <TouchableOpacity
        style={[
          styles.button_container,
          { ...buttonStyles },
          disabled && styles.disabled_button,
        ]}
        onPress={onPress}
        disabled={disabled}
        testID={`${testID}-touchable`}
        accessibilityRole="button"
        accessibilityLabel={`${label} ${icon || ""}`.trim()}
        accessibilityState={{ disabled }}
      >
        <Text
          style={[styles.button_text, disabled && styles.disabled_text]}
          testID={`${testID}-text`}
        >
          {label} {icon}
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

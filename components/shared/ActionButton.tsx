import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { ComponentType, FC } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

interface IconProps {
  style?: TextStyle | ViewStyle;
  size?: number;
  color?: string;
  name?: string;
  // Remove testID from IconProps since most icon libraries don't support it
}

interface ActionButtonProps {
  containerStyles?: ViewStyle; // Fixed: Use ViewStyle instead of Record
  buttonStyles?: ViewStyle; // Fixed: Use ViewStyle instead of Record
  icon?: ComponentType<IconProps>;
  iconProps?: Partial<IconProps>;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const TEST_ID = "action-button";

const ActionButton: FC<ActionButtonProps> = ({
  label,
  containerStyles,
  buttonStyles,
  icon: Icon,
  iconProps,
  onPress,
  disabled = false,
}) => {
  const defaultIconProps: IconProps = {
    style: styles.icon,
    color: disabled ? Colors.GRAY : Colors.WHITE,
    size: 20,
    ...iconProps,
  };

  return (
    <View
      style={[styles.container, containerStyles]} // Fixed: Removed spread operator
      testID={`${TEST_ID}-container`}
    >
      <TouchableOpacity
        style={[
          styles.button_container,
          buttonStyles, // Fixed: Removed spread operator
          disabled && styles.disabled_button,
        ]}
        onPress={onPress}
        disabled={disabled}
        testID={`${TEST_ID}-touchable`}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text
          style={[styles.button_text, disabled && styles.disabled_text]}
          testID={`${TEST_ID}-text`}
        >
          {i18n.t(label)}
        </Text>
        {Icon && <Icon {...defaultIconProps} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 30,
  },
  button_container: {
    backgroundColor: Colors.LIGHT_GREEN,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button_text: {
    color: Colors.WHITE,
    textAlign: "center",
    ...Typography.h3,
  },
  disabled_button: {
    backgroundColor: Colors.GRAY,
    opacity: 0.6,
  },
  disabled_text: {
    opacity: 0.7,
  },
  icon: {
    color: Colors.WHITE,
    marginLeft: 10,
    ...Typography.label,
  },
});

export default ActionButton;

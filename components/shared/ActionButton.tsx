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
  ActivityIndicator,
} from "react-native";

interface IconProps {
  style?: TextStyle | ViewStyle;
  size?: number;
  color?: string;
  name?: string;
}

interface ActionButtonProps {
  containerStyles?: ViewStyle;
  buttonStyles?: ViewStyle;
  buttonTextStyles?: TextStyle;
  iconStyles?: TextStyle;
  icon?: ComponentType<IconProps>;
  iconProps?: Partial<IconProps>;
  label: string;
  disabled?: boolean;
  isArabic: boolean;
  loading?: boolean;
  spinnerIconColor?: string;
  onPress: () => void;
}

const TEST_ID = "action-button";

const ActionButton: FC<ActionButtonProps> = ({
  label,
  containerStyles,
  buttonStyles,
  buttonTextStyles,
  iconStyles,
  icon: Icon,
  iconProps,
  isArabic,
  loading,
  spinnerIconColor,
  disabled = false,
  onPress,
}) => {
  const defaultIconProps: IconProps = {
    style: { ...styles.icon, ...iconStyles },
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
          buttonStyles,
          disabled && styles.disabled_button,
          { flexDirection: isArabic ? "row-reverse" : "row" },
        ]}
        onPress={onPress}
        disabled={disabled}
        testID={`${TEST_ID}-touchable`}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text
          style={[
            styles.button_text,
            buttonTextStyles,
            disabled && styles.disabled_text,
            { marginLeft: isArabic ? 10 : 0 },
          ]}
          testID={`${TEST_ID}-text`}
        >
          {i18n.t(label)}
        </Text>
        {Icon && <Icon {...defaultIconProps} color={Colors.BLUE_GRAY} />}
        {loading && (
          <ActivityIndicator color={spinnerIconColor ?? Colors.WHITE} />
        )}
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
  },
  disabled_text: {
    color: Colors.BLACK,
  },
  icon: {
    color: Colors.WHITE,
    marginLeft: 10,
    ...Typography.label,
  },
});

export default ActionButton;

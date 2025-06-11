import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-reanimated";
import { Colors } from "@/themes/colors";
import { View, StyleSheet } from "react-native";
import { FC } from "react";

interface CustomScanTabButtonProps {
  focused: boolean;
}

export const CustomScanTabButton_TEST_ID = "CustomScanTabButton";
export const Icon_CustomScanTabButton_TEST_ID = "Icon_CustomScanTabButton";

const CustomScanTabButton: FC<CustomScanTabButtonProps> = ({ focused }) => {
  return (
    <View
      style={[
        styles.scan_tab_button,
        { backgroundColor: focused ? Colors.GLOVO_GREEN : Colors.GLOVO_GREEN },
      ]}
      testID={CustomScanTabButton_TEST_ID}
    >
      <MaterialCommunityIcons
        name="barcode-scan"
        size={28}
        color="white"
        testId={Icon_CustomScanTabButton_TEST_ID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scan_tab_button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default CustomScanTabButton;

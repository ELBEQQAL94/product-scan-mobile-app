import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface CheckMarkProps {
  isSelected: boolean;
  checkmarkScale: Animated.Value;
}

const TEST_ID = "checkmark";

const CheckMark: FC<CheckMarkProps> = ({ isSelected, checkmarkScale }) => {
  return (
    <Animated.View
      style={[
        styles.checkmark,
        {
          opacity: isSelected ? 1 : 0,
          transform: [{ scale: checkmarkScale }],
        },
      ]}
      testID={`${TEST_ID}-container`}
      accessibilityRole="image"
      accessibilityLabel={isSelected ? "Selected" : "Not selected"}
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        style={styles.checkmark_text}
        testID={`${TEST_ID}-text`}
        accessibilityLabel="Checkmark"
      >
        ✓
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: Colors.YELLOW,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmark_text: {
    color: Colors.LIGHT_GREEN,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CheckMark;

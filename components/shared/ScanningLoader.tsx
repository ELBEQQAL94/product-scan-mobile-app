import { LanguageKey } from "@/constants/keys";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import React, { FC, useEffect, useRef } from "react";
import { View, Animated, Text, StyleSheet, Dimensions } from "react-native";

interface ScanningLoaderProps {
  isVisible: boolean;
}

export const SCANNING_LOADER_TEST_ID = "SCANNING_LOADER_TEST_ID";

// Scanning line animation - mimics barcode scanner
const ScanningLoader: FC<ScanningLoaderProps> = ({ isVisible = true }) => {
  const scanLine = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Move Dimensions.get() inside the component to avoid module-level execution
  const screenWidth = Dimensions.get("window").width;

  // Define frame height as a constant so we can use it in both styles and animation
  const FRAME_HEIGHT = 200;

  useEffect(() => {
    if (isVisible) {
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Scanning animation
      const scan = () => {
        Animated.sequence([
          Animated.timing(scanLine, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLine, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => scan());
      };
      scan();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, scanLine, opacity]);

  // Fix: Adjust the translateY range to match the actual frame height
  const translateY = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_HEIGHT - 2], // Start at top (0) and end at bottom (height - line thickness)
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.scan_container, { opacity }]}
      testID={SCANNING_LOADER_TEST_ID}
    >
      <View
        style={[
          styles.scan_frame,
          { height: FRAME_HEIGHT, width: screenWidth * 0.7 },
        ]}
      >
        {/* Corner brackets */}
        <View style={[styles.corner, styles.top_left]} />
        <View style={[styles.corner, styles.top_right]} />
        <View style={[styles.corner, styles.bottom_left]} />
        <View style={[styles.corner, styles.bottom_right]} />

        {/* Scanning line */}
        <Animated.View
          style={[styles.scan_line, { transform: [{ translateY }] }]}
        />
      </View>
      <Text style={styles.scan_text}>
        {i18n.t(LanguageKey.SCANNING_PRODUCT)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scan_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BLACK,
  },
  scan_frame: {
    // width will be set inline using screenWidth
    height: 200, // This will be overridden by the inline style
    position: "relative",
    borderColor: "transparent",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: Colors.LIGHT_GREEN,
    borderWidth: 3,
  },
  top_left: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  top_right: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottom_left: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottom_right: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scan_line: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.GLOVO_GREEN,
    shadowColor: Colors.GLOVO_GREEN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  scan_text: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 30,
    textAlign: "center",
  },
  barcode: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 30,
  },
  bar: {
    backgroundColor: Colors.BRIGHT_BLUE,
    height: 25,
    marginHorizontal: 1,
  },
});

export default ScanningLoader;

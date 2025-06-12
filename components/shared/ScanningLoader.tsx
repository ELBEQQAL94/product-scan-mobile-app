import { LanguageKey } from "@/constants/keys";
import { i18n } from "@/i18n";
import React, { useEffect, useRef } from "react";
import { View, Animated, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Scanning line animation - mimics barcode scanner
const ScanningLoader = ({ isVisible = true }) => {
  const scanLine = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

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

  const translateY = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.scan_container, { opacity }]}>
      <View style={styles.scan_frame}>
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
  },
  scan_frame: {
    width: width * 0.7,
    height: 200,
    position: "relative",
    borderColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#00FF00",
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
    backgroundColor: "#FF0000",
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  scan_text: {
    color: "#FFFFFF",
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
    backgroundColor: "#007AFF",
    height: 25,
    marginHorizontal: 1,
  },
});

export default ScanningLoader;

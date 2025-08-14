// Typography.ts - Create a typography system
import { Platform } from "react-native";

// Font family definitions
export const FontFamily = {
  // Primary font (choose one)
  regular: Platform.select({
    ios: "Inter-Regular",
    android: "Inter-Regular",
    default: "System",
  }),
  medium: Platform.select({
    ios: "Inter-Medium",
    android: "Inter-Medium",
    default: "System",
  }),
  semiBold: Platform.select({
    ios: "Inter-SemiBold",
    android: "Inter-SemiBold",
    default: "System",
  }),
  bold: Platform.select({
    ios: "Inter-Bold",
    android: "Inter-Bold",
    default: "System",
  }),
};

// Typography scale
export const Typography = {
  // Headers
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    lineHeight: 26,
  },

  // Body text
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },

  // UI Elements
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
  },

  // Cards
  cardTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
  },
  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
};

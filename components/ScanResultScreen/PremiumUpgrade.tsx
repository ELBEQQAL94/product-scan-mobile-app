import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import ActionButton from "../shared/ActionButton";
import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";

interface PremiumUpgradeProps {
  isArabic: boolean;
  isProfileHealthCreated?: boolean;
  redirectTo: (screen: string) => void;
}

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({
  isArabic,
  isProfileHealthCreated,
  redirectTo,
}) => {
  if (isProfileHealthCreated) return null;
  return (
    <View style={styles.container}>
      <ActionButton
        label={LanguageKey.GET_PERSONAL_ANALYSIS}
        onPress={() => redirectTo(Screens.HEALTH_SETUP_SCREEN)}
        iconProps={{
          name: "arrow-forward",
          size: 20,
          color: Colors.WHITE,
        }}
        containerStyles={styles.buttonContainer}
        isArabic={isArabic}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  buttonContainer: {
    padding: 0, // Remove padding from ActionButton
    marginBottom: 12,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
    marginTop: 2, // Align with text baseline
  },
  upgradeText: {
    flex: 1,
    color: Colors.MEDIUM_GRAY,
    ...Typography.bodyMedium, // Use your typography system
    lineHeight: 20,
  },
});

export default PremiumUpgrade;

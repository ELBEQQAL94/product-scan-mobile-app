import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";

interface HealthSetupLabelProps {
  name: string;
  icon: string;
  iconBounceAnim: Animated.Value;
}

const TEST_ID = "health-setup-label";

const HealthSetupLabel: FC<HealthSetupLabelProps> = ({
  name,
  icon,
  iconBounceAnim,
}) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <Animated.View style={styles.container} testID={`${TEST_ID}-container`}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <Animated.Text
          style={[styles.icon, { transform: [{ scale: iconBounceAnim }] }]}
          testID={`${TEST_ID}-icon`}
        >
          {icon}
        </Animated.Text>
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <Text style={styles.label} testID={`${TEST_ID}-text`}>
          {t(name)}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.WHITE,
    fontSize: 15,
    textAlign: "center",
  },
  icon: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default HealthSetupLabel;

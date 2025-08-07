import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Animated, Text, StyleSheet } from "react-native";

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
    <Animated.View testID={`${TEST_ID}-container`}>
      <Animated.Text
        style={[styles.icon, { transform: [{ scale: iconBounceAnim }] }]}
        testID={`${TEST_ID}-icon`}
      >
        {icon}
      </Animated.Text>
      <Text style={[styles.label]} testID={`${TEST_ID}-text`}>
        {t(name)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 15,
  },
  icon: {
    textAlign: "center",
    fontSize: 30,
  },
});

export default HealthSetupLabel;

import { FC, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { i18n } from "@/i18n";
import { Disease } from "@/types/health-setup";
import { Colors } from "@/themes/colors";
import HealthSetupLabel from "./HealthSetupLabel";
import CheckMark from "./CheckMark";

interface HealthSetupCardProps {
  item: Disease;
  onPress: (id: string) => void;
}

const TEST_ID = "health-setup-card";

const HealthSetupCard: FC<HealthSetupCardProps> = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconBounceAnim = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  const handle_animations = () => {
    Animated.parallel([
      Animated.sequence([
        ...process_icon_bounce_animation(),
        process_glow_effect_animation(),
        process_check_mark_animation(),
      ]),
    ]).start();
  };

  const reset_animations = () => {
    Animated.parallel([
      reset_glow_effect_animation(),
      reset_check_mark_animation(),
    ]).start();
  };

  const process_icon_bounce_animation = (): Animated.CompositeAnimation[] => {
    return [
      Animated.timing(iconBounceAnim, {
        toValue: 4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(iconBounceAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
    ];
  };

  const process_glow_effect_animation = (): Animated.CompositeAnimation => {
    return Animated.timing(glowOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
  };

  const reset_glow_effect_animation = (): Animated.CompositeAnimation => {
    return Animated.timing(glowOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
  };

  const process_check_mark_animation = (): Animated.CompositeAnimation => {
    return Animated.spring(checkmarkScale, {
      toValue: 1,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    });
  };

  const reset_check_mark_animation = (): Animated.CompositeAnimation => {
    return Animated.timing(checkmarkScale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    });
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // Quick pulse animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(item.id);
  };

  useEffect(() => {
    if (item.isSelected) {
      handle_animations();
    } else {
      reset_animations();
    }
  }, [item.isSelected]);

  return (
    <TouchableOpacity
      style={[
        styles.card_container,
        {
          backgroundColor: item.isSelected
            ? Colors.GLOVO_GREEN
            : Colors.LIGHT_GREEN,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID={`${TEST_ID}-touchable`}
      accessibilityRole="button"
      accessibilityLabel={`Health condition: ${item.name}`}
      accessibilityState={{ selected: item.isSelected }}
    >
      <CheckMark isSelected={item.isSelected} checkmarkScale={checkmarkScale} />
      <HealthSetupLabel
        name={item.name}
        icon={item.icon}
        iconBounceAnim={iconBounceAnim}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card_container: {
    color: Colors.WHITE,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    position: "relative",
    elevation: 0, // Remove default Android shadow
    shadowOpacity: 0, // Remove default iOS shadow
    flexBasis: "30%",
    height: 120,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HealthSetupCard;

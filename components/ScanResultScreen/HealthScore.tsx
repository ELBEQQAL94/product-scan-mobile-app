import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FontAwesome } from "@expo/vector-icons";
import { FC, useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

interface HealthScoreProps {
  score: number;
}

const HealthScore: FC<HealthScoreProps> = ({ score }) => {
  // Hooks
  const { t } = useTranslation();

  const colorValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Determine how many circles to fill based on score
  const get_circles_to_fill = (): number => {
    if (score < 50) return 2; // Red: fill 2 circles
    if (score === 50) return 5; // Yellow: fill 4 circles
    return 8; // Green: fill all 6 circles
  };

  // Create sequential fill animation
  const create_sequential_fill_animation = () => {
    const animations = [];
    const circlesToFill = get_circles_to_fill();

    // Reset all circles to 0 first
    colorValues.forEach((value) => value.setValue(0));

    // Create staggered animations that fill up one by one
    for (let i = 0; i < circlesToFill; i++) {
      const animation = Animated.timing(colorValues[i], {
        toValue: 1,
        duration: 300,
        delay: i * 200, // Each circle starts 200ms after the previous one
        useNativeDriver: false, // Color animations need useNativeDriver: false
      });
      animations.push(animation);
    }

    return animations;
  };

  const process_color_by_score = (): string => {
    if (score === 0) return Colors.TRANSPARENT;
    if (score === 50) return Colors.ORANGE;
    if (score > 50) return Colors.LIGHT_GREEN;
    return Colors.RED;
  };

  const process_text_by_score = (): string => {
    if (score === 0) return t(LanguageKey.SCORE_NOT_AVAILABLE);
    if (score < 50) return t(LanguageKey.AVOID_THIS_PRODUCT);
    if (score === 50) return t(LanguageKey.NOT_RECOMMENDED);
    if (score >= 50) return t(LanguageKey.EXCELLENT_CHOICE);
    return t(LanguageKey.NOT_RECOMMENDED);
  };

  // Function to interpolate color based on animation value
  const get_interpolated_color = (colorValue: Animated.Value) => {
    return colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.TRANSPARENT, process_color_by_score()],
    });
  };

  useEffect(() => {
    const animations = create_sequential_fill_animation();

    // Start all animations together (they have built-in delays)
    Animated.parallel(animations).start();

    // Cleanup function
    return () => {
      animations.forEach((animation) => {
        if (animation && typeof animation.stop === "function") {
          animation.stop();
        }
      });
    };
  }, [score]); // Added score as dependency to re-animate when score changes

  return (
    <View>
      {score > 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {[...Array(8)].map((_, index: number) => (
              <Animated.View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: get_interpolated_color(colorValues[index]),
                  borderWidth: 1,
                  borderColor: Colors.BLACK,
                  marginRight: index < 7 ? 2 : 0,
                }}
              />
            ))}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                marginLeft: 10,
                color: process_color_by_score(),
                ...Typography.h2,
              }}
            >
              {score}
            </Text>
            <Text style={{ ...Typography.h2 }}>/ 100</Text>
          </View>
        </View>
      )}

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* Static large green circle */}
        <FontAwesome name="circle" size={24} color={process_color_by_score()} />
        <Text
          style={{
            flex: 1,
            marginLeft: 10,
            color: process_color_by_score(),
            ...Typography.h3,
          }}
        >
          {process_text_by_score()}
        </Text>
      </View>
    </View>
  );
};

export default HealthScore;

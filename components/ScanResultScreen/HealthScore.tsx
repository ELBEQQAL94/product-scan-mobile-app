import { LanguageKey } from "@/constants/keys";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { FC, useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

interface HealthScoreProps {
  score: number;
}

const HealthScore: FC<HealthScoreProps> = ({ score }) => {
  const colorValues = useRef([
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
    if (score === 50) return 4; // Yellow: fill 4 circles
    return 6; // Green: fill all 6 circles
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
    if (score === 50) return Colors.ORANGE;
    if (score > 50) return Colors.LIGHT_GREEN;
    return Colors.RED;
  };

  const process_text_by_score = (): string => {
    if (score === 50) return i18n.t(LanguageKey.AVOID_THIS_PRODUCT);
    if (score > 50) return i18n.t(LanguageKey.EXCELLENT_CHOICE);
    return i18n.t(LanguageKey.NOT_RECOMMENDED);
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
          {[...Array(6)].map((_, index: number) => (
            <Animated.View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: get_interpolated_color(colorValues[index]),
                borderWidth: 1,
                borderColor: Colors.BLACK,
                marginRight: index < 5 ? 2 : 0,
              }}
            />
          ))}

          {/* Static black circles */}
          <Entypo
            name="circle"
            size={10}
            color={Colors.BLACK}
            style={{
              marginLeft: 2,
              width: 10,
              height: 10,
              borderRadius: 5,
              marginRight: 2,
            }}
          />
          <Entypo name="circle" size={10} color={Colors.BLACK} />
        </View>
        <Text style={{ marginLeft: 10, ...Typography.h2 }}>{score}/100</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* Static large green circle */}
        <FontAwesome name="circle" size={24} color={process_color_by_score()} />
        <Text style={{ flex: 1, marginLeft: 10, ...Typography.h3 }}>
          {process_text_by_score()}
        </Text>
      </View>
    </View>
  );
};

export default HealthScore;

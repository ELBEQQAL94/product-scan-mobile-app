import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { FC, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const HealthScore: FC = () => {
  const colorValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Create sequential fill animation
  const create_sequential_fill_animation = () => {
    const animations = [];

    // Create staggered animations that fill up one by one
    for (let i = 0; i < 6; i++) {
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

  // Function to interpolate color based on animation value
  const get_interpolated_color = (colorValue: Animated.Value) => {
    return colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.WHITE, Colors.LIGHT_GREEN], // From black to green
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
  }, []);

  return (
    <View style={{ padding: 16 }}>
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
                marginRight: index < 5 ? 2 : 0,
              }}
            />
          ))}

          {/* Static black circles */}
          <Entypo
            name="circle"
            size={10}
            color={Colors.BLACK}
            style={{ marginLeft: 2 }}
          />
          <Entypo name="circle" size={10} color={Colors.BLACK} />
        </View>
        <Text style={{ marginLeft: 10, ...Typography.h2 }}>83/100</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* Static large green circle */}
        <FontAwesome name="circle" size={24} color={Colors.LIGHT_GREEN} />
        <Text style={{ marginLeft: 10, ...Typography.h3 }}>
          EXCELLENT CHOICE
        </Text>
      </View>
    </View>
  );
};

export default HealthScore;

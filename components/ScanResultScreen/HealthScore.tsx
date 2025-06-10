import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const HealthScore: FC = () => {
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
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <FontAwesome name="circle" size={10} color={Colors.LIGHT_GREEN} />
          <Entypo name="circle" size={10} color={Colors.BLACK} />
          <Entypo name="circle" size={10} color={Colors.BLACK} />
        </View>
        <Text style={{ marginLeft: 10, ...Typography.h2 }}>83/100</Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FontAwesome name="circle" size={24} color={Colors.LIGHT_GREEN} />
        <Text style={{ marginLeft: 10, ...Typography.h3 }}>
          EXCELLENT CHOICE
        </Text>
      </View>
    </View>
  );
};

export default HealthScore;

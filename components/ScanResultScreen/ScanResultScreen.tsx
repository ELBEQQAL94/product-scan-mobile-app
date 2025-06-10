import { FC } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import HealthScore from "./HealthScore";
import { Typography } from "@/themes/typography";

const ScanResultScreen: FC = () => {
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: "https://images.openfoodfacts.org/images/products/611/103/100/5064/front_fr.9.200.jpg",
          }}
          resizeMode="contain"
          width={150}
          height={150}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", ...Typography.h2 }}>
          Organic Greek Yogurt
        </Text>
      </View>
      <HealthScore />
    </ScrollView>
  );
};

export default ScanResultScreen;

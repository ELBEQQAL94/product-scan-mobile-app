import { FC, useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import HealthScore from "./HealthScore";
import { Typography } from "@/themes/typography";
import InstagramActions from "./InstagramActions";
import { Colors } from "@/themes/colors";
import * as Location from "expo-location";

const ScanResultScreen: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log("text: ", text);

  return (
    <View style={{ flex: 1 }}>
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
      <InstagramActions />
    </View>
  );
};

export default ScanResultScreen;

import { FC } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import HealthScore from "./HealthScore";
import { Typography } from "@/themes/typography";
import InstagramActions from "./InstagramActions";
import ActionButton from "../shared/ActionButton";
import { LanguageKey } from "@/constants/keys";

const ScanResultScreen: FC = () => {
  const suggest_better_products = () => {
    console.log("better options clicked");
  };

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
        <View style={{ margin: 25 }}>
          <ActionButton
            label={LanguageKey.SEE_BETTER_OPTIONS}
            onPress={suggest_better_products}
          />
        </View>
      </ScrollView>
      <InstagramActions />
    </View>
  );
};

export default ScanResultScreen;

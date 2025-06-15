import { FC } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import HealthScore from "./HealthScore";
import { Typography } from "@/themes/typography";
import InstagramActions from "./InstagramActions";
import ActionButton from "../shared/ActionButton";
import { LanguageKey } from "@/constants/keys";
import PersonalizedMessage from "./PersonalizedMessage";
import { Colors } from "@/themes/colors";
import {
  scanResultResponseDataMockEs,
  scanResultResponseWithProfileHealthSetupDataMock,
} from "@/mock/scanResultResponseData";

const ScanResultScreen: FC = () => {
  const suggest_better_products = () => {
    console.log("better options clicked");
  };

  const add_to_compare = () => console.log("add to compare");
  return (
    <View style={{ flex: 1, padding: 16 }}>
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
        <HealthScore
          score={scanResultResponseWithProfileHealthSetupDataMock.score}
        />
        <PersonalizedMessage
          recommendations={
            scanResultResponseWithProfileHealthSetupDataMock.recommendations
          }
        />
        <View style={{ margin: 25 }}>
          <ActionButton
            label={LanguageKey.SEE_BETTER_OPTIONS}
            onPress={suggest_better_products}
          />
          <ActionButton
            label={LanguageKey.ADD_TO_COMPARE}
            onPress={add_to_compare}
            buttonStyles={{ backgroundColor: Colors.GLOVO_GREEN }}
          />
        </View>
      </ScrollView>
      <InstagramActions />
    </View>
  );
};

export default ScanResultScreen;

import { FC } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
import { openFoodResponseMockData } from "@/mock/openFoodResponseData";
import PremiumUpgrade from "./PremiumUpgrade";
import ProductImage from "../shared/ProductImage";

const ScanResultScreen: FC = () => {
  // Mock not subscriber user
  const isSubcriber = false;

  const suggest_better_products = () => {
    console.log("better options clicked");
  };

  const add_to_compare = () => console.log("add to compare");
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <ProductImage imageUri="https://images.openfoodfacts.org/images/products/611/103/100/5064/front_fr.9.200.jpg" />
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
          score={
            isSubcriber
              ? scanResultResponseWithProfileHealthSetupDataMock.score
              : openFoodResponseMockData.product.nutriscore_score
          }
        />
        <PremiumUpgrade
          onUpgradePress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <PersonalizedMessage
          isSubcriber={isSubcriber}
          recommendations={
            scanResultResponseWithProfileHealthSetupDataMock.recommendations
          }
        />
        {/* <View style={{ margin: 25 }}>
          <ActionButton
            label={LanguageKey.SEE_BETTER_OPTIONS}
            onPress={suggest_better_products}
          />
          <ActionButton
            label={LanguageKey.ADD_TO_COMPARE}
            onPress={add_to_compare}
            buttonStyles={{ backgroundColor: Colors.GLOVO_GREEN }}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  upgradeHintContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#00C896", // Your brand color
  },
  upgradeContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  upgradeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00C896",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  upgradeArrow: {
    color: "white",
    fontSize: 16,
  },
});

export default ScanResultScreen;

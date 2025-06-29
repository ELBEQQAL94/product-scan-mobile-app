import { FC } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import HealthScore from "./HealthScore";
import PersonalizedMessage from "./PersonalizedMessage";
import { scanResultResponseWithProfileHealthSetupDataMock } from "@/mock/scanResultResponseData";
import PremiumUpgrade from "./PremiumUpgrade";
import ProductImage from "../shared/ProductImage";
import ProductName from "./ProductName";
import { ProductScanResult } from "@/constants/responses";

interface ScanResultProps {
  data: ProductScanResult;
}

const ScanResult: FC<ScanResultProps> = ({ data }) => {
  // Mock not subscriber user
  const isSubcriber = true;

  const suggest_better_products = () => {
    console.log("better options clicked");
  };

  const add_to_compare = () => console.log("add to compare");
  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductImage imageUri={data.image_url} />
        <ProductName name={data.product_name} />
        <HealthScore score={data.score} />
        <PremiumUpgrade onUpgradePress={() => console.log("PremiumUpgrade")} />
        <PersonalizedMessage
          isSubcriber={isSubcriber}
          recommendations={data.recommendations}
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
  container: { flex: 1, padding: 16 },
});

export default ScanResult;

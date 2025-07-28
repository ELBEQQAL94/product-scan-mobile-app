import { FC } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import HealthScore from "./HealthScore";
import PersonalizedMessage from "./PersonalizedMessage";
import PremiumUpgrade from "./PremiumUpgrade";
import ProductImage from "../shared/ProductImage";
import ProductName from "./ProductName";
import { ProductScanResult } from "@/constants/responses";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { Screens } from "@/constants/screens";

interface ScanResultProps {
  isArabic: boolean;
  redirectTo: (screen: string) => void;
  data: ProductScanResult;
}

const ScanResult: FC<ScanResultProps> = ({ data, isArabic, redirectTo }) => {
  // Mock not subscriber user

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductImage imageUri={data.image_url} />
        <ProductName name={data.product_name} />
        <HealthScore score={data.score} />
        <PremiumUpgrade onUpgradePress={() => console.log("PremiumUpgrade")} />
        <PersonalizedMessage recommendations={data.recommendations} />
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
      <TouchableOpacity
        onPress={() => redirectTo(Screens.HOME_SCREEN)}
        style={styles.fab}
      >
        <MaterialCommunityIcons
          name="barcode-scan"
          size={28}
          color={Colors.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: Colors.GLOVO_GREEN,
    borderRadius: 28,
    zIndex: 1000,
  },
});

export default ScanResult;

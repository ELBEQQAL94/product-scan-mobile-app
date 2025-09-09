import { FC } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import HealthScore from "./HealthScore";
import PersonalizedMessage from "./PersonalizedMessage";
import ProductImage from "../shared/ProductImage";
import ProductName from "./ProductName";
import { ProductScanResult } from "@/constants/responses";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { Screens } from "@/constants/screens";
import { UserSchema } from "@/types/auth";

interface ScanResultProps {
  isArabic: boolean;
  redirectTo: (screen: string) => void;
  data: ProductScanResult;
  user: UserSchema | null | undefined;
  isSubscribed: boolean;
}

const ScanResult: FC<ScanResultProps> = ({
  data,
  isArabic,
  redirectTo,
  user,
  isSubscribed,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductImage imageUri={data.image_url} />
        <ProductName name={data.product_name} />
        <HealthScore score={data.score} />
        <PersonalizedMessage
          score={data.score}
          recommendations={data.recommendations}
          isSubscribed={isSubscribed}
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
      <TouchableOpacity
        onPress={() => redirectTo(Screens.PRODUCT_LIST_SCREEN)}
        style={[{ ...styles.fab, ...styles.shopping_fab }]}
      >
        <MaterialCommunityIcons
          name="shopping-outline"
          size={28}
          color={Colors.WHITE}
        />
      </TouchableOpacity>
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
  shopping_fab: {
    right: 20,
    bottom: 90,
  },
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

import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ProductImage from "../shared/ProductImage";
import { IHalalScanResult } from "@/constants/responses";
import ProductName from "../ScanResultScreen/ProductName";
import HealthScore from "../ScanResultScreen/HealthScore";
import HalalScanResultSummary from "./HalalScanResultSummary";
import { Colors } from "@/themes/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { Screens } from "@/constants/screens";

interface HalalScanResultProps {
  data: IHalalScanResult;
}

const HalalScanResult: FC<HalalScanResultProps> = ({ data }) => {
  const { redirect_to } = useCustomRouter();
  return (
    <View style={styles.container}>
      <ProductImage imageUri={data.image_url} />
      <ProductName name={data.product_name} />
      <HealthScore score={data.score} />
      <HalalScanResultSummary data={data} />
      <TouchableOpacity
        onPress={() => redirect_to(Screens.HALAL_SCREEN)}
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
    bottom: 0,
    backgroundColor: Colors.GLOVO_GREEN,
    borderRadius: 28,
    zIndex: 1000,
  },
});

export default HalalScanResult;

import { View, Text, StyleSheet } from "react-native";
import { i18n } from "@/i18n";
import CommonButton from "./CommonButton";
import { useTranslation } from "@/hooks/useTranslation";

interface ProductNotFoundProps {
  textColor: string;
  retryScan: () => void;
}

const ProductNotFound: React.FC<ProductNotFoundProps> = ({
  textColor,
  retryScan,
}) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View style={styles.product_not_found_container}>
      <Text style={[styles.product_not_found_text, { color: textColor }]}>
        {t("PRODUCT_NOT_FOUND")}
      </Text>
      <CommonButton action={retryScan} label={t("SCAN_AGAIN")} />
    </View>
  );
};

export default ProductNotFound;

const styles = StyleSheet.create({
  product_not_found_container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  product_not_found_text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

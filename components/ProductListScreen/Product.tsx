import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { ProductTypeFromDB } from "@/types/products";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

interface ProductProps {
  product: ProductTypeFromDB;
  onProductRemoved: (codeBar: string) => void; // Callback to notify parent component
}

const Product: FC<ProductProps> = ({ product, onProductRemoved }) => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  // State

  const get_score_color = (score: number) => {
    if (score === 0) return Colors.WHITE;
    if (score < 50) return Colors.RED;
    else if (score === 50) return Colors.YELLOW;
    else return Colors.LIGHT_GREEN;
  };

  const redirect_to_scan_result = () =>
    router.push(
      `${Screens.SCAN_RESULT_SCREEN}?bar_code=${product.bar_code}&user_id=${user?.uid}`
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={redirect_to_scan_result}
        style={styles.product_content}
      >
        {product.product_scan_result.image_url ? (
          <Image
            src={product.product_scan_result.image_url || ""}
            style={styles.image}
          />
        ) : (
          <Entypo name="image" size={60} color={Colors.BLACK} />
        )}
        <View style={styles.text_container}>
          <Text style={styles.product_name}>
            {product.product_scan_result.product_name !== "Chargement…" &&
            product.product_scan_result.product_name !== ""
              ? product.product_scan_result.product_name
              : t(LanguageKey.PRODUC_NAME_NOT_FOUND)}
          </Text>
          <View style={styles.score_container}>
            {product.product_scan_result.score > 0 && (
              <Text
                style={[
                  styles.score,
                  { color: get_score_color(product.product_scan_result.score) },
                ]}
              >
                {product.product_scan_result.score}
              </Text>
            )}
            <Text style={styles.score}>
              {product.product_scan_result.score > 0
                ? "/100"
                : t(LanguageKey.SCORE_NOT_AVAILABLE)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onProductRemoved(product.bar_code)}
        style={styles.remove_button}
      >
        <Ionicons name={"trash-outline"} size={24} color={Colors.RED} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  product_content: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: "30%",
    height: "100%",
    resizeMode: "contain",
  },
  text_container: {
    flex: 1,
    height: "100%",
    paddingLeft: 16,
  },
  product_name: {
    fontWeight: "bold",
    marginBottom: 8,
    ...Typography.bodyLarge,
  },
  score_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    color: Colors.DARK_GRAY,
    fontWeight: "bold",
    marginRight: 5,
    ...Typography.bodyLarge,
  },
  remove_button: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: Colors.LIGHT_GRAY,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
});

export default Product;

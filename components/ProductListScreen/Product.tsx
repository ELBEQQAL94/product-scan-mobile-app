import { ProductScanResult } from "@/constants/responses";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

interface ProductProps {
  product: ProductScanResult;
}

const Product: FC<ProductProps> = ({ product }) => {
  const get_score_color = (score: number) => {
    if (score < 50) return Colors.RED;
    else if (score === 50) return Colors.YELLOW;
    else return Colors.LIGHT_GREEN;
  };
  return (
    <View style={styles.container}>
      <Image src={product.image_url} style={styles.image} />
      <View style={styles.text_container}>
        <Text style={styles.product_name}>{product.product_name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[styles.score, { color: get_score_color(product.score) }]}
          >
            {product.score}
          </Text>
          <Text style={styles.score}>/100</Text>
        </View>
      </View>
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
  score: {
    color: Colors.DARK_GRAY,
    fontWeight: "bold",
    marginRight: 5,
    ...Typography.bodyLarge,
  },
});

export default Product;

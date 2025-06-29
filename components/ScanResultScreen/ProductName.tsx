import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

interface ProductNameProps {
  name: string;
}

const ProductName: FC<ProductNameProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: { fontWeight: "bold", ...Typography.h2 },
});

export default ProductName;

import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ProductTypeFromDB } from "@/types/products";
import Product from "./Product";

interface ProductProps {
  products: ProductTypeFromDB[];
  removeProduct: (codeBar: string) => void;
}

const Products: FC<ProductProps> = ({ products, removeProduct }) => {
  return (
    <ScrollView style={styles.container}>
      {products.map((product: ProductTypeFromDB, index: number) => (
        <Product
          key={index}
          product={product}
          onProductRemoved={removeProduct}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Products;

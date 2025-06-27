import { FC } from "react";
import { Image, View, StyleSheet } from "react-native";

interface ProductImageProps {
  imageUri: string;
}

const ProductImage: FC<ProductImageProps> = ({ imageUri }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUri,
        }}
        resizeMode="contain"
        width={150}
        height={150}
      />
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
});

export default ProductImage;

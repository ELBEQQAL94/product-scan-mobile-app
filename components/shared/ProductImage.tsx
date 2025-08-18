import { Colors } from "@/themes/colors";
import { Entypo } from "@expo/vector-icons";
import { FC } from "react";
import { Image, View, StyleSheet } from "react-native";

interface ProductImageProps {
  imageUri: string | null;
}

const ProductImage: FC<ProductImageProps> = ({ imageUri }) => {
  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image
          source={{
            uri: imageUri || "",
          }}
          resizeMode="contain"
          width={150}
          height={150}
        />
      ) : (
        <Entypo name="image" size={24} color={Colors.BLACK} />
      )}
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

import AuthButtons from "@/components/shared/AuthButtons";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { FC } from "react";
import { View, Text } from "react-native";
import { get_products } from "@/external-services/firebase";

const ProductList: FC = () => {
  // Hooks
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  return (
    <View>
      <AuthButtons isArabic={is_arabic()} redirectTo={redirect_to} />
      <Text>Product List</Text>
    </View>
  );
};

export default ProductList;

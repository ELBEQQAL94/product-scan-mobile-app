import { Colors } from "@/themes/colors";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

interface CustomActiveIndicatorProps {
  loading?: boolean;
  color?: string;
}

const CustomActiveIndicator: FC<CustomActiveIndicatorProps> = ({
  loading,
  color = Colors.WHITE,
}) => {
  if (!loading) return null;

  return <ActivityIndicator color={color} />;
};

export default CustomActiveIndicator;

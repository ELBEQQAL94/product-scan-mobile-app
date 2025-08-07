import { useTranslation } from "@/hooks/useTranslation";
import { View, Text } from "react-native";

interface LoadingProps {
  textColor: string;
}

const Loading: React.FC<LoadingProps> = ({ textColor }) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View>
      <Text style={{ color: textColor }}>{t("LOADING")}</Text>
    </View>
  );
};

export default Loading;

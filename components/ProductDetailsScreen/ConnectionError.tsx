import { View, Text, StyleSheet } from "react-native";
import CommonButton from "./CommonButton";
import { i18n } from "@/i18n";
import { useRouter } from "expo-router";
import { Screens } from "@/constants/screens";

interface ConnectionErrorProps {
  textColor: string;
  error: string | null;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({
  error,
  textColor,
}) => {
  // Hooks
  const router = useRouter();

  const refresh_screen = () => router.replace(Screens.HOME_SCREEN);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>{error}</Text>
      <CommonButton
        label={i18n.t("CONNECTION_ERROR")}
        action={refresh_screen}
      />
    </View>
  );
};

export default ConnectionError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});

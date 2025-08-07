import { LanguageKey } from "@/constants/keys";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Alert } from "react-native";
import CustomActiveIndicator from "../shared/CustomActivityIndicator";
import { useTranslation } from "@/hooks/useTranslation";

interface GoogleAuthButtonProps {
  loading: boolean;
  handleAuth: () => void;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({
  loading,
  handleAuth,
}) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.google_button, loading && styles.disabled]}
      onPress={handleAuth}
      disabled={loading}
    >
      <Image
        source={require("@/assets/images/google.png")}
        resizeMode="contain"
        style={styles.google_icon}
      />
      <CustomActiveIndicator loading={loading} />
      <Text style={styles.google_button_text}>
        {loading
          ? t(LanguageKey.SIGNING_IN)
          : t(LanguageKey.CONTINUE_WITH_GOOGLE)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  google_button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GLOVO_GREEN,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  google_button_text: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.BLACK,
  },
  google_icon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GoogleAuthButton;

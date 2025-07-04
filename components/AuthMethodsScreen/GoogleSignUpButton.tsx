import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { signInWithGoogle } from "@/external-services/firebase";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Alert } from "react-native";
import CustomActiveIndicator from "../shared/CustomActivityIndicator";

interface GoogleSignUpButtonProps {
  showToast: () => void;
}

const GoogleSignUpButton: FC<GoogleSignUpButtonProps> = ({ showToast }) => {
  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const { redirect_to } = useCustomRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      showToast();
      redirect_to(Screens.SCAN_SCREEN);
    } catch (error: unknown) {
      Alert.alert("Error", i18n.t(LanguageKey.FAILED_GOOGLE_SIGN_IN));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.google_button, loading && styles.disabled]}
      onPress={handleSignIn}
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
          ? i18n.t(LanguageKey.SIGNING_IN)
          : i18n.t(LanguageKey.CONTINUE_WITH_GOOGLE)}
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

export default GoogleSignUpButton;

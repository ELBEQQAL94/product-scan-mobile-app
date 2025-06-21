import { LanguageKey } from "@/constants/keys";
import { signInWithGoogle } from "@/external-services/firebase";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Alert } from "react-native";

const GoogleSignUpButton: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const authUser = await signInWithGoogle();
      // Handle successful sign-in (navigate to next screen, etc.)
      Alert.alert("welcome " + " " + authUser.displayName);
    } catch (error: unknown) {
      Alert.alert("Error", "Failed to sign in with Google. Please try again.");
      console.error("Google Sign-In Error:", error);
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
      <Text style={styles.google_button_text}>
        {loading ? "Signing in..." : i18n.t(LanguageKey.CONTINUE_WITH_GOOGLE)}
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

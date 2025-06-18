import { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const AuthMethodsScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Binance</Text>
          <Text style={styles.subtitle}>Sign up</Text>
        </View>

        {/* Main Content */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.description}>
            Join millions of users worldwide
          </Text>

          {/* Google Sign Up Button */}
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Sign Up Button */}
          <TouchableOpacity style={styles.emailButton}>
            <Text style={styles.emailButtonText}>Sign up with Email</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.linkText}>Log In</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E11",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F0B90B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#848E9C",
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#848E9C",
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E2329",
    borderWidth: 1,
    borderColor: "#2B3139",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  googleIconText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4285F4",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2B3139",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#848E9C",
  },
  emailButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },
  termsText: {
    fontSize: 12,
    color: "#848E9C",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: "#F0B90B",
    textDecorationLine: "underline",
  },
  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#848E9C",
  },
});

export default AuthMethodsScreen;

import GoogleSignUpButton from "@/components/AuthMethodsScreen/GoogleSignUpButton";
import { Colors } from "@/themes/colors";
import { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";

const RegisterScreen: FC = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    if (step === "email" && email.trim()) {
      setStep("password");
    }
  };

  const handleBack = () => {
    if (step === "password") {
      setStep("email");
    }
  };

  const canProceed =
    step === "email"
      ? email.trim().length > 0
      : password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

  const passwordsMatch = password === confirmPassword;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>myscan</Text>
          <Text style={styles.subtitle}>Sign up</Text>
          {step === "password" && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.formContainer}>
          {step === "email" ? (
            <>
              <Text style={styles.title}>Create your account</Text>
              <Text style={styles.description}>
                Join millions of users worldwide
              </Text>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#848E9C"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Next Button */}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  !canProceed && styles.disabledButton,
                ]}
                onPress={handleNext}
                disabled={!canProceed}
              >
                <Text
                  style={[
                    styles.nextButtonText,
                    !canProceed && styles.disabledButtonText,
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>
              {/* Google Sign Up Button */}
              <GoogleSignUpButton />

              {/* Terms */}
              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>Create password</Text>
              <Text style={styles.description}>
                Creating account for {email}
              </Text>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#848E9C"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeButtonText}>
                      {showPassword ? "🙈" : "👁️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    confirmPassword.length > 0 &&
                      !passwordsMatch &&
                      styles.errorBorder,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor="#848E9C"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeButtonText}>
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <Text style={styles.errorText}>Passwords do not match</Text>
                )}
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  !canProceed && styles.disabledButton,
                ]}
                disabled={!canProceed}
              >
                <Text
                  style={[
                    styles.nextButtonText,
                    !canProceed && styles.disabledButtonText,
                  ]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.termsText}>
                By creating an account, you agree to our{" "}
                <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </>
          )}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
    position: "relative",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.LIGHT_GREEN,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.CHARCOAL,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 40,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#F0B90B",
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
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
    color: Colors.BLACK,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.BLACK,
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
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1E2329",
    borderWidth: 1,
    borderColor: "#2B3139",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2329",
    borderWidth: 1,
    borderColor: "#2B3139",
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  eyeButtonText: {
    fontSize: 16,
  },
  errorBorder: {
    borderColor: "#F84960",
  },
  errorText: {
    fontSize: 12,
    color: "#F84960",
    marginTop: 4,
  },
  nextButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },
  disabledButton: {
    backgroundColor: "#2B3139",
  },
  disabledButtonText: {
    color: "#848E9C",
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

export default RegisterScreen;

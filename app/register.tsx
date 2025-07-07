import GoogleAuthButton from "@/components/AuthMethodsScreen/GoogleAuthButton";
import Header from "@/components/RegisterScreen/Header";
import ActionButton from "@/components/shared/ActionButton";
import Devider from "@/components/shared/Devider";
import Input from "@/components/shared/form/Input";
import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";
import { AuthSteps } from "@/enums/auth";
import {
  register_with_email_and_password,
  auth_with_google,
} from "@/external-services/firebase";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { is_email_valid } from "@/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Alert,
} from "react-native";

const RegisterScreen: FC = () => {
  // States
  const [step, setStep] = useState<AuthSteps>(AuthSteps.EMAIL);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const router = useRouter();
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  const show_toast = () => {
    ToastAndroid.show(i18n.t(LanguageKey.ACCOUNT_CREATED), ToastAndroid.SHORT);
  };

  const handle_next = () => {
    const email_trimmed = email.trim();
    if (step === AuthSteps.EMAIL && is_email_valid(email_trimmed)) {
      setErrorMessage(null);
      setStep(AuthSteps.PASSWORD);
    } else {
      setErrorMessage(i18n.t(LanguageKey.EMAIL_NOT_VALID));
    }
  };

  const handle_back = () => {
    if (step === AuthSteps.PASSWORD) {
      setStep(AuthSteps.EMAIL);
    }
  };

  const register_account = async () => {
    if (
      step === AuthSteps.PASSWORD &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      setErrorMessage(i18n.t(LanguageKey.PASSWORDS_DO_NOT_MATCH));
      return;
    }
    try {
      setLoading(true);
      await register_with_email_and_password({ email, password });
      setLoading(false);
      setErrorMessage(null);
      show_toast();
      router.push(Screens.LOGIN_SCREEN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
          setErrorMessage(i18n.t(LanguageKey.EMAIL_ALREADY_IN_USE));
        }
        if (error.message === FirebaseErrorMessages.WEAK_PASSWORD) {
          setErrorMessage(i18n.t(LanguageKey.WEAK_PASSWORD));
        }
      } else {
        setErrorMessage(i18n.t(LanguageKey.TRY_LATER));
      }
    } finally {
      setLoading(false);
    }
  };

  const handle_sign_in_with_google = async () => {
    try {
      setLoading(true);
      await auth_with_google();
      show_toast();
      redirect_to(Screens.SCAN_SCREEN);
    } catch (error: unknown) {
      Alert.alert("Error", i18n.t(LanguageKey.FAILED_GOOGLE_SIGN_IN));
    } finally {
      setLoading(false);
    }
  };

  const canProceed =
    step === AuthSteps.EMAIL
      ? email.trim().length > 0
      : password.length > 0 && confirmPassword.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        {/* Main Content */}
        <View style={styles.formContainer}>
          {step === AuthSteps.EMAIL ? (
            <>
              <Text
                style={[
                  styles.title,
                  { textAlign: is_arabic() ? "right" : "left" },
                ]}
              >
                {i18n.t(LanguageKey.CREATE_YOUR_ACCOUNT)}
              </Text>
              {/* Email Input */}
              <Input
                errorMessage={errorMessage}
                label={i18n.t(LanguageKey.EMAIL)}
                value={email}
                onChangeText={setEmail}
                placeholder={i18n.t(LanguageKey.ENTER_YOUR_EMAIL)}
                isArabic={is_arabic()}
                keyboardType="email-address"
              />
              <ActionButton
                label={LanguageKey.NEXT}
                onPress={handle_next}
                disabled={!canProceed}
                containerStyles={{
                  padding: 0,
                }}
                buttonStyles={{
                  borderRadius: 4,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  marginBottom: 24,
                }}
                isArabic={is_arabic()}
              />

              <Devider />
              <GoogleAuthButton
                handleAuth={handle_sign_in_with_google}
                loading={loading}
              />

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
              <Input
                errorMessage={errorMessage}
                label={i18n.t(LanguageKey.PASSWORD)}
                value={password}
                onChangeText={setPassword}
                placeholder={i18n.t(LanguageKey.ENTER_PASSWORD)}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                isIconVisible={true}
                isArabic={is_arabic()}
                setVisibility={setShowPassword}
              />

              {/* Confirm Password Input */}
              <Input
                errorMessage={errorMessage}
                label={i18n.t(LanguageKey.CONFIRM_PASSWORD)}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={i18n.t(LanguageKey.CONFIRM_PASSWORD)}
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                isIconVisible={true}
                isArabic={is_arabic()}
                setVisibility={setShowConfirmPassword}
              />
              <ActionButton
                label={LanguageKey.CREATE_ACCOUNT}
                onPress={register_account}
                disabled={!canProceed}
                containerStyles={{
                  padding: 0,
                }}
                buttonStyles={{
                  borderRadius: 4,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  marginBottom: 24,
                }}
                isArabic={is_arabic()}
                loading={loading}
                spinnerIconColor={Colors.BLACK}
              />
              <ActionButton
                label={LanguageKey.BACK}
                onPress={handle_back}
                containerStyles={{
                  padding: 0,
                }}
                buttonStyles={{
                  backgroundColor: Colors.GLOVO_YELLOW,
                  borderRadius: 4,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  marginBottom: 24,
                }}
                buttonTextStyles={{
                  color: Colors.BLACK,
                }}
                icon={FontAwesome6}
                iconProps={{
                  name: "arrow-left-long",
                  size: 24,
                }}
                isArabic={is_arabic()}
                iconStyles={{ color: Colors.BLACK }}
              />

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

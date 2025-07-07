import GoogleAuthButton from "@/components/AuthMethodsScreen/GoogleAuthButton";
import Header from "@/components/RegisterScreen/Header";
import ActionButton from "@/components/shared/ActionButton";
import Devider from "@/components/shared/Devider";
import Input from "@/components/shared/form/Input";
import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { AuthSteps } from "@/enums/auth";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";
import {
  auth_with_google,
  log_in_with_email_and_password,
} from "@/external-services/firebase";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";

const LoginScreen: FC = () => {
  // States
  const [step, setStep] = useState<AuthSteps>(AuthSteps.EMAIL);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  // Hooks
  const router = useRouter();
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  const show_toast = () => {
    ToastAndroid.show(i18n.t(LanguageKey.LOGIN_SUCCESS), ToastAndroid.SHORT);
  };

  const handle_next = () => {
    if (step === AuthSteps.EMAIL && email.trim()) {
      setStep(AuthSteps.PASSWORD);
    }
  };

  const handle_back = () => {
    if (AuthSteps.PASSWORD) {
      setStep(AuthSteps.EMAIL);
    }
  };

  const handle_log_in_with_google = async () => {
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

  const login_account = async () => {
    try {
      setLoading(true);
      await log_in_with_email_and_password({ email, password });
      setLoading(false);
      setErrorMessage(null);
      show_toast();
      router.push(Screens.LOGIN_SCREEN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === FirebaseErrorMessages.INVALID_LOGIN_CREDENTIALS) {
          setErrorMessage(i18n.t(LanguageKey.INVALID_LOGIN_CREDENTIALS));
        }
        if (error.message === FirebaseErrorMessages.USER_NOT_FOUND) {
          setErrorMessage(i18n.t(LanguageKey.USER_NOT_FOUND));
        }
        if (error.message === FirebaseErrorMessages.WRONG_PASSWORD) {
          setErrorMessage(i18n.t(LanguageKey.WRONG_PASSWORD));
        }
        if (error.message === FirebaseErrorMessages.INVALID_CREDENTAILS) {
          setErrorMessage(i18n.t(LanguageKey.INVALID_CREDENTAILS));
        }
      } else {
        setErrorMessage(i18n.t(LanguageKey.TRY_LATER));
      }
    } finally {
      setLoading(false);
    }
  };

  const canProceed =
    step === AuthSteps.EMAIL ? email.trim().length > 0 : password.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
                {i18n.t(LanguageKey.WELCOME_BACK)}
              </Text>
              <Text
                style={[
                  styles.description,
                  { textAlign: is_arabic() ? "right" : "left" },
                ]}
              >
                {i18n.t(LanguageKey.ENTER_YOUR_EMAIL_TO_CONTINUE)}
              </Text>

              {/* Google Sign In Button */}
              <GoogleAuthButton
                handleAuth={handle_log_in_with_google}
                loading={loading}
              />

              <Devider />

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

              {/* Next Button */}
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
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {i18n.t(LanguageKey.ENTER_PASSWORD)}
              </Text>
              <Text style={styles.description}>
                {i18n.t(LanguageKey.LOGGING_IN_AS)} {email}
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

              <ActionButton
                label={LanguageKey.CREATE_ACCOUNT}
                onPress={login_account}
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

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>
                  {i18n.t(LanguageKey.FORGOT_YOUR_PASSWORD)}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {i18n.t(LanguageKey.DONT_HAVE_AN_ACCOUNT)}{" "}
            <Text style={styles.linkText}>{i18n.t(LanguageKey.SIGN_UP)}</Text>
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
    position: "relative",
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
  forgotPasswordContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
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
  linkText: {
    color: "#F0B90B",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;

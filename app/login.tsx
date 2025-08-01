import GoogleAuthButton from "@/components/AuthMethodsScreen/GoogleAuthButton";
import ActionButton from "@/components/shared/ActionButton";
import Devider from "@/components/shared/Devider";
import Input from "@/components/shared/form/Input";
import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";
import {
  auth_with_google,
  log_in_with_email_and_password,
} from "@/external-services/firebase-config";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@/components/RegisterScreen/Header";
import AuthFooter from "@/components/shared/AuthFooter";
import crashlytics from "@react-native-firebase/crashlytics";
import ProtectedRoute from "@/components/ProtectedRoute";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

const LoginScreen: FC = () => {
  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const router = useRouter();
  const {
    is_arabic,
    modalVisible,
    setModalVisible,
    currentLanguage,
    change_language,
  } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  const show_toast = () => {
    ToastAndroid.show(i18n.t(LanguageKey.LOGIN_SUCCESS), ToastAndroid.SHORT);
  };

  const redirectToRegister = () => redirect_to(Screens.REGISTER_SCREEN);

  const log_in_account = async () => {
    try {
      setLoading(true);

      // Log login attempt
      crashlytics().log("User attempting email/password login");
      crashlytics().setAttribute("login_method", "email_password");
      crashlytics().setAttribute("user_email", email);

      await log_in_with_email_and_password({ email, password });

      // Log successful login
      crashlytics().log("Email/password login successful");
      crashlytics().setAttribute("login_success", "true");

      setLoading(false);
      setErrorMessage(null);
      show_toast();
      router.push(Screens.HOME_SCREEN);
    } catch (error: unknown) {
      // Log login error with context
      crashlytics().log("Email/password login failed");
      crashlytics().setAttribute("login_success", "false");

      if (error instanceof Error) {
        // Record the specific error
        crashlytics().recordError(error);
        crashlytics().setAttribute("error_type", error.message);

        if (error.message === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
          setErrorMessage(i18n.t(LanguageKey.EMAIL_ALREADY_IN_USE));
        } else if (error.message === FirebaseErrorMessages.WEAK_PASSWORD) {
          setErrorMessage(i18n.t(LanguageKey.WEAK_PASSWORD));
        } else {
          // Log unexpected Firebase errors
          crashlytics().log(`Unexpected Firebase error: ${error.message}`);
          setErrorMessage(i18n.t(LanguageKey.TRY_LATER));
        }
      } else {
        // Log non-Error objects
        crashlytics().recordError(
          new Error(`Unknown login error: ${String(error)}`)
        );
        setErrorMessage(i18n.t(LanguageKey.TRY_LATER));
      }
    } finally {
      setLoading(false);
    }
  };

  const handle_sign_in_with_google = async () => {
    try {
      setGoogleLoading(true);

      // Log Google sign-in attempt
      crashlytics().log("User attempting Google sign-in");
      crashlytics().setAttribute("login_method", "google");

      await auth_with_google();

      // Log successful Google sign-in
      crashlytics().log("Google sign-in successful");
      crashlytics().setAttribute("google_login_success", "true");

      show_toast();
      redirect_to(Screens.HOME_SCREEN);
    } catch (error: unknown) {
      // Log Google sign-in error
      crashlytics().log("Google sign-in failed");
      crashlytics().setAttribute("google_login_success", "false");

      if (error instanceof Error) {
        crashlytics().recordError(error);
        crashlytics().setAttribute("google_error_type", error.message);
      } else {
        crashlytics().recordError(
          new Error(`Google sign-in error: ${String(error)}`)
        );
      }

      Alert.alert("Error", i18n.t(LanguageKey.FAILED_GOOGLE_SIGN_IN));
    } finally {
      setGoogleLoading(false);
    }
  };

  const canProceed = email.trim().length > 0 && password.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={currentLanguage}
        setModalVisible={setModalVisible}
        changeLanguage={change_language}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView>
          <View style={styles.content}>
            <Header />
            <View style={styles.form_container}>
              <Text
                style={[
                  styles.title,
                  { textAlign: is_arabic() ? "right" : "left" },
                ]}
              >
                {i18n.t(LanguageKey.LOG_IN)}
              </Text>
              <Input
                errorMessage={errorMessage}
                label={i18n.t(LanguageKey.EMAIL)}
                value={email}
                onChangeText={setEmail}
                placeholder={i18n.t(LanguageKey.ENTER_YOUR_EMAIL)}
                isArabic={is_arabic()}
                keyboardType="email-address"
              />
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
                label={LanguageKey.LOG_IN}
                onPress={log_in_account}
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
              />
              <Devider />
              <GoogleAuthButton
                handleAuth={handle_sign_in_with_google}
                loading={googleLoading}
              />
            </View>

            <AuthFooter
              label={i18n.t(LanguageKey.DONT_HAVE_AN_ACCOUNT)}
              link={i18n.t(LanguageKey.CREATE_ACCOUNT)}
              redirectTo={redirectToRegister}
              isArabic={is_arabic()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  form_container: {
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
});

export default LoginScreen;

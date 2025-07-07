import GoogleAuthButton from "@/components/AuthMethodsScreen/GoogleAuthButton";
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
  log_in_with_email_and_password,
} from "@/external-services/firebase";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { is_email_valid } from "@/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, lazy, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Alert,
} from "react-native";
import Header from "@/components/RegisterScreen/Header";
import AuthFooter from "@/components/shared/AuthFooter";

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
  const { is_arabic } = useSelectedLanguage();
  const { redirect_to } = useCustomRouter();

  const show_toast = () => {
    ToastAndroid.show(i18n.t(LanguageKey.LOGIN_SUCCESS), ToastAndroid.SHORT);
  };

  const redirectToRegister = () => redirect_to(Screens.REGISTER_SCREEN);

  const log_in_account = async () => {
    try {
      setLoading(true);
      await log_in_with_email_and_password({ email, password });
      setLoading(false);
      setErrorMessage(null);
      show_toast();
      router.push(Screens.SCAN_SCREEN);
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
      setGoogleLoading(true);
      await auth_with_google();
      show_toast();
      redirect_to(Screens.SCAN_SCREEN);
    } catch (error: unknown) {
      Alert.alert("Error", i18n.t(LanguageKey.FAILED_GOOGLE_SIGN_IN));
    } finally {
      setGoogleLoading(false);
    }
  };

  const canProceed = email.trim().length > 0 && password.length > 0;

  return (
    <SafeAreaView style={styles.container}>
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

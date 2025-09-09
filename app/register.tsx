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
} from "@/external-services/firebase-config";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { Colors } from "@/themes/colors";
import { is_email_valid } from "@/utils";
import { FontAwesome6 } from "@expo/vector-icons";
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
import AuthFooter from "@/components/shared/AuthFooter";
import Terms from "@/components/RegisterScreen/Terms";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageProvider";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

const RegisterScreen: FC = () => {
  // Hooks
  const { is_arabic } = useLanguage();
  const { redirect_to } = useCustomRouter();
  const { t } = useTranslation();
  const { modalVisible, language, setModalVisible, setLanguage } =
    useLanguage();

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
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const show_toast = () => {
    ToastAndroid.show(t(LanguageKey.ACCOUNT_CREATED), ToastAndroid.SHORT);
  };

  const handle_next = () => {
    const email_trimmed = email.trim();
    if (step === AuthSteps.EMAIL && is_email_valid(email_trimmed)) {
      setErrorMessage(null);
      setStep(AuthSteps.PASSWORD);
    } else {
      setErrorMessage(t(LanguageKey.EMAIL_NOT_VALID));
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
      setErrorMessage(t(LanguageKey.PASSWORDS_DO_NOT_MATCH));
      return;
    }
    try {
      setLoading(true);
      await register_with_email_and_password({ email, password });
      setLoading(false);
      setErrorMessage(null);
      show_toast();
      redirect_to(Screens.HEALTH_SETUP_SCREEN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
          setErrorMessage(t(LanguageKey.EMAIL_ALREADY_IN_USE));
        }
        if (error.message === FirebaseErrorMessages.WEAK_PASSWORD) {
          setErrorMessage(t(LanguageKey.WEAK_PASSWORD));
        }
      } else {
        setErrorMessage(t(LanguageKey.TRY_LATER));
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
      redirect_to(Screens.HEALTH_SETUP_SCREEN);
    } catch (error: unknown) {
      Alert.alert("Error", t(LanguageKey.FAILED_GOOGLE_SIGN_IN));
    } finally {
      setGoogleLoading(false);
    }
  };

  const redirect_to_health_setup_profile = () =>
    redirect_to(Screens.HEALTH_SETUP_SCREEN);

  const canProceed =
    step === AuthSteps.EMAIL
      ? email.trim().length > 0
      : password.length > 0 && confirmPassword.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={language}
        setModalVisible={setModalVisible}
        changeLanguage={setLanguage}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Header />

            {/* Main Content */}
            <View style={styles.formContainer}>
              {step === AuthSteps.EMAIL ? (
                <>
                  <Text
                    style={[
                      styles.title,
                      { textAlign: is_arabic ? "right" : "left" },
                    ]}
                  >
                    {t(LanguageKey.CREATE_YOUR_ACCOUNT)}
                  </Text>

                  {/* Email Input */}
                  <Input
                    errorMessage={errorMessage}
                    label={t(LanguageKey.EMAIL)}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t(LanguageKey.ENTER_YOUR_EMAIL)}
                    isArabic={is_arabic}
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
                    isArabic={is_arabic}
                  />

                  <Devider />
                  <GoogleAuthButton
                    handleAuth={handle_sign_in_with_google}
                    loading={googleLoading}
                  />

                  <Terms />
                </>
              ) : (
                <>
                  <Text
                    style={[
                      styles.title,
                      { textAlign: is_arabic ? "right" : "left" },
                    ]}
                  >
                    {t(LanguageKey.CREATE_PASSWORD)}
                  </Text>
                  <Text
                    style={[
                      styles.description,
                      { textAlign: is_arabic ? "right" : "left" },
                    ]}
                  >
                    {t(LanguageKey.CREATING_ACCOUNT_FOR)} {email}
                  </Text>

                  {/* Password Input */}
                  <Input
                    errorMessage={errorMessage}
                    label={t(LanguageKey.PASSWORD)}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t(LanguageKey.ENTER_PASSWORD)}
                    secureTextEntry={!showPassword}
                    showPassword={showPassword}
                    isIconVisible={true}
                    isArabic={is_arabic}
                    setVisibility={setShowPassword}
                  />

                  {/* Confirm Password Input */}
                  <Input
                    errorMessage={errorMessage}
                    label={t(LanguageKey.CONFIRM_PASSWORD)}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={t(LanguageKey.CONFIRM_PASSWORD)}
                    secureTextEntry={!showConfirmPassword}
                    showPassword={showConfirmPassword}
                    isIconVisible={true}
                    isArabic={is_arabic}
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
                    isArabic={is_arabic}
                    loading={loading}
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
                    isArabic={is_arabic}
                    iconStyles={{ color: Colors.BLACK }}
                  />

                  <Terms />
                </>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Footer positioned at bottom */}
        <View style={styles.footerContainer}>
          <AuthFooter
            label={t(LanguageKey.ALREADY_HAVE_AN_ACCOUNT)}
            link={t(LanguageKey.LOG_IN)}
            redirectTo={redirect_to_health_setup_profile}
            isArabic={is_arabic}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  footerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10,
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

export default RegisterScreen;

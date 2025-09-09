import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Screens } from "@/constants/screens";
import { LanguageProvider } from "@/context/LanguageProvider";
import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { get_android_package_id, get_current_version } from "@/utils";
import {
  create_latest_app_version,
  get_latest_app_version,
  update_latest_app_version,
} from "@/external-services/firebase-config";
import { Alert, Linking, Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Hooks
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const update_version = async () => {
    const LATEST_VERSION = get_current_version();

    const CURRENT_VERSION = await get_latest_app_version();

    if (!CURRENT_VERSION) {
      await create_latest_app_version(LATEST_VERSION);
    }

    if (CURRENT_VERSION && LATEST_VERSION > CURRENT_VERSION) {
      await update_latest_app_version(LATEST_VERSION);
      redirectToStore();
    }
  };

  const check_version = async () => {
    const LATEST_VERSION = get_current_version();
    const CURRENT_VERSION = await get_latest_app_version();

    if (CURRENT_VERSION && LATEST_VERSION !== CURRENT_VERSION) {
      showUpdateAlert();
    }
  };

  const showUpdateAlert = () => {
    Alert.alert(
      t(LanguageKey.UPDATE_AVAILABLE),
      t(LanguageKey.NEW_VERSION_MESSAGE),
      [
        {
          text: t(LanguageKey.LATER),
          style: "cancel",
        },
        {
          text: t(LanguageKey.UPDATE),
          onPress: () => update_version(),
        },
      ]
    );
  };

  const redirectToStore = async () => {
    const PACKAGE_ID = get_android_package_id();
    const storeUrl = Platform.select({
      android: `https://play.google.com/store/apps/details?id=${PACKAGE_ID}`,
    });

    if (storeUrl) {
      Linking.openURL(storeUrl).catch((err) => {
        console.error("Failed to open store URL:", err);
        Alert.alert(
          t(LanguageKey.ERROR) || "Error",
          t(LanguageKey.STORE_REDIRECT_ERROR) ||
            "Unable to open the app store. Please update the app manually."
        );
      });
    }
  };

  // Initialize app and check for updates
  useEffect(() => {
    check_version();
    SplashScreen.hideAsync();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name={Screens.LOGIN_SCREEN}
            options={{
              headerShown: false,
              // Prevent going back to tabs when not authenticated
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={Screens.REGISTER_SCREEN}
            options={{
              headerShown: false,
              // Prevent going back to tabs when not authenticated
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={Screens.SCAN_RESULT_SCREEN}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.HALAL_SCAN_RESULT_SCREEN}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.ONBOARDING_SCREEN}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.HEALTH_SETUP_SCREEN}
            options={{
              title: t(LanguageKey.HEALTH_PROFILE_SETUP),
              headerStyle: {
                backgroundColor: Colors.GLOVO_GREEN,
                ...Typography.h1,
              },
              headerTitleStyle: {
                color: Colors.WHITE,
              },
            }}
          />
          <Stack.Screen
            name={Screens.PRICING_SCREEN}
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}

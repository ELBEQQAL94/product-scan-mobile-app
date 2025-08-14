import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Screens } from "@/constants/screens";
import { LanguageProvider } from "@/context/LanguageProvider";
import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Hooks
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { t } = useTranslation();

  // Add this useEffect to hide splash screen
  useEffect(() => {
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
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ marginLeft: 10, padding: 8 }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={Colors.WHITE}
                  />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: Colors.GLOVO_GREEN,
                ...Typography.h1,
              },
              headerTitleStyle: {
                color: Colors.WHITE,
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}

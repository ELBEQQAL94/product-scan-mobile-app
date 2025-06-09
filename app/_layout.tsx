import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Href, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Screens } from "@/constants/screens";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { i18n } from "@/i18n";
import { LanguageKey } from "@/constants/keys";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name={Screens.HEALTH_SETUP_SCREEN}
          options={{
            title: i18n.t(LanguageKey.HEALTH_PROFILE_SETUP),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  marginLeft: 10,
                  padding: 8,
                }}
              >
                <Ionicons name="chevron-back" size={24} color={Colors.WHITE} />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: Colors.GLOVO_YELLOW,
              ...Typography.h1,
            },
            headerTitleStyle: {
              color: Colors.WHITE,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Hooks
  const colorScheme = useColorScheme();

  // Add this useEffect to hide splash screen
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
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
      </Stack>
    </ThemeProvider>
  );
}

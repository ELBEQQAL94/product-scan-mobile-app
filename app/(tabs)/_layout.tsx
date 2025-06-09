import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { Colors } from "@/themes/colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const router = useRouter();
  // const [loaded] = useFonts({
  //   SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  //   router.push(Screens.HEALTH_SETUP_SCREEN as Href);
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.GLOVO_GREEN,
        tabBarInactiveTintColor: Colors.GRAY,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              color={Colors.GLOVO_GREEN}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product-list"
        options={{
          headerShown: false,
          title: "Product list",
          tabBarIcon: () => (
            <Fontisto
              name="shopping-basket"
              size={24}
              color={Colors.GLOVO_GREEN}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: () => (
            <FontAwesome5 name="user" size={24} color={Colors.GLOVO_GREEN} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: () => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={Colors.GLOVO_GREEN}
            />
          ),
        }}
      />
    </Tabs>
  );
}

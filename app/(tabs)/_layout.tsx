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

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.GLOVO_GREEN,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
          paddingHorizontal: 4,
        },
        tabBarLabelStyle: {
          paddingTop: 4,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
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

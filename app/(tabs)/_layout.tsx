import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { Colors } from "@/themes/colors";
import { View, StyleSheet } from "react-native";
import CustomScanTabButton from "@/components/ScanScreen/CustomScanTabButton";

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
            <Ionicons
              name="home-outline"
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
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color={Colors.GLOVO_GREEN}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomScanTabButton focused={focused} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="halal"
        options={{
          headerShown: false,
          title: "Halal",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="mosque"
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
    </Tabs>
  );
}

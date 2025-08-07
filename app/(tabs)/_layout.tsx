import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import "react-native-reanimated";
import { Colors } from "@/themes/colors";
import CustomScanTabButton from "@/components/ScanScreen/CustomScanTabButton";
import { LanguageKey } from "@/constants/keys";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { Typography } from "@/themes/typography";
import { TouchableOpacity } from "react-native";
import { Screens } from "@/constants/screens";
import { useTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  // Hooks
  const { is_arabic } = useSelectedLanguage();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
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
        name="product-list"
        options={{
          headerShown: false,
          title: t(LanguageKey.PRODUCT_LIST),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "shopping" : "shopping-outline"}
              size={24}
              color={Colors.GLOVO_GREEN}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="halal"
        options={{
          headerShown: false,
          title: t(LanguageKey.HALAL),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons
                name="mosque"
                size={24}
                color={Colors.GLOVO_GREEN}
              />
            ) : (
              <MaterialCommunityIcons
                name="mosque"
                size={24}
                color={Colors.GLOVO_GREEN}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t(LanguageKey.HOME),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomScanTabButton focused={focused} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: t(LanguageKey.PROFILE),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color={Colors.GLOVO_GREEN} />
            ) : (
              <FontAwesome5 name="user" size={24} color={Colors.GLOVO_GREEN} />
            ),
          tabBarLabelStyle: {
            fontSize: is_arabic() ? 10 : 12,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t(LanguageKey.PROFILE),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" size={24} color={Colors.GLOVO_GREEN} />
            ) : (
              <Feather name="settings" size={24} color={Colors.GLOVO_GREEN} />
            ),
          tabBarLabelStyle: {
            fontSize: is_arabic() ? 10 : 12,
          },
        }}
      />
      <Tabs.Screen
        name={Screens.HEALTH_SETUP_SCREEN}
        options={{
          href: null, // Hide from tab bar
          title: t(LanguageKey.HEALTH_PROFILE_SETUP),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10, padding: 8 }}
            >
              <Ionicons name="chevron-back" size={24} color={Colors.WHITE} />
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
    </Tabs>
  );
}

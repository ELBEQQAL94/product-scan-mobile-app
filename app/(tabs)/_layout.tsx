import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "react-native-reanimated";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Colors } from "@/themes/colors";
import CustomScanTabButton from "@/components/ScanScreen/CustomScanTabButton";
import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageProvider";

export default function TabLayout() {
  // Hooks
  const { is_arabic } = useLanguage();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs
        initialRouteName="index"
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: Colors.GLOVO_GREEN,
          tabBarInactiveTintColor: Colors.GRAY,
          tabBarStyle: {
            height: 80 + insets.bottom,
            paddingBottom: insets.bottom + 10,
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
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="product-list"
          options={{
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
            tabBarIcon: ({ focused }) => (
              <CustomScanTabButton focused={focused} />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t(LanguageKey.PROFILE),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user" size={24} color={Colors.GLOVO_GREEN} />
              ) : (
                <FontAwesome5
                  name="user"
                  size={24}
                  color={Colors.GLOVO_GREEN}
                />
              ),
            tabBarLabelStyle: {
              fontSize: is_arabic ? 10 : 12,
            },
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: t(LanguageKey.SEARCH),
            tabBarIcon: ({ focused }) => (
              <AntDesign name="search1" size={24} color={Colors.GLOVO_GREEN} />
            ),
            tabBarLabelStyle: {
              fontSize: is_arabic ? 10 : 12,
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

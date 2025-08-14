import { ReactNode, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Screens } from "@/constants/screens";
import { AsyncStorageKey } from "@/constants/keys";
import { get_item } from "@/utils";

interface ProtectedRouteProps {
  children: ReactNode;
  isPublic?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await get_item(
        AsyncStorageKey.HAS_COMPLETED_ONBOARDING
      );
      if (!hasCompletedOnboarding) {
        router.push(Screens.ONBOARDING_SCREEN);
      }
    } catch (error) {
      console.log("checkOnboardingStatus get an error: ", error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
    if (!loading && !user) {
      router.replace(Screens.LOGIN_SCREEN);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return null; // Return null while redirecting
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProtectedRoute;

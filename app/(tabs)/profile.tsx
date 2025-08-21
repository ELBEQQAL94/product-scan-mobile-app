import { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { UserSchema } from "@/types/auth";
import { check_user_exists, logout } from "@/external-services/firebase-config";
import { Colors } from "@/themes/colors";
import { Screens } from "@/constants/screens";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { LanguageKey } from "@/constants/keys";
import ProfileItem from "@/components/ProfileScreen/ProfileItem";
import ScreenTitle from "@/components/shared/ScreenTitle";
import ProfileScreenLoading from "@/components/ProfileScreen/ProfileScreenLoading";
import { format_date } from "@/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageProvider";
import { Step } from "@/enums/step";

const Profile: FC = () => {
  // States
  const [userData, setUserData] = useState<UserSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hooks
  const router = useRouter();
  const { is_arabic } = useLanguage();
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      if (user) {
        const userData = await check_user_exists(user.uid);
        if (userData) {
          setUserData(userData);
        }
      }
    } catch (error) {
      // TODO: add logs
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handle_edit = (step: Step) => {
    router.push(`${Screens.HEALTH_SETUP_SCREEN}?default_step=${step}`);
  };

  const on_logout = async () => {
    await logout();
    router.push(Screens.LOGIN_SCREEN);
  };

  const handle_logout = () => {
    Alert.alert(t(LanguageKey.LOGOUT), t(LanguageKey.LOGOUT_CONFIRMATION), [
      {
        text: t(LanguageKey.CANCEL),
        style: "cancel",
      },
      {
        text: t(LanguageKey.LOGOUT),
        style: "destructive",
        onPress: on_logout,
      },
    ]);
  };

  if (loading) {
    return <ProfileScreenLoading />;
  }

  return (
    <ProtectedRoute>
      <ScreenTitle title={t(LanguageKey.MY_PROFILE)} />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.PERSONAL_INFORMATION)}
          </Text>

          <ProfileItem
            icon={
              <FontAwesome name="at" size={20} color={Colors.GLOVO_GREEN} />
            }
            label={t(LanguageKey.USERNAME)}
            value={userData?.username || ""}
            isArabic={is_arabic}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.HEALTH_INFORMATION)}
          </Text>

          <ProfileItem
            icon={
              <MaterialCommunityIcons
                name="medical-bag"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
            }
            label={t(LanguageKey.DISEASES)}
            value={userData?.selected_diseases || []}
            onEdit={() => handle_edit(Step.DISEASES)}
            isArabic={is_arabic}
            isEdit={true}
          />

          <ProfileItem
            icon={
              <MaterialCommunityIcons
                name="alert-circle"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
            }
            label={t(LanguageKey.ALLERGIES)}
            value={userData?.selected_allergies || []}
            onEdit={() => handle_edit(Step.ALERGIES)}
            isArabic={is_arabic}
            isEdit={true}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.ACCOUNT_INFORMATION)}
          </Text>

          <View style={styles.infoItem}>
            <View style={styles.itemLeft}>
              <MaterialIcons
                name="email"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text style={styles.itemLabel}>
                {t(LanguageKey.EMAIL_VERIFIED)}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: userData?.is_email_verified
                      ? Colors.GLOVO_GREEN
                      : Colors.GRAY,
                  },
                ]}
              >
                {userData?.is_email_verified
                  ? t(LanguageKey.VERIFIED)
                  : t(LanguageKey.NOT_VERIFIED)}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.itemLeft}>
              <MaterialCommunityIcons
                name="crown"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text style={styles.itemLabel}>
                {t(LanguageKey.SUBSCRIPTION)}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: userData?.is_subscribed
                      ? Colors.GLOVO_GREEN
                      : Colors.GRAY,
                  },
                ]}
              >
                {userData?.is_subscribed
                  ? t(LanguageKey.PREMIUM)
                  : t(LanguageKey.FREE)}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.itemLeft}>
              <MaterialIcons
                name="date-range"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text style={styles.itemLabel}>
                {t(LanguageKey.MEMBER_SINCE)}
              </Text>
            </View>
            <Text style={styles.itemValue}>
              {userData?.created_at && format_date(userData.created_at)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.HEALTH_PROFILE_STATUS)}
          </Text>

          <View style={styles.healthStatusContainer}>
            <MaterialCommunityIcons
              name={
                !userData?.is_profile_health_created
                  ? "check-circle"
                  : "alert-circle"
              }
              size={24}
              color={
                userData?.is_profile_health_created
                  ? Colors.GLOVO_GREEN
                  : "#ff6b6b"
              }
            />
            <Text
              style={[
                styles.healthStatusText,
                { textAlign: is_arabic ? "right" : "left" },
              ]}
            >
              {!userData?.is_profile_health_created
                ? t(LanguageKey.HEALTH_PROFILE_COMPLETED)
                : t(LanguageKey.HEALTH_PROFILE_INCOMPLETE)}
            </Text>
            {userData?.is_profile_health_created && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => handle_edit(Step.DISEASES)}
              >
                <Text style={styles.completeButtonText}>
                  {t(LanguageKey.COMPLETE_NOW)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.ACCOUNT_ACTIONS)}
          </Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handle_logout}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>{t(LanguageKey.LOGOUT)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  avatarContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    paddingBottom: 8,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    color: "#333",
  },
  itemValue: {
    fontSize: 14,
    color: "#666",
    marginLeft: 30,
    lineHeight: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  healthStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthStatusText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: "#333",
  },
  completeButton: {
    backgroundColor: Colors.GLOVO_GREEN,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  completeButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default Profile;

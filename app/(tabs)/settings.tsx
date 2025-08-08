import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { LanguageKey } from "@/constants/keys";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScreenTitle from "@/components/shared/ScreenTitle";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

const SettingsScreen: FC = () => {
  const { language, setLanguage, modalVisible, setModalVisible, is_arabic } =
    useLanguage();
  const { t } = useTranslation();

  const openLanguageModal = () => {
    setModalVisible(true);
  };

  const getLanguageDisplayName = () => {
    switch (language) {
      case "en":
        return "English";
      case "ar":
        return "العربية";
      case "fr":
        return "Français";
      case "es":
        return "Español";
      case "de":
        return "Deutsch";
      default:
        return "English";
    }
  };

  return (
    <ProtectedRoute>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={language}
        setModalVisible={setModalVisible}
        changeLanguage={setLanguage}
      />
      <ScreenTitle title={t(LanguageKey.SETTINGS)} />
      <ScrollView style={styles.container}>
        {/* App Preferences Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.APP_PREFERENCES)}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
            onPress={openLanguageModal}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons
                name="language"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.LANGUAGE)}
              </Text>
            </View>
            <View
              style={[
                styles.itemRight,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <Text style={styles.itemValue}>{getLanguageDisplayName()}</Text>
              <MaterialIcons
                name={is_arabic ? "chevron-left" : "chevron-right"}
                size={20}
                color="#666"
                style={{
                  marginLeft: is_arabic ? 0 : 5,
                  marginRight: is_arabic ? 5 : 0,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.NOTIFICATIONS)}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons
                name="notifications"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.PUSH_NOTIFICATIONS)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons
                name="email"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.EMAIL_NOTIFICATIONS)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.PRIVACY_SECURITY)}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons name="lock" size={20} color={Colors.GLOVO_GREEN} />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.CHANGE_PASSWORD)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons
                name="privacy-tip"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.PRIVACY_POLICY)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: is_arabic ? "right" : "left" },
            ]}
          >
            {t(LanguageKey.SUPPORT)}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons name="help" size={20} color={Colors.GLOVO_GREEN} />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.HELP_CENTER)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons
                name="feedback"
                size={20}
                color={Colors.GLOVO_GREEN}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.SEND_FEEDBACK)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: is_arabic ? "row-reverse" : "row" },
            ]}
          >
            <View
              style={[
                styles.itemLeft,
                { flexDirection: is_arabic ? "row-reverse" : "row" },
              ]}
            >
              <MaterialIcons name="info" size={20} color={Colors.GLOVO_GREEN} />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    marginLeft: is_arabic ? 0 : 10,
                    marginRight: is_arabic ? 10 : 0,
                  },
                ]}
              >
                {t(LanguageKey.ABOUT)}
              </Text>
            </View>
            <MaterialIcons
              name={is_arabic ? "chevron-left" : "chevron-right"}
              size={20}
              color="#666"
            />
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemValue: {
    fontSize: 14,
    color: "#666",
  },
});

export default SettingsScreen;

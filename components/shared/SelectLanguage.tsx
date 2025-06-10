import { i18n } from "@/i18n";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";

interface SelectLanguageProps {
  currentLanguage: string;
  modalVisible: boolean;
  setModalVisible: (is_visibile: boolean) => void;
  changeLanguage: (language_code: string) => void;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  currentLanguage,
  modalVisible,
  setModalVisible,
  changeLanguage,
}) => {
  // States
  const colorScheme = useColorScheme();

  const colors = {
    text: colorScheme === "dark" ? "white" : "black",
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("@/assets/images/language.png")}
          resizeMode="contain"
          style={{ tintColor: colors.text, width: 20, height: 20 }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>

            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    currentLanguage === item.code && styles.selectedLanguage,
                  ]}
                  onPress={() => changeLanguage(item.code)}
                >
                  <Text style={styles.languageName}>{item.name}</Text>
                  <Text style={styles.languageCodeSmall}>({item.code})</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                {i18n.t("CANCEL", { defaultValue: "Cancel" })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  languageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    minWidth: 40,
    alignItems: "center",
  },
  languageCode: {
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  selectedLanguage: {
    backgroundColor: "#e6f7ff",
  },
  languageName: {
    fontSize: 16,
    marginRight: 8,
  },
  languageCodeSmall: {
    fontSize: 12,
    color: "#666",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SelectLanguage;

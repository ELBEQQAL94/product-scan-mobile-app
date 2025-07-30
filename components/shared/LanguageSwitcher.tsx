import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { Language } from "@/enums/language";
import { languages } from "@/constants/languages";

interface LanguageSwitcherProps {
  containerStyle?: object;
  visible?: boolean;
  buttonStyle?: object;
  dropdownStyle?: object;
  modalVisible: boolean;
  currentLanguage: string;
  setModalVisible: (visible: boolean) => void;
  changeLanguage: (code: string) => void;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  containerStyle,
  buttonStyle,
  dropdownStyle,
  modalVisible,
  currentLanguage,
  visible = true,
  setModalVisible,
  changeLanguage,
}) => {
  const handle_language_select = (languageCode: string) => {
    changeLanguage(languageCode);
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.language_switcher_container, containerStyle]}>
      <TouchableOpacity
        style={[styles.language_toggle_button, buttonStyle]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <MaterialIcons name="public" size={20} color={Colors.GLOVO_GREEN} />
        <MaterialIcons
          name={modalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={16}
          color={Colors.GLOVO_GREEN}
        />
      </TouchableOpacity>

      {/* Expandable Language List */}
      {modalVisible && (
        <View style={[styles.language_dropdown, dropdownStyle]}>
          {/* Current Selected Language */}
          <View style={styles.current_language_item}>
            {languages
              .filter((language) => language.code === currentLanguage)
              .map((language) => (
                <View
                  key={language.code}
                  style={styles.current_language_content}
                >
                  <Text style={styles.dropdown_language_flag}>
                    {language.flag}
                  </Text>
                  <Text style={styles.current_language_text}>
                    {language.name}
                  </Text>
                  <MaterialIcons
                    name="check-circle"
                    size={16}
                    color={Colors.GLOVO_GREEN}
                  />
                </View>
              ))}
          </View>

          {/* Divider */}
          <View style={styles.dropdown_divider} />

          {/* Other Languages */}
          {languages
            .filter((language) => language.code !== currentLanguage)
            .map((language) => (
              <TouchableOpacity
                key={language.code}
                style={styles.language_dropdown_item}
                onPress={() => handle_language_select(language.code)}
              >
                <Text style={styles.dropdown_language_flag}>
                  {language.flag}
                </Text>
                <Text style={styles.dropdown_language_name}>
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  language_switcher_container: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1000,
    alignItems: "flex-end",
  },
  language_toggle_button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 4,
  },
  language_dropdown: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    borderRadius: 12,
    minWidth: 160,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  current_language_item: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  current_language_content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  dropdown_language_flag: {
    fontSize: 18,
    marginRight: 8,
  },
  current_language_text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.GLOVO_GREEN,
    flex: 1,
  },
  dropdown_divider: {
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  language_dropdown_item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  dropdown_language_name: {
    fontSize: 14,
    color: Colors.CHARCOAL,
    flex: 1,
  },
});

export default LanguageSwitcher;

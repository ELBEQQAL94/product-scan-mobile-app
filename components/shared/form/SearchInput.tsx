import { LanguageKey } from "@/constants/keys";
import { useLanguage } from "@/context/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FC } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface SearchInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, setValue, label }) => {
  // Hooks
  const { is_arabic } = useLanguage();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.input_container,
          { flexDirection: is_arabic ? "row-reverse" : "row" },
        ]}
      >
        <EvilIcons name="search" size={24} color={Colors.LIGHT_GREEN} />
        <TextInput
          style={[styles.input, { textAlign: is_arabic ? "right" : "left" }]}
          placeholder={label}
          value={value}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input_container: {
    backgroundColor: Colors.LIGHT_GRAY,
    height: 40,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  input: { width: "90%" },
});
export default SearchInput;

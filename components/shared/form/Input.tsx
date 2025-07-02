import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  errorMessage: string | null;
  isArabic: boolean;
  showPassword?: boolean;
  secureTextEntry?: boolean;
  isIconVisible?: boolean;
  setVisibility?: (isVisible: boolean) => void;
}

const Input: FC<InputProps> = ({
  label,
  value,
  placeholder,
  errorMessage,
  isArabic,
  placeholderTextColor = Colors.DARK_GRAY,
  secureTextEntry = false,
  isIconVisible = false,
  keyboardType = "default",
  onChangeText,
  setVisibility,
}) => {
  const onToggleVisibility = () => {
    if (setVisibility) setVisibility(secureTextEntry);
    console.log(`secureTextEntry: ${secureTextEntry}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { textAlign: isArabic ? "right" : "left" }]}>
        {label}
      </Text>
      <View
        style={[styles.input_container, errorMessage && styles.error_border]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        {isIconVisible && (
          <TouchableOpacity
            onPress={onToggleVisibility}
            style={styles.eye_button}
          >
            <Text style={styles.eye_button_text}>
              {!secureTextEntry ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text
          style={[
            styles.error_text,
            { textAlign: isArabic ? "right" : "left" },
          ]}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    color: Colors.BLACK,
    marginBottom: 8,
    fontWeight: "500",
    ...Typography.bodyLarge,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.BLACK,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 4,
  },
  eye_button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  eye_button_text: {
    fontSize: 16,
  },
  error_border: {
    borderColor: Colors.RED,
  },
  error_text: {
    fontSize: 12,
    color: Colors.RED,
    marginTop: 4,
  },
});

export default Input;

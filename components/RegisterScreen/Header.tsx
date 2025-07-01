import { LanguageKey } from "@/constants/keys";
import { RegisterSteps } from "@/enums/register";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface HeaderProps {
  step: RegisterSteps;
  handleBack: () => void;
}

const Header: FC<HeaderProps> = ({ step, handleBack }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>myscan</Text>
      <Text style={styles.subtitle}>{i18n.t(LanguageKey.SIGN_UP)}</Text>
      {step === RegisterSteps.PASSWORD && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>
            ← {i18n.t(LanguageKey.BACK)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
    position: "relative",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.LIGHT_GREEN,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.CHARCOAL,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 40,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#F0B90B",
  },
});

export default Header;

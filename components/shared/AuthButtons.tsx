import { LanguageKey } from "@/constants/keys";
import { Colors } from "@/themes/colors";
import { StyleSheet, View } from "react-native";
import ActionButton from "./ActionButton";
import { Screens } from "@/constants/screens";
import { FC } from "react";

interface AuthButtonsProps {
  isArabic: boolean;
  redirectTo: (screen: string) => void;
}

const AuthButtons: FC<AuthButtonsProps> = ({ isArabic, redirectTo }) => {
  return (
    <View style={styles.container}>
      <ActionButton
        label={LanguageKey.LOG_IN}
        onPress={() => redirectTo(Screens.LOGIN_SCREEN)}
        isArabic={isArabic}
        containerStyles={styles.container_styles}
        buttonStyles={{
          backgroundColor: Colors.LIGHT_GREEN,
          ...styles.button_styles,
        }}
        buttonTextStyles={styles.button_text_styles}
      />
      <ActionButton
        label={LanguageKey.SIGN_UP}
        onPress={() => redirectTo(Screens.REGISTER_SCREEN)}
        isArabic={isArabic}
        containerStyles={styles.container_styles}
        buttonStyles={{
          backgroundColor: Colors.GLOVO_GREEN,
          ...styles.button_styles,
        }}
        buttonTextStyles={styles.button_text_styles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
  container_styles: {
    padding: 0,
    marginLeft: 5,
    width: "50%",
  },
  button_styles: {
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  button_text_styles: {
    color: Colors.WHITE,
  },
});

export default AuthButtons;

import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

interface ProfileScreenLoadingProps {
  isArabic?: boolean;
}

const ProfileScreenLoading: FC<ProfileScreenLoadingProps> = ({
  isArabic = false,
}) => {
  // Hooks
  const { t } = useTranslation();

  return (
    <View style={styles.loading_container}>
      <Text
        style={[
          styles.loading_text,
          { textAlign: isArabic ? "right" : "left" },
        ]}
      >
        {t(LanguageKey.LOADING_PROFILE)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading_text: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
});

export default ProfileScreenLoading;

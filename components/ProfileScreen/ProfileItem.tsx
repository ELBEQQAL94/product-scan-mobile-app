import { LanguageKey } from "@/constants/keys";
import { useTranslation } from "@/hooks/useTranslation";
import { i18n } from "@/i18n";
import { Colors } from "@/themes/colors";
import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | string[];
  isArabic?: boolean;
  isEdit?: boolean;
  onEdit?: () => void;
}

const ProfileItem: FC<ProfileItemProps> = ({
  icon,
  label,
  value,
  isArabic = false,
  isEdit = false,
  onEdit,
}) => {
  // Hooks
  const { t } = useTranslation();

  const displayValue =
    Array.isArray(value) && value.length > 0
      ? value.join(", ")
      : t(LanguageKey.NOT_SET);

  return (
    <View style={styles.profile_item}>
      <View
        style={[
          styles.item_header,
          { flexDirection: isArabic ? "row-reverse" : "row" },
        ]}
      >
        <View
          style={[
            styles.item_left,
            { flexDirection: isArabic ? "row-reverse" : "row" },
          ]}
        >
          {icon}
          <Text
            style={[
              styles.item_label,
              {
                marginLeft: isArabic ? 0 : 10,
                marginRight: isArabic ? 10 : 0,
                textAlign: isArabic ? "right" : "left",
              },
            ]}
          >
            {label}
          </Text>
        </View>
        {isEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.edit_button}>
            <FontAwesome name="edit" size={16} color={Colors.GLOVO_GREEN} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[
          styles.item_value,
          {
            marginLeft: isArabic ? 0 : 30,
            marginRight: isArabic ? 30 : 0,
            textAlign: isArabic ? "right" : "left",
          },
        ]}
      >
        {displayValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_item: {
    marginBottom: 15,
  },
  item_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  item_left: {
    flexDirection: "row",
    alignItems: "center",
  },
  item_label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    color: Colors.CHARCOAL,
  },
  item_value: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginLeft: 30,
    lineHeight: 20,
  },
  edit_button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.VERY_LIGHT_GRAY,
  },
});

export default ProfileItem;

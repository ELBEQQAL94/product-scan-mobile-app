import { Recommendations } from "@/types/scan-result";
import { FC } from "react";
import { Typography } from "@/themes/typography";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";

interface RecommendationItemProps {
  rec: Recommendations;
  index: number;
  showBorder: boolean;
  expandedItems: Set<number>;
  toggleExpansion: (index: number) => void;
}

const RecommendationItem: FC<RecommendationItemProps> = ({
  rec,
  index,
  expandedItems,
  showBorder = true,
  toggleExpansion,
}) => {
  const isExpanded = expandedItems.has(index);

  return (
    <TouchableOpacity
      key={index}
      style={[styles.container, { borderBottomWidth: showBorder ? 1 : 0 }]}
      onPress={() => toggleExpansion(index)}
      activeOpacity={0.7}
    >
      <View style={styles.content_container}>
        <View style={styles.text_container}>
          <Text
            style={[
              styles.recommendation_text,
              { marginBottom: isExpanded ? 12 : 0 },
            ]}
          >
            {rec.recommendation}
          </Text>

          {isExpanded && (
            <Text style={styles.explain_text}>{rec.explanation}</Text>
          )}
        </View>

        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={Colors.MEDIUM_GRAY}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  content_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  text_container: { flex: 1 },
  recommendation_text: {
    ...Typography.bodyLarge,
    fontWeight: "600",
    color: Colors.CHARCOAL,
    lineHeight: 24,
  },
  explain_text: {
    ...Typography.bodyMedium,
    color: Colors.DARK_GRAY,
    lineHeight: 22,
  },
  icon: { marginLeft: 16, marginTop: 2 },
});

export default RecommendationItem;

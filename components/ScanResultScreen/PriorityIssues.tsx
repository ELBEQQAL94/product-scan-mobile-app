import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import RecommendationItem from "./RecommendationItem";
import { Recommendations } from "@/types/scan-result";
import { Colors } from "@/themes/colors";

interface PriorityIssuesProps {
  expandedItems: Set<number>;
  toggleExpansion: (index: number) => void;
  priorityRecs: Recommendations[];
}

const PriorityIssues: FC<PriorityIssuesProps> = ({
  expandedItems,
  toggleExpansion,
  priorityRecs,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        {priorityRecs.map((rec: Recommendations, index: number) => (
          <RecommendationItem
            key={index}
            rec={rec}
            index={index}
            showBorder={index < priorityRecs.length - 1}
            expandedItems={expandedItems}
            toggleExpansion={toggleExpansion}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  content_container: {
    backgroundColor: Colors.VERY_LIGHT_GRAY,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
});

export default PriorityIssues;

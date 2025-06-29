import { Typography } from "@/themes/typography";
import { Recommendations } from "@/types/scan-result";
import { FC, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Severity } from "@/enums/scan-result-with-ai";
import RecommendationItem from "./RecommendationItem";
import { i18n } from "@/i18n";
import { LanguageKey } from "@/constants/keys";
import PriorityIssues from "./PriorityIssues";
import OverallAssessment from "./OverallAssessment";

interface PersonalizedMessageProps {
  recommendations: Recommendations[];
  isSubcriber: boolean;
}

const PersonalizedMessage: FC<PersonalizedMessageProps> = ({
  recommendations = [],
  isSubcriber,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Group recommendations by severity
  const criticalRecs = recommendations.filter(
    (rec: Recommendations) => rec.severity === Severity.CRITICAL
  );
  const highRecs = recommendations.filter(
    (rec) => rec.severity === Severity.HIGH
  );
  const moderateRecs = recommendations.filter(
    (rec: Recommendations) => rec.severity === Severity.MODERATE
  );
  const lowRecs = recommendations.filter(
    (rec: Recommendations) => rec.severity === Severity.LOW
  );

  // Combine critical and high for priority section
  const priorityRecs = [...criticalRecs, ...highRecs];

  const toggleExpansion = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const renderRecommendationItem = (
    rec: Recommendations,
    index: number,
    showBorder: boolean = true
  ) => {
    const isExpanded = expandedItems.has(index);

    return (
      <TouchableOpacity
        key={index}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 0,
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: "#f0f0f0",
        }}
        onPress={() => toggleExpansion(index)}
        activeOpacity={0.7}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...Typography.bodyLarge,
                fontWeight: "600",
                color: "#333",
                lineHeight: 24,
                marginBottom: isExpanded ? 12 : 0,
              }}
            >
              {rec.recommendation}
            </Text>

            {isExpanded && (
              <Text
                style={{
                  ...Typography.bodyMedium,
                  color: "#666",
                  lineHeight: 22,
                }}
              >
                {rec.explanation}
              </Text>
            )}
          </View>

          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#999"
            style={{ marginLeft: 16, marginTop: 2 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Don't render if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  // Helper function to determine overall assessment
  const getOverallAssessment = () => {
    const hasHighPriority = priorityRecs.length > 0;
    const hasOnlyModerate =
      moderateRecs.length > 0 && priorityRecs.length === 0;
    const hasOnlyPositive =
      lowRecs.length > 0 &&
      priorityRecs.length === 0 &&
      moderateRecs.length === 0;

    if (hasHighPriority) {
      return {
        title: i18n.t(LanguageKey.NOT_GOOD_FOR_YOU),
        subtitle: i18n.t(LanguageKey.THIS_PRODUCT_HAS_NEGATIVE_HEALTH_ASPECTS),
      };
    } else if (hasOnlyModerate) {
      return {
        title: i18n.t(LanguageKey.CONSIDER_CAREFULLY),
        subtitle: i18n.t(LanguageKey.SOME_POINTS_TOCONSIDER),
      };
    } else if (hasOnlyPositive) {
      return {
        title: i18n.t(LanguageKey.PERFECT_FOR_YOU),
        subtitle: i18n.t(LanguageKey.THIS_PRODUCT_HAS_POSITIVE_HEALTH_ASPECTS),
      };
    } else {
      return {
        title: i18n.t(LanguageKey.HEALTH_ANALYSIS),
        subtitle: i18n.t(LanguageKey.REVIEW_THE_INFORMATION_BELOW),
      };
    }
  };

  const assessment = getOverallAssessment();

  if (!isSubcriber) {
    return;
  }

  return (
    <View style={styles.container}>
      <OverallAssessment assessment={assessment} />
      {priorityRecs.length > 0 && (
        <PriorityIssues
          expandedItems={expandedItems}
          toggleExpansion={toggleExpansion}
          priorityRecs={priorityRecs}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 40 },
});

export default PersonalizedMessage;

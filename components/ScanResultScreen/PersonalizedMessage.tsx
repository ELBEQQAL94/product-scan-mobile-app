import { Recommendations } from "@/types/scan-result";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Severity } from "@/enums/scan-result-with-ai";
import { LanguageKey } from "@/constants/keys";
import PriorityIssues from "./PriorityIssues";
import OverallAssessment from "./OverallAssessment";
import { useTranslation } from "@/hooks/useTranslation";

interface PersonalizedMessageProps {
  score: number;
  recommendations: Recommendations[];
}

const PersonalizedMessage: FC<PersonalizedMessageProps> = ({
  score,
  recommendations = [],
}) => {
  // Hooks
  const { t } = useTranslation();

  // States
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Group recommendations by severity
  const criticalRecs = recommendations.filter(
    (rec: Recommendations) =>
      rec.severity.toLowerCase() === Severity.CRITICAL.toLowerCase()
  );
  const highRecs = recommendations.filter(
    (rec) => rec.severity.toLowerCase() === Severity.HIGH.toLowerCase()
  );
  const moderateRecs = recommendations.filter(
    (rec: Recommendations) =>
      rec.severity.toLowerCase() === Severity.MODERATE.toLowerCase()
  );
  const lowRecs = recommendations.filter(
    (rec: Recommendations) => rec.severity.toLowerCase() === Severity.LOW
  );

  // Combine critical and high for priority section
  const priorityRecs = [
    ...criticalRecs,
    ...highRecs,
    ...lowRecs,
    ...moderateRecs,
  ];

  const toggleExpansion = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  // Don't render if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  // Helper function to determine overall assessment
  const getOverallAssessment = () => {
    if (score < 50) {
      return {
        title: t(LanguageKey.NOT_GOOD_FOR_YOU),
        subtitle: t(LanguageKey.THIS_PRODUCT_HAS_NEGATIVE_HEALTH_ASPECTS),
      };
    } else if (score <= 50) {
      return {
        title: t(LanguageKey.CONSIDER_CAREFULLY),
        subtitle: t(LanguageKey.SOME_POINTS_TOCONSIDER),
      };
    } else {
      return {
        title: t(LanguageKey.PERFECT_FOR_YOU),
        subtitle: t(LanguageKey.THIS_PRODUCT_HAS_POSITIVE_HEALTH_ASPECTS),
      };
    }
  };

  const assessment = getOverallAssessment();

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

import { Recommendations } from "@/types/scan-result";
import { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Severity } from "@/enums/scan-result-with-ai";
import { LanguageKey } from "@/constants/keys";
import PriorityIssues from "./PriorityIssues";
import OverallAssessment from "./OverallAssessment";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { Screens } from "@/constants/screens";

interface PersonalizedMessageProps {
  score: number;
  recommendations: Recommendations[];
  isSubscribed: boolean;
}

interface Assessment {
  color: string;
  title: string;
  subtitle: string;
}

const PersonalizedMessage: FC<PersonalizedMessageProps> = ({
  score,
  recommendations = [],
  isSubscribed = false,
}) => {
  // Hooks
  const { t } = useTranslation();
  const { redirect_to } = useCustomRouter();

  const redirect_to_pricing = () => redirect_to(Screens.PRICING_SCREEN);

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
  const getOverallAssessment = (): Assessment | undefined => {
    if (score < 50) {
      return {
        color: Colors.RED,
        title: t(LanguageKey.NOT_GOOD_FOR_YOU),
        subtitle: t(LanguageKey.THIS_PRODUCT_HAS_NEGATIVE_HEALTH_ASPECTS),
      };
    } else if (score <= 50) {
      return {
        color: Colors.ORANGE,
        title: t(LanguageKey.CONSIDER_CAREFULLY),
        subtitle: t(LanguageKey.SOME_POINTS_TOCONSIDER),
      };
    } else if (score >= 50) {
      return {
        color: Colors.LIGHT_GREEN,
        title: t(LanguageKey.PERFECT_FOR_YOU),
        subtitle: t(LanguageKey.THIS_PRODUCT_HAS_POSITIVE_HEALTH_ASPECTS),
      };
    }
    return;
  };

  const assessment = getOverallAssessment();

  if (!isSubscribed) {
    return (
      <View style={styles.subscriptionPromptContainer}>
        <View style={styles.subscriptionPrompt}>
          <Text style={styles.subscriptionTitle}>
            🔒 {t(LanguageKey.PREMIUM_CONTENT)}
          </Text>
          <Text style={styles.subscriptionSubtitle}>
            {t(LanguageKey.SUBSCRIBE_TO_UNLOCK)}
          </Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={redirect_to_pricing}
          >
            <Text style={styles.upgradeButtonText}>
              {t(LanguageKey.UPGRADE_NOW)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <OverallAssessment assessment={assessment} />
        {priorityRecs.length > 0 && (
          <PriorityIssues
            expandedItems={expandedItems}
            toggleExpansion={toggleExpansion}
            priorityRecs={priorityRecs}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  upgradeOnlyContainer: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  subscriptionPromptContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginTop: 20,
  },
  subscriptionPrompt: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  subscriptionTitle: {
    color: "#1a1a1a",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subscriptionSubtitle: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 280,
  },
  upgradeTitle: {
    color: "#1a1a1a",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  upgradeSubtitle: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 280,
  },
  upgradeButton: {
    backgroundColor: Colors.GLOVO_GREEN,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 160,
  },
  upgradeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PersonalizedMessage;

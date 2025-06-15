import { Typography } from "@/themes/typography";
import { Recommendations } from "@/types/scan-result";
import { FC, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PersonalizedMessageProps {
  recommendations: Recommendations[];
}

const PersonalizedMessage: FC<PersonalizedMessageProps> = ({
  recommendations,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Group recommendations by severity
  const criticalRecs = recommendations.filter(
    (rec) => rec.severity === "critical"
  );
  const highRecs = recommendations.filter((rec) => rec.severity === "high");
  const moderateRecs = recommendations.filter(
    (rec) => rec.severity === "moderate"
  );
  const lowRecs = recommendations.filter((rec) => rec.severity === "low");

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
        title: "Not good for you",
        subtitle: "This product has health concerns you should know about",
      };
    } else if (hasOnlyModerate) {
      return {
        title: "Consider carefully",
        subtitle: "Some points to consider before purchasing",
      };
    } else if (hasOnlyPositive) {
      return {
        title: "Perfect for you",
        subtitle: "This product has positive health aspects",
      };
    } else {
      return {
        title: "Health analysis",
        subtitle: "Review the information below",
      };
    }
  };

  const assessment = getOverallAssessment();

  return (
    <View style={{ marginTop: 40 }}>
      {/* Overall Assessment Section */}
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            ...Typography.h1,
            color: "#000",
            marginBottom: 8,
            fontWeight: "800",
            letterSpacing: -0.8,
            textAlign: "center",
          }}
        >
          {assessment.title}
        </Text>

        <Text
          style={{
            ...Typography.bodyLarge,
            color: "#666",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          {assessment.subtitle}
        </Text>
      </View>

      {/* Priority Issues Section */}
      {priorityRecs.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fafafa",
              borderRadius: 8,
              padding: 20,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            {priorityRecs.map((rec, index) =>
              renderRecommendationItem(
                rec,
                index,
                index < priorityRecs.length - 1
              )
            )}
          </View>
        </View>
      )}

      {/* Additional Considerations */}
      {moderateRecs.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#fbfbfb",
              borderRadius: 8,
              padding: 20,
              borderWidth: 1,
              borderColor: "#e8e8e8",
            }}
          >
            {moderateRecs.map((rec, index) =>
              renderRecommendationItem(
                rec,
                priorityRecs.length + index,
                index < moderateRecs.length - 1
              )
            )}
          </View>
        </View>
      )}

      {/* Positive Points */}
      {lowRecs.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
              padding: 20,
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            {lowRecs.map((rec, index) =>
              renderRecommendationItem(
                rec,
                priorityRecs.length + moderateRecs.length + index,
                index < lowRecs.length - 1
              )
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default PersonalizedMessage;

// Alternative ultra-minimal version with just bullet points
export const MinimalListRecommendations: FC<PersonalizedMessageProps> = ({
  recommendations,
}) => {
  const criticalAndHigh = recommendations.filter(
    (rec) => rec.severity === "critical" || rec.severity === "high"
  );
  const moderate = recommendations.filter((rec) => rec.severity === "moderate");
  const low = recommendations.filter((rec) => rec.severity === "low");

  return (
    <View style={{ marginTop: 40 }}>
      {/* High Priority */}
      {criticalAndHigh.length > 0 && (
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              ...Typography.h2,
              color: "#000",
              marginBottom: 16,
              fontWeight: "700",
            }}
          >
            Health Concerns
          </Text>

          {criticalAndHigh.map((rec, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text
                style={{
                  ...Typography.bodyLarge,
                  color: "#333",
                  lineHeight: 24,
                }}
              >
                • {rec.recommendation}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Moderate Priority */}
      {moderate.length > 0 && (
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              ...Typography.h3,
              color: "#000",
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Consider This
          </Text>

          {moderate.map((rec, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text
                style={{
                  ...Typography.bodyMedium,
                  color: "#555",
                  lineHeight: 22,
                }}
              >
                • {rec.recommendation}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Positive */}
      {low.length > 0 && (
        <View>
          <Text
            style={{
              ...Typography.h3,
              color: "#000",
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Good Points
          </Text>

          {low.map((rec, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text
                style={{
                  ...Typography.bodyMedium,
                  color: "#555",
                  lineHeight: 22,
                }}
              >
                • {rec.recommendation}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Super clean card-based version
export const CardBasedRecommendations: FC<PersonalizedMessageProps> = ({
  recommendations,
}) => {
  return (
    <View style={{ marginTop: 40 }}>
      <Text
        style={{
          ...Typography.h2,
          color: "#000",
          marginBottom: 24,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Health Analysis
      </Text>

      {recommendations.map((rec, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderWidth: 1,
            borderColor: "#f0f0f0",
          }}
        >
          <Text
            style={{
              ...Typography.bodyLarge,
              fontWeight: "600",
              color: "#333",
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            {rec.recommendation}
          </Text>

          <Text
            style={{
              ...Typography.bodyMedium,
              color: "#666",
              lineHeight: 22,
            }}
          >
            {rec.explanation}
          </Text>

          <Text
            style={{
              ...Typography.caption,
              color: "#999",
              marginTop: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {rec.severity} priority
          </Text>
        </View>
      ))}
    </View>
  );
};

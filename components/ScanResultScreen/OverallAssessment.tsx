import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface OverallAssessmentProps {
  assessment?: {
    color: string;
    title: string;
    subtitle: string;
  };
}

const OverallAssessment: FC<OverallAssessmentProps> = ({ assessment }) => {
  if (!assessment) return;
  return (
    <View style={styles.container}>
      <Text style={[styles.assessment_title, { color: assessment.color }]}>
        {assessment.title}
      </Text>
      <Text style={styles.assessment_subtitle}>{assessment.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  assessment_title: {
    ...Typography.h1,
    marginBottom: 8,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
  },
  assessment_subtitle: {
    ...Typography.bodyLarge,
    color: Colors.DARK_GRAY,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default OverallAssessment;

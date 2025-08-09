import { IHalalScanResult } from "@/constants/responses";
import { HalalCheckStatus } from "@/enums/scan-result-with-ai";
import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface HalalScanResultSummaryProps {
  data: IHalalScanResult;
}

const HalalScanResultSummary: FC<HalalScanResultSummaryProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.status,
          {
            color:
              data.status === HalalCheckStatus.HALAL
                ? Colors.LIGHT_GREEN
                : Colors.RED,
          },
        ]}
      >
        {data.status}
      </Text>
      <Text style={styles.summary}>{data.summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  status: {
    marginBottom: 10,
    textAlign: "center",
    ...Typography.h2,
  },
  summary: { ...Typography.bodyLarge },
});

export default HalalScanResultSummary;

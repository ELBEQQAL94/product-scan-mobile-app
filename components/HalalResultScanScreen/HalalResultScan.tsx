import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductImage from "../shared/ProductImage";
import { HalalProductResponse } from "@/types/scan-result";
import { Typography } from "@/themes/typography";
import { Colors } from "@/themes/colors";
import { Language } from "@/enums/language";
import { HalalCheckStatus } from "@/enums/scan-result-with-ai";
import { i18n } from "@/i18n";

interface HalalResultScanProps {
  imageUri: string;
  halaScanResult: HalalProductResponse;
  currentLanguage: string;
}

const HalalResultScan: FC<HalalResultScanProps> = ({
  imageUri,
  halaScanResult,
  currentLanguage,
}) => {
  const is_arabic = currentLanguage === Language.AR;

  return (
    <View>
      <ProductImage imageUri={imageUri} />
      <View style={styles.container}>
        <Text
          style={[
            styles.status_text,
            {
              color:
                halaScanResult.status === HalalCheckStatus.HALAL
                  ? Colors.LIGHT_GREEN
                  : Colors.RED,
            },
          ]}
        >
          {i18n.t(halaScanResult.status)}
        </Text>
        <Text
          style={[
            styles.summary,
            {
              textAlign: is_arabic ? "right" : "left",
              ...Typography.bodyLarge,
            },
          ]}
        >
          {halaScanResult.summary}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  status_text: {
    textAlign: "center",
    marginBottom: 20,
    ...Typography.h2,
  },
  summary: {
    ...Typography.bodyLarge,
  },
});

export default HalalResultScan;

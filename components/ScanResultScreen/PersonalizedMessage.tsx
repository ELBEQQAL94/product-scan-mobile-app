import { Typography } from "@/themes/typography";
import { FC } from "react";
import { Text, View } from "react-native";

const PersonalizedMessage: FC = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ ...Typography.h3, marginBottom: 10 }}>
        Perfect for you
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ ...Typography.bodyLarge }}>Low sugar (diabetes)</Text>
        <Text style={{ ...Typography.bodyLarge }}>High protein</Text>
        <Text style={{ ...Typography.bodyLarge }}>No additives</Text>
      </View>
      <View>
        <Text style={{ ...Typography.bodyLarge }}>Note: High in sodium</Text>
      </View>
    </View>
  );
};

export default PersonalizedMessage;

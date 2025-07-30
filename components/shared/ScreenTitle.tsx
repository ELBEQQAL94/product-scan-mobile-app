import { Typography } from "@/themes/typography";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScreenTitleProps {
  title: string;
}

const ScreenTitle: FC<ScreenTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    padding: 20,
  },
  text: {
    textAlign: "center",
    ...Typography.h2,
  },
});

export default ScreenTitle;

import { Colors } from "@/themes/colors";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

const Header: FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>myscan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
    position: "relative",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.LIGHT_GREEN,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.CHARCOAL,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 40,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#F0B90B",
  },
});

export default Header;

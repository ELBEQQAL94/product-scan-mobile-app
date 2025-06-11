import { FC } from "react";
import { View, Text } from "react-native";

const Scan: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Scan</Text>
    </View>
  );
};

export default Scan;

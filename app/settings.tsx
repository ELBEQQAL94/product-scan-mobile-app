import { FC } from "react";
import { View, Text } from "react-native";

const Settings: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

import { FC } from "react";
import { View, Text } from "react-native";

const Profile: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Product List</Text>
    </View>
  );
};

export default Profile;

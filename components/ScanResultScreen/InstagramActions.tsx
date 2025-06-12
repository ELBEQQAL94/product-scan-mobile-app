import { Colors } from "@/themes/colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { View, Text, Dimensions } from "react-native";

const InstagramActions: FC = () => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 1,
        top: screenHeight / 2 - 60,
        right: 15,
        zIndex: 10,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        {/* <AntDesign name="hearto" size={30} color={Colors.GLOVO_GREEN} /> */}
        <FontAwesome name="heart" size={30} color={Colors.GLOVO_GREEN} />
        <Text style={{ textAlign: "center", fontSize: 18 }}>20</Text>
      </View>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <FontAwesome name="commenting-o" size={30} color={Colors.GLOVO_GREEN} />
        <Text style={{ textAlign: "center", fontSize: 18 }}>20</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <FontAwesome name="share" size={30} color={Colors.GLOVO_GREEN} />
        <Text style={{ textAlign: "center", fontSize: 18 }}>12</Text>
      </View>
    </View>
  );
};

export default InstagramActions;

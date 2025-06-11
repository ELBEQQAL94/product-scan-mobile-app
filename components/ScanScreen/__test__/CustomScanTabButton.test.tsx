// const CustomScanTabButton: FC<CustomScanTabButtonProps> = ({ focused }) => {
//   return (
//     <View
//       style={[
//         styles.scan_tab_button,
//         { backgroundColor: focused ? Colors.GLOVO_GREEN : Colors.GLOVO_GREEN },
//       ]}
//     >
//       <MaterialCommunityIcons name="barcode-scan" size={28} color="white" />
//     </View>
//   );
// };

import { render, screen } from "@testing-library/react-native";
import CustomScanTabButton, {
  CustomScanTabButton_TEST_ID,
  Icon_CustomScanTabButton_TEST_ID,
} from "../CustomScanTabButton";

jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: () => {
    const { Text } = require("react-native");
    return (
      <Text testID={"Icon_CustomScanTabButton"}>MaterialCommunityIcons</Text>
    );
  },
}));

describe("CustomScanTabButton", () => {
  it("check component rendering", () => {
    render(<CustomScanTabButton focused={false} />);

    const component = screen.getByTestId(CustomScanTabButton_TEST_ID);
    const icon = screen.getByTestId(Icon_CustomScanTabButton_TEST_ID);

    expect(component).toBeTruthy();
    expect(icon).toBeTruthy();
  });
});

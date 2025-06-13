import { render, screen } from "@testing-library/react-native";
import BottomControls, { BOTTOM_CONTROLS_TEST_ID } from "../BottomControls";

jest.mock("@expo/vector-icons");

describe("BottomControls", () => {
  it("check component rendering", () => {
    render(
      <BottomControls
        isManualMode={false}
        toggleMode={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    const component = screen.getByTestId(BOTTOM_CONTROLS_TEST_ID);

    expect(component).toBeTruthy();
  });
});

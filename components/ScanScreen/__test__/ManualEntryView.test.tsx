import { render, screen } from "@testing-library/react-native";
import ManualEntryView, {
  MANUAL_ENTRY_VIEW_CONTAINER_TEST_ID,
} from "../ManualEntryView";
import { Animated } from "react-native";

jest.mock("@expo/vector-icons");

describe("ManualEntryView", () => {
  it("check component rendering", () => {
    render(
      <ManualEntryView
        slideAnim={new Animated.Value(1)}
        isManualMode={false}
        inputRef={undefined}
        manualBarcode={""}
        isProcessing={false}
        setManualBarcode={function (text: string): void {
          throw new Error("Function not implemented.");
        }}
        handleManualSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    const component = screen.getByTestId(MANUAL_ENTRY_VIEW_CONTAINER_TEST_ID);

    expect(component).toBeTruthy();
  });
});

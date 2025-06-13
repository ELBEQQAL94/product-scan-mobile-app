import { render, screen } from "@testing-library/react-native";
import CameraViewContainer, {
  CAMERA_VIEW_CONTAINER_TEST_ID,
} from "../CameraViewContainer";
import { BarcodeScanningResult } from "expo-camera";

jest.mock("@expo/vector-icons");

describe("CameraViewContainer", () => {
  it("check component rendering", () => {
    render(
      <CameraViewContainer
        handleBarcodeScanned={function (
          result: BarcodeScanningResult
        ): Promise<void> {
          throw new Error("Function not implemented.");
        }}
        isManualMode={false}
        scanned={false}
      />
    );

    const component = screen.getByTestId(CAMERA_VIEW_CONTAINER_TEST_ID);

    expect(component).toBeTruthy();
  });
});

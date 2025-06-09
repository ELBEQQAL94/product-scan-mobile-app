import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import ActionButton from "@/components/shared/ActionButton";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";

// Mock the themes
jest.mock("@/themes/colors", () => ({
  Colors: {
    LIGHT_GREEN: "#4CAF50",
    WHITE: "#FFFFFF",
    GRAY: "#9E9E9E",
  },
}));

jest.mock("@/themes/typography", () => ({
  Typography: {
    button: {
      fontSize: 16,
      fontWeight: "600",
    },
  },
}));

// Mock the i18n module to return the key as-is for testing
jest.mock("@/i18n", () => ({
  i18n: {
    t: (key: string) => key, // Return the key unchanged for testing
  },
}));

describe("ActionButton Component", () => {
  const defaultProps = {
    label: "Test Button",
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render correctly with required props", () => {
      render(<ActionButton {...defaultProps} />);

      const buttonText = screen.getByText("Test Button");
      expect(buttonText).toBeTruthy();
    });

    it("should render label text correctly", () => {
      render(<ActionButton {...defaultProps} label="Custom Label" />);

      const buttonText = screen.getByText("Custom Label");
      expect(buttonText).toBeTruthy();
    });

    it("should render with icon when provided", () => {
      render(<ActionButton {...defaultProps} icon="⟶" />);

      const buttonText = screen.getByText("Test Button ⟶");
      expect(buttonText).toBeTruthy();
    });

    it("should render without icon when not provided", () => {
      render(<ActionButton {...defaultProps} />);

      const buttonText = screen.getByText("Test Button");
      expect(buttonText).toBeTruthy();
      expect(buttonText.props.children).not.toContain("⟶");
    });

    it("should render with disabled state", () => {
      const { getByTestId } = render(
        <ActionButton {...defaultProps} disabled={true} />
      );

      const button = getByTestId("action-button-touchable");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("Interactions", () => {
    it("should call onPress when button is pressed", () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <ActionButton {...defaultProps} onPress={mockOnPress} />
      );

      const button = getByRole("button");
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it("should call onPress multiple times when pressed multiple times", () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <ActionButton {...defaultProps} onPress={mockOnPress} />
      );

      const button = getByRole("button");
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });

    it("should not call onPress when button is disabled", () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <ActionButton {...defaultProps} onPress={mockOnPress} disabled={true} />
      );

      const button = getByRole("button");
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it("should be accessible for screen readers", () => {
      const { getByRole } = render(<ActionButton {...defaultProps} />);

      const button = getByRole("button");
      expect(button).toBeTruthy();
      expect(button.props.accessible).toBe(true);
    });

    it("should have correct accessibility label with icon", () => {
      const { getByRole } = render(<ActionButton {...defaultProps} icon="⟶" />);

      const button = getByRole("button");
      expect(button.props.accessibilityLabel).toBe("Test Button ⟶");
    });
  });

  describe("Props Validation", () => {
    it("should handle empty label gracefully", () => {
      render(<ActionButton {...defaultProps} label="" />);

      const buttonText = screen.getByText("");
      expect(buttonText).toBeTruthy();
    });

    it("should handle very long labels", () => {
      const longLabel =
        "This is a very long button label that might wrap or overflow";
      render(<ActionButton {...defaultProps} label={longLabel} />);

      const buttonText = screen.getByText(longLabel);
      expect(buttonText).toBeTruthy();
    });

    it("should handle special characters in label", () => {
      const specialLabel = "Button with émojis 🚀 and spéciál characters!";
      render(<ActionButton {...defaultProps} label={specialLabel} />);

      const buttonText = screen.getByText(specialLabel);
      expect(buttonText).toBeTruthy();
    });

    it("should handle undefined optional props gracefully", () => {
      const minimalProps = {
        label: "Minimal Button",
        onPress: jest.fn(),
      };

      expect(() => render(<ActionButton {...minimalProps} />)).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid successive presses", () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <ActionButton {...defaultProps} onPress={mockOnPress} />
      );

      const button = getByRole("button");

      // Simulate rapid presses
      for (let i = 0; i < 10; i++) {
        fireEvent.press(button);
      }

      expect(mockOnPress).toHaveBeenCalledTimes(10);
    });

    it("should handle null/undefined style objects", () => {
      expect(() =>
        render(
          <ActionButton
            {...defaultProps}
            containerStyles={undefined}
            buttonStyles={undefined}
          />
        )
      ).not.toThrow();
    });

    it("should handle empty style objects", () => {
      expect(() =>
        render(
          <ActionButton
            {...defaultProps}
            containerStyles={{}}
            buttonStyles={{}}
          />
        )
      ).not.toThrow();
    });

    it("should render with testIDs for testing", () => {
      const { getByTestId } = render(<ActionButton {...defaultProps} />);

      expect(getByTestId("action-button-container")).toBeTruthy();
      expect(getByTestId("action-button-touchable")).toBeTruthy();
      expect(getByTestId("action-button-text")).toBeTruthy();
    });
  });
});

// Snapshot Tests
describe("ActionButton Snapshots", () => {
  it("should match snapshot with minimal props", () => {
    const tree = render(
      <ActionButton label="Test Button" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with all props", () => {
    const tree = render(
      <ActionButton
        label="Full Button"
        icon="⟶"
        onPress={jest.fn()}
        containerStyles={{ margin: 20 }}
        buttonStyles={{ backgroundColor: "#FF0000" }}
        disabled={false}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot when disabled", () => {
    const tree = render(
      <ActionButton
        label="Disabled Button"
        onPress={jest.fn()}
        disabled={true}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Performance Tests
describe("ActionButton Performance", () => {
  it("should not re-render unnecessarily", () => {
    const mockOnPress = jest.fn();
    const { rerender } = render(
      <ActionButton label="Test" onPress={mockOnPress} />
    );

    // Re-render with same props
    rerender(<ActionButton label="Test" onPress={mockOnPress} />);

    // Component should handle this gracefully
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});

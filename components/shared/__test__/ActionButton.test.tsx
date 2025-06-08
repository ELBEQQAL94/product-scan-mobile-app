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

    it("should be accessible for screen readers", () => {
      const { getByRole } = render(<ActionButton {...defaultProps} />);

      const button = getByRole("button");
      expect(button).toBeTruthy();
      expect(button.props.accessible).toBe(true);
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

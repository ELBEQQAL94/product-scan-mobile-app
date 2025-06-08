import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Animated } from "react-native";
import CheckMark from "@/components/HealthSetup/CheckMark";

// Mock the themes
jest.mock("@/themes/colors", () => ({
  Colors: {
    YELLOW: "#FFD700",
    LIGHT_GREEN: "#4CAF50",
  },
}));

describe("CheckMark Component - Render and Content Tests", () => {
  let mockCheckmarkScale: Animated.Value;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckmarkScale = new Animated.Value(0);
  });

  describe("Component Rendering", () => {
    it("should render the checkmark container", () => {
      render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      expect(container).toBeTruthy();
    });

    it("should render the checkmark text", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const text = screen.getByTestId("checkmark-text");
      expect(text).toBeTruthy();
    });

    it("should render both container and text elements", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
    });
  });

  describe("Component Content", () => {
    it("should display the correct checkmark symbol", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const text = screen.getByTestId("checkmark-text");
      expect(text.props.children).toBe("✓");
    });

    it("should display checkmark symbol regardless of selection state", () => {
      const { rerender } = render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      let text = screen.getByTestId("checkmark-text");
      expect(text.props.children).toBe("✓");

      rerender(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      text = screen.getByTestId("checkmark-text");
      expect(text.props.children).toBe("✓");
    });

    it("should display only one checkmark symbol", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const checkmarkTexts = screen.getAllByText("✓");
      expect(checkmarkTexts).toHaveLength(1);
    });
  });

  describe("TestID Presence", () => {
    it("should have correct testID for container", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      expect(container).toBeTruthy();
    });

    it("should have correct testID for text", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const text = screen.getByTestId("checkmark-text");
      expect(text).toBeTruthy();
    });
  });

  describe("Component Structure", () => {
    it("should maintain consistent structure when not selected", () => {
      render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
      expect(text.props.children).toBe("✓");
    });

    it("should maintain consistent structure when selected", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
      expect(text.props.children).toBe("✓");
    });

    it("should maintain structure across re-renders", () => {
      const { rerender } = render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      let container = screen.getByTestId("checkmark-container");
      let text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();

      rerender(
        <CheckMark isSelected={true} checkmarkScale={new Animated.Value(1)} />
      );

      container = screen.getByTestId("checkmark-container");
      text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
    });
  });

  describe("Props Handling", () => {
    it("should render with isSelected false", () => {
      render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
    });

    it("should render with isSelected true", () => {
      render(
        <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
      );

      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
    });

    it("should render with different Animated.Value instances", () => {
      const scale1 = new Animated.Value(0);
      const scale2 = new Animated.Value(1);

      const { rerender } = render(
        <CheckMark isSelected={true} checkmarkScale={scale1} />
      );

      let container = screen.getByTestId("checkmark-container");
      let text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();

      rerender(<CheckMark isSelected={true} checkmarkScale={scale2} />);

      container = screen.getByTestId("checkmark-container");
      text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("should not crash with rapid prop changes", () => {
      const { rerender } = render(
        <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
      );

      // Rapidly change props multiple times
      for (let i = 0; i < 5; i++) {
        expect(() => {
          rerender(
            <CheckMark
              isSelected={i % 2 === 0}
              checkmarkScale={new Animated.Value(i)}
            />
          );
        }).not.toThrow();
      }

      // Verify component still renders correctly
      const container = screen.getByTestId("checkmark-container");
      const text = screen.getByTestId("checkmark-text");

      expect(container).toBeTruthy();
      expect(text).toBeTruthy();
      expect(text.props.children).toBe("✓");
    });
  });
});

// Snapshot Tests - Content Focused
describe("CheckMark Snapshots - Content Verification", () => {
  let mockCheckmarkScale: Animated.Value;

  beforeEach(() => {
    mockCheckmarkScale = new Animated.Value(0);
  });

  it("should match snapshot when not selected", () => {
    const tree = render(
      <CheckMark isSelected={false} checkmarkScale={mockCheckmarkScale} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot when selected", () => {
    const tree = render(
      <CheckMark isSelected={true} checkmarkScale={mockCheckmarkScale} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

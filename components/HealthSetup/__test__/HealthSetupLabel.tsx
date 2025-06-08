import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Animated } from "react-native";
import HealthSetupLabel from "@/components/HealthSetup/HealthSetupLabel";

// Mock i18n
jest.mock("@/i18n", () => ({
  i18n: {
    t: jest.fn((key) => `translated_${key}`),
  },
}));

// Mock the themes
jest.mock("@/themes/colors", () => ({
  Colors: {
    WHITE: "#FFFFFF",
  },
}));

// Import after mocking
import { i18n } from "@/i18n";

describe("HealthSetupLabel Component - Render and Content Tests", () => {
  let mockIconBounceAnim: Animated.Value;

  const defaultProps = {
    name: "diabetes",
    icon: "💊",
    iconBounceAnim: new Animated.Value(1),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockIconBounceAnim = new Animated.Value(1);
    // Reset i18n mock
    (i18n.t as jest.Mock).mockImplementation((key) => `translated_${key}`);
  });

  describe("Component Rendering", () => {
    it("should render the container", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const container = screen.getByTestId("health-setup-label-container");
      expect(container).toBeTruthy();
    });

    it("should render the icon element", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const icon = screen.getByTestId("health-setup-label-icon");
      expect(icon).toBeTruthy();
    });

    it("should render the text element", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const text = screen.getByTestId("health-setup-label-text");
      expect(text).toBeTruthy();
    });

    it("should render all elements together", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const container = screen.getByTestId("health-setup-label-container");
      const icon = screen.getByTestId("health-setup-label-icon");
      const text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
    });
  });

  describe("Component Content", () => {
    it("should display the correct icon", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          icon="🏃‍♂️"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const icon = screen.getByTestId("health-setup-label-icon");
      expect(icon.props.children).toBe("🏃‍♂️");
    });

    it("should display different icons correctly", () => {
      const { rerender } = render(
        <HealthSetupLabel
          {...defaultProps}
          icon="💊"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      let icon = screen.getByTestId("health-setup-label-icon");
      expect(icon.props.children).toBe("💊");

      rerender(
        <HealthSetupLabel
          {...defaultProps}
          icon="❤️"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      icon = screen.getByTestId("health-setup-label-icon");
      expect(icon.props.children).toBe("❤️");
    });

    it("should display translated text", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          name="diabetes"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const text = screen.getByTestId("health-setup-label-text");
      expect(text.props.children).toBe("translated_diabetes");
      expect(i18n.t).toHaveBeenCalledWith("diabetes");
    });

    it("should translate different text keys", () => {
      const { rerender } = render(
        <HealthSetupLabel
          {...defaultProps}
          name="heart_disease"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      let text = screen.getByTestId("health-setup-label-text");
      expect(text.props.children).toBe("translated_heart_disease");
      expect(i18n.t).toHaveBeenCalledWith("heart_disease");

      rerender(
        <HealthSetupLabel
          {...defaultProps}
          name="arthritis"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      text = screen.getByTestId("health-setup-label-text");
      expect(text.props.children).toBe("translated_arthritis");
      expect(i18n.t).toHaveBeenCalledWith("arthritis");
    });

    it("should call i18n.t with correct parameters", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          name="custom_condition"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      expect(i18n.t).toHaveBeenCalledTimes(1);
      expect(i18n.t).toHaveBeenCalledWith("custom_condition");
    });
  });

  describe("TestID Presence", () => {
    it("should have correct testID for container", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const container = screen.getByTestId("health-setup-label-container");
      expect(container).toBeTruthy();
    });

    it("should have correct testID for icon", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const icon = screen.getByTestId("health-setup-label-icon");
      expect(icon).toBeTruthy();
    });

    it("should have correct testID for text", () => {
      render(
        <HealthSetupLabel
          {...defaultProps}
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const text = screen.getByTestId("health-setup-label-text");
      expect(text).toBeTruthy();
    });
  });

  describe("Component Structure", () => {
    it("should maintain consistent structure with different props", () => {
      render(
        <HealthSetupLabel
          name="condition1"
          icon="🔥"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const container = screen.getByTestId("health-setup-label-container");
      const icon = screen.getByTestId("health-setup-label-icon");
      const text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
      expect(icon.props.children).toBe("🔥");
      expect(text.props.children).toBe("translated_condition1");
    });

    it("should maintain structure across re-renders", () => {
      const { rerender } = render(
        <HealthSetupLabel
          name="initial"
          icon="⭐"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      let container = screen.getByTestId("health-setup-label-container");
      let icon = screen.getByTestId("health-setup-label-icon");
      let text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();

      rerender(
        <HealthSetupLabel
          name="updated"
          icon="🌟"
          iconBounceAnim={new Animated.Value(2)}
        />
      );

      container = screen.getByTestId("health-setup-label-container");
      icon = screen.getByTestId("health-setup-label-icon");
      text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
      expect(icon.props.children).toBe("🌟");
      expect(text.props.children).toBe("translated_updated");
    });
  });

  describe("Props Handling", () => {
    it("should handle empty string name", () => {
      render(
        <HealthSetupLabel
          name=""
          icon="💊"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const text = screen.getByTestId("health-setup-label-text");
      expect(text).toBeTruthy();
      expect(i18n.t).toHaveBeenCalledWith("");
    });

    it("should handle empty string icon", () => {
      render(
        <HealthSetupLabel
          name="diabetes"
          icon=""
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const icon = screen.getByTestId("health-setup-label-icon");
      expect(icon).toBeTruthy();
      expect(icon.props.children).toBe("");
    });

    it("should handle different Animated.Value instances", () => {
      const scale1 = new Animated.Value(0.5);
      const scale2 = new Animated.Value(1.5);

      const { rerender } = render(
        <HealthSetupLabel {...defaultProps} iconBounceAnim={scale1} />
      );

      let container = screen.getByTestId("health-setup-label-container");
      let icon = screen.getByTestId("health-setup-label-icon");
      let text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();

      rerender(<HealthSetupLabel {...defaultProps} iconBounceAnim={scale2} />);

      container = screen.getByTestId("health-setup-label-container");
      icon = screen.getByTestId("health-setup-label-icon");
      text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
    });

    it("should handle special characters in name", () => {
      render(
        <HealthSetupLabel
          name="special!@#$%"
          icon="🔥"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const text = screen.getByTestId("health-setup-label-text");
      expect(text).toBeTruthy();
      expect(i18n.t).toHaveBeenCalledWith("special!@#$%");
    });

    it("should handle unicode characters in icon", () => {
      render(
        <HealthSetupLabel
          name="diabetes"
          icon="🏥👩‍⚕️💉"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      const icon = screen.getByTestId("health-setup-label-icon");
      expect(icon.props.children).toBe("🏥👩‍⚕️💉");
    });
  });

  describe("Error Handling", () => {
    it("should not crash with rapid prop changes", () => {
      const { rerender } = render(
        <HealthSetupLabel
          name="initial"
          icon="⭐"
          iconBounceAnim={mockIconBounceAnim}
        />
      );

      // Rapidly change props multiple times
      for (let i = 0; i < 5; i++) {
        expect(() => {
          rerender(
            <HealthSetupLabel
              name={`condition_${i}`}
              icon={`🔥${i}`}
              iconBounceAnim={new Animated.Value(i)}
            />
          );
        }).not.toThrow();
      }

      // Verify component still renders correctly
      const container = screen.getByTestId("health-setup-label-container");
      const icon = screen.getByTestId("health-setup-label-icon");
      const text = screen.getByTestId("health-setup-label-text");

      expect(container).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
    });

    it("should handle i18n translation errors gracefully", () => {
      // Mock i18n to throw an error
      (i18n.t as jest.Mock).mockImplementation(() => {
        throw new Error("Translation error");
      });

      expect(() => {
        render(
          <HealthSetupLabel
            name="diabetes"
            icon="💊"
            iconBounceAnim={mockIconBounceAnim}
          />
        );
      }).toThrow("Translation error");
    });
  });
});

// Snapshot Tests - Content Focused
describe("HealthSetupLabel Snapshots - Content Verification", () => {
  let mockIconBounceAnim: Animated.Value;

  beforeEach(() => {
    mockIconBounceAnim = new Animated.Value(1);
    (i18n.t as jest.Mock).mockImplementation((key) => `translated_${key}`);
  });

  it("should match snapshot with default props", () => {
    const tree = render(
      <HealthSetupLabel
        name="diabetes"
        icon="💊"
        iconBounceAnim={mockIconBounceAnim}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with different icon", () => {
    const tree = render(
      <HealthSetupLabel
        name="heart_disease"
        icon="❤️"
        iconBounceAnim={mockIconBounceAnim}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with empty values", () => {
    const tree = render(
      <HealthSetupLabel name="" icon="" iconBounceAnim={mockIconBounceAnim} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

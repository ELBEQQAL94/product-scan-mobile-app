import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Animated } from "react-native";
import HealthSetupCard from "@/components/HealthSetup/HealthSetupCard";
import { Disease } from "@/types/health-setup";

// Mock child components
jest.mock("../HealthSetupLabel", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return ({ name, icon }: { name: string; icon: string }) => (
    <Text testID="health-setup-label-mock">{`${icon} ${name}`}</Text>
  );
});

jest.mock("../CheckMark", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return ({ isSelected }: { isSelected: boolean }) => (
    <Text testID="checkmark-mock">{isSelected ? "✓" : ""}</Text>
  );
});

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
    LIGHT_GREEN: "#4CAF50",
    GLOVO_GREEN: "#2E7D32",
  },
}));

// Mock Disease type
const mockDisease: Disease = {
  id: "1",
  name: "diabetes",
  icon: "💊",
  isSelected: false,
};

describe("HealthSetupCard Component - Render and Content Tests", () => {
  const defaultProps = {
    item: mockDisease,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render the card touchable container", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable).toBeTruthy();
    });

    it("should render CheckMark component", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const checkmark = screen.getByTestId("checkmark-mock");
      expect(checkmark).toBeTruthy();
    });

    it("should render HealthSetupLabel component", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const label = screen.getByTestId("health-setup-label-mock");
      expect(label).toBeTruthy();
    });

    it("should render all components together", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");
      const checkmark = screen.getByTestId("checkmark-mock");
      const label = screen.getByTestId("health-setup-label-mock");

      expect(touchable).toBeTruthy();
      expect(checkmark).toBeTruthy();
      expect(label).toBeTruthy();
    });
  });

  describe("Component Content", () => {
    it("should pass correct props to HealthSetupLabel", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            name: "heart_disease",
            icon: "❤️",
          }}
          onPress={jest.fn()}
        />
      );

      const label = screen.getByTestId("health-setup-label-mock");
      expect(label.props.children).toBe("❤️ heart_disease");
    });

    it("should pass correct isSelected to CheckMark when not selected", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: false,
          }}
          onPress={jest.fn()}
        />
      );

      const checkmark = screen.getByTestId("checkmark-mock");
      expect(checkmark.props.children).toBe("");
    });

    it("should pass correct isSelected to CheckMark when selected", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: true,
          }}
          onPress={jest.fn()}
        />
      );

      const checkmark = screen.getByTestId("checkmark-mock");
      expect(checkmark.props.children).toBe("✓");
    });

    it("should display different disease data correctly", () => {
      const customDisease: Disease = {
        id: "2",
        name: "arthritis",
        icon: "🦴",
        isSelected: true,
      };

      render(<HealthSetupCard item={customDisease} onPress={jest.fn()} />);

      const label = screen.getByTestId("health-setup-label-mock");
      const checkmark = screen.getByTestId("checkmark-mock");

      expect(label.props.children).toBe("🦴 arthritis");
      expect(checkmark.props.children).toBe("✓");
    });
  });

  describe("Interaction Handling", () => {
    it("should call onPress with correct id when pressed", () => {
      const mockOnPress = jest.fn();
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            id: "test-disease-123",
          }}
          onPress={mockOnPress}
        />
      );

      const touchable = screen.getByTestId("health-setup-card-touchable");
      fireEvent.press(touchable);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith("test-disease-123");
    });

    it("should handle press events multiple times", () => {
      const mockOnPress = jest.fn();
      render(<HealthSetupCard {...defaultProps} onPress={mockOnPress} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");

      fireEvent.press(touchable);
      fireEvent.press(touchable);
      fireEvent.press(touchable);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
      expect(mockOnPress).toHaveBeenCalledWith(mockDisease.id);
    });

    it("should handle pressIn events", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");

      expect(() => {
        fireEvent(touchable, "pressIn");
      }).not.toThrow();
    });

    it("should handle pressOut events", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");

      expect(() => {
        fireEvent(touchable, "pressOut");
      }).not.toThrow();
    });
  });

  describe("Selection State Changes", () => {
    it("should update CheckMark when selection state changes", () => {
      const { rerender } = render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: false,
          }}
          onPress={jest.fn()}
        />
      );

      let checkmark = screen.getByTestId("checkmark-mock");
      expect(checkmark.props.children).toBe("");

      rerender(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: true,
          }}
          onPress={jest.fn()}
        />
      );

      checkmark = screen.getByTestId("checkmark-mock");
      expect(checkmark.props.children).toBe("✓");
    });

    it("should maintain component structure during selection changes", () => {
      const { rerender } = render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: false,
          }}
          onPress={jest.fn()}
        />
      );

      let touchable = screen.getByTestId("health-setup-card-touchable");
      let checkmark = screen.getByTestId("checkmark-mock");
      let label = screen.getByTestId("health-setup-label-mock");

      expect(touchable).toBeTruthy();
      expect(checkmark).toBeTruthy();
      expect(label).toBeTruthy();

      rerender(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: true,
          }}
          onPress={jest.fn()}
        />
      );

      touchable = screen.getByTestId("health-setup-card-touchable");
      checkmark = screen.getByTestId("checkmark-mock");
      label = screen.getByTestId("health-setup-label-mock");

      expect(touchable).toBeTruthy();
      expect(checkmark).toBeTruthy();
      expect(label).toBeTruthy();
    });
  });

  describe("TestID Presence", () => {
    it("should have correct testID for touchable", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have correct accessibility role", () => {
      render(<HealthSetupCard {...defaultProps} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable.props.accessibilityRole).toBe("button");
    });

    it("should have correct accessibility label", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            name: "diabetes",
          }}
          onPress={jest.fn()}
        />
      );

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable.props.accessibilityLabel).toBe(
        "Health condition: diabetes"
      );
    });

    it("should have correct accessibility state when not selected", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: false,
          }}
          onPress={jest.fn()}
        />
      );

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable.props.accessibilityState).toEqual({ selected: false });
    });

    it("should have correct accessibility state when selected", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            isSelected: true,
          }}
          onPress={jest.fn()}
        />
      );

      const touchable = screen.getByTestId("health-setup-card-touchable");
      expect(touchable.props.accessibilityState).toEqual({ selected: true });
    });
  });

  describe("Props Handling", () => {
    it("should handle different disease IDs", () => {
      const mockOnPress = jest.fn();
      const { rerender } = render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            id: "disease-1",
          }}
          onPress={mockOnPress}
        />
      );

      let touchable = screen.getByTestId("health-setup-card-touchable");
      fireEvent.press(touchable);
      expect(mockOnPress).toHaveBeenCalledWith("disease-1");

      rerender(
        <HealthSetupCard
          item={{
            ...mockDisease,
            id: "disease-2",
          }}
          onPress={mockOnPress}
        />
      );

      touchable = screen.getByTestId("health-setup-card-touchable");
      fireEvent.press(touchable);
      expect(mockOnPress).toHaveBeenCalledWith("disease-2");
    });

    it("should handle empty disease name", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            name: "",
          }}
          onPress={jest.fn()}
        />
      );

      const label = screen.getByTestId("health-setup-label-mock");
      expect(label.props.children).toBe("💊 ");
    });

    it("should handle empty disease icon", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            icon: "",
          }}
          onPress={jest.fn()}
        />
      );

      const label = screen.getByTestId("health-setup-label-mock");
      expect(label.props.children).toBe(" diabetes");
    });

    it("should handle special characters in disease data", () => {
      render(
        <HealthSetupCard
          item={{
            ...mockDisease,
            name: "condition!@#$%",
            icon: "🏥👩‍⚕️",
          }}
          onPress={jest.fn()}
        />
      );

      const label = screen.getByTestId("health-setup-label-mock");
      expect(label.props.children).toBe("🏥👩‍⚕️ condition!@#$%");
    });
  });

  describe("Error Handling", () => {
    it("should not crash with rapid prop changes", () => {
      const mockOnPress = jest.fn();
      const { rerender } = render(
        <HealthSetupCard item={mockDisease} onPress={mockOnPress} />
      );

      // Rapidly change props multiple times
      for (let i = 0; i < 5; i++) {
        expect(() => {
          rerender(
            <HealthSetupCard
              item={{
                ...mockDisease,
                id: `disease-${i}`,
                name: `condition-${i}`,
                icon: `🔥${i}`,
                isSelected: i % 2 === 0,
              }}
              onPress={mockOnPress}
            />
          );
        }).not.toThrow();
      }

      // Verify component still renders correctly
      const touchable = screen.getByTestId("health-setup-card-touchable");
      const checkmark = screen.getByTestId("checkmark-mock");
      const label = screen.getByTestId("health-setup-label-mock");

      expect(touchable).toBeTruthy();
      expect(checkmark).toBeTruthy();
      expect(label).toBeTruthy();
    });

    it("should handle onPress callback errors gracefully", () => {
      const errorOnPress = jest.fn(() => {
        throw new Error("Press handler error");
      });

      render(<HealthSetupCard {...defaultProps} onPress={errorOnPress} />);

      const touchable = screen.getByTestId("health-setup-card-touchable");

      expect(() => {
        fireEvent.press(touchable);
      }).toThrow("Press handler error");
    });
  });

  describe("Component Structure", () => {
    it("should maintain consistent structure with different diseases", () => {
      const diseases: Disease[] = [
        { id: "1", name: "diabetes", icon: "💊", isSelected: false },
        { id: "2", name: "heart_disease", icon: "❤️", isSelected: true },
        { id: "3", name: "arthritis", icon: "🦴", isSelected: false },
      ];

      diseases.forEach((disease) => {
        const { unmount } = render(
          <HealthSetupCard item={disease} onPress={jest.fn()} />
        );

        const touchable = screen.getByTestId("health-setup-card-touchable");
        const checkmark = screen.getByTestId("checkmark-mock");
        const label = screen.getByTestId("health-setup-label-mock");

        expect(touchable).toBeTruthy();
        expect(checkmark).toBeTruthy();
        expect(label).toBeTruthy();

        unmount();
      });
    });
  });
});

// Snapshot Tests - Content Focused
describe("HealthSetupCard Snapshots - Content Verification", () => {
  const defaultProps = {
    item: mockDisease,
    onPress: jest.fn(),
  };

  it("should match snapshot when not selected", () => {
    const tree = render(
      <HealthSetupCard
        item={{
          ...mockDisease,
          isSelected: false,
        }}
        onPress={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot when selected", () => {
    const tree = render(
      <HealthSetupCard
        item={{
          ...mockDisease,
          isSelected: true,
        }}
        onPress={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with different disease", () => {
    const tree = render(
      <HealthSetupCard
        item={{
          id: "2",
          name: "heart_disease",
          icon: "❤️",
          isSelected: true,
        }}
        onPress={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

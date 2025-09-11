import { PlanConfig } from "@/types/subscription";

export const planConfigs: PlanConfig[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our service",
    features: [
      "Basic barcode scanning (camera)",
      "Product search",
      "Health score analysis",
      "Manual barcode entry",
    ],
    buttonText: "Current Plan",
    buttonStyle: "outline",
    popular: false,
    isFree: true,
  },
  {
    id: "premuim", // Base ID
    monthlyId: "premuim_monthly", // Matches your Google Play product ID
    yearlyId: "premuim_yearly", // Matches your Google Play product ID
    name: "Pro",
    description: "Best for regular users",
    features: [
      "Unlimited scans",
      "Detailed nutrition analysis",
      "Ingredient breakdown",
      "Personalized recommendations",
      "Halal/Haram detection",
      "Priority support",
      "Export features",
    ],
    buttonText: "Start Free Trial",
    buttonStyle: "primary",
    popular: true,
    isFree: false,
  },
];

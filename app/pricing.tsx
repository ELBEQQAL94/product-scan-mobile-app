import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";

const PricingScreen = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      monthlyPrice: 0,
      description: "Perfect for trying out our service",
      features: [
        "Basic barcode scanning (camera)",
        "Product search",
        "Health score analysis",
        "Manual barcode entry",
      ],
      buttonText: "Get Started",
      buttonStyle: "outline",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: 1.99,
      description: "Best for regular users",
      features: [
        "Unlimited scans",
        "Detailed nutrition analysis",
        "Ingredient breakdown",
        "Personalized recommendations",
        "Halal/Haram detection",
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "primary",
      popular: true,
    },
  ];

  const getCurrentPrice = (plan: any) => {
    if (plan.monthlyPrice === 0) return 0;
    if (billingCycle === "monthly") {
      return plan.monthlyPrice;
    } else {
      // 30% savings for yearly
      const yearlyPrice = plan.monthlyPrice * 12 * 0.7;
      return yearlyPrice;
    }
  };

  const getDisplayPrice = (plan: any) => {
    const price = getCurrentPrice(plan);
    if (billingCycle === "yearly" && plan.monthlyPrice > 0) {
      return (price / 12).toFixed(2); // Show monthly equivalent
    }
    return price.toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <Text style={styles.headerSubtitle}>
          Unlock the full potential of healthy eating with our premium features
        </Text>
      </View>

      {/* Billing Toggle */}
      <View style={styles.billingToggleContainer}>
        <View style={styles.billingToggle}>
          <TouchableOpacity
            onPress={() => setBillingCycle("monthly")}
            style={[
              styles.toggleButton,
              billingCycle === "monthly" && styles.toggleButtonActive,
            ]}
          >
            <Text
              style={[
                styles.toggleButtonText,
                billingCycle === "monthly" && styles.toggleButtonTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBillingCycle("yearly")}
            style={[
              styles.toggleButton,
              billingCycle === "yearly" && styles.toggleButtonActive,
              { position: "relative" },
            ]}
          >
            <Text
              style={[
                styles.toggleButtonText,
                billingCycle === "yearly" && styles.toggleButtonTextActive,
              ]}
            >
              Yearly
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>30% OFF</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pricing Cards */}
      <View style={styles.cardsContainer}>
        {plans.map((plan, index) => (
          <View
            key={plan.name}
            style={[styles.card, plan.popular && styles.cardPopular]}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Ionicons name="star" size={12} color={Colors.WHITE} />
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}

            {/* Plan Header */}
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planDescription}>{plan.description}</Text>

              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.priceSymbol}>$</Text>
                <Text style={styles.priceAmount}>{getDisplayPrice(plan)}</Text>
                {plan.monthlyPrice > 0 && (
                  <Text style={styles.pricePeriod}>
                    /{billingCycle === "monthly" ? "month" : "month"}
                  </Text>
                )}
              </View>

              {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                <Text style={styles.yearlyNote}>
                  Billed ${getCurrentPrice(plan).toFixed(2)} yearly
                </Text>
              )}

              {/* Savings Badge */}
              {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                <View style={styles.savingsContainer}>
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>Save 30%</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark" size={12} color={Colors.WHITE} />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              style={[
                styles.ctaButton,
                plan.buttonStyle === "outline"
                  ? styles.ctaButtonOutline
                  : styles.ctaButtonPrimary,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.ctaButtonText,
                  plan.buttonStyle === "outline"
                    ? styles.ctaButtonTextOutline
                    : styles.ctaButtonTextPrimary,
                ]}
              >
                {plan.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.VERY_LIGHT_GRAY,
  },
  header: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.WHITE,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 22,
  },
  billingToggleContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  billingToggle: {
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    padding: 4,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 21,
    minWidth: 80,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.CHARCOAL,
  },
  toggleButtonTextActive: {
    color: Colors.WHITE,
  },
  saveBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: Colors.GLOVO_YELLOW,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  saveBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  cardPopular: {
    borderColor: Colors.LIGHT_GREEN,
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: [{ translateX: -60 }],
    backgroundColor: Colors.LIGHT_GREEN,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.WHITE,
  },
  planHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  planName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    textAlign: "center",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  priceSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginTop: 8,
  },
  priceAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  pricePeriod: {
    fontSize: 16,
    color: Colors.MEDIUM_GRAY,
    fontWeight: "500",
    marginTop: 20,
  },
  yearlyNote: {
    fontSize: 12,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 8,
  },
  savingsContainer: {
    alignItems: "center",
  },
  savingsBadge: {
    backgroundColor: Colors.GLOVO_YELLOW,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  checkIcon: {
    backgroundColor: Colors.LIGHT_GREEN,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: Colors.CHARCOAL,
    lineHeight: 20,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaButtonPrimary: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  ctaButtonOutline: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREEN,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  ctaButtonTextPrimary: {
    color: Colors.WHITE,
  },
  ctaButtonTextOutline: {
    color: Colors.LIGHT_GREEN,
  },
  bottomCTA: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bottomCTATitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginTop: 8,
    marginBottom: 8,
  },
  bottomCTADescription: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.GLOVO_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.GLOVO_GREEN,
  },
});

export default PricingScreen;

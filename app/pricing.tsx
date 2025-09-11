import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { PlanConfig } from "@/types/subscription";
import { planConfigs } from "@/constants/pricing-plans";
import Loading from "@/components/shared/Loading";
import { useInAppPurchase } from "@/hooks/useInAppPurchase";
import { BillingCycleEnum } from "@/enums/subscriptions";

const PricingScreen = () => {
  // Hooks
  const {
    isLoading,
    loadingSubscription,
    userSubscription,
    billingCycle,
    setBillingCycle,
    handlePurchase,
    getSubscriptionPrice,
    getButtonText,
    getButtonDisabled,
    isCurrentPlan,
  } = useInAppPurchase();

  // Helper function to calculate yearly savings
  const getYearlySavings = (planConfig: PlanConfig) => {
    if (planConfig.isFree) return null;

    // Get monthly price
    const currentCycle = billingCycle;
    setBillingCycle(BillingCycleEnum.MONTHLY);
    const monthlyPrice = getSubscriptionPrice(planConfig);
    setBillingCycle(BillingCycleEnum.YEARLY);
    const yearlyPrice = getSubscriptionPrice(planConfig);
    setBillingCycle(currentCycle); // Reset to original

    if (monthlyPrice.price === "N/A" || yearlyPrice.price === "N/A")
      return null;

    const monthlyTotal = parseFloat(monthlyPrice.price) * 12;
    const yearlyTotal = parseFloat(yearlyPrice.price);
    const savings = monthlyTotal - yearlyTotal;
    const savingsPercentage = Math.round((savings / monthlyTotal) * 100);

    return {
      amount: savings.toFixed(2),
      percentage: savingsPercentage,
    };
  };

  if (loadingSubscription) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <Text style={styles.headerSubtitle}>
          Unlock the full potential of healthy eating with our premium features
        </Text>
      </View>

      {/* Billing Toggle - only show if not subscribed */}
      {!userSubscription?.isActive && (
        <View style={styles.billingToggleContainer}>
          <View style={styles.billingToggle}>
            <TouchableOpacity
              onPress={() => setBillingCycle(BillingCycleEnum.MONTHLY)}
              style={[
                styles.toggleButton,
                billingCycle === BillingCycleEnum.MONTHLY &&
                  styles.toggleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  billingCycle === BillingCycleEnum.MONTHLY &&
                    styles.toggleButtonTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBillingCycle(BillingCycleEnum.YEARLY)}
              style={[
                styles.toggleButton,
                billingCycle === BillingCycleEnum.YEARLY &&
                  styles.toggleButtonActive,
                { position: "relative" },
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  billingCycle === BillingCycleEnum.YEARLY &&
                    styles.toggleButtonTextActive,
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
      )}

      {/* Pricing Cards */}
      <View style={styles.cardsContainer}>
        {planConfigs.map((planConfig: PlanConfig) => {
          const { price, period, currency } = getSubscriptionPrice(planConfig);
          const isCurrent = isCurrentPlan(planConfig);
          const yearlySavings =
            billingCycle === BillingCycleEnum.YEARLY
              ? getYearlySavings(planConfig)
              : null;

          return (
            <View
              key={planConfig.id}
              style={[
                styles.card,
                planConfig.popular && styles.cardPopular,
                isCurrent && styles.cardCurrent,
              ]}
            >
              {/* Popular Badge */}
              {planConfig.popular && !isCurrent && (
                <View style={styles.popularBadge}>
                  <Ionicons name="star" size={12} color={Colors.WHITE} />
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}

              {/* Current Plan Badge */}
              {isCurrent && (
                <View style={styles.currentBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color={Colors.WHITE}
                  />
                  <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                </View>
              )}

              {/* Plan Header */}
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{planConfig.name}</Text>
                <Text style={styles.planDescription}>
                  {planConfig.description}
                </Text>

                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.priceSymbol}>{currency}</Text>
                  <Text style={styles.priceAmount}>{price}</Text>
                  {period && <Text style={styles.pricePeriod}>/{period}</Text>}
                </View>

                {/* Yearly Savings Info */}
                {yearlySavings && (
                  <Text style={styles.savingsText}>
                    Save ${yearlySavings.amount} ({yearlySavings.percentage}%
                    off)
                  </Text>
                )}
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {planConfig.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <View style={styles.checkIcon}>
                      <Ionicons
                        name="checkmark"
                        size={12}
                        color={Colors.WHITE}
                      />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  isCurrent
                    ? styles.ctaButtonCurrent
                    : planConfig.buttonStyle === "outline"
                    ? styles.ctaButtonOutline
                    : styles.ctaButtonPrimary,
                ]}
                onPress={() => handlePurchase(planConfig)}
                disabled={getButtonDisabled(planConfig)}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.WHITE} />
                ) : (
                  <Text
                    style={[
                      styles.ctaButtonText,
                      isCurrent
                        ? styles.ctaButtonTextCurrent
                        : planConfig.buttonStyle === "outline"
                        ? styles.ctaButtonTextOutline
                        : styles.ctaButtonTextPrimary,
                    ]}
                  >
                    {getButtonText(planConfig)}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
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
  statusContainer: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 2,
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
  cardCurrent: {
    borderColor: Colors.GLOVO_YELLOW,
    borderWidth: 2,
    backgroundColor: "#FFFEF7",
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
  currentBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    backgroundColor: Colors.GLOVO_YELLOW,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.CHARCOAL,
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
  savingsText: {
    fontSize: 12,
    color: Colors.LIGHT_GREEN,
    fontWeight: "600",
    marginTop: 4,
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
  ctaButtonCurrent: {
    backgroundColor: Colors.MEDIUM_GRAY,
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
  ctaButtonTextCurrent: {
    color: Colors.WHITE,
  },
  subscriptionInfo: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREEN,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginBottom: 8,
  },
  subscriptionDetails: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 4,
  },
});

export default PricingScreen;

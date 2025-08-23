import { LanguageKey } from "@/constants/keys";
import { Screens } from "@/constants/screens";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import { ProductTypeFromDB, UniqueProduct } from "@/types/products";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

interface ProductProps {
  product: ProductTypeFromDB | UniqueProduct;
  onProductRemoved?: (codeBar: string) => void;
}

const Product: FC<ProductProps> = ({ product, onProductRemoved }) => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  const get_score_color = (score: number) => {
    if (score === 0) return Colors.MEDIUM_GRAY;
    if (score < 30) return Colors.RED;
    else if (score < 60) return Colors.ORANGE;
    else if (score < 80) return Colors.GLOVO_YELLOW;
    else return Colors.LIGHT_GREEN;
  };

  const get_score_background = (score: number) => {
    if (score === 0) return Colors.VERY_LIGHT_GRAY;
    if (score < 30) return `${Colors.RED}15`;
    else if (score < 60) return `${Colors.ORANGE}15`;
    else if (score < 80) return `${Colors.GLOVO_YELLOW}15`;
    else return `${Colors.LIGHT_GREEN}15`;
  };

  const get_score_label = (score: number) => {
    if (score === 0) return t(LanguageKey.SCORE_NOT_AVAILABLE);
    if (score < 30) return t(LanguageKey.POOR);
    else if (score < 60) return t(LanguageKey.FAIR);
    else if (score < 80) return t(LanguageKey.GOOD);
    else return t(LanguageKey.EXCELLENT);
  };

  const redirect_to_scan_result = () =>
    router.push(
      `${Screens.SCAN_RESULT_SCREEN}?bar_code=${product.bar_code}&user_id=${user?.uid}`
    );

  const hasValidScore = product.product_scan_result.score > 0;
  const productName =
    product.product_scan_result.product_name !== "Chargement…" &&
    product.product_scan_result.product_name !== ""
      ? product.product_scan_result.product_name
      : t(LanguageKey.PRODUC_NAME_NOT_FOUND);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={redirect_to_scan_result}
        style={styles.productCard}
        activeOpacity={0.7}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          {product.product_scan_result.image_url ? (
            <Image
              src={product.product_scan_result.image_url || ""}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Entypo name="image" size={40} color={Colors.MEDIUM_GRAY} />
            </View>
          )}
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <View style={styles.textSection}>
            <Text style={styles.productName} numberOfLines={2}>
              {productName}
            </Text>

            {/* Score Badge */}
            {hasValidScore ? (
              <View style={styles.scoreBadgeContainer}>
                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor: get_score_background(
                        product.product_scan_result.score
                      ),
                      borderColor: get_score_color(
                        product.product_scan_result.score
                      ),
                    },
                  ]}
                >
                  <MaterialIcons
                    name="eco"
                    size={14}
                    color={get_score_color(product.product_scan_result.score)}
                  />
                  <Text
                    style={[
                      styles.scoreNumber,
                      {
                        color: get_score_color(
                          product.product_scan_result.score
                        ),
                      },
                    ]}
                  >
                    {product.product_scan_result.score}
                  </Text>
                  <Text style={styles.scoreOutOf}>/100</Text>
                </View>
                <Text
                  style={[
                    styles.scoreLabel,
                    {
                      color: get_score_color(product.product_scan_result.score),
                    },
                  ]}
                >
                  {get_score_label(product.product_scan_result.score)}
                </Text>
              </View>
            ) : (
              <View style={styles.noScoreContainer}>
                <MaterialIcons
                  name="help-outline"
                  size={16}
                  color={Colors.MEDIUM_GRAY}
                />
                <Text style={styles.noScoreText}>
                  {t(LanguageKey.SCORE_NOT_AVAILABLE)}
                </Text>
              </View>
            )}
          </View>

          {/* Arrow Indicator */}
          <View style={styles.arrowContainer}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.MEDIUM_GRAY}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Remove Button */}
      {onProductRemoved && (
        <TouchableOpacity
          onPress={() => onProductRemoved(product.bar_code)}
          style={styles.removeButton}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.WHITE} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  productCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.VERY_LIGHT_GRAY,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.VERY_LIGHT_GRAY,
    marginRight: 16,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.VERY_LIGHT_GRAY,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
  },
  productName: {
    fontWeight: "600",
    color: Colors.CHARCOAL,
    marginBottom: 8,
    ...Typography.bodyLarge,
  },
  scoreBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  scoreNumber: {
    fontWeight: "700",
    fontSize: 14,
  },
  scoreOutOf: {
    fontSize: 12,
    color: Colors.MEDIUM_GRAY,
    fontWeight: "500",
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  noScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  noScoreText: {
    color: Colors.MEDIUM_GRAY,
    fontSize: 12,
    fontStyle: "italic",
  },
  arrowContainer: {
    marginLeft: 8,
  },
  removeButton: {
    backgroundColor: Colors.RED,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: Colors.RED,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Product;

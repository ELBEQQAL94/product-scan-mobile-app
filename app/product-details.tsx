import Loading from "@/components/ProductDetails/Loading";
import ProductNotFound from "@/components/ProductDetails/ProductNotFound";
import ScanAgainButton from "@/components/ProductDetails/CommonButton";
import {
  CachedProduct,
  Ingredient,
  OpenFoodData,
  Product,
} from "@/constants/responses";
import { Screens } from "@/constants/screens";
import { i18n } from "@/i18n";
import { chat, product_details } from "@/services";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import CommonButton from "@/components/ProductDetails/CommonButton";
import ConnectionError from "@/components/ProductDetails/ConnectionError";
import { get_product_by_bar_code, save_product_by_bar_code } from "@/utils";
import SelectLanguage from "@/components/SelectLanguage";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";

const ProductDetails: React.FC = () => {
  // Hooks
  const router = useRouter();
  const local = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { modalVisible, currentLanguage, setModalVisible, change_language } =
    useSelectedLanguage();
  const bar_code = local.bar_code as string;

  // states
  const [product, setProduct] = useState<OpenFoodData>();
  const [score, setScore] = useState<string | null | undefined>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const colors = {
    background: colorScheme === "dark" ? "#121212" : "white",
    text: colorScheme === "dark" ? "white" : "black",
    border: colorScheme === "dark" ? "#333333" : "black",
    card: colorScheme === "dark" ? "#1E1E1E" : "white",
  };

  const fetch_product_details = async () => {
    setLoading(true);
    try {
      const check_product_if_exists = await get_product_by_bar_code(bar_code);
      let score = null;
      let openFoodData: OpenFoodData = {
        status: 0,
        product: {
          image_url: "",
          labels: "",
          product_name: "",
          product_name_ar: "",
          product_name_en: "",
          product_name_fr: "",
          product_type: "",
        },
      };

      if (!check_product_if_exists) {
        console.log("new product: ");
        const response = await product_details(bar_code);
        console.log("response status:", response?.status);
        if (response?.status === 1) {
          score = await chat(response);

          if (score) {
            console.log("you call a chat");
            openFoodData = {
              status: response.status,
              product: {
                countries: response.product.countries,
                image_url: response.product.image_url,
                ingredients: response.product.ingredients,
                labels: response.product.labels,
                product_name: response.product.product_name,
                product_name_ar: response.product.product_name_ar,
                product_name_en: response.product.product_name_en,
                product_name_fr: response.product.product_name_fr,
                product_type: response.product.product_type,
              },
            };
            const build_product: CachedProduct = {
              score,
              open_food_data: openFoodData,
            };
            await save_product_by_bar_code(bar_code, build_product);
          }
        }
      } else {
        console.log("get product from cache");
        openFoodData = check_product_if_exists.open_food_data;
        score = check_product_if_exists.score;
      }

      setProduct(openFoodData);
      setScore(score);
    } catch (error) {
      console.log("fetch product details get an error: ", error);
      setError(i18n.t("CONNECTION_ERROR"));
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (scoreValue: string | null | undefined) => {
    if (!scoreValue) return "red";

    const numScore = parseInt(scoreValue);
    if (numScore < 50) return "red";
    if (numScore >= 50 && numScore <= 70) return "#FFD700";
    return "green";
  };

  const retryScan = () => router.push(Screens.HOME_SCREEN as Href);

  useEffect(() => {
    fetch_product_details();
  }, [bar_code]);

  if (loading) return <Loading textColor={colors.text} />;

  if (error || !product)
    return <ConnectionError error={error} textColor={colors.text} />;

  if (product.status === 0)
    return <ProductNotFound textColor={colors.text} retryScan={retryScan} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <SelectLanguage
            currentLanguage={currentLanguage}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            changeLanguage={change_language}
          />
        </View>
      </View>
      <View style={styles.header_container}>
        {product?.product.image_url ? (
          <Image
            source={{ uri: product?.product.image_url }}
            resizeMode="contain"
            width={150}
            height={150}
          />
        ) : (
          <Image
            source={require("@/assets/images/product_default_image.png")}
            resizeMode="contain"
            width={150}
            height={150}
            style={{ tintColor: colors.text }}
          />
        )}
        <View style={styles.product_title_score_container}>
          <Text style={[styles.product_title, { color: colors.text }]}>
            {product?.product.product_name}
          </Text>
          <View style={styles.score_container}>
            <View
              style={[
                styles.scoreIndicator,
                { backgroundColor: getScoreColor(score) },
              ]}
            />
            <Text style={[styles.product_score, { color: colors.text }]}>
              {score}/100
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.spacer, { backgroundColor: colors.border }]} />
      <ScrollView style={styles.ingredients_container}>
        <Text style={{ color: colors.text }}>
          {i18n.t("INGREDIENTS_TITLE")}
        </Text>
        <View>
          {product?.product.ingredients ? (
            product?.product.ingredients.map(
              (ingrediant: Ingredient, index: number) => (
                <View key={index} style={styles.ingredient_item}>
                  <Text style={{ color: colors.text }}>
                    {i18n.t("TEXT")}: {ingrediant.text}
                  </Text>
                  <Text style={{ color: colors.text }}>
                    {i18n.t("PERCENT")}: {ingrediant.percent}
                  </Text>
                  <Text style={{ color: colors.text }}>
                    {i18n.t("PERCENT_MAX")}: {ingrediant.percent_max}
                  </Text>
                  <Text style={{ color: colors.text }}>
                    {i18n.t("PERCENT_MIN")}: {ingrediant.percent_min}
                  </Text>
                  <Text style={{ color: colors.text }}>
                    {i18n.t("PERCENT_ESTIMATE")}: {ingrediant.percent_estimate}
                  </Text>
                  <View style={styles.spacer} />
                </View>
              )
            )
          ) : (
            <View>
              <Text style={{ color: colors.text }}>
                {i18n.t("INGREDIENTS_NOT_FOUND")}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <CommonButton action={retryScan} label={i18n.t("SCAN_AGAIN")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  product_title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  product_score: {
    fontSize: 20,
  },
  score_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  product_title_score_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: 1,
    backgroundColor: "black",
    marginTop: 5,
    marginBottom: 5,
  },
  ingredients_container: {
    marginBottom: 10,
    height: "50%",
  },
  ingredient_item: {
    marginBottom: 10,
    padding: 5,
  },
});

export default ProductDetails;

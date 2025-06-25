import Loading from "@/components/ProductDetailsScreen/Loading";
import ProductNotFound from "@/components/ProductDetailsScreen/ProductNotFound";
import {
  CachedProduct,
  Ingredients,
  OpenFoodData,
} from "@/constants/responses";
import { Screens } from "@/constants/screens";
import { i18n } from "@/i18n";
import { get_score, product_details } from "@/services";
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
import CommonButton from "@/components/ProductDetailsScreen/CommonButton";
import ConnectionError from "@/components/ProductDetailsScreen/ConnectionError";
import { get_product_by_bar_code, save_product_by_bar_code } from "@/utils";
import SelectLanguage from "@/components/shared/SelectLanguage";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";

const ProductDetailsScreen: React.FC = () => {
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
          _id: "",
          _keywords: [],
          added_countries_tags: [],
          additives_n: 0,
          additives_original_tags: [],
          additives_tags: [],
          allergens: "",
          allergens_from_ingredients: "",
          allergens_from_user: "",
          allergens_hierarchy: [],
          allergens_lc: "",
          allergens_tags: [],
          amino_acids_tags: [],
          brands: "",
          brands_tags: [],
          categories: "",
          categories_hierarchy: [],
          categories_lc: "",
          categories_properties_tags: [],
          categories_tags: [],
          checkers_tags: [],
          cities_tags: [],
          code: "",
          codes_tags: [],
          compared_to_category: "",
          complete: 0,
          completeness: 0,
          correctors_tags: [],
          countries: "",
          countries_beforescanbot: "",
          countries_hierarchy: [],
          countries_lc: "",
          countries_tags: [],
          created_t: 0,
          creator: "",
          data_quality_bugs_tags: [],
          data_quality_errors_tags: [],
          data_quality_info_tags: [],
          data_quality_tags: [],
          data_quality_warnings_tags: [],
          data_sources: "",
          data_sources_tags: [],
          debug_param_sorted_langs: [],
          ecoscore_data: {
            adjustments: {
              origins_of_ingredients: {
                epi_score: 0,
                epi_value: 0,
                origins_from_categories: [],
                origins_from_origins_field: [],
                transportation_score: 0,
                transportation_scores: undefined,
                transportation_value: 0,
                transportation_values: undefined,
                value: 0,
                values: undefined,
              },
              packaging: undefined,
              production_system: {
                labels: [],
                value: 0,
                warning: "",
              },
              threatened_species: {
                ingredient: "",
                value: 0,
              },
            },
            agribalyse: {},
            grade: "",
            grades: {},
            missing: {
              labels: 0,
              packagings: 0,
            },
            missing_data_warning: 0,
            missing_key_data: 0,
            score: 0,
            scores: {},
            status: "",
          },
          ecoscore_grade: "",
          ecoscore_score: 0,
          ecoscore_tags: [],
          editors_tags: [],
          emb_codes: "",
          emb_codes_tags: [],
          entry_dates_tags: [],
          expiration_date: "",
          food_groups: "",
          food_groups_tags: [],
          generic_name: "",
          generic_name_ar: "",
          generic_name_en: "",
          generic_name_fr: "",
          id: "",
          image_front_small_url: "",
          image_front_thumb_url: "",
          image_front_url: "",
          image_ingredients_small_url: "",
          image_ingredients_thumb_url: "",
          image_ingredients_url: "",
          image_nutrition_small_url: "",
          image_nutrition_thumb_url: "",
          image_nutrition_url: "",
          image_packaging_small_url: "",
          image_packaging_thumb_url: "",
          image_packaging_url: "",
          image_small_url: "",
          image_thumb_url: "",
          informers_tags: [],
          ingredients: [],
          ingredients_analysis_tags: [],
          ingredients_hierarchy: [],
          ingredients_lc: "",
          ingredients_n: "",
          ingredients_n_tags: [],
          ingredients_non_nutritive_sweeteners_n: 0,
          ingredients_original_tags: [],
          ingredients_percent_analysis: 0,
          ingredients_sweeteners_n: 0,
          ingredients_tags: [],
          ingredients_text: "",
          ingredients_text_ar: "",
          ingredients_text_en: "",
          ingredients_text_fr: "",
          ingredients_text_with_allergens: "",
          ingredients_text_with_allergens_ar: "",
          ingredients_text_with_allergens_en: "",
          ingredients_text_with_allergens_fr: "",
          ingredients_with_specified_percent_n: 0,
          ingredients_with_specified_percent_sum: 0,
          ingredients_with_unspecified_percent_n: 0,
          ingredients_with_unspecified_percent_sum: 0,
          ingredients_without_ciqual_codes: [],
          ingredients_without_ciqual_codes_n: 0,
          ingredients_without_ecobalyse_ids: [],
          ingredients_without_ecobalyse_ids_n: 0,
          interface_version_created: "",
          interface_version_modified: "",
          known_ingredients_n: 0,
          labels_hierarchy: [],
          labels_lc: "",
          labels_tags: [],
          lang: "",
          languages: {},
          languages_codes: {},
          languages_hierarchy: [],
          languages_tags: [],
          last_edit_dates_tags: [],
          last_editor: "",
          last_image_dates_tags: [],
          last_image_t: 0,
          last_modified_by: "",
          last_modified_t: 0,
          last_updated_t: 0,
          lc: "",
          link: "",
          main_countries_tags: [],
          manufacturing_places: "",
          manufacturing_places_tags: [],
          max_imgid: "",
          minerals_tags: [],
          misc_tags: [],
          no_nutrition_data: "",
          nova_group_debug: "",
          nova_group_error: "",
          nova_groups_tags: [],
          nucleotides_tags: [],
          nutrient_levels: {},
          nutrient_levels_tags: [],
          nutriments: {},
          nutriscore_2021_tags: [],
          nutriscore_2023_tags: [],
          nutriscore_grade: "",
          nutriscore_score: 0,
          nutriscore_score_opposite: 0,
          nutriscore_tags: [],
          nutriscore_version: "",
          nutrition_data: "",
          nutrition_data_per: "",
          nutrition_data_prepared: "",
          nutrition_data_prepared_per: "",
          nutrition_grade_fr: "",
          nutrition_grades: "",
          nutrition_grades_tags: [],
          nutrition_score_beverage: 0,
          nutrition_score_debug: "",
          obsolete: "",
          obsolete_since_date: "",
          origin: "",
          origin_ar: "",
          origin_en: "",
          origin_fr: "",
          origins: "",
          origins_hierarchy: [],
          origins_lc: "",
          origins_tags: [],
          other_nutritional_substances_tags: [],
          packaging_materials_tags: [],
          packaging_recycling_tags: [],
          packaging_shapes_tags: [],
          packaging_text: "",
          packaging_text_ar: "",
          packaging_text_en: "",
          packaging_text_fr: "",
          packagings: [],
          packagings_complete: 0,
          photographers_tags: [],
          pnns_groups_1: "",
          pnns_groups_1_tags: [],
          pnns_groups_2: "",
          pnns_groups_2_tags: [],
          popularity_key: 0,
          popularity_tags: [],
          product_quantity: "",
          purchase_places: "",
          purchase_places_tags: [],
          quantity: "",
          removed_countries_tags: [],
          rev: 0,
          scans_n: 0,
          schema_version: 0,
          serving_quantity: "",
          serving_quantity_unit: "",
          serving_size: "",
          states: "",
          states_hierarchy: [],
          states_tags: [],
          stores: "",
          stores_tags: [],
          teams: "",
          teams_tags: [],
          traces: "",
          traces_from_ingredients: "",
          traces_from_user: "",
          traces_hierarchy: [],
          traces_lc: "",
          traces_tags: [],
          unique_scans_n: 0,
          unknown_ingredients_n: "",
          unknown_nutrients_tags: [],
          update_key: "",
          vitamins_tags: [],
          weighers_tags: [],
        },
      };

      if (!check_product_if_exists) {
        console.log("new product: ");
        const response = await product_details(bar_code);
        console.log("response status:", response?.status);
        if (response?.status === 1) {
          score = await get_score(response);

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
                _id: "",
                _keywords: [],
                added_countries_tags: [],
                additives_n: 0,
                additives_original_tags: [],
                additives_tags: [],
                allergens: "",
                allergens_from_ingredients: "",
                allergens_from_user: "",
                allergens_hierarchy: [],
                allergens_lc: "",
                allergens_tags: [],
                amino_acids_tags: [],
                brands: "",
                brands_tags: [],
                categories: "",
                categories_hierarchy: [],
                categories_lc: "",
                categories_properties_tags: [],
                categories_tags: [],
                checkers_tags: [],
                cities_tags: [],
                code: "",
                codes_tags: [],
                compared_to_category: "",
                complete: 0,
                completeness: 0,
                correctors_tags: [],
                countries_beforescanbot: "",
                countries_hierarchy: [],
                countries_lc: "",
                countries_tags: [],
                created_t: 0,
                creator: "",
                data_quality_bugs_tags: [],
                data_quality_errors_tags: [],
                data_quality_info_tags: [],
                data_quality_tags: [],
                data_quality_warnings_tags: [],
                data_sources: "",
                data_sources_tags: [],
                debug_param_sorted_langs: [],
                ecoscore_data: {
                  adjustments: {
                    origins_of_ingredients: {
                      epi_score: 0,
                      epi_value: 0,
                      origins_from_categories: [],
                      origins_from_origins_field: [],
                      transportation_score: 0,
                      transportation_scores: undefined,
                      transportation_value: 0,
                      transportation_values: undefined,
                      value: 0,
                      values: undefined,
                    },
                    packaging: undefined,
                    production_system: {
                      labels: [],
                      value: 0,
                      warning: "",
                    },
                    threatened_species: {
                      ingredient: "",
                      value: 0,
                    },
                  },
                  agribalyse: {},
                  grade: "",
                  grades: {},
                  missing: {
                    labels: 0,
                    packagings: 0,
                  },
                  missing_data_warning: 0,
                  missing_key_data: 0,
                  score: 0,
                  scores: {},
                  status: "",
                },
                ecoscore_grade: "",
                ecoscore_score: 0,
                ecoscore_tags: [],
                editors_tags: [],
                emb_codes: "",
                emb_codes_tags: [],
                entry_dates_tags: [],
                expiration_date: "",
                food_groups: "",
                food_groups_tags: [],
                generic_name: "",
                generic_name_ar: "",
                generic_name_en: "",
                generic_name_fr: "",
                id: "",
                image_front_small_url: "",
                image_front_thumb_url: "",
                image_front_url: "",
                image_ingredients_small_url: "",
                image_ingredients_thumb_url: "",
                image_ingredients_url: "",
                image_nutrition_small_url: "",
                image_nutrition_thumb_url: "",
                image_nutrition_url: "",
                image_packaging_small_url: "",
                image_packaging_thumb_url: "",
                image_packaging_url: "",
                image_small_url: "",
                image_thumb_url: "",
                informers_tags: [],
                ingredients_analysis_tags: [],
                ingredients_hierarchy: [],
                ingredients_lc: "",
                ingredients_n: "",
                ingredients_n_tags: [],
                ingredients_non_nutritive_sweeteners_n: 0,
                ingredients_original_tags: [],
                ingredients_percent_analysis: 0,
                ingredients_sweeteners_n: 0,
                ingredients_tags: [],
                ingredients_text: "",
                ingredients_text_ar: "",
                ingredients_text_en: "",
                ingredients_text_fr: "",
                ingredients_text_with_allergens: "",
                ingredients_text_with_allergens_ar: "",
                ingredients_text_with_allergens_en: "",
                ingredients_text_with_allergens_fr: "",
                ingredients_with_specified_percent_n: 0,
                ingredients_with_specified_percent_sum: 0,
                ingredients_with_unspecified_percent_n: 0,
                ingredients_with_unspecified_percent_sum: 0,
                ingredients_without_ciqual_codes: [],
                ingredients_without_ciqual_codes_n: 0,
                ingredients_without_ecobalyse_ids: [],
                ingredients_without_ecobalyse_ids_n: 0,
                interface_version_created: "",
                interface_version_modified: "",
                known_ingredients_n: 0,
                labels_hierarchy: [],
                labels_lc: "",
                labels_tags: [],
                lang: "",
                languages: {},
                languages_codes: {},
                languages_hierarchy: [],
                languages_tags: [],
                last_edit_dates_tags: [],
                last_editor: "",
                last_image_dates_tags: [],
                last_image_t: 0,
                last_modified_by: "",
                last_modified_t: 0,
                last_updated_t: 0,
                lc: "",
                link: "",
                main_countries_tags: [],
                manufacturing_places: "",
                manufacturing_places_tags: [],
                max_imgid: "",
                minerals_tags: [],
                misc_tags: [],
                no_nutrition_data: "",
                nova_group_debug: "",
                nova_group_error: "",
                nova_groups_tags: [],
                nucleotides_tags: [],
                nutrient_levels: {},
                nutrient_levels_tags: [],
                nutriments: {},
                nutriscore_2021_tags: [],
                nutriscore_2023_tags: [],
                nutriscore_grade: "",
                nutriscore_score: 0,
                nutriscore_score_opposite: 0,
                nutriscore_tags: [],
                nutriscore_version: "",
                nutrition_data: "",
                nutrition_data_per: "",
                nutrition_data_prepared: "",
                nutrition_data_prepared_per: "",
                nutrition_grade_fr: "",
                nutrition_grades: "",
                nutrition_grades_tags: [],
                nutrition_score_beverage: 0,
                nutrition_score_debug: "",
                obsolete: "",
                obsolete_since_date: "",
                origin: "",
                origin_ar: "",
                origin_en: "",
                origin_fr: "",
                origins: "",
                origins_hierarchy: [],
                origins_lc: "",
                origins_tags: [],
                other_nutritional_substances_tags: [],
                packaging_materials_tags: [],
                packaging_recycling_tags: [],
                packaging_shapes_tags: [],
                packaging_text: "",
                packaging_text_ar: "",
                packaging_text_en: "",
                packaging_text_fr: "",
                packagings: [],
                packagings_complete: 0,
                photographers_tags: [],
                pnns_groups_1: "",
                pnns_groups_1_tags: [],
                pnns_groups_2: "",
                pnns_groups_2_tags: [],
                popularity_key: 0,
                popularity_tags: [],
                product_quantity: "",
                purchase_places: "",
                purchase_places_tags: [],
                quantity: "",
                removed_countries_tags: [],
                rev: 0,
                scans_n: 0,
                schema_version: 0,
                serving_quantity: "",
                serving_quantity_unit: "",
                serving_size: "",
                states: "",
                states_hierarchy: [],
                states_tags: [],
                stores: "",
                stores_tags: [],
                teams: "",
                teams_tags: [],
                traces: "",
                traces_from_ingredients: "",
                traces_from_user: "",
                traces_hierarchy: [],
                traces_lc: "",
                traces_tags: [],
                unique_scans_n: 0,
                unknown_ingredients_n: "",
                unknown_nutrients_tags: [],
                update_key: "",
                vitamins_tags: [],
                weighers_tags: [],
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
              (ingrediant: Ingredients, index: number) => (
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

export default ProductDetailsScreen;

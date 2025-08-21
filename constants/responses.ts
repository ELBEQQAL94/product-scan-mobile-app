import { HalalCheckStatus } from "@/enums/scan-result-with-ai";
import { Recommendations } from "@/types/scan-result";

export interface Ingredients {
  id: string;
  is_in_taxonomy: number;
  percent?: number;
  percent_estimate: number;
  percent_max: number;
  percent_min: number;
  rank?: number;
  text?: string;
  vegan?: string;
  vegetarian?: string;
  has_sub_ingredients?: string;
  ciqual_proxy_food_code?: string;
  ecobalyse_code?: string;
  from_palm_oil?: string;
  ciqual_food_code?: string;
}

// export interface Product {
//   nova_group: number;
//   _id: string;
//   _keywords: string[];
//   added_countries_tags: string[];
//   additives_n: number;
//   additives_original_tags: string[];
//   additives_tags: string[];
//   allergens: string;
//   allergens_from_ingredients: string;
//   allergens_from_user: string;
//   allergens_hierarchy: string[];
//   allergens_lc: string;
//   allergens_tags: string[];
//   amino_acids_tags: string[];
//   brands: string;
//   brands_tags: string[];
//   categories: string;
//   categories_hierarchy: string[];
//   categories_lc: string;
//   categories_properties?: Record<string, string>;
//   categories_properties_tags: string[];
//   categories_tags: string[];
//   checkers_tags: string[];
//   cities_tags: string[];
//   code: string;
//   codes_tags: string[];
//   compared_to_category: string;
//   complete: number;
//   completeness: number;
//   correctors_tags: string[];
//   countries: string;
//   countries_beforescanbot: string;
//   countries_hierarchy: string[];
//   countries_lc: string;
//   countries_tags: string[];
//   created_t: number;
//   creator: string;
//   data_quality_bugs_tags: string[];
//   data_quality_errors_tags: string[];
//   data_quality_info_tags: string[];
//   data_quality_tags: string[];
//   data_quality_warnings_tags: string[];
//   data_sources: string;
//   data_sources_tags: string[];
//   debug_param_sorted_langs: string[];
//   ecoscore_data: {
//     adjustments: {
//       origins_of_ingredients: {
//         epi_score: number;
//         epi_value: number;
//         origins_from_categories: string[];
//         origins_from_origins_field: string[];
//         transportation_score: number;
//         transportation_scores?: Record<string, number>;
//         transportation_value: number;
//         transportation_values?: Record<string, number>;
//         value: number;
//         values?: Record<string, number>;
//       };
//       packaging?: Record<string, string | number>;
//       production_system: {
//         labels: string[];
//         value: number;
//         warning: string;
//       };
//       threatened_species: {
//         ingredient: string;
//         value: number;
//       };
//     };
//     agribalyse: Record<string, string | number>;
//     grade: string;
//     grades: Record<string, string>;
//     missing: {
//       labels: number;
//       packagings: number;
//     };
//     missing_data_warning: number;
//     missing_key_data: number;
//     score: number;
//     scores: Record<string, number>;
//     status: string;
//   };
//   ecoscore_grade: string;
//   ecoscore_score: number;
//   ecoscore_tags: string[];
//   editors_tags: string[];
//   emb_codes: string;
//   emb_codes_tags: string[];
//   entry_dates_tags: string[];
//   expiration_date: string;
//   food_groups: string;
//   food_groups_tags: string[];
//   generic_name: string;
//   generic_name_ar: string;
//   generic_name_en: string;
//   generic_name_fr: string;
//   id: string;
//   image_front_small_url: string;
//   image_front_thumb_url: string;
//   image_front_url: string;
//   image_ingredients_small_url: string;
//   image_ingredients_thumb_url: string;
//   image_ingredients_url: string;
//   image_nutrition_small_url: string;
//   image_nutrition_thumb_url: string;
//   image_nutrition_url: string;
//   image_packaging_small_url: string;
//   image_packaging_thumb_url: string;
//   image_packaging_url: string;
//   image_small_url: string;
//   image_thumb_url: string;
//   image_url: string;
//   informers_tags: string[];
//   ingredients: Ingredients[];
//   ingredients_analysis_tags: string[];
//   ingredients_hierarchy: string[];
//   ingredients_lc: string;
//   ingredients_n: string;
//   ingredients_n_tags: string[];
//   ingredients_non_nutritive_sweeteners_n: number;
//   ingredients_original_tags: string[];
//   ingredients_percent_analysis: number;
//   ingredients_sweeteners_n: number;
//   ingredients_tags: string[];
//   ingredients_text: string;
//   ingredients_text_ar: string;
//   ingredients_text_en: string;
//   ingredients_text_fr: string;
//   ingredients_text_with_allergens: string;
//   ingredients_text_with_allergens_ar: string;
//   ingredients_text_with_allergens_en: string;
//   ingredients_text_with_allergens_fr: string;
//   ingredients_with_specified_percent_n: number;
//   ingredients_with_specified_percent_sum: number;
//   ingredients_with_unspecified_percent_n: number;
//   ingredients_with_unspecified_percent_sum: number;
//   ingredients_without_ciqual_codes: string[];
//   ingredients_without_ciqual_codes_n: number;
//   ingredients_without_ecobalyse_ids: string[];
//   ingredients_without_ecobalyse_ids_n: number;
//   interface_version_created: string;
//   interface_version_modified: string;
//   known_ingredients_n: number;
//   labels: string;
//   labels_hierarchy: string[];
//   labels_lc: string;
//   labels_tags: string[];
//   lang: string;
//   languages: Record<string, number>;
//   languages_codes: Record<string, number>;
//   languages_hierarchy: string[];
//   languages_tags: string[];
//   last_edit_dates_tags: string[];
//   last_editor: string;
//   last_image_dates_tags: string[];
//   last_image_t: number;
//   last_modified_by: string;
//   last_modified_t: number;
//   last_updated_t: number;
//   lc: string;
//   link: string;
//   main_countries_tags: string[];
//   manufacturing_places: string;
//   manufacturing_places_tags: string[];
//   max_imgid: string;
//   minerals_tags: string[];
//   misc_tags: string[];
//   no_nutrition_data: string;
//   nova_group_debug: string;
//   nova_group_error: string;
//   nova_groups_tags: string[];
//   nucleotides_tags: string[];
//   nutrient_levels: Record<string, string>;
//   nutrient_levels_tags: string[];
//   nutriments: Record<string, string | number>;
//   nutriscore_2021_tags: string[];
//   nutriscore_2023_tags: string[];
//   nutriscore_grade: string;
//   nutriscore_score: number;
//   nutriscore_score_opposite: number;
//   nutriscore_tags: string[];
//   nutriscore_version: string;
//   nutrition_data: string;
//   nutrition_data_per: string;
//   nutrition_data_prepared: string;
//   nutrition_data_prepared_per: string;
//   nutrition_grade_fr: string;
//   nutrition_grades: string;
//   nutrition_grades_tags: string[];
//   nutrition_score_beverage: number;
//   nutrition_score_debug: string;
//   obsolete: string;
//   obsolete_since_date: string;
//   origin: string;
//   origin_ar: string;
//   origin_en: string;
//   origin_fr: string;
//   origins: string;
//   origins_hierarchy: string[];
//   origins_lc: string;
//   origins_tags: string[];
//   other_nutritional_substances_tags: string[];
//   packaging_materials_tags: string[];
//   packaging_recycling_tags: string[];
//   packaging_shapes_tags: string[];
//   packaging_text: string;
//   packaging_text_ar: string;
//   packaging_text_en: string;
//   packaging_text_fr: string;
//   packagings: string[];
//   packagings_complete: number;
//   photographers_tags: string[];
//   pnns_groups_1: string;
//   pnns_groups_1_tags: string[];
//   pnns_groups_2: string;
//   pnns_groups_2_tags: string[];
//   popularity_key: number;
//   popularity_tags: string[];
//   product_name: string;
//   product_name_ar: string;
//   product_name_en: string;
//   product_name_fr: string;
//   product_quantity: string;
//   product_type: string;
//   purchase_places: string;
//   purchase_places_tags: string[];
//   quantity: string;
//   removed_countries_tags: string[];
//   rev: number;
//   scans_n: number;
//   schema_version: number;
//   serving_quantity: string;
//   serving_quantity_unit: string;
//   serving_size: string;
//   states: string;
//   states_hierarchy: string[];
//   states_tags: string[];
//   stores: string;
//   stores_tags: string[];
//   teams: string;
//   teams_tags: string[];
//   traces: string;
//   traces_from_ingredients: string;
//   traces_from_user: string;
//   traces_hierarchy: string[];
//   traces_lc: string;
//   traces_tags: string[];
//   unique_scans_n: number;
//   unknown_ingredients_n: string;
//   unknown_nutrients_tags: string[];
//   update_key: string;
//   vitamins_tags: string[];
//   weighers_tags: string[];
// }

export interface IngredientsAnalysis {
  "en:non-vegan"?: string[];
  "en:palm-oil"?: string[];
  "en:vegan-status-unknown"?: string[];
  "en:vegetarian-status-unknown"?: string[];
  "en:palm-oil-content-unknown"?: string[];
}

export interface EcoscoreData {
  adjustments: {
    origins_of_ingredients: {
      aggregated_origins?: {
        epi_score?: number;
        origin: string;
        percent: number;
        transportation_score?: number;
      }[];
      epi_score: number;
      epi_value: number;
      origins_from_categories: string[];
      origins_from_origins_field: string[];
      transportation_score?: number;
      transportation_scores?: Record<string, number>;
      transportation_value?: number;
      transportation_values?: Record<string, number>;
      value: number;
      values?: Record<string, number>;
      warning?: string;
    };
    packaging?: {
      value: number;
      warning?: string;
    };
    production_system: {
      labels: string[];
      value: number;
      warning?: string;
    };
    threatened_species?: {
      ingredient?: string;
      value?: number;
    };
  };
  agribalyse?: Record<string, string | number>;
  grade: string;
  grades: Record<string, string>;
  missing?: {
    labels?: number;
    origins?: number;
    packagings?: number;
  };
  missing_data_warning?: number;
  missing_key_data?: number;
  previous_data?: Record<string, any>;
  score: number;
  scores: Record<string, number>;
  status: string;
}

// Nutriscore data structure
export interface NutriscoreData {
  components?: {
    negative: {
      id: string;
      points: number;
      points_max: number;
      unit: string;
      value: number;
    }[];
    positive: {
      id: string;
      points: number;
      points_max: number;
      unit: string;
      value: number;
    }[];
  };
  count_proteins?: number;
  count_proteins_reason?: string;
  grade?: string;
  is_beverage?: number;
  is_cheese?: number;
  is_fat_oil_nuts_seeds?: number;
  is_red_meat_product?: number;
  is_water?: number;
  negative_points?: number;
  negative_points_max?: number;
  positive_nutrients?: string[];
  positive_points?: number;
  positive_points_max?: number;
  score?: number;
  nutriscore_not_applicable_for_category?: string;
  not_applicable_category?: string;
  nutrients_available?: number;
  nutriscore_applicable?: number;
  nutriscore_computed?: number;
}

export interface Product {
  _id: string;
  code: string;
  id: string;
  product_name: string;
  product_name_en: string;
  product_quantity?: string | number;
  product_quantity_unit?: string;
  product_type?: string;
  quantity?: string;
  brands?: string;
  brands_old?: string;
  brands_tags: string[];
  categories: string;
  categories_hierarchy: string[];
  categories_lc: string;
  categories_properties?: Record<string, string>;
  categories_properties_tags: string[];
  categories_tags: string[];
  countries?: string;
  countries_beforescanbot?: string;
  countries_hierarchy: string[];
  countries_lc?: string;
  countries_tags: string[];
  origins?: string;
  origins_hierarchy: string[];
  origins_lc?: string;
  origins_tags: string[];
  ingredients: Ingredients[];
  ingredients_analysis?: IngredientsAnalysis;
  ingredients_analysis_tags: string[];
  ingredients_hierarchy: string[];
  ingredients_lc: string;
  ingredients_n: number;
  ingredients_n_tags: string[];
  ingredients_text: string;
  ingredients_text_ar?: string;
  ingredients_text_en?: string;
  ingredients_text_fr?: string;
  ingredients_text_with_allergens?: string;
  ingredients_text_with_allergens_ar?: string;
  ingredients_text_with_allergens_en?: string;
  ingredients_text_with_allergens_fr?: string;
  allergens?: string;
  allergens_from_ingredients?: string;
  allergens_from_user?: string;
  allergens_hierarchy: string[];
  allergens_lc?: string;
  allergens_tags: string[];
  additives_n: number;
  additives_original_tags: string[];
  additives_tags: string[];
  nutriments?: Record<string, string | number>;
  nutrition_data?: string;
  nutrition_data_per?: string;
  nutrition_grade_fr?: string;
  nutrition_grades?: string;
  nutrition_grades_tags: string[];
  nutriscore_grade?: string;
  nutriscore_score?: number;
  nutriscore_data?: NutriscoreData;
  nutriscore_tags: string[];
  nutriscore_version?: string;
  nutrient_levels?: Record<string, string>;
  nutrient_levels_tags: string[];
  ecoscore_data?: EcoscoreData;
  ecoscore_grade?: string;
  grade?: string;
  ecoscore_score?: number;
  ecoscore_tags: string[];
  nova_group?: number;
  nova_group_debug?: string;
  nova_groups_tags: string[];
  food_groups?: string;
  food_groups_tags: string[];
  pnns_groups_1?: string;
  pnns_groups_1_tags: string[];
  pnns_groups_2?: string;
  pnns_groups_2_tags: string[];
  image_url: string;
  created_t: number;
  creator: string;
  last_modified_t: number;
  last_modified_by: string;
  last_updated_t: number;
  rev: number;
  completeness: number;
  complete: number;

  // Tags and classifications
  _keywords: string[];
  labels?: string;
  labels_hierarchy: string[];
  labels_lc?: string;
  labels_tags: string[];
  states?: string;
  states_hierarchy: string[];
  states_tags: string[];

  // Serving info
  serving_quantity?: string | number;
  serving_quantity_unit?: string;
  serving_size?: string;

  // Various tag arrays
  amino_acids_tags: string[];
  minerals_tags: string[];
  vitamins_tags: string[];
  nucleotides_tags: string[];
  other_nutritional_substances_tags: string[];
  unknown_nutrients_tags: string[];

  // Popularity and statistics
  popularity_key?: number;
  popularity_tags: string[];
  scans_n?: number;
  unique_scans_n?: number;

  // Quality and completeness
  data_quality_tags: string[];
  data_quality_errors_tags: string[];
  data_quality_warnings_tags: string[];
  data_quality_info_tags: string[];
  data_quality_bugs_tags: string[];

  // Contributors
  editors_tags: string[];
  correctors_tags: string[];
  photographers_tags: string[];
  informers_tags: string[];
  checkers_tags: string[];

  // Dates
  entry_dates_tags: string[];
  last_edit_dates_tags: string[];
  last_image_dates_tags: string[];
  last_image_t?: number;

  // Packaging
  packaging_text?: string;
  packaging_text_ar?: string;
  packaging_text_en?: string;
  packaging_text_fr?: string;
  packagings?: any[];
  packagings_complete?: number;
  packaging_materials_tags: string[];
  packaging_recycling_tags: string[];
  packaging_shapes_tags: string[];

  // Languages
  lang?: string;
  lc?: string;
  languages?: Record<string, number>;
  languages_codes?: Record<string, number>;
  languages_hierarchy: string[];
  languages_tags: string[];

  // Misc
  compared_to_category?: string;
  unknown_ingredients_n?: number; // Fixed: should be number
  known_ingredients_n?: number;
  schema_version?: number;
  interface_version_created?: string;
  interface_version_modified?: string;
  teams?: string;
  teams_tags: string[];
  misc_tags: string[];

  // Fields that may be empty/optional
  expiration_date?: string;
  generic_name?: string;
  generic_name_ar?: string;
  generic_name_en?: string;
  generic_name_fr?: string;
  link?: string;
  no_nutrition_data?: string;
  obsolete?: string;
  obsolete_since_date?: string;
  origin?: string;
  origin_ar?: string;
  origin_en?: string;
  origin_fr?: string;

  // Traces
  traces?: string;
  traces_from_ingredients?: string;
  traces_from_user?: string;
  traces_hierarchy: string[];
  traces_lc?: string;
  traces_tags: string[];

  // Purchase and manufacturing
  purchase_places?: string;
  purchase_places_tags: string[];
  manufacturing_places?: string;
  manufacturing_places_tags: string[];
  stores?: string;
  stores_tags: string[];

  // Additional arrays
  added_countries_tags: string[];
  removed_countries_tags: string[];
  cities_tags: string[];
  codes_tags: string[];
  main_countries_tags: string[];
  weighers_tags: string[];

  // Debug and technical
  debug_param_sorted_langs?: string[];
  nutrition_score_beverage?: number;
  nutrition_score_debug?: string;
  update_key?: string;
  max_imgid?: string;

  // Data sources
  data_sources?: string;
  data_sources_tags: string[];

  // EMB codes
  emb_codes?: string;
  emb_codes_tags: string[];

  // Ingredient analysis details
  ingredients_original_tags: string[];
  ingredients_tags: string[];
  ingredients_with_specified_percent_n?: number;
  ingredients_with_specified_percent_sum?: number;
  ingredients_with_unspecified_percent_n?: number;
  ingredients_with_unspecified_percent_sum?: number;
  ingredients_without_ciqual_codes?: string[];
  ingredients_without_ciqual_codes_n?: number;
  ingredients_without_ecobalyse_ids?: string[];
  ingredients_without_ecobalyse_ids_n?: number;
  ingredients_percent_analysis?: number;
  ingredients_non_nutritive_sweeteners_n?: number;
  ingredients_sweeteners_n?: number;

  // Nutriscore versions
  nutriscore_2021_tags?: string[];
  nutriscore_2023_tags?: string[];
  nutriscore_score_opposite?: number;
}

export interface OpenFoodData {
  status: number;
  product: Product;
}

export interface OpenFoodResponseAPI {
  code: string;
  product: Product;
  status: number;
  status_verbose: string;
}

export interface CachedProduct {
  score: string;
  open_food_data: OpenFoodData;
}

export interface Address {
  suburb: string;
  city: string;
  county: string;
  state_district: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface OpenStreetMapResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
}

export interface ProductScanResult {
  status: number;
  score: number;
  image_url: string | null;
  recommendations: Recommendations[];
  product_name: string;
}

export interface IHalalScanResult {
  product_status: number;
  status: HalalCheckStatus;
  summary: string;
  image_url: string | null;
  product_name: string;
  score: number;
}

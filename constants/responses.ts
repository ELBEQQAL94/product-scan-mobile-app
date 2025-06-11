export interface Product {
  countries?: string;
  image_url: string;
  ingredients?: Ingredient[];
  labels: string;
  product_name: string;
  product_name_ar: string;
  product_name_en: string;
  product_name_fr: string;
  product_type: string;
}

export interface OpenFoodData {
  status: number;
  product: Product;
}

interface AggregatedOrigins {
  epi_score: string;
  origin: string;
  percent: number;
  transportation_score: number;
}

export interface Ingredient {
  id: string;
  text: string;
  rank?: number;
  is_in_taxonomy?: number;
  percent: number;
  percent_estimate?: number;
  percent_max?: number;
  percent_min?: number;
  has_sub_ingredients?: string;
  vegan?: string;
  vegetarian?: string;
  from_palm_oil?: string;
  ciqual_food_code?: string;
  ciqual_proxy_food_code?: string;
  ecobalyse_code?: string;
}

interface OpenFoodProduct {
  _id: string;
  _keywords: string[];
  added_countries_tags: any[];
  additives_n: number;
  additives_original_tags: any[];
  additives_tags: any[];
  allergens: string;
  allergens_from_ingredients: string;
  allergens_from_user: string;
  allergens_hierarchy: string[];
  allergens_lc: string;
  allergens_tags: string[];
  amino_acids_tags: any[];
  brands: string;
  brands_tags: string[];
  categories: string;
  categories_hierarchy: string[];
  categories_lc: string;
  categories_properties: {
    "agribalyse_proxy_food_code:en": string;
  };
  categories_properties_tags: string[];
  categories_tags: string[];
  checkers_tags: any[];
  cities_tags: any[];
  code: string;
  codes_tags: string[];
  compared_to_category: string;
  complete: number;
  completeness: number;
  correctors_tags: string[];
  countries?: string;
  countries_beforescanbot: string;
  countries_hierarchy: string[];
  countries_lc: string;
  countries_tags: string[];
  created_t: number;
  creator: string;
  data_quality_bugs_tags: any[];
  data_quality_errors_tags: any[];
  data_quality_info_tags: string[];
  data_quality_tags: string[];
  data_quality_warnings_tags: string[];
  data_sources: string;
  data_sources_tags: string[];
  debug_param_sorted_langs: string[];
  ecoscore_data: {
    adjustments: {
      origins_of_ingredients: {
        aggregated_origins: AggregatedOrigins[];
        epi_score: number;
        epi_value: number;
        origins_from_categories: string[];
        origins_from_origins_field: string[];
        transportation_score: number;
        transportation_scores: { key: string };
        transportation_value: number;
        transportation_values: { key: string };
        value: number;
        values: { key: string };
      };
      packaging: {
        value: number;
        warning: string;
      };
      production_system: {
        labels: any[];
        value: number;
        warning: string;
      };
      threatened_species: {
        ingredient: string;
        value: number;
      };
    };
    agribalyse: {
      agribalyse_proxy_food_code: string;
      co2_agriculture: number;
      co2_consumption: number;
      co2_distribution: number;
      co2_packaging: number;
      co2_processing: number;
      co2_total: number;
      co2_transportation: number;
      code: string;
      dqr: string;
      ef_agriculture: number;
      ef_consumption: number;
      ef_distribution: number;
      ef_packaging: number;
      ef_processing: number;
      ef_total: number;
      ef_transportation: number;
      is_beverage: number;
      name_en: string;
      name_fr: string;
      score: number;
      version: string;
    };
    grade: string;
    grades: { key: string };
    missing: {
      labels: number;
      packagings: number;
    };
    missing_data_warning: number;
    missing_key_data: number;
    score: number;
    scores: { key: string };
    status: string;
  };
  ecoscore_grade: string;
  ecoscore_score: number;
  ecoscore_tags: string[];
  editors_tags: string[];
  emb_codes: string;
  emb_codes_tags: any[];
  entry_dates_tags: string[];
  expiration_date: string;
  food_groups: string;
  food_groups_tags: string[];
  generic_name: string;
  generic_name_ar: string;
  generic_name_en: string;
  generic_name_fr: string;
  id: string;
  image_front_small_url: string;
  image_front_thumb_url: string;
  image_front_url: string;
  image_ingredients_small_url: string;
  image_ingredients_thumb_url: string;
  image_ingredients_url: string;
  image_nutrition_small_url: string;
  image_nutrition_thumb_url: string;
  image_nutrition_url: string;
  image_packaging_small_url: string;
  image_packaging_thumb_url: string;
  image_packaging_url: string;
  image_small_url: string;
  image_thumb_url: string;
  image_url: string;
  informers_tags: string[];
  ingredients: Ingredient[];
  labels: string;
  nutriments: { key: string | number };
  product_name: string;
  product_name_ar: string;
  product_name_en: string;
  product_name_fr: string;
  product_type: string;
}

export interface OpenFoodResponse {
  code: string;
  product: OpenFoodProduct;
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

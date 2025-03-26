import OpenAI from "openai";
import axios from 'axios';
import { prompt } from "@/prompt";

// Type definitions for product response from barcode API

export interface ProductResponse {
    code: string;
    product: Product;
    status: number;
    status_verbose: string;
}

export interface Product {
    _id: string;
    _keywords: string[];
    added_countries_tags: string[];
    additives_n: number;
    additives_original_tags: string[];
    additives_tags: string[];
    allergens: string;
    allergens_from_ingredients: string;
    allergens_from_user: string;
    allergens_hierarchy: string[];
    allergens_tags: string[];
    amino_acids_tags: string[];
    categories_properties: Record<string, any>;
    categories_properties_tags: string[];
    checkers_tags: string[];
    code: string;
    codes_tags: string[];
    complete: number;
    completeness: number;
    correctors_tags: string[];
    countries: string;
    countries_beforescanbot: string;
    countries_hierarchy: string[];
    countries_lc: string;
    countries_tags: string[];
    created_t: number;
    creator: string;
    data_quality_bugs_tags: string[];
    data_quality_errors_tags: string[];
    data_quality_info_tags: string[];
    data_quality_tags: string[];
    data_quality_warnings_tags: string[];
    data_sources: string;
    data_sources_tags: string[];
    ecoscore_data: EcoscoreData;
    ecoscore_grade: string;
    ecoscore_tags: string[];
    editors_tags: string[];
    entry_dates_tags: string[];
    food_groups_tags: string[];
    id: string;
    image_front_small_url: string;
    image_front_thumb_url: string;
    image_front_url: string;
    image_small_url: string;
    image_thumb_url: string;
    image_url: string;
    images: Images;
    informers_tags: string[];
    ingredients: Ingredient[];
    ingredients_analysis: IngredientsAnalysis;
    ingredients_analysis_tags: string[];
    ingredients_hierarchy: string[];
    ingredients_lc: string;
    ingredients_n: number;
    ingredients_n_tags: string[];
    ingredients_non_nutritive_sweeteners_n: number;
    ingredients_original_tags: string[];
    ingredients_percent_analysis: number;
    ingredients_sweeteners_n: number;
    ingredients_tags: string[];
    ingredients_text: string;
    ingredients_text_fr: string;
    ingredients_text_with_allergens: string;
    ingredients_text_with_allergens_fr: string;
    ingredients_with_specified_percent_n: number;
    ingredients_with_specified_percent_sum: number;
    ingredients_with_unspecified_percent_n: number;
    ingredients_with_unspecified_percent_sum: number;
    ingredients_without_ciqual_codes: string[];
    ingredients_without_ciqual_codes_n: number;
    ingredients_without_ecobalyse_ids: string[];
    ingredients_without_ecobalyse_ids_n: number;
    interface_version_created: string;
    interface_version_modified: string;
    known_ingredients_n: number;
    lang: string;
    languages: Record<string, number>;
    languages_codes: Record<string, number>;
    languages_hierarchy: string[];
    languages_tags: string[];
    last_edit_dates_tags: string[];
    last_editor: string;
    last_image_dates_tags: string[];
    last_image_t: number;
    last_modified_by: string;
    last_modified_t: number;
    last_updated_t: number;
    lc: string;
    main_countries_tags: string[];
    max_imgid: string;
    minerals_tags: string[];
    misc_tags: string[];
    no_nutrition_data: string;
    nova_group: number;
    nova_group_debug: string;
    nova_groups: string;
    nova_groups_markers: NovaGroupsMarkers;
    nova_groups_tags: string[];
    nucleotides_tags: string[];
    nutrient_levels: Record<string, any>;
    nutrient_levels_tags: string[];
    nutriments: Nutriments;
    nutriments_estimated: NutrimentsEstimated;
    nutriscore: Nutriscore;
    nutriscore_2021_tags: string[];
    nutriscore_2023_tags: string[];
    nutriscore_grade: string;
    nutriscore_tags: string[];
    nutriscore_version: string;
    nutrition_data: string;
    nutrition_data_per: string;
    nutrition_data_prepared_per: string;
    nutrition_grade_fr: string;
    nutrition_grades: string;
    nutrition_grades_tags: string[];
    nutrition_score_beverage: number;
    nutrition_score_debug: string;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
    nutrition_score_warning_no_fiber: number;
    other_nutritional_substances_tags: string[];
    packaging_materials_tags: string[];
    packaging_recycling_tags: string[];
    packaging_shapes_tags: string[];
    packagings: any[];
    packagings_materials: Record<string, any>;
    photographers_tags: string[];
    pnns_groups_1: string;
    pnns_groups_1_tags: string[];
    pnns_groups_2: string;
    pnns_groups_2_tags: string[];
    popularity_key: number;
    popularity_tags: string[];
    product_name_ar: string;
    product_type: string;
    removed_countries_tags: string[];
    rev: number;
    scans_n: number;
    selected_images: SelectedImages;
    states: string;
    states_hierarchy: string[];
    states_tags: string[];
    traces: string;
    traces_from_ingredients: string;
    traces_from_user: string;
    traces_hierarchy: string[];
    traces_tags: string[];
    unique_scans_n: number;
    unknown_ingredients_n: number;
    unknown_nutrients_tags: string[];
    update_key: string;
    vitamins_tags: string[];
    weighers_tags: string[];
}

export interface EcoscoreData {
    adjustments: EcoscoreAdjustments;
    agribalyse: {
        warning: string;
    };
    grade: string;
    missing: {
        categories: number;
        labels: number;
        origins: number;
        packagings: number;
    };
    missing_agribalyse_match_warning: number;
    missing_key_data: number;
    scores: Record<string, any>;
    status: string;
}

export interface EcoscoreAdjustments {
    origins_of_ingredients: {
        aggregated_origins: {
            epi_score: string;
            origin: string;
            percent: number;
            transportation_score: number;
        }[];
        epi_score: number;
        epi_value: number;
        origins_from_categories: string[];
        origins_from_origins_field: string[];
        transportation_score: number;
        transportation_scores: Record<string, number>;
        transportation_value: number;
        transportation_values: Record<string, number>;
        value: number;
        values: Record<string, number>;
        warning: string;
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
    threatened_species: Record<string, any>;
}

export interface Images {
    [key: string]: {
        sizes?: {
            [size: string]: {
                h: number;
                w: number;
            };
        };
        uploaded_t?: number;
        uploader?: string;
        angle?: number;
        coordinates_image_size?: string;
        geometry?: string;
        imgid?: string;
        normalize?: null;
        rev?: string;
        white_magic?: null;
        x1?: string;
        x2?: string;
        y1?: string;
        y2?: string;
    };
}

export interface Ingredient {
    ciqual_food_code?: string;
    ciqual_proxy_food_code?: string;
    ecobalyse_code?: string;
    id: string;
    is_in_taxonomy?: number;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    rank?: number;
    text: string;
    vegan?: string;
    vegetarian?: string;
    has_sub_ingredients?: string;
    from_palm_oil?: string;
}

export interface IngredientsAnalysis {
    "en:may-contain-palm-oil": string[];
    "en:maybe-vegan": string[];
    "en:maybe-vegetarian": string[];
}

export interface NovaGroupsMarkers {
    "3": [string, string][];
    "4": [string, string][];
}

export interface Nutriments {
    carbohydrates: number;
    carbohydrates_100g: number;
    carbohydrates_unit: string;
    carbohydrates_value: number;
    energy: number;
    "energy-kcal": number;
    "energy-kcal_100g": number;
    "energy-kcal_unit": string;
    "energy-kcal_value": number;
    "energy-kcal_value_computed": number;
    energy_100g: number;
    energy_unit: string;
    energy_value: number;
    fat: number;
    fat_100g: number;
    fat_unit: string;
    fat_value: number;
    "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
    "fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
    "nova-group": number;
    "nova-group_100g": number;
    "nova-group_serving": number;
    proteins: number;
    proteins_100g: number;
    proteins_unit: string;
    proteins_value: number;
    salt: number;
    salt_100g: number;
    salt_unit: string;
    salt_value: number;
    "saturated-fat": number;
    "saturated-fat_100g": number;
    "saturated-fat_unit": string;
    "saturated-fat_value": number;
    sodium: number;
    sodium_100g: number;
    sodium_unit: string;
    sodium_value: number;
    sugars: number;
    sugars_100g: number;
    sugars_unit: string;
    sugars_value: number;
}

export interface NutrimentsEstimated {
    alcohol_100g: number;
    "beta-carotene_100g": number;
    calcium_100g: number;
    carbohydrates_100g: number;
    cholesterol_100g: number;
    copper_100g: number;
    "energy-kcal_100g": number;
    "energy-kj_100g": number;
    energy_100g: number;
    fat_100g: number;
    fiber_100g: number;
    fructose_100g: number;
    galactose_100g: number;
    glucose_100g: number;
    iodine_100g: number;
    iron_100g: number;
    lactose_100g: number;
    magnesium_100g: number;
    maltose_100g: number;
    manganese_100g: number;
    "pantothenic-acid_100g": number;
    phosphorus_100g: number;
    phylloquinone_100g: number;
    polyols_100g: number;
    potassium_100g: number;
    proteins_100g: number;
    salt_100g: number;
    "saturated-fat_100g": number;
    selenium_100g: number;
    sodium_100g: number;
    starch_100g: number;
    sucrose_100g: number;
    sugars_100g: number;
    "vitamin-a_100g": number;
    "vitamin-b12_100g": number;
    "vitamin-b1_100g": number;
    "vitamin-b2_100g": number;
    "vitamin-b6_100g": number;
    "vitamin-b9_100g": number;
    "vitamin-c_100g": number;
    "vitamin-d_100g": number;
    "vitamin-e_100g": number;
    "vitamin-pp_100g": number;
    water_100g: number;
    zinc_100g: number;
}

export interface Nutriscore {
    "2021": {
        category_available: number;
        data: {
            energy: number;
            fiber: number;
            fruits_vegetables_nuts_colza_walnut_olive_oils: number;
            is_beverage: number;
            is_cheese: number;
            is_fat: number;
            is_water: number;
            proteins: number;
            saturated_fat: number;
            sodium: number;
            sugars: number;
        };
        grade: string;
        nutrients_available: number;
        nutriscore_applicable: number;
        nutriscore_computed: number;
    };
    "2023": {
        category_available: number;
        data: {
            energy: number;
            fiber: null;
            fruits_vegetables_legumes: number;
            is_beverage: number;
            is_cheese: number;
            is_fat_oil_nuts_seeds: number;
            is_red_meat_product: number;
            is_water: number;
            proteins: number;
            salt: number;
            saturated_fat: number;
            sugars: number;
        };
        grade: string;
        nutrients_available: number;
        nutriscore_applicable: number;
        nutriscore_computed: number;
    };
}

export interface SelectedImages {
    front: {
        display: {
            fr: string;
        };
        small: {
            fr: string;
        };
        thumb: {
            fr: string;
        };
    };
}

export const chat = async (data: Product) => {
    const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });
    const content = prompt(data);
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content,
                },
            ],
        });
        const answer = completion.choices[0].message.content;
        return answer;
    } catch (error) {
        console.log('chat get an error: ', error);
    };
};

export const product_details = async (bar_code: string): Promise<undefined | Product> => {
    try {
        const base_url = `https://world.openfoodfacts.org/api/v0/product/${bar_code}.json`;
        const response = await axios.get(base_url) as Product;
        return response;
    } catch (error) {
        console.log('error: ', error);
    }
}
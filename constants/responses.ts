interface Ingredient {
    id: string;
    percent: number;
    text: string;
}

interface Product {
    countries: string;
    image_url: string;
    ingredients: Ingredient[];
    labels: string;

    product_name: string;
    product_name_ar: string;
    product_name_en: string;
    product_name_fr: string;
    product_type: string;
}

export interface OpenFoodData {
    product: Product;
}
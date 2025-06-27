import { HalalProductResponse } from "@/types/scan-result";

// Completing the export statement
export const checkHalalProductResponseInAr: HalalProductResponse = {
  status: "HARAM",
  summary:
    "المنتج يحتوي على جيلاتين مشتق من لحم الخنزير، وهو من المصادر المحرمة في الشريعة الإسلامية. بالإضافة إلى ذلك، يحتوي على مستخلص الفانيليا الذي يحتوي على كحول، وهو أيضاً من المحرمات. لذلك، فإن المنتج غير حلال بشكل واضح.",
};

export const checkHalalProductResponseInFr: HalalProductResponse = {
  status: "HARAM",
  summary:
    "Le produit contient de la gélatine de porc et de l'extrait de vanille contenant de l'alcool, qui sont tous deux des ingrédients clairement haram selon la loi islamique. Par conséquent, le produit n'est pas halal.",
};

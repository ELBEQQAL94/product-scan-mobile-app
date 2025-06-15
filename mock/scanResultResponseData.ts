import { ScanResultResponse } from "@/types/scan-result";

export const scanResultResponseDataMock: ScanResultResponse = {
  score: 50,
  recommendations: [
    {
      recommendation:
        "Consider reducing consumption of products high in saturated fats.",
      severity: "moderate",
      explanation:
        "This snack may be high in saturated fat, which is concerning for heart health. Regular intake of saturated fats can increase the risk of heart disease.",
    },
    {
      recommendation: "Be cautious about this product's allergen content.",
      severity: "high",
      explanation:
        "This product contains common allergens like gluten, milk, and soy, which can cause reactions in sensitive individuals.",
    },
    {
      recommendation:
        "Look for products with detailed and transparent ingredient lists.",
      severity: "moderate",
      explanation:
        "The ingredient list lacks detailed breakdowns, making it difficult to assess the processing level and the presence of artificial additives.",
    },
    {
      recommendation:
        "Due to the lack of comprehensive nutritional information, consider alternatives with complete data.",
      severity: "moderate",
      explanation:
        "Key nutritional data such as sugar and sodium content is missing, which could potentially mask high levels that are detrimental to health.",
    },
    {
      recommendation:
        "Opt for snacks with fewer processed or sugary ingredients.",
      severity: "moderate",
      explanation:
        "This product is categorized under sugary snacks, which are generally high in sugars and low in nutritional value. Limiting consumption is advisable.",
    },
  ],
};

export const scanResultResponseDataMockAr: ScanResultResponse = {
  score: 65,
  recommendations: [
    {
      recommendation:
        "ينصح بتقليل استهلاك ويفر الشوكولاتة للأشخاص الذين يعانون من ارتفاع ضغط الدم.",
      severity: "moderate",
      explanation:
        "يحتوي المنتج على نسبة من الملح تصل إلى 2%، مما قد يزيد من خطر ارتفاع ضغط الدم عند استهلاكه بكميات كبيرة.",
    },
    {
      recommendation:
        "ينصح بتقليل استهلاك المنتج للأشخاص الذين يعانون من السمنة أو يحاولون التحكم في وزنهم.",
      severity: "moderate",
      explanation:
        "يحتوي المنتج على نسبة عالية من السكر (15%) وزيت النخيل (8%)، مما يزيد من السعرات الحرارية وقد يساهم في زيادة الوزن.",
    },
    {
      recommendation:
        "ينصح بتجنب المنتج للأشخاص الذين يعانون من حساسية القمح أو الغلوتين.",
      severity: "high",
      explanation:
        "يحتوي المنتج على دقيق القمح بنسبة 30%، وهو مصدر للغلوتين الذي قد يسبب مشاكل صحية للأشخاص الذين يعانون من حساسية الغلوتين.",
    },
    {
      recommendation:
        "ينصح بتفضيل المنتجات التي تحتوي على مكونات طبيعية أكثر وأقل معالجة.",
      severity: "moderate",
      explanation:
        "المنتج يحتوي على مكونات معالجة مثل زيت النخيل والسكر، والتي قد تؤثر سلباً على الصحة عند استهلاكها بكميات كبيرة.",
    },
  ],
};

export const scanResultResponseDataMockEs: ScanResultResponse = {
  score: 65,
  recommendations: [
    {
      recommendation:
        "Limitar el consumo de este producto debido a su contenido de azúcar y aceite de palma.",
      severity: "moderate",
      explanation:
        "El producto contiene un 15% de azúcar, lo cual es una cantidad moderada que puede contribuir al aumento de peso y problemas de salud como la diabetes si se consume en exceso. Además, el aceite de palma, presente en un 8%, es alto en grasas saturadas, lo que puede afectar la salud cardiovascular.",
    },
    {
      recommendation:
        "Considerar alternativas con menos ingredientes procesados.",
      severity: "moderate",
      explanation:
        "El producto tiene un alto porcentaje de ingredientes procesados, como el aceite de palma y el azúcar refinado. Optar por productos con más ingredientes integrales puede ser más beneficioso para la salud.",
    },
    {
      recommendation:
        "Verificar la presencia de alérgenos si se tiene sensibilidad al gluten.",
      severity: "high",
      explanation:
        "El producto contiene harina de trigo, que es una fuente de gluten. Las personas con enfermedad celíaca o sensibilidad al gluten deben evitar este producto.",
    },
  ],
};

export const scanResultResponseWithProfileHealthSetupDataMock: ScanResultResponse =
  {
    score: 0,
    recommendations: [
      {
        recommendation: "تجنب تناول هذا المنتج تمامًا.",
        severity: "critical",
        explanation:
          "يحتوي المنتج على اللوز، وهو من المكسرات التي لديك حساسية منها، مما يشكل خطرًا كبيرًا على صحتك. كما أن المنتج يحتوي على ملصق يشير إلى احتمال احتوائه على مكسرات أخرى، مما يزيد من خطورة تناوله.",
      },
      {
        recommendation: "ابحث عن بدائل خالية من المكسرات والسكر.",
        severity: "critical",
        explanation:
          "بالإضافة إلى احتواء المنتج على اللوز، فإنه يحتوي على نسبة سكر تصل إلى 15%، وهو ما يعتبر مرتفعًا بالنسبة لحالتك الصحية كمرضى السكري. يُنصح بالبحث عن بدائل تحتوي على نسبة سكر منخفضة وخالية من المكسرات.",
      },
    ],
  };

import OpenAI from "openai";
import axios from "axios";
import {
  OpenFoodResponseAPI,
  OpenStreetMapResponse,
} from "@/constants/responses";
import {
  HalalScanResultResponse,
  ScanResultResponse,
} from "@/types/scan-result";

export const ai_scan = async (
  content: string
): Promise<ScanResultResponse | HalalScanResultResponse | undefined> => {
  const client = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });
  const OPENAI_MODEL = process.env.EXPO_PUBLIC_OPENAI_MODEL || "gpt-4.1-nano";

  try {
    const completion = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "user",
          content,
        },
      ],
      response_format: { type: "json_object" },
    });
    const answer = completion.choices[0].message.content;

    if (answer) {
      const parsedAnswer = JSON.parse(answer);
      return parsedAnswer;
    }
    return;
  } catch (error) {
    console.log("chat get an error: ", error);
  }
};

export const product_details = async (
  bar_code: string
): Promise<undefined | OpenFoodResponseAPI> => {
  try {
    try {
      const BASE_FOOD_URL = `https://world.openfoodfacts.org/api/v0/product/${bar_code}.json`;
      const response = await axios.get(BASE_FOOD_URL);
      return response.data as OpenFoodResponseAPI;
    } catch {
      console.log("Food facts failed, trying beauty facts");
      const base_beauty_url = `https://world.openbeautyfacts.org/api/v0/product/${bar_code}.json`;
      const beautyResponse = await axios.get(base_beauty_url);
      return beautyResponse.data as OpenFoodResponseAPI;
    }
  } catch (error: unknown) {
    console.log("product details get an error: ", error);
  }
};

export const get_country = async (
  lat: number,
  long: number,
  userAgent?: string
): Promise<undefined | OpenStreetMapResponse> => {
  try {
    const OPEN_STREET_MAP_URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
    const USER_AGENT = process.env.EXPO_PUBLIC_USER_AGENT;
    const response = await axios.get(OPEN_STREET_MAP_URL, {
      headers: {
        "User-Agent": userAgent ?? USER_AGENT,
      },
    });
    return response.data as OpenStreetMapResponse;
  } catch (error: unknown) {
    console.log("open street map get an error: ", JSON.stringify(error));
  }
};

export const get_nutri_score = (data: OpenFoodResponseAPI): number | null => {
  return data.product.nutriscore_score ?? null;
};

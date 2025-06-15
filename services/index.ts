import OpenAI from "openai";
import axios from "axios";
import { OpenFoodResponse, OpenStreetMapResponse } from "@/constants/responses";
import { prompt } from "@/prompt";

export const get_score = async (data: OpenFoodResponse) => {
  const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });
  const content = prompt(data);
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
    console.log("AI Answer: ", answer);
    return answer;
  } catch (error) {
    console.log("chat get an error: ", error);
  }
};

export const product_details = async (
  bar_code: string
): Promise<undefined | OpenFoodResponse> => {
  try {
    try {
      const BASE_FOOD_URL = `https://world.openfoodfacts.org/api/v0/product/${bar_code}.json`;
      const response = await axios.get(BASE_FOOD_URL);
      return response.data as OpenFoodResponse;
    } catch (foodError: unknown) {
      console.log("Food facts failed, trying beauty facts");
      const base_beauty_url = `https://world.openbeautyfacts.org/api/v2/product/${bar_code}.json`;
      const beautyResponse = await axios.get(base_beauty_url);
      return beautyResponse.data as OpenFoodResponse;
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

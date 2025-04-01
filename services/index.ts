import OpenAI from "openai";
import axios from 'axios';
import { prompt } from "@/prompt";
import { OpenFoodResponse } from "@/constants/responses";

export const chat = async (data: OpenFoodResponse) => {
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
        console.log('AI Answer: ', answer)
        return answer;
    } catch (error) {
        console.log('chat get an error: ', error);
    };
};

export const product_details = async (bar_code: string): Promise<undefined | OpenFoodResponse> => {
    try {
        try {
            const base_food_url = `https://world.openfoodfacts.org/api/v0/product/${bar_code}.json`;
            const response = await axios.get(base_food_url);
            return response.data as OpenFoodResponse;
        } catch (foodError) {
            console.log('Food facts failed, trying beauty facts');
            const base_beauty_url = `https://world.openbeautyfacts.org/api/v2/product/${bar_code}.json`;
            const beautyResponse = await axios.get(base_beauty_url);
            return beautyResponse.data as OpenFoodResponse;
        }
    } catch (error) {
        console.log('product details get an error: ', error);
    }
}
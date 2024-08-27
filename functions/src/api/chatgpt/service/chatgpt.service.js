import { openai } from "../../../../config/chatgpt.config.js";

export async function MakeCaseService(data) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: data }],
            max_tokens: 100,
        });
        return response.choices[0]?.message.content;
    } catch (error) {
        console.error('Error calling GPT-4:', error);
        return false;
    }
}

export async function MakeReQuestionDataService(data) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: data }],
            max_tokens: 1000,
        });
        return response.choices[0]?.message.content;
    } catch (error) {
        console.error('Error calling GPT-4:', error);
        return false;
    }
}
export async function CombineService(data) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: data }],
            max_tokens: 2000,
        });
        return response.choices[0]?.message.content;
    } catch (error) {
        console.error('Error calling GPT-4:', error);
        return false;
    }
}
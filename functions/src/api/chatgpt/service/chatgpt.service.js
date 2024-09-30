import { openai } from "../../../../config/chatgpt.config.js";

export class ChatGPTAPI {
    async GetChatGPTData(prompt,token) {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                max_tokens: token,
            });
            return response.choices[0]?.message.content;
        } catch (error) {
            console.error('Error calling GPT-4:', error);
            if (error.response?.status === 401) {
                throw new Error('CHATGPT_AUTH_ERR');
            } else if (error.response?.status === 429) {
                throw new Error('CHATGPT_RATE_LIMIT_ERR');
            }
            throw new Error('CHATGPT_ERR');
        }
    }
}
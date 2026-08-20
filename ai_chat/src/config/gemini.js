import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function runChat(prompt) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",
      input: prompt,

    //   tools: [
    //     {
    //       type: "google_search",
    //     },
    //   ],
    });

    return interaction.output_text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

export default runChat;
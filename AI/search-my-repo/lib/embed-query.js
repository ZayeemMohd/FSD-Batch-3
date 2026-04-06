import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config()

export async function embedQuery(query) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY_3,
  });

  const res = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [query],
  });

    return res.embeddings[0].values;
}



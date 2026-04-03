import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateQuiz(topic) {
  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Hey Gemini, generate me an array of 2  quizzes related to " +
        topic +
        " in the given format { 'question': 'how many months in a year', 'option1': '10', 'option2': '12', 'option3': '8', 'option4': '6', 'correctOption': 'option2' }. don't add any boiler plate text like ```json, send directly array of objects.",
    });

    return await JSON.parse(aiResponse.text);
  } catch (error) {

    return `error while generating quiz using ai: ${error}`
  }
}

// const array = await generateQuiz("computer science");
// console.log(array);

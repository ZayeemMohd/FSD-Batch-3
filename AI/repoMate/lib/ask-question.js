import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { queryCodebase } from "./query-codebase.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_9,
});

export async function askQuestion(question) {
  const relevantFiles = await queryCodebase(question);

  let context = "";
  relevantFiles.forEach((file, index) => {
    context += `File ${index + 1}: ${file.fileName}\nSummary of file: ${file.summary}\nCode content:${file.sourceCode}\n`;
  });

  const systemPrompt = [
    `You are a ai code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase. 
    AI assistant is a brand new, powerful, human-like artificial intelligence.
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions, including code snippets.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      START QUESTION
      ${question}
      END OF QUESTION
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, make sure there is no ambiguity and include any and all relevant information to give context to the intern.
            `,
  ];

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  return {
    AI_Summary: result.text,
    sourceFiles: relevantFiles.map((file) => file.fileName),
  };
}

// Example usage:
// askQuestion("Where is frontend handled?").then((answer) => {
//   console.log(answer);
// });

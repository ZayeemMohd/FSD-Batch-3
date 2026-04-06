import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai1 = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_1,
});

const ai2 = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_2,
});

export async function summarizeDocAndGenerateEmbedding(doc) {
  console.log("Getting summary for: ", doc.metadata.source);

  const code = doc.pageContent.slice(0, 1000); // limit to 1000 characters

  const systemPrompt = [
    `You are an intelligent senior software engineer who specialises in onboarding junior software engineers onto projects`,
    `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file
Here is the code:
---
${code}
---
            Give a summary no more than 100 words of the code above and don't add any boiler plate or extra information like greeting. Just summarise the code in a concise manner.`,
  ];

  const summary = await ai1.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  console.log("Summary generated for file: ", doc.metadata.source);

  const embeddigns = await ai2.models.embedContent({
    model: "gemini-embedding-001",
    contents: summary.text,
  });

  console.log("Embedding generated for file: ", doc.metadata.source);

  return {
    summary: summary.text,
    embeddigns: embeddigns.embeddings[0].values,
    source: JSON.parse(JSON.stringify(doc.pageContent)),
    fileName: doc.metadata.source
  }

}

// console.log( await summarizeDocAndGenerateEmbedding({
//   pageContent:
//     "const express = require('express');\n" +
//     "const bcrypt = require('bcrypt');\n" +
//     "const jwt = require('jsonwebtoken');\n" +
//     "const { validateUser } = require('./utils');\n" +
//     "\n" +
//     "const router = express.Router();\n" +
//     "\n" +
//     "router.post('/register', async (req, res) => {\n" +
//     "\n" +
//     "});\n" +
//     "\n" +
//     "router.post('/login', async (req, res) => {\n" +
//     "\n" +
//     "});\n" +
//     "\n" +
//     "module.exports = router;\n",
//   metadata: {
//     source: "auth.js",
//     repository: "https://github.com/ZayeemMohd/taskflowAI",
//     branch: "main",
//   },
//   id: undefined,
// })
// )
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_7,
});

const ai_embedding = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_8,
});

export async function genDocEmbeddings(doc) {
  console.log("getting summary for", doc.metadata.source);

  const code = doc.pageContent.slice(0, 10000); // Limit to 10000 characters

  const systemPrompt = [
    `You are an intelligent senior software engineer who specialises in onboarding junior software engineers onto projects`,
    `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file
Here is the code:
---
${code}
---
            Give a summary no more than 100 words of the code above and don't add any boiler plate or extra information like greeting. Just summarise the code in a concise manner.`,
  ];

  const summary = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  console.log("summaries generated: ", summary.text);

  const embeddings = await ai_embedding.models.embedContent({
    model: "gemini-embedding-001",
    contents: summary.text,
  });

  return {
    summary: summary.text,
    embeddings: embeddings.embeddings[0].values,
    sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
    fileName: doc.metadata.source,
  };
}

// const dummyDoc = {
//   pageContent:
//     "const express = require('express');\n" +
//     "const dotenv = require('dotenv');\n" +
//     "const authRoutes = require('./auth');\n" +
//     "const taskRoutes = require('./tasks');\n" +
//     "\n" +
//     "const app = express();\n" +
//     "const PORT = process.env.PORT || 3000;\n" +
//     "app.use(express.json());\n" +
//     "app.use('/api/auth', authRoutes);\n" +
//     "app.use('/api/tasks', taskRoutes);\n" +
//     "app.get('/health', (req, res) => {\n" +
//     "  res.json({ status: 'healthy', timestamp: new Date().toISOString() });\n" +
//     "});\n" +
//     "app.listen(PORT, () => {\n" +
//     "  console.log(`🚀 TaskFlow API running on port ${PORT}`);\n" +
//     "});\n" +
//     "\n" +
//     "module.exports = app;\n",
//   metadata: {
//     source: "server.js",
//     repository: "https://github.com/ZayeemMohd/taskflowAI",
//     branch: "main",
//   },
//   id: undefined,
// };

// console.log(await genDocEmbeddings(dummyDoc));

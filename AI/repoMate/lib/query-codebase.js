import { embedQuery } from "./embed-query.js";
import fs from "fs/promises";

// const query = "Where is frontend handled?";

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (normA * normB);
}

async function loadEmbeddings() {
  const data = await fs.readFile("embeddings.json", "utf-8");
  return JSON.parse(data);
}

export async function queryCodebase(query) {
    const embeddings = await loadEmbeddings();
 const queryEmbedding = await embedQuery(query);

  const results = embeddings.map((item) => ({
    fileName: item.fileName,
    summary: item.summary,
    sourceCode: item.sourceCode,
    similarity: cosineSimilarity(queryEmbedding, item.embeddings),
  }));

  return results
    .sort((a, b) => b.similarity - a.similarity).filter(result => result.similarity > 0.6);
    
}

// queryCodebase(query).then((results) => {
//   console.log("Search results:", results);
// });
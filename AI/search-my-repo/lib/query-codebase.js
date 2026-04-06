import { embedQuery } from "./embed-query.js";
import fs from "fs/promises";

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (normA * normB);
}

export async function queryCodebase(query) {
    const queryEmbeddings = await embedQuery(query);

  const data = await fs.readFile("embeddings.json", "utf-8");
  const repoEmbeddings = await JSON.parse(data);


  const results = repoEmbeddings.map((item) => ({
    fileName: item.fileName,
    summary: item.summary,
    sourceCode: item.sourceCode,
    similarty: cosineSimilarity(item.embeddigns, queryEmbeddings),
  }));

  return results.filter(result => result.similarty > 0.6);
}

// console.log(await queryCodebase("pdf"));

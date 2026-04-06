
import { loadGithubRepo } from "./github-loader.js";
import { genDocEmbeddings } from "./summarise-doc.js";
import fs from "fs/promises";

// const repoURL = "https://github.com/ZayeemMohd/taskflowAI";
// const repoURL = "https://github.com/ZayeemMohd/small-test";

export async function indexRepo(repoURL, githubToken = "") {
  console.log("indexing started...")
  const docs = await loadGithubRepo(repoURL, githubToken);

  const results = [];

  for (const doc of docs) {
    try {
      const result = await genDocEmbeddings(doc);

      results.push(result);

      console.log("Indexed: ", result.fileName);
    } catch (error) {
      console.error(`Error processing document ${doc.metadata.source}:`, error);
    }
  }

  await fs.writeFile("embeddings.json", JSON.stringify(results, null, 2));
  console.log("✅ Embeddings saved to embeddings.json");
}

// indexRepo(repoURL, "")
//   .then(() => {
//     console.log("Indexing complete.");
//   })
//   .catch((error) => {
//     console.error("Error indexing repository:", error);
//   });

// indexRepo(repoURL, '')
//   .then(() => {
//     console.log("Indexing complete. Vector store:", vectorStore);
//     search(query).then((results) => {
//       console.log("Search results:", results);
//     });
//   })
//   .catch((error) => {
//     console.error("Error indexing repository:", error);
//   });

// Example usage:
// setTimeout(async () => {
//   const results = await search(query);
//   console.log("Search results:", results);
// }, 10000); // Wait for indexing to complete

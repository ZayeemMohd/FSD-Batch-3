import { loadGithubRepo } from "./github-loader.js";
import { summarizeDocAndGenerateEmbedding } from "./summarise-doc.js";
import fs from "fs/promises"


export async function indexRepo(githubURL){
    console.log("Indexing started...");

    const docs = await loadGithubRepo(githubURL);

    let results = []

    for(const doc of docs){
        const result = await summarizeDocAndGenerateEmbedding(doc);
        results.push(result)
    }

    await fs.writeFile("embeddings.json", JSON.stringify(results, null, 2));

    console.log("Embeddings generated and saved to embedings.json")
}


indexRepo("https://github.com/ZayeemMohd/small-test")
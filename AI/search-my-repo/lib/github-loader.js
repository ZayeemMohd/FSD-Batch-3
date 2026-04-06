import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export async function loadGithubRepo(githubURL) {
  const loader = new GithubRepoLoader(githubURL);
  const docs = await loader.load();
//   console.log(docs)
  return docs;
}


// loadGithubRepo("https://github.com/ZayeemMohd/taskflowAI")
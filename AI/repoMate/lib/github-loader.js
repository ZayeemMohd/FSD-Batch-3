import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const loadGithubRepo = async (githubURL, githubToken = "") => {
  const loader = new GithubRepoLoader(githubURL, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      ".gitignore",
      "node_modules/**",
      "dist/**",
      "build/**",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });

  const docs = await loader.load();
  return docs;
};


//  const docs = await loadGithubRepo("https://github.com/ZayeemMohd/taskflowAI", "");


//  console.log(docs)
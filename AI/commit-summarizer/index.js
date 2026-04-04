import { Octokit } from "octokit";

import { aiSummariseCommit } from "./lib/gemini.js";
import { generateDiff } from "./lib/generateDiff.js";

const octokit = new Octokit();

export async function getCommitHashesAndSummaries(githubURL) {
  // githubURL = 'https://github.com/ZayeemMohd/small-test'

  const { owner, repo } = githubURL
    .split("/")
    .slice(-2)
    .reduce(
      (acc, part, index) => {
        if (index === 0) acc.owner = part;
        else if (index === 1) acc.repo = part;
        return acc;
      },
      { owner: null, repo: null },
    );

  const { data } = await octokit.rest.repos.listCommits({
    owner: owner,
    repo: repo,
  });

  return await Promise.all(
    data.map(async (commit) => {
      const diff = await generateDiff(githubURL, commit.sha);
      const summary = await aiSummariseCommit(diff);
      return {
        commitHash: commit.sha,
        commitMessage: commit.commit.message,
        commitAuthorName: commit.commit.author.name,
        commitAuthorAvatarURL: commit.author.avatar_url,
        commitDate: commit.commit.author.date,
        summary: summary,
      };
    }),
  );
}

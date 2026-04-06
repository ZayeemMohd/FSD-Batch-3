import express from "express";
import { indexRepo } from "./lib/index-repo.js";
import { askQuestion } from "./lib/ask-question.js";

const app = express();

app.use(express.json());

app.post("/add-repo", async (req, res) => {
  const { githubURL, githubToken } = req.body;

  try {
    await indexRepo(githubURL, githubToken);
    res.json({
      message:
        "Repository indexed successfully, now you can ask question on this repository",
    });
  } catch (error) {
    console.error("Error adding repository:", error);
    res.status(500).json({ error: "Failed to index repository" });
  }
});

app.post("/ask-question", async (req, res) => {
  const { question } = req.body;
  try {
    const { AI_Summary, sourceFiles } = await askQuestion(question);
    res.json({ AI_Summary: AI_Summary, sourceFiles: sourceFiles });
  } catch (error) {
    console.error("Error asking question:", error);
    res.status(500).json({ error: "Failed to get answer for the question" });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

import express from "express";
import cors from "cors";
import { getCommitHashesAndSummaries } from "./index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/commitSummarize", async (req, res) => {
  const githubURL = req.query.githubURL;
  res.json(await getCommitHashesAndSummaries(githubURL));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

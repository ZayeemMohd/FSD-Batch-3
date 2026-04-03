import express from "express"
import cors from "cors"
import { generateQuiz } from "./index.js";

const app = express();

app.use(cors());


app.get("/quiz", async (req, res)=>{
    const topic = req.query.topic;

    const data = await generateQuiz(topic)

    res.json(data)
})

app.listen("8080", ()=>{
    console.log("server is listening on port 8080");
})
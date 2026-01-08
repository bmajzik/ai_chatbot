import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initVectorStore, queryVectorStoreWithScores } from "./langchainStore.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize on startup
const vectorStore = await initVectorStore(process.env.PDF_DIRECTORY);

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    console.log('→ [DEBUG] Question:', question);

    const answer = await queryVectorStoreWithScores(
      vectorStore,
      question,
      Number(process.env.TOP_K) || 5,
      Number(process.env.SCORE_THRESHOLD) || 0.85
    );

    console.log('→ [DEBUG] Answer:', answer);
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`→ Server listening on ${port}`);
});

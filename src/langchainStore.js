import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

dotenv.config();

export async function initVectorStore(pdfDir) {
  // 1) Configure text splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });

  // 2) Read directory and collect PDF files
  const absDir = path.resolve(pdfDir);
  const names = await fs.readdir(absDir);
  const pdfFiles = names
    .filter((n) => n.toLowerCase().endsWith('.pdf'))
    .map((n) => path.join(absDir, n));

  // 3) Load all PDFs and combine documents
  let rawDocs = [];
  for (const filePath of pdfFiles) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();  // Document[]
    rawDocs.push(...docs);
  }

  // 4) Split text into chunks
  const docs = await splitter.splitDocuments(rawDocs);

  // 5) Create embeddings and vector store
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  return vectorStore;
}

export async function queryVectorStoreWithScores(
  vectorStore,
  question,
  k = Number(process.env.TOP_K || 5),
  threshold = Number(process.env.SCORE_THRESHOLD || 0.85)
) {
  // 1) Query top k chunks with scores
  const results = await vectorStore.similaritySearchWithScore(question, k);
  console.log("→ [DEBUG] similaritySearchWithScore results:", results);

  // 2) Filter results that meet the threshold
  const filtered = results.filter(([_, score]) => score >= threshold);
  console.log("→ [DEBUG] filtered (score>=", threshold, "):", filtered);

  // 3) Return fallback if no good matches found
  if (filtered.length === 0) {
    console.log("→ [DEBUG] No hits above threshold, returning FALLBACK_TEXT");
    return process.env.FALLBACK_TEXT;
  }

  // 4) Collect relevant documents
  const docs = filtered.map(([doc]) => doc);
  console.log("→ [DEBUG] Passing to LLM docs:", docs);

  // 5) Build context from documents
  const context = docs.map(doc => doc.pageContent).join('\n\n');

  // 6) Create prompt for LLM with ONLY PDF content
  const llm = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Use ONLY the following context to answer the question.
If the answer is NOT found in the context, respond EXACTLY with: "${process.env.FALLBACK_TEXT}"
You are FORBIDDEN to use your own knowledge! Answer ONLY based on the provided context!

CONTEXT:
${context}

QUESTION: ${question}

ANSWER:`;

  console.log("→ [DEBUG] Prompt sent to LLM:", prompt.substring(0, 200) + "...");

  const response = await llm.invoke(prompt);
  console.log("→ [DEBUG] LLM answer:", response.content);

  return response.content;
}

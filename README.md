# PDF Chatbot

AI-powered chatbot that answers questions based exclusively on PDF documents in the `./pdfs` directory.

Built with Node.js, Express, React, LangChain, and Tailwind CSS.

## Features

- 📄 PDF-based knowledge retrieval using LangChain
- 🤖 OpenAI GPT integration for natural language responses
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design (mobile-friendly)
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 🔒 Secure API key management

## Tech Stack

**Backend:**
- Node.js + Express
- LangChain (RAG implementation)
- OpenAI Embeddings & Chat API
- In-memory vector store

**Frontend:**
- React 18
- Tailwind CSS
- Axios

## Setup

### 1. Install Dependencies

```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Add Your PDF Documents

Place your PDF files in the `./pdfs` directory.

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
npm start
# Server will run on http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# React app will run on http://localhost:3000
```

## Usage

1. Open http://localhost:3000 in your browser
2. Click the chat button (💬) in the bottom-right corner
3. Ask questions about your PDF documents
4. The chatbot will answer based on the content in `./pdfs`

## Project Structure

```
.
├── src/
│   ├── server.js          # Express server
│   └── langchainStore.js  # LangChain vector store logic
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWidget.js  # Main chat widget
│   │   │   └── Chat.js        # Chat interface
│   │   ├── App.js
│   │   ├── api.js
│   │   └── index.js
│   └── tailwind.config.js
├── pdfs/                  # Your PDF documents go here
└── .env                   # Environment variables (not in git)
```

## Configuration

You can adjust these settings in `.env`:

- `SCORE_THRESHOLD`: Minimum similarity score (0-1) for search results (default: 0.70)
- `TOP_K`: Number of document chunks to retrieve (default: 5)
- `FALLBACK_TEXT`: Message shown when no relevant answer is found
- `PORT`: Backend server port (default: 4000)

MIT

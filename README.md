# PDF Chatbot

> AI-powered chatbot that answers questions based exclusively on PDF documents in the `./pdfs` directory.

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![LangChain](https://img.shields.io/badge/LangChain-0.0.130-121212)](https://www.langchain.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### 🤖 Overview

PDF Chatbot is a sophisticated AI-powered application designed for document-based question answering using Retrieval-Augmented Generation (RAG). The system analyzes PDF documents, creates vector embeddings, and provides accurate answers based exclusively on the provided content.

---

### ✨ Key Features

#### 🎯 Core Functionality
- **PDF-based knowledge retrieval** - Uses LangChain for document processing
- **OpenAI GPT integration** - Natural language responses powered by GPT
- **Vector store search** - Efficient similarity-based document retrieval
- **Configurable threshold** - Adjustable relevance scoring
- **Fallback handling** - Clear messaging when answers aren't found

#### 🎨 User Experience
- **Modern UI with Tailwind CSS** - Clean, responsive design
- **Mobile-friendly** - Optimized for all screen sizes
- **Accessibility features** - ARIA labels and keyboard navigation
- **Chat widget interface** - Familiar messaging experience

#### 🔒 Security & Performance
- **Secure API key management** - Environment-based configuration
- **CORS protection** - Configured cross-origin policies
- **In-memory vector store** - Fast document retrieval
- **Customizable scoring** - Tune relevance thresholds

---

### 🏗️ Tech Stack

**Frontend:** React 18, Tailwind CSS, Axios

**Backend:** Node.js, Express, LangChain (RAG implementation), OpenAI Embeddings & Chat API, In-memory vector store

**Development:** ESM modules, dotenv configuration

---

### 🚀 Quick Start

**Prerequisites:** Node.js v20.x+, npm

```bash
# Clone and install
git clone https://github.com/yourusername/pdf-chatbot.git
cd pdf-chatbot
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Configure environment
cp .env.example .env
# Edit .env and add your OpenAI API key

# Add PDF documents
# Place your PDF files in the ./pdfs directory

# Start application
npm start                    # Terminal 1: Backend (http://localhost:4000)
cd client && npm start      # Terminal 2: Frontend (http://localhost:3000)
```

---

### 🔧 Common Commands

#### Development
```bash
# Start backend server
npm start

# Start frontend development server
cd client && npm start
```

#### Configuration
```bash
# Setup environment variables
cp .env.example .env

# Edit configuration
# OPENAI_API_KEY - Your OpenAI API key
# PDF_DIRECTORY - Directory containing PDFs (default: pdfs)
# SCORE_THRESHOLD - Minimum similarity score (default: 0.70)
# TOP_K - Number of chunks to retrieve (default: 5)
# PORT - Backend server port (default: 4000)
```

---

### 💬 Usage

1. Open http://localhost:3000 in your browser
2. Click the chat button (💬) in the bottom-right corner
3. Ask questions about your PDF documents
4. The chatbot will answer based on the content in `./pdfs`

---

### 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   WEB CLIENT (React)                        │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ ChatWidget  │  │     Chat     │  │   Tailwind UI   │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP POST /chat
┌─────────────────────────▼───────────────────────────────────┐
│                   API SERVER (Express)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Routes    │  │     CORS     │  │   Middleware    │   │
│  └─────────────┘  └──────┬───────┘  └─────────────────┘   │
│                           │                                 │
│  ┌────────────────────────▼──────────────────────────────┐ │
│  │          LangChain Services                           │ │
│  │  • PDF Loading & Text Splitting                       │ │
│  │  • Vector Store (Embeddings)                          │ │
│  │  • Similarity Search                                  │ │
│  │  • OpenAI Chat Integration                            │ │
│  └────────────────────────┬──────────────────────────────┘ │
└───────────────────────────┼─────────────────────────────────┘
                            │ OpenAI API
┌───────────────────────────▼─────────────────────────────────┐
│                   OPENAI SERVICES                           │
│  • Embeddings API (text-embedding-ada-002)                 │
│  • Chat Completions API (GPT-3.5/4)                        │
└─────────────────────────────────────────────────────────────┘
```

**Project Structure:**
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

**Key Design Decisions:**
- **RAG (Retrieval-Augmented Generation)** - Combines vector search with LLM responses
- **In-memory vector store** - Fast retrieval without external database
- **Threshold-based filtering** - Only returns confident matches
- **ESM modules** - Modern JavaScript architecture
- **Separation of concerns** - Server, LangChain logic, and UI are decoupled

---

### ⚙️ Configuration

You can adjust these settings in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | *Required* |
| `PDF_DIRECTORY` | Directory containing PDFs | `pdfs` |
| `SCORE_THRESHOLD` | Minimum similarity score (0-1) | `0.70` |
| `TOP_K` | Number of document chunks to retrieve | `5` |
| `FALLBACK_TEXT` | Message when no answer found | `Sorry, I cannot find...` |
| `PORT` | Backend server port | `4000` |

---

### 🔒 Security Notes

⚠️ **IMPORTANT:** Never commit `.env` with real API keys to version control!

The `.gitignore` file is configured to exclude sensitive files:
- `.env` files (API keys)
- `node_modules/`
- `client/build/`
- `vectorStore.json` (generated)

---

MIT

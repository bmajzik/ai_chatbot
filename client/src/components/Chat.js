import React, { useState, useRef, useEffect } from 'react';
import { ask } from '../api.js';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const historyEndRef = useRef(null);

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const send = async () => {
    if (!question.trim()) return;
    // user message
 setHistory(h => [...h, { who: 'user', text: question }]);
    setQuestion('');
    // start loading
    setLoading(true);

    try {
      const answer = await ask(question);
      setHistory(h => [...h, { who: 'bot', text: answer }]);
    } catch {
      setHistory(h => [...h, { who: 'bot', text: 'Server error occurred.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Chat history */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-cream"
        role="log"
        aria-live="polite"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D78B7D #F9F3E3'
        }}
      >
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
            <svg className="w-16 h-16 text-brand-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-brand-text-secondary text-sm">Start typing a question...</p>
          </div>
        )}

        {history.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.who === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-5 py-3 shadow-md ${
                m.who === 'user'
                  ? 'bg-gradient-to-br from-brand-terracotta to-brand-terracotta-dark text-white border border-brand-terracotta-light'
                  : 'bg-white text-brand-text-primary border border-brand-beige'
              }`}
            >
              <div className={`font-bold text-xs mb-2 flex items-center gap-2 ${
                m.who === 'user' ? 'text-white/90' : 'text-brand-terracotta'
              }`}>
                {m.who === 'user' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    You
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zM9 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm6 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3 3c1.65 0 3-1.35 3-3h-6c0 1.65 1.35 3 3 3z"/>
                    </svg>
                    AI Assistant
                  </>
                )}
              </div>
              <div className={`text-sm leading-relaxed ${
                m.who === 'user' ? 'text-white' : 'text-brand-text-primary'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white border border-brand-beige rounded-xl px-5 py-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-brand-text-secondary">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={historyEndRef} />
      </div>

      {/* Input area */}
      <div
        className="border-t-2 border-brand-beige bg-brand-cream-dark p-4"
        style={{ borderBottomLeftRadius: '0.65rem', borderBottomRightRadius: '0.65rem' }}
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && send()}
            placeholder="Type your question..."
            className="flex-1 px-5 py-3 bg-white border-2 border-brand-beige text-brand-text-primary placeholder-brand-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:border-brand-terracotta disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={loading}
            aria-label="Question input field"
          />
          <button
            onClick={send}
            disabled={loading || !question.trim()}
            className="px-6 py-3 bg-gradient-to-br from-brand-terracotta to-brand-terracotta-dark text-white rounded-xl hover:from-brand-terracotta-light hover:to-brand-terracotta disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-md hover:shadow-brand-terracotta/30 hover:scale-105 active:scale-95"
            aria-label="Send"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

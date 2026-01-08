import React, { useState } from 'react';
import Chat from './Chat.js';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="group fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-brand-terracotta to-brand-terracotta-dark hover:from-brand-terracotta-light hover:to-brand-terracotta text-white border-2 border-brand-terracotta shadow-2xl shadow-brand-terracotta/30 z-[1000] transition-all duration-300 hover:scale-110 hover:shadow-brand-terracotta/50 flex items-center justify-center"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle chat"
      >
        <svg
          className="w-8 h-8 transition-transform group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-[100px] right-6 w-full max-w-[420px] sm:w-[420px] h-[600px] bg-brand-cream border-2 border-brand-beige rounded-xl shadow-2xl shadow-brand-slate/30 flex flex-col z-[1000] animate-slide-up">
          <div
            className="flex justify-between items-center bg-brand-slate border-b-2 border-brand-beige px-6 py-4"
            style={{ borderTopLeftRadius: '0.65rem', borderTopRightRadius: '0.65rem' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse-subtle"></div>
              <span className="font-bold text-brand-cream text-lg tracking-wide">PDF AI Assistant</span>
            </div>
            <button
              className="bg-brand-slate-light hover:bg-brand-slate-dark text-brand-cream rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-200 hover:rotate-90"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Chat />
        </div>
      )}
    </>
  );
}

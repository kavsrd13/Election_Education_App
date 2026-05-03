// src/components/FaqAssistant.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleQuestion, ChevronDown, ChevronUp, X } from 'lucide-react';
import { faqItems } from '../data/faqData';

interface FaqAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqAssistant: React.FC<FaqAssistantProps> = ({ isOpen, onClose }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-2xl shadow-xl overflow-hidden flex flex-col"
          style={{ maxHeight: '80vh' }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #1A3A6B, #2563EB)',
            }}
          >
            <div className="flex items-center gap-2">
              <MessageCircleQuestion size={20} className="text-white" />
              <div>
                <h3 className="font-display text-white font-bold text-base">
                  Ask Election Guide
                </h3>
                <p className="text-blue-200 text-xs">Click a question to learn more</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white"
              aria-label="Close FAQ panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* FAQ list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden border border-slate-100"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors bg-white"
                  aria-expanded={openId === item.id}
                >
                  <span className="text-lg flex-shrink-0">{item.emoji}</span>
                  <span className="flex-1 text-sm font-medium text-civic-slate leading-snug">
                    {item.question}
                  </span>
                  {openId === item.id ? (
                    <ChevronUp size={14} className="flex-shrink-0 text-civic-blue" />
                  ) : (
                    <ChevronDown size={14} className="flex-shrink-0 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 py-3 text-sm text-slate-600 leading-relaxed bg-blue-50 border-t border-blue-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-700 text-center">
              🇮🇳 Content is educational and non-partisan. Based on general election principles.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

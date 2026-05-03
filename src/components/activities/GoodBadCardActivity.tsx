// src/components/activities/GoodBadCardActivity.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface GoodBadItem {
  text: string;
  isGood: boolean;
  explanation: string;
}

interface GoodBadCardActivityProps {
  items: GoodBadItem[];
  onComplete: () => void;
}

export const GoodBadCardActivity: React.FC<GoodBadCardActivityProps> = ({
  items,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleAnswer = (idx: number, guess: boolean) => {
    if (revealed.has(idx)) return;
    setAnswers((prev) => ({ ...prev, [idx]: guess }));
    setRevealed((prev) => new Set([...prev, idx]));
  };

  const allRevealed = revealed.size === items.length;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        👆 For each action below, decide: Is it a <strong className="text-green-600">Good Choice</strong> or a <strong className="text-red-500">Bad Choice</strong>?
      </p>

      <div className="grid gap-3">
        {items.map((item, idx) => {
          const isRevealed = revealed.has(idx);
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === item.isGood;

          return (
            <div
              key={idx}
              className={[
                'rounded-xl border-2 overflow-hidden transition-all',
                isRevealed && isCorrect
                  ? item.isGood
                    ? 'border-green-400'
                    : 'border-red-400'
                  : isRevealed && !isCorrect
                  ? 'border-amber-400'
                  : 'border-slate-200',
              ].join(' ')}
            >
              {/* Card front */}
              <div className="bg-white p-4">
                <p className="text-sm font-medium text-slate-700 mb-3">{item.text}</p>
                {!isRevealed ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(idx, true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-sm font-medium transition-all"
                    >
                      <ThumbsUp size={14} /> Good Choice
                    </button>
                    <button
                      onClick={() => handleAnswer(idx, false)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-sm font-medium transition-all"
                    >
                      <ThumbsDown size={14} /> Bad Choice
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={[
                        'p-3 rounded-lg text-xs font-medium leading-relaxed',
                        item.isGood
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200',
                      ].join(' ')}
                    >
                      <span className="font-bold">
                        {item.isGood ? '👍 Good Choice!' : '👎 Bad Choice!'}
                      </span>{' '}
                      {isCorrect ? '✅ You got it right!' : '❌ You guessed wrong, but that\'s okay!'}
                      <br />
                      {item.explanation}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800 text-center">
            Great! You have reviewed all {items.length} choices. 🎯
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
          >
            Continue to Next Step →
          </button>
        </motion.div>
      )}
    </div>
  );
};

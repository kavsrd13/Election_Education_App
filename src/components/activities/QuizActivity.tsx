// src/components/activities/QuizActivity.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizOption } from '../../data/lessons';

interface QuizActivityProps {
  question: string;
  options: QuizOption[];
  onComplete: () => void;
}

export const QuizActivity: React.FC<QuizActivityProps> = ({
  question,
  options,
  onComplete,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelected(label);
    setAnswered(true);
  };

  const isCorrect = options.find((o) => o.label === selected)?.correct ?? false;

  return (
    <div className="space-y-4">
      <p className="font-semibold text-civic-slate text-base">{question}</p>

      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected === opt.label;
          const showResult = answered && isSelected;
          const isRight = opt.correct;

          return (
            <motion.button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              disabled={answered}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
              className={[
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all text-sm font-medium',
                !answered
                  ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  : isSelected && isRight
                  ? 'border-green-400 bg-green-50 text-green-800'
                  : isSelected && !isRight
                  ? 'border-red-400 bg-red-50 text-red-800'
                  : answered && isRight
                  ? 'border-green-200 bg-green-50/50 text-green-700'
                  : 'border-slate-100 bg-slate-50 text-slate-400',
              ].join(' ')}
            >
              <span
                className={[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  !answered
                    ? 'bg-slate-100 text-slate-600'
                    : isSelected && isRight
                    ? 'bg-green-500 text-white'
                    : isSelected && !isRight
                    ? 'bg-red-500 text-white'
                    : answered && isRight
                    ? 'bg-green-200 text-green-700'
                    : 'bg-slate-100 text-slate-400',
                ].join(' ')}
              >
                {opt.label}
              </span>
              <span className="flex-1">{opt.text}</span>
              {answered && isSelected && (
                isRight ? (
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle size={18} className="text-red-500 flex-shrink-0" />
                )
              )}
              {answered && !isSelected && isRight && (
                <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={[
              'p-4 rounded-xl text-sm font-medium',
              isCorrect
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800',
            ].join(' ')}
          >
            {isCorrect
              ? '✅ Correct! Great job! Your name in the voter list is essential to vote.'
              : '❌ Not quite! The most important thing is to have your name in the voter list.'}
          </motion.div>
        )}
      </AnimatePresence>

      {answered && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onComplete}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all text-sm"
          style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
        >
          Continue to Next Step →
        </motion.button>
      )}
    </div>
  );
};

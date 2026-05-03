// src/components/activities/ScenarioActivity.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ScenarioOption {
  text: string;
  correct: boolean;
  explanation: string;
}

interface ScenarioActivityProps {
  question: string;
  options: ScenarioOption[];
  onComplete: () => void;
}

export const ScenarioActivity: React.FC<ScenarioActivityProps> = ({
  question,
  options,
  onComplete,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  };

  const isCorrect = selected !== null && options[selected]?.correct;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm font-semibold text-amber-900">🎭 Scenario:</p>
        <p className="text-sm text-amber-800 mt-1 leading-relaxed">{question}</p>
      </div>

      <p className="text-sm font-medium text-slate-600">What should she do?</p>

      <div className="space-y-2">
        {options.map((opt, idx) => {
          const isSelected = selected === idx;
          const showResult = answered && isSelected;

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
              className={[
                'w-full flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all',
                !answered
                  ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  : isSelected && opt.correct
                  ? 'border-green-400 bg-green-50'
                  : isSelected && !opt.correct
                  ? 'border-red-400 bg-red-50'
                  : answered && opt.correct
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-slate-100 bg-slate-50 opacity-60',
              ].join(' ')}
            >
              <div className="mt-0.5 flex-shrink-0">
                {answered && isSelected && opt.correct && (
                  <CheckCircle2 size={18} className="text-green-500" />
                )}
                {answered && isSelected && !opt.correct && (
                  <XCircle size={18} className="text-red-500" />
                )}
                {answered && !isSelected && opt.correct && (
                  <CheckCircle2 size={18} className="text-green-400" />
                )}
                {(!answered || (!isSelected && !opt.correct)) && (
                  <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-300 flex-shrink-0" style={{ width: 18, height: 18 }} />
                )}
              </div>
              <span
                className={[
                  'text-sm',
                  isSelected && opt.correct
                    ? 'text-green-800 font-medium'
                    : isSelected && !opt.correct
                    ? 'text-red-800'
                    : 'text-slate-700',
                ].join(' ')}
              >
                {opt.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={[
              'p-4 rounded-xl text-sm leading-relaxed',
              isCorrect
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800',
            ].join(' ')}
          >
            <strong>{isCorrect ? '✅ Correct!' : '❌ Not quite!'}</strong>
            <br />
            {options[selected].explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {answered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
        >
          Continue to Next Step →
        </motion.button>
      )}
    </div>
  );
};

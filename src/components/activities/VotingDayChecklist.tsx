// src/components/activities/VotingDayChecklist.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square } from 'lucide-react';

interface VotingDayChecklistProps {
  onComplete: () => void;
}

const CHECKLIST_ITEMS = [
  { emoji: '🗺️', text: 'Know your polling booth address and route' },
  { emoji: '🪪', text: 'Carry a valid photo ID (EPIC, Aadhaar, Passport, etc.)' },
  { emoji: '📋', text: 'Verify your name is in the voter list' },
  { emoji: '⏰', text: 'Check voting date and time, plan to arrive early' },
  { emoji: '🧍', text: 'Be prepared to vote independently — no one should influence you' },
];

export const VotingDayChecklist: React.FC<VotingDayChecklistProps> = ({ onComplete }) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const allChecked = checked.size === CHECKLIST_ITEMS.length;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        📅 Check off each step of your Voting Day preparation:
      </p>

      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => toggle(idx)}
            whileTap={{ scale: 0.98 }}
            className={[
              'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all',
              checked.has(idx)
                ? 'border-green-400 bg-green-50'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50',
            ].join(' ')}
            role="checkbox"
            aria-checked={checked.has(idx)}
          >
            <span className="text-xl flex-shrink-0">{item.emoji}</span>
            <span
              className={[
                'flex-1 text-sm font-medium',
                checked.has(idx) ? 'text-green-800 line-through' : 'text-slate-700',
              ].join(' ')}
            >
              {item.text}
            </span>
            <motion.div
              animate={{ scale: checked.has(idx) ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.2 }}
            >
              {checked.has(idx) ? (
                <CheckSquare size={20} className="text-green-500 flex-shrink-0" />
              ) : (
                <Square size={20} className="text-slate-300 flex-shrink-0" />
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-green-500"
            style={{ background: 'linear-gradient(90deg, #FF9933, #138808)' }}
            animate={{ width: `${(checked.size / CHECKLIST_ITEMS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm font-medium text-slate-600">
          {checked.size}/{CHECKLIST_ITEMS.length}
        </span>
      </div>

      {allChecked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-green-50 border border-green-200 text-center"
        >
          <p className="text-green-800 font-semibold text-sm">
            🎉 You are ready for voting day!
          </p>
        </motion.div>
      )}

      <motion.button
        onClick={onComplete}
        whileTap={{ scale: 0.98 }}
        className={[
          'w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity',
          allChecked ? 'opacity-100' : 'opacity-60',
        ].join(' ')}
        style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
      >
        {allChecked ? 'Ready! Continue to Voting Day →' : 'Check all items to continue'}
      </motion.button>
    </div>
  );
};

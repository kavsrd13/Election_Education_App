// src/components/activities/ChecklistActivity.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square } from 'lucide-react';

interface ChecklistActivityProps {
  items: string[];
  onComplete: () => void;
}

export const ChecklistActivity: React.FC<ChecklistActivityProps> = ({
  items,
  onComplete,
}) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const allChecked = checked.size === items.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 font-medium">
        ✅ Check off all the documents/items you would need for voter registration:
      </p>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => toggle(idx)}
            whileTap={{ scale: 0.98 }}
            className={[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all',
              checked.has(idx)
                ? 'border-green-400 bg-green-50'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50',
            ].join(' ')}
            aria-checked={checked.has(idx)}
            role="checkbox"
          >
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
            <span
              className={[
                'text-sm font-medium',
                checked.has(idx) ? 'text-green-800 line-through' : 'text-slate-700',
              ].join(' ')}
            >
              {item}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="flex items-center gap-2 text-sm"
        animate={{ color: allChecked ? '#138808' : '#64748B' }}
      >
        <span>{checked.size}/{items.length} items checked</span>
        {allChecked && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            🎉
          </motion.span>
        )}
      </motion.div>

      <motion.button
        onClick={onComplete}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={[
          'w-full py-3 rounded-xl font-semibold text-white transition-all text-sm',
          allChecked ? 'opacity-100' : 'opacity-60',
        ].join(' ')}
        style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
      >
        {allChecked ? 'All checked! Continue →' : `Check all ${items.length} items to continue`}
      </motion.button>
    </div>
  );
};

// src/components/activities/MythFactActivity.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MythFactItem {
  myth: string;
  fact: string;
}

interface MythFactActivityProps {
  items: MythFactItem[];
  onComplete: () => void;
}

export const MythFactActivity: React.FC<MythFactActivityProps> = ({ items, onComplete }) => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (idx: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const allFlipped = flipped.size === items.length;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        🔄 Click each card to reveal the <strong className="text-civic-blue">FACT</strong> behind the <strong className="text-red-500">MYTH</strong>:
      </p>

      <div className="grid gap-3">
        {items.map((item, idx) => {
          const isFlipped = flipped.has(idx);

          return (
            <div
              key={idx}
              className="flip-card cursor-pointer"
              style={{ height: 120 }}
              onClick={() => toggleFlip(idx)}
              role="button"
              aria-label={`Card ${idx + 1}: Click to reveal fact`}
              aria-pressed={isFlipped}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleFlip(idx)}
            >
              <motion.div
                className="flip-card-inner w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d', position: 'relative' }}
              >
                {/* Front — Myth */}
                <div
                  className="flip-card-front w-full h-full rounded-xl border-2 border-red-200 bg-red-50 p-4 flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                        MYTH
                      </span>
                    </div>
                    <p className="text-sm text-red-800 leading-snug">"{item.myth}"</p>
                  </div>
                  <p className="text-xs text-red-400 text-right">👆 Click to reveal the fact</p>
                </div>

                {/* Back — Fact */}
                <div
                  className="flip-card-back w-full h-full rounded-xl border-2 border-green-300 bg-green-50 p-4 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                        FACT
                      </span>
                    </div>
                    <p className="text-sm text-green-800 leading-snug">{item.fact}</p>
                  </div>
                  <p className="text-xs text-green-400 text-right">✅ Click to flip back</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #138808, #2563EB)' }}
            animate={{ width: `${(flipped.size / items.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span>{flipped.size}/{items.length} facts revealed</span>
      </div>

      {allFlipped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800 text-center font-medium">
            🌟 You have busted all the myths! You are thinking like a responsible citizen.
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #138808, #2563EB)' }}
          >
            Continue to Final Quiz →
          </button>
        </motion.div>
      )}
    </div>
  );
};

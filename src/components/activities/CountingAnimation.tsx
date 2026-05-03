// src/components/activities/CountingAnimation.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountingAnimationProps {
  onComplete: () => void;
}

const VOTE_COUNTS = [
  { label: 'Candidate A', symbol: '⭐', count: 4820, color: '#1A3A6B' },
  { label: 'Candidate B', symbol: '🌙', count: 3640, color: '#138808' },
  { label: 'Candidate C', symbol: '🌺', count: 2190, color: '#FF9933' },
];

const TOTAL_VOTES = VOTE_COUNTS.reduce((s, v) => s + v.count, 0);

export const CountingAnimation: React.FC<CountingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'counting' | 'result'>('idle');
  const [displayCounts, setDisplayCounts] = useState([0, 0, 0]);

  const startCounting = () => {
    setPhase('counting');
    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayCounts(VOTE_COUNTS.map((v) => Math.floor(v.count * eased)));

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayCounts(VOTE_COUNTS.map((v) => v.count));
        setTimeout(() => setPhase('result'), 600);
      }
    }, 30);
  };

  const winner = VOTE_COUNTS[0]; // A wins in this demo

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        📊 Watch the counting process and see how results are declared:
      </p>

      {/* Counting machine */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '2px solid #1A3A6B' }}
      >
        {/* Header */}
        <div
          className="p-3 text-center"
          style={{ background: 'linear-gradient(135deg, #1A3A6B, #2563EB)' }}
        >
          <p className="text-white font-display font-bold text-sm">
            Official Vote Counting System
          </p>
          <p className="text-blue-200 text-xs mt-0.5">
            {phase === 'idle' && 'Ready to begin counting'}
            {phase === 'counting' && '🔄 Counting in progress...'}
            {phase === 'result' && '✅ Counting complete — Results declared!'}
          </p>
        </div>

        {/* Vote bars */}
        <div className="p-4 bg-white space-y-4">
          {VOTE_COUNTS.map((v, idx) => {
            const displayCount = displayCounts[idx];
            const percentage = (v.count / TOTAL_VOTES) * 100;
            const displayPercentage = (displayCount / TOTAL_VOTES) * 100;
            const isWinner = phase === 'result' && idx === 0;

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{v.symbol}</span>
                    <span
                      className={[
                        'font-semibold',
                        isWinner ? 'text-green-700' : 'text-slate-700',
                      ].join(' ')}
                    >
                      {v.label}
                      {isWinner && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          WINNER 🏆
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold" style={{ color: v.color }}>
                    {displayCount.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: v.color }}
                    initial={{ width: 0 }}
                    animate={{
                      width: phase !== 'idle' ? `${displayPercentage}%` : '0%',
                    }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <div className="text-right text-xs text-slate-400">
                  {phase !== 'idle' ? `${displayPercentage.toFixed(1)}%` : '—'}
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total votes counted:</span>
            <span className="font-mono font-bold text-slate-700">
              {phase !== 'idle'
                ? displayCounts.reduce((s, v) => s + v, 0).toLocaleString()
                : '—'}{' '}
              / {TOTAL_VOTES.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={startCounting}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #1A3A6B, #2563EB)' }}
          >
            🗳️ Start Counting
          </motion.button>
        )}

        {phase === 'counting' && (
          <motion.div
            key="counting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-slate-500 flex items-center justify-center gap-2"
          >
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            />
            Counting votes...
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl bg-green-50 border-2 border-green-300 text-center">
              <div className="text-3xl mb-1">{winner.symbol}</div>
              <p className="font-display font-bold text-green-800 text-base">
                {winner.label} wins!
              </p>
              <p className="text-green-700 text-xs mt-1">
                {winner.count.toLocaleString()} votes (
                {((winner.count / TOTAL_VOTES) * 100).toFixed(1)}%) — declared by the
                Returning Officer
              </p>
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
      </AnimatePresence>
    </div>
  );
};

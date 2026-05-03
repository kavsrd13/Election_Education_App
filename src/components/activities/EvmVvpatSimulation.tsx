// src/components/activities/EvmVvpatSimulation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EvmVvpatSimulationProps {
  onComplete: () => void;
}

const CANDIDATES = [
  { id: 'A', label: 'Candidate A', symbol: '⭐', color: '#1A3A6B' },
  { id: 'B', label: 'Candidate B', symbol: '🌙', color: '#138808' },
  { id: 'C', label: 'Candidate C', symbol: '🌺', color: '#FF9933' },
];

export const EvmVvpatSimulation: React.FC<EvmVvpatSimulationProps> = ({ onComplete }) => {
  const [voted, setVoted] = useState<string | null>(null);
  const [showVvpat, setShowVvpat] = useState(false);
  const [vvpatDone, setVvpatDone] = useState(false);

  const handleVote = (id: string) => {
    if (voted) return;
    setVoted(id);
    setShowVvpat(true);
    // Hide VVPAT slip after 4 seconds (simulating the brief window)
    setTimeout(() => {
      setShowVvpat(false);
      setVvpatDone(true);
    }, 4000);
  };

  const candidate = CANDIDATES.find((c) => c.id === voted);

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        🖥️ This is a simulated EVM. Press a button to cast your vote (uses dummy candidates only):
      </p>

      {/* EVM Machine UI */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{
          background: 'linear-gradient(160deg, #1E293B 0%, #0F172A 100%)',
          border: '3px solid #334155',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* EVM Screen */}
        <div className="rounded-xl bg-green-900/40 border border-green-700 p-3 text-center">
          <p className="text-green-400 text-xs font-mono">ELECTRONIC VOTING MACHINE</p>
          <p className="text-green-300 text-xs font-mono mt-0.5">
            {voted ? `VOTE RECORDED — ${candidate?.label}` : 'READY TO VOTE'}
          </p>
        </div>

        {/* Candidate buttons */}
        <div className="space-y-2">
          {CANDIDATES.map((cand) => (
            <motion.button
              key={cand.id}
              onClick={() => handleVote(cand.id)}
              disabled={!!voted}
              whileHover={!voted ? { scale: 1.02 } : {}}
              whileTap={!voted ? { scale: 0.97 } : {}}
              className={[
                'evm-btn w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white font-medium text-sm transition-all',
                voted === cand.id
                  ? 'ring-2 ring-amber-400 opacity-100'
                  : voted
                  ? 'opacity-30 cursor-not-allowed'
                  : 'cursor-pointer',
              ].join(' ')}
            >
              {/* Indicator light */}
              <div
                className={[
                  'w-3 h-3 rounded-full flex-shrink-0',
                  voted === cand.id ? 'bg-amber-400' : 'bg-slate-600',
                ].join(' ')}
              />
              <span className="text-2xl">{cand.symbol}</span>
              <span className="flex-1 text-left">{cand.label}</span>
              {/* Physical button */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border border-slate-500"
                style={{ background: voted === cand.id ? cand.color : '#334155' }}
              >
                {cand.id}
              </div>
            </motion.button>
          ))}
        </div>

        {/* EVM info */}
        <p className="text-slate-500 text-xs text-center font-mono">
          BALLOT UNIT | FOR DEMONSTRATION ONLY
        </p>
      </div>

      {/* VVPAT Slip Window */}
      <AnimatePresence>
        {showVvpat && candidate && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="vvpat-slip rounded-xl overflow-hidden"
          >
            {/* VVPAT header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-xs font-mono">VVPAT — VOTER VERIFIABLE PAPER AUDIT TRAIL</span>
            </div>
            {/* Slip body */}
            <div className="p-5 text-center bg-yellow-50">
              <p className="text-xs text-slate-500 font-mono mb-3">CONFIRMATION SLIP (Visible for ~4 seconds)</p>
              <div className="text-5xl mb-2">{candidate.symbol}</div>
              <p className="font-bold text-slate-800 text-lg">{candidate.label}</p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                ████ ████ ████ {candidate.id}
                <br />
                Your vote has been recorded
              </p>
              {/* Countdown bar */}
              <motion.div
                className="mt-3 h-1.5 rounded-full"
                style={{ background: candidate.color }}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
              <p className="text-xs text-slate-400 mt-1">Slip will disappear automatically</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After VVPAT done */}
      <AnimatePresence>
        {vvpatDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-green-800 font-semibold text-sm mb-1">✅ Vote Successfully Cast!</p>
              <p className="text-green-700 text-xs leading-relaxed">
                The VVPAT slip confirmed your vote for <strong>{candidate?.label}</strong>.
                The slip has now dropped into a sealed VVPAT container. Your vote is recorded
                on the EVM. Remember: your vote is completely secret — no one can see who you voted for.
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

      {!voted && (
        <p className="text-xs text-slate-400 text-center">
          ⚠️ This is a simulation only. All candidates are fictional and for educational purposes.
        </p>
      )}
    </div>
  );
};

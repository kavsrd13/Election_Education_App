import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Link } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

interface MatchingActivityProps {
  pairs: MatchingPair[];
  onComplete: () => void;
}

export const MatchingActivity: React.FC<MatchingActivityProps> = ({ pairs, onComplete }) => {
  const [leftItems, setLeftItems] = useState<{id: string, text: string}[]>([]);
  const [rightItems, setRightItems] = useState<{id: string, text: string}[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<[string, string] | null>(null);

  // Shuffle items initially
  useEffect(() => {
    const left = pairs.map(p => ({ id: p.id, text: p.left }));
    const right = pairs.map(p => ({ id: p.id, text: p.right })).sort(() => Math.random() - 0.5);
    setLeftItems(left);
    setRightItems(right);
  }, [pairs]);

  // Handle match logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        setMatchedIds(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        
        if (matchedIds.length + 1 === pairs.length) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          setTimeout(onComplete, 1500);
        }
      } else {
        // Mismatch
        setErrorPair([selectedLeft, selectedRight]);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setErrorPair(null);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight, matchedIds, pairs.length, onComplete]);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="font-display font-bold text-xl text-civic-blue">Match the Pairs</h3>
        <p className="text-sm text-slate-500">Tap an item on the left, then its match on the right.</p>
      </div>

      <div className="flex gap-4 sm:gap-8 justify-between relative">
        {/* Connection line placeholder if we wanted SVGs, but simple colors work best for mobile */}
        
        {/* Left Column */}
        <div className="flex-1 space-y-3">
          {leftItems.map(item => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedLeft === item.id;
            const isError = errorPair?.[0] === item.id;

            return (
              <motion.button
                key={`l-${item.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => !isMatched && setSelectedLeft(item.id)}
                className={`w-full p-4 rounded-xl text-sm sm:text-base font-semibold text-left transition-all border-2 ${
                  isMatched ? 'bg-green-50 border-green-200 text-green-700 opacity-60' :
                  isError ? 'bg-red-50 border-red-400 text-red-700 animate-shake' :
                  isSelected ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-md' :
                  'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  {item.text}
                  {isMatched && <CheckCircle2 size={18} className="text-green-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-3">
          {rightItems.map(item => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedRight === item.id;
            const isError = errorPair?.[1] === item.id;

            return (
              <motion.button
                key={`r-${item.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => !isMatched && setSelectedRight(item.id)}
                className={`w-full p-4 rounded-xl text-sm sm:text-base font-semibold text-right transition-all border-2 ${
                  isMatched ? 'bg-green-50 border-green-200 text-green-700 opacity-60' :
                  isError ? 'bg-red-50 border-red-400 text-red-700 animate-shake' :
                  isSelected ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-md' :
                  'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between flex-row-reverse">
                  {item.text}
                  {isMatched && <CheckCircle2 size={18} className="text-green-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

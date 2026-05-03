// src/components/activities/VoterSearchActivity.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface VoterSearchActivityProps {
  onComplete: () => void;
}

const FOUND_NAMES = ['rahul', 'priya', 'anita', 'amit', 'sunita', 'ravi', 'pooja', 'arjun'];

export const VoterSearchActivity: React.FC<VoterSearchActivityProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<'found' | 'not-found' | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!name.trim()) return;
    const lowerName = name.toLowerCase().trim();
    const found = FOUND_NAMES.some((n) => lowerName.includes(n));
    setResult(found ? 'found' : 'not-found');
    setSearched(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 font-medium">
        🔍 Try a mock voter list search. Enter a name to check if it appears in the voter list:
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setResult(null);
            setSearched(false);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="e.g., Rahul, Priya, Anita..."
          className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-sm bg-white"
          aria-label="Enter voter name to search"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #1A3A6B, #2563EB)' }}
          aria-label="Search voter list"
        >
          <Search size={16} />
          Search
        </button>
      </div>

      <AnimatePresence mode="wait">
        {searched && result === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-green-50 border-2 border-green-300"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-green-800 text-sm">✅ Name found in voter list!</p>
                <p className="text-green-700 text-xs mt-1">
                  <strong>{name}</strong> — your name appears in the electoral roll.
                  <br />
                  Booth: Polling Station No. 42 &nbsp;|&nbsp; Serial No: 234
                  <br />
                  You are eligible to vote! Great job verifying your status.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {searched && result === 'not-found' && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-amber-800 text-sm">⚠️ Name not found in this demo</p>
                <p className="text-amber-700 text-xs mt-1">
                  In a real scenario, if your name is not found, you should contact the
                  Electoral Registration Officer to check your enrolment status or submit a
                  fresh Form 6 application. Always check early — before election dates are announced!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700">
        💡 <strong>Tip:</strong> In real life, you can check your voter list status at voterportal.eci.gov.in
        or the Voter Helpline app. Always verify your name at least a month before elections!
      </div>

      {searched && (
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

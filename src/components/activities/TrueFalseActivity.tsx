import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface TrueFalseItem {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

interface TrueFalseActivityProps {
  items: TrueFalseItem[];
  onComplete: () => void;
}

export const TrueFalseActivity: React.FC<TrueFalseActivityProps> = ({ items, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentItem = items[currentIndex];
  const isCorrect = selectedAnswer === currentItem.isTrue;

  const handleAnswer = (answer: boolean) => {
    if (selectedAnswer !== null || isAnimating) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === currentItem.isTrue) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#138808', '#2563EB', '#FF9933']
      });
    }
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-on-surface text-xl font-semibold mb-8 leading-snug">"{currentItem.statement}"</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => handleAnswer(true)}
              disabled={selectedAnswer !== null}
              className={[
                'flex flex-col p-6 rounded-2xl transition-all group relative overflow-hidden',
                selectedAnswer === true
                  ? 'bg-white border-4 border-secondary shadow-xl ring-4 ring-secondary/10'
                  : 'bg-white border-2 border-surface-variant hover:border-primary hover:bg-primary/5',
                selectedAnswer !== null && selectedAnswer !== true ? 'opacity-50' : ''
              ].join(' ')}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`font-black text-xl tracking-tight transition-colors ${selectedAnswer === true ? 'text-secondary' : 'text-on-surface group-hover:text-primary'}`}>TRUE</span>
                {selectedAnswer === true ? (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-4 h-4 rounded-full group-active:bg-primary"></div>
                  </div>
                )}
              </div>
              <p className={`text-sm text-left leading-tight ${selectedAnswer === true ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                {/* Generic subtext for the true option */}
                This statement is factually correct.
              </p>
              {selectedAnswer === true && <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary"></div>}
            </button>
            
            <button
              onClick={() => handleAnswer(false)}
              disabled={selectedAnswer !== null}
              className={[
                'flex flex-col p-6 rounded-2xl transition-all group relative overflow-hidden',
                selectedAnswer === false
                  ? 'bg-white border-4 border-secondary shadow-xl ring-4 ring-secondary/10'
                  : 'bg-white border-2 border-surface-variant hover:border-primary hover:bg-primary/5',
                selectedAnswer !== null && selectedAnswer !== false ? 'opacity-50' : ''
              ].join(' ')}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`font-black text-xl tracking-tight transition-colors ${selectedAnswer === false ? 'text-secondary' : 'text-on-surface group-hover:text-primary'}`}>FALSE</span>
                {selectedAnswer === false ? (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-4 h-4 rounded-full group-active:bg-primary"></div>
                  </div>
                )}
              </div>
              <p className={`text-sm text-left leading-tight ${selectedAnswer === false ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                {/* Generic subtext for the false option */}
                This statement is incorrect.
              </p>
              {selectedAnswer === false && <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary"></div>}
            </button>
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="mt-8 p-5 bg-white rounded-xl border border-secondary/20 flex items-start gap-5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {isCorrect ? 'tips_and_updates' : 'error'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-secondary mb-1 uppercase tracking-wider">
                    {isCorrect ? 'Correct Answer!' : 'Not Quite!'}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {currentItem.explanation}
                  </p>
                  <button
                    onClick={handleNext}
                    className="mt-4 px-6 py-2 bg-secondary text-white font-button text-sm rounded-lg shadow-md hover:bg-[#b0145d] transition-all"
                  >
                    {currentIndex < items.length - 1 ? 'Next Question →' : 'Complete Activity 🌟'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

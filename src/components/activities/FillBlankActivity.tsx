import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FillBlankItem {
  sentenceParts: string[]; // e.g. ["The legal age to vote in India is ", " years."]
  correctAnswer: string;
  options: string[]; // e.g. ["16", "18", "21"]
}

interface FillBlankActivityProps {
  items: FillBlankItem[];
  onComplete: () => void;
}

export const FillBlankActivity: React.FC<FillBlankActivityProps> = ({ items, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentItem = items[currentIndex];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const correct = option === currentItem.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      setTimeout(() => {
        if (currentIndex < items.length - 1) {
          setCurrentIndex(c => c + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          onComplete();
        }
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="font-display font-bold text-xl text-civic-blue">Fill in the Blanks</h3>
        <p className="text-sm text-slate-500">Choose the correct word to complete the sentence.</p>
      </div>

      <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center text-lg font-medium">
        {currentItem.sentenceParts[0]}
        <span className={`inline-block min-w-[100px] border-b-2 mx-2 text-center transition-colors ${
          isCorrect === true ? 'border-green-500 text-green-600 font-bold' :
          isCorrect === false ? 'border-red-500 text-red-500' :
          'border-slate-400 text-slate-400 border-dashed'
        }`}>
          {selectedOption || '???'}
        </span>
        {currentItem.sentenceParts[1]}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {currentItem.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(option)}
            disabled={isCorrect === true}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              selectedOption === option
                ? isCorrect
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-red-500 text-white animate-shake'
                : 'bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-700'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {isCorrect === true && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-2 text-green-600 font-bold"
        >
          <CheckCircle2 size={20} />
          Perfect! Moving to next...
        </motion.div>
      )}
    </div>
  );
};

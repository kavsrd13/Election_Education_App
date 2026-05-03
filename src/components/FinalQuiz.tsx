// src/components/FinalQuiz.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';
import { finalQuizQuestions } from '../data/finalQuiz';

interface FinalQuizProps {
  onComplete: (score: number) => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    new Array(finalQuizQuestions.length).fill(null)
  );
  const [answered, setAnswered] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const question = finalQuizQuestions[currentQ];
  const selectedAnswer = answers[currentQ];

  const handleSelect = (label: string) => {
    if (answered) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = label;
    setAnswers(newAnswers);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQ < finalQuizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setAnswered(!!answers[currentQ + 1]);
    } else {
      setQuizDone(true);
    }
  };

  const score = answers.filter((ans, idx) => {
    const q = finalQuizQuestions[idx];
    return q.options.find((o) => o.label === ans)?.correct;
  }).length;

  const scorePercent = Math.round((score / finalQuizQuestions.length) * 100);

  const getScoreLabel = () => {
    if (scorePercent >= 90) return { label: 'Outstanding! 🌟', color: 'text-green-700' };
    if (scorePercent >= 70) return { label: 'Great job! 👍', color: 'text-blue-700' };
    if (scorePercent >= 50) return { label: 'Good effort! 💪', color: 'text-amber-700' };
    return { label: 'Keep learning! 📚', color: 'text-slate-700' };
  };

  if (quizDone) {
    const { label, color } = getScoreLabel();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5 text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl"
        >
          🧠
        </motion.div>
        <div>
          <h3 className="font-display font-bold text-civic-slate text-2xl mb-1">Quiz Complete!</h3>
          <p className={`font-display font-bold text-3xl ${color}`}>
            {score} / {finalQuizQuestions.length}
          </p>
          <p className={`text-lg font-semibold mt-1 ${color}`}>{label}</p>
          <p className="text-sm text-slate-500 mt-1">Score: {scorePercent}%</p>
        </div>

        {/* Answer review */}
        <div className="text-left space-y-2 max-h-64 overflow-y-auto">
          {finalQuizQuestions.map((q, idx) => {
            const userAns = answers[idx];
            const correct = q.options.find((o) => o.label === userAns)?.correct;
            const correctOpt = q.options.find((o) => o.correct);
            return (
              <div
                key={idx}
                className={[
                  'p-3 rounded-xl text-xs border',
                  correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200',
                ].join(' ')}
              >
                <div className="flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-slate-700 mb-1">
                      Q{idx + 1}: {q.question}
                    </p>
                    {!correct && (
                      <p className="text-green-700">
                        ✅ Correct: {correctOpt?.label}. {correctOpt?.text}
                      </p>
                    )}
                    <p className="text-slate-500 mt-0.5">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onComplete(score)}
          className="w-full py-3 rounded-xl font-semibold text-white text-base flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #138808)' }}
        >
          <Award size={18} />
          Get Your Certificate →
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Question progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #FF9933, #138808)' }}
            animate={{ width: `${((currentQ) / finalQuizQuestions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-500">
          {currentQ + 1} / {finalQuizQuestions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`q-${currentQ}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-xs text-blue-500 font-medium mb-1">
              Question {currentQ + 1}
            </p>
            <p className="text-sm font-semibold text-civic-slate leading-relaxed">
              {question.question}
            </p>
          </div>

          <div className="space-y-2">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.label;
              const showResult = answered && isSelected;

              return (
                <motion.button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  disabled={answered}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all',
                    !answered
                      ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      : isSelected && opt.correct
                      ? 'border-green-400 bg-green-50'
                      : isSelected && !opt.correct
                      ? 'border-red-400 bg-red-50'
                      : answered && opt.correct
                      ? 'border-green-200 bg-green-50/50'
                      : 'border-slate-100 bg-slate-50 opacity-50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                      !answered
                        ? 'bg-slate-100 text-slate-600'
                        : isSelected && opt.correct
                        ? 'bg-green-500 text-white'
                        : isSelected && !opt.correct
                        ? 'bg-red-500 text-white'
                        : answered && opt.correct
                        ? 'bg-green-200 text-green-700'
                        : 'bg-slate-100 text-slate-400',
                    ].join(' ')}
                  >
                    {opt.label}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {answered && isSelected && (
                    opt.correct
                      ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      : <XCircle size={16} className="text-red-500 flex-shrink-0" />
                  )}
                  {answered && !isSelected && opt.correct && (
                    <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 leading-relaxed">
                💡 {question.explanation}
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #1A3A6B, #2563EB)' }}
              >
                {currentQ < finalQuizQuestions.length - 1 ? (
                  <>Next Question <ChevronRight size={16} /></>
                ) : (
                  <>See My Results <Award size={16} /></>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// src/components/activities/VotingSimulation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface VotingSimulationProps {
  onComplete: () => void;
}

const STEPS = [
  {
    emoji: '🚶',
    title: 'Enter Polling Station',
    description:
      'You arrive at the polling station and join the queue. The environment is peaceful and orderly. Polling staff guide you in.',
    character: '🧑‍💼',
    action: 'Enter the station',
  },
  {
    emoji: '🕐',
    title: 'Join the Queue',
    description:
      'You wait patiently in the queue. Separate queues may exist for senior citizens, persons with disabilities, and others. Follow the order.',
    character: '👥',
    action: 'Wait in queue',
  },
  {
    emoji: '🪪',
    title: 'Identity Verification',
    description:
      'A polling officer checks your name in the electoral roll and verifies your photo ID. They mark your name in the register.',
    character: '👮',
    action: 'Show ID to officer',
  },
  {
    emoji: '☝️',
    title: 'Indelible Ink Marking',
    description:
      'Indelible ink is applied to your left index finger. This mark prevents double voting and lasts for many days.',
    character: '✍️',
    action: 'Get ink mark',
  },
  {
    emoji: '🚪',
    title: 'Enter Voting Compartment',
    description:
      'You move to the voting compartment. This is a private, screened area where no one can see how you vote. Your vote is secret!',
    character: '🔒',
    action: 'Enter the booth',
  },
  {
    emoji: '🖱️',
    title: 'Cast Your Vote',
    description:
      'You press the button next to your chosen candidate on the EVM Ballot Unit. The VVPAT shows a confirmation slip briefly.',
    character: '🗳️',
    action: 'Press the button',
  },
  {
    emoji: '🎉',
    title: 'Vote Confirmed!',
    description:
      'A beep sound confirms your vote is recorded. You exit the polling station. You have fulfilled your democratic duty!',
    character: '🌟',
    action: 'Exit the booth',
  },
];

export const VotingSimulation: React.FC<VotingSimulationProps> = ({ onComplete }) => {
  const [currentSimStep, setCurrentSimStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = STEPS[currentSimStep];
  const isLast = currentSimStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
    } else {
      setCurrentSimStep((prev) => prev + 1);
    }
  };

  const renderAnimation = (index: number) => {
    switch (index) {
      case 0: // Enter
        return (
          <motion.div
            className="text-6xl"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, type: 'spring' }}
          >
            🚶
          </motion.div>
        );
      case 1: // Queue
        return (
          <div className="flex text-5xl">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>🧍</motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>🧍‍♀️</motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>🧍</motion.div>
          </div>
        );
      case 2: // ID
        return (
          <motion.div
            className="text-6xl"
            initial={{ y: 50, rotate: -20 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            🪪
          </motion.div>
        );
      case 3: // Ink
        return (
          <motion.div className="relative text-6xl">
            <motion.div>☝️</motion.div>
            <motion.div
              className="absolute top-1 left-2 w-3 h-3 bg-purple-800 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>
        );
      case 4: // Booth
        return (
          <motion.div
            className="text-6xl relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🚪
            <motion.div
              className="absolute bottom-0 right-0 text-3xl"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🚶
            </motion.div>
          </motion.div>
        );
      case 5: // Vote
        return (
          <motion.div className="text-6xl relative">
            <motion.div className="text-blue-600 bg-slate-200 rounded-xl p-2 border-2 border-slate-300">
              🔘
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 text-5xl"
              initial={{ x: 20, y: 20 }}
              animate={{ x: 0, y: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            >
              👇
            </motion.div>
          </motion.div>
        );
      case 6: // Done
        return (
          <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            🎉
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-600">
        🏫 Walk through the complete polling booth experience step by step:
      </p>

      {/* Step progress dots */}
      <nav className="flex items-center justify-between px-6 py-6 bg-surface-container-low rounded-2xl shadow-inner border border-surface-container-high mb-6 overflow-x-auto gap-4">
        {STEPS.map((s, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div
                className={[
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  idx < currentSimStep
                    ? 'bg-green-500 text-white shadow-md'
                    : idx === currentSimStep
                    ? 'bg-secondary text-white shadow-[0_0_15px_rgba(181,0,95,0.4)] scale-110 ring-2 ring-white'
                    : 'bg-surface-container-high text-on-surface-variant opacity-50',
                ].join(' ')}
              >
                {idx < currentSimStep ? <CheckCircle2 size={20} /> : idx + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center opacity-80">
                {idx === currentSimStep ? s.title.split(' ')[0] : ''}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-1 flex-1 min-w-[20px] rounded-full ${idx < currentSimStep ? 'bg-green-500' : 'bg-surface-container-highest'}`} />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Simulation card */}
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={`sim-step-${currentSimStep}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-outline-variant overflow-hidden bg-white shadow-md"
          >
            {/* Visual Animation Area */}
            <div className="h-56 bg-gradient-to-br from-primary-fixed to-surface-container-highest flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10">
                {renderAnimation(currentSimStep)}
              </div>
            </div>

            {/* Card text */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                  Simulation Step {currentSimStep + 1}
                </span>
              </div>
              <h3 className="font-h2 font-bold text-3xl text-primary mb-4 flex items-center gap-3">
                <span className="text-4xl drop-shadow-md">{step.emoji}</span> {step.title}
              </h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed mb-8">
                {step.description}
              </p>
              
              <div className="flex justify-end pt-6 border-t border-surface-variant/50">
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-button text-white text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl bg-secondary"
                >
                  {isLast ? '🎉 Complete Simulation!' : (
                    <>
                      {step.action} <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sim-complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-6 text-center bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300"
          >
            <motion.div
              className="text-6xl mb-3"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              🗳️
            </motion.div>
            <h3 className="font-display font-bold text-green-800 text-xl mb-2">
              You Voted! 
            </h3>
            <p className="text-sm text-green-700 mb-4">
              You completed the entire polling booth simulation. Every step ensures your vote is
              free, secret, and recorded correctly.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm hover:scale-105 transition-transform"
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

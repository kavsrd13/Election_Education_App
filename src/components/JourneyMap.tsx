// src/components/JourneyMap.tsx
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '../data/lessons';

interface JourneyMapProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (stepId: number) => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentNodeRef = useRef<HTMLButtonElement>(null);

  // Scroll current node into view
  useEffect(() => {
    if (currentNodeRef.current && containerRef.current) {
      currentNodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentStep]);

  const getNodeState = (stepId: number): 'completed' | 'current' | 'locked' => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'locked';
  };

  // Calculate global progress
  const progressPercent = Math.round((completedSteps.length / lessons.length) * 100);

  return (
    <section
      className="col-span-12 mb-4 bg-white rounded-2xl p-4 shadow-md border border-outline-variant relative overflow-hidden"
      aria-labelledby="journey-map-title"
    >
      <div className="absolute inset-0 journey-path opacity-10"></div>
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">map</span>
          </div>
          <div>
            <h2 id="journey-map-title" className="font-h2 text-xl text-primary font-bold">Progress Road</h2>
            <p className="text-on-surface-variant text-[10px] font-medium uppercase tracking-wider">Step-by-step Journey</p>
          </div>
        </div>

        {/* Illustrative Road Map - Compact */}
        <div 
          ref={containerRef}
          className="flex-1 relative flex items-center justify-start pt-12 pb-2 px-4 overflow-x-auto scrollbar-hide max-w-full lg:max-w-[70%]"
        >
          {/* The Road Track */}
          <div className="absolute left-4 right-8 h-2 bg-surface-container-highest rounded-full shadow-inner z-0 min-w-[600px]">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-secondary rounded-full transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-8 relative" role="list" aria-label="Lesson progression steps">
            {lessons.map((lesson, idx) => {
              const state = getNodeState(lesson.id);
              
              return (
                <div key={lesson.id} role="listitem" className={`flex flex-col items-center gap-1.5 min-w-[70px] relative ${state === 'locked' ? 'opacity-40' : 'group'}`}>
                  
                  {/* Animated Avatar - Compact */}
                  <AnimatePresence>
                    {state === 'current' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 avatar-float z-20 pointer-events-none"
                      >
                        <img 
                          alt="Voter Avatar" 
                          className="w-full h-full drop-shadow-lg" 
                          src="https://img.icons8.com/color/96/person-male.png" 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    ref={lesson.id === currentStep ? currentNodeRef : undefined}
                    onClick={() => onStepClick(lesson.id)}
                    disabled={state === 'locked'}
                    aria-current={state === 'current' ? 'step' : undefined}
                    aria-label={`Step ${lesson.id}: ${lesson.title} — ${state}`}
                    className={[
                      'w-10 h-10 rounded-full flex items-center justify-center shadow-md ring-2 ring-white relative z-10 transition-transform',
                      state === 'completed'
                        ? 'bg-green-500 text-white hover:scale-110'
                        : state === 'current'
                        ? 'bg-secondary text-white shadow-[0_0_15px_rgba(181,0,95,0.4)] animate-pulse'
                        : 'bg-surface-container-high text-outline-variant',
                    ].join(' ')}
                  >
                    {state === 'completed' ? (
                      <span className="material-symbols-outlined text-xl">check</span>
                    ) : state === 'locked' ? (
                      <span className="material-symbols-outlined text-base">lock</span>
                    ) : (
                      <span className="material-symbols-outlined text-xl">person_check</span>
                    )}
                  </button>

                  <span 
                    className={[
                      'text-center tracking-tight truncate max-w-[60px]',
                      state === 'completed' ? 'text-green-600 font-bold text-[8px] uppercase' 
                        : state === 'current' ? 'text-secondary font-black text-[9px] uppercase'
                        : 'text-outline-variant text-[8px] font-medium'
                    ].join(' ')}
                  >
                    {lesson.badgeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">Status</span>
          <span className="text-2xl font-black text-primary leading-none">{progressPercent}%</span>
        </div>
      </div>
    </section>
  );
};

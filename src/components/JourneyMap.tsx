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
    <section className="col-span-12 mb-4 bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant relative overflow-hidden">
      <div className="absolute inset-0 journey-path opacity-20"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-between w-full md:w-auto gap-4">
          <div>
            <h2 className="font-h2 text-base text-primary mb-0 leading-none">Your Progress Road</h2>
          </div>
          <span className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/20 whitespace-nowrap">
            {progressPercent}%
          </span>
        </div>

        {/* Illustrative Road Map */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-start py-4 px-4 overflow-x-auto scrollbar-hide flex-1 w-full"
        >
          {/* The Road Track */}
          <div className="absolute left-4 right-4 h-2 bg-surface-container-highest rounded-full shadow-inner z-0 min-w-[600px] md:min-w-0">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-secondary rounded-full transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 relative min-w-[600px] md:min-w-0">
            {lessons.map((lesson, idx) => {
              const state = getNodeState(lesson.id);
              
              return (
                <div key={lesson.id} className={`flex flex-col items-center gap-1 min-w-[40px] relative ${state === 'locked' ? 'opacity-60' : 'group'}`}>
                  
                  {/* Animated Avatar */}
                  <AnimatePresence>
                    {state === 'current' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 avatar-float z-20 pointer-events-none"
                      >
                        <img 
                          alt="Voter Avatar" 
                          className="w-full h-full drop-shadow-md" 
                          src="https://img.icons8.com/color/96/person-male.png" 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    ref={lesson.id === currentStep ? currentNodeRef : undefined}
                    onClick={() => onStepClick(lesson.id)}
                    disabled={state === 'locked'}
                    aria-label={`Step ${lesson.id}: ${lesson.title} — ${state}`}
                    className={[
                      'w-8 h-8 rounded-full flex items-center justify-center shadow-md ring-2 ring-white relative z-10 transition-transform',
                      state === 'completed'
                        ? 'bg-green-500 text-white hover:scale-110'
                        : state === 'current'
                        ? 'bg-secondary text-white shadow-[0_0_15px_rgba(181,0,95,0.4)] animate-pulse'
                        : 'bg-surface-container-high text-outline-variant w-6 h-6 my-1',
                    ].join(' ')}
                  >
                    {state === 'completed' ? (
                      <span className="material-symbols-outlined text-lg">check</span>
                    ) : state === 'locked' ? (
                      <span className="material-symbols-outlined text-sm">lock</span>
                    ) : (
                      <span className="material-symbols-outlined text-lg">person_check</span>
                    )}
                  </button>

                  <span 
                    className={[
                      'font-label-caps text-center tracking-tight truncate w-16',
                      state === 'completed' ? 'text-green-600 font-bold text-[8px]' 
                        : state === 'current' ? 'text-secondary font-extrabold text-[9px]'
                        : 'text-outline-variant text-[8px] font-medium hidden sm:block'
                    ].join(' ')}
                  >
                    {lesson.badgeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

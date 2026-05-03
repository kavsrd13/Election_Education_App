// src/components/LessonCard.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonStep } from '../data/lessons';
import { ChecklistActivity } from './activities/ChecklistActivity';
import { VoterSearchActivity } from './activities/VoterSearchActivity';
import { VotingDayChecklist } from './activities/VotingDayChecklist';
import { VotingSimulation } from './activities/VotingSimulation';
import { EvmVvpatSimulation } from './activities/EvmVvpatSimulation';
import { CountingAnimation } from './activities/CountingAnimation';
import { MythFactActivity } from './activities/MythFactActivity';
import { TrueFalseActivity } from './activities/TrueFalseActivity';
import { FillBlankActivity } from './activities/FillBlankActivity';
import { MatchingActivity } from './activities/MatchingActivity';
import { FinalQuiz } from './FinalQuiz';
import { CertificateGenerator } from './CertificateGenerator';

interface LessonCardProps {
  lesson: LessonStep;
  isCompleted: boolean;
  quizScore: number | null;
  completedDate: string | null;
  userName: string;
  onComplete: () => void;
  onQuizComplete: (score: number) => void;
  onCertificateSave: (name: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  quizScore,
  completedDate,
  userName,
  onComplete,
  onQuizComplete,
  onCertificateSave,
}) => {
  const renderActivity = () => {
    switch (lesson.activityType) {
      case 'start':
        return (
          <div className="flex justify-end mt-8">
            <button
              onClick={onComplete}
              className="bg-secondary text-white px-8 py-4 rounded-xl font-button text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 active:translate-y-0"
            >
              Start My Journey
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
          </div>
        );
        
      case 'true-false':
        return lesson.trueFalseItems ? (
          <TrueFalseActivity items={lesson.trueFalseItems} onComplete={onComplete} />
        ) : null;

      case 'fill-blank':
        return lesson.fillBlankItems ? (
          <FillBlankActivity items={lesson.fillBlankItems} onComplete={onComplete} />
        ) : null;

      case 'matching':
        return lesson.matchingPairs ? (
          <MatchingActivity pairs={lesson.matchingPairs} onComplete={onComplete} />
        ) : null;

      case 'checklist':
        return lesson.checklistItems ? (
          <ChecklistActivity items={lesson.checklistItems} onComplete={onComplete} />
        ) : null;

      case 'voter-search':
        return <VoterSearchActivity onComplete={onComplete} />;

      case 'voting-checklist':
        return <VotingDayChecklist onComplete={onComplete} />;

      case 'voting-simulation':
        return <VotingSimulation onComplete={onComplete} />;

      case 'evm-vvpat':
        return <EvmVvpatSimulation onComplete={onComplete} />;

      case 'counting':
        return <CountingAnimation onComplete={onComplete} />;

      case 'myth-fact':
        return lesson.mythFactItems ? (
          <MythFactActivity items={lesson.mythFactItems} onComplete={onComplete} />
        ) : null;

      case 'final-quiz':
        return <FinalQuiz onComplete={onQuizComplete} />;

      case 'certificate':
        return (
          <CertificateGenerator
            initialName={userName}
            quizScore={quizScore}
            completedDate={completedDate}
            onSave={onCertificateSave}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={`lesson-${lesson.id}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant mb-6"
      >
        {/* Header section with image and gradient overlay */}
        <div className="h-64 relative overflow-hidden bg-primary">
          {/* Module specific AI generated background image */}
          <img 
            src={`/images/lesson_${lesson.id}.png`} 
            alt={lesson.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 sm:left-8 text-white z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-secondary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Step {lesson.id}
              </span>
              {isCompleted && (
                <span className="bg-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span> Completed
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl drop-shadow-md">{lesson.emoji}</span>
              <h1 className="font-h1 text-3xl sm:text-4xl leading-tight font-bold">{lesson.title}</h1>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            {lesson.shortDescription}
          </p>

          {/* Key points converted to Bento-style cards */}
          {lesson.keyPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {lesson.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:border-primary/30 transition-colors group">
                  <span className="material-symbols-outlined text-primary text-2xl mt-0.5 group-hover:scale-110 transition-transform">push_pin</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Activity Section */}
          <div className="p-6 sm:p-8 bg-surface-container-low rounded-2xl border-2 border-primary/5 shadow-inner">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="font-h3 text-primary text-2xl font-bold">Interactive Module</h3>
            </div>
            
            {renderActivity()}
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

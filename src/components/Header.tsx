// src/components/Header.tsx
import React from 'react';
import { lessons } from '../data/lessons';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  completedSteps: number[];
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  completedSteps,
  onReset,
}) => {
  const totalSteps = lessons.length;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 max-w-[1280px] left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black text-primary tracking-tight font-h2 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[20px]">account_balance</span>
          </div>
          <span className="hidden sm:inline">Election Journey</span>
        </span>
        <div
          className="hidden md:flex h-1.5 bg-surface-container-high w-48 rounded-full ml-4 overflow-hidden shadow-inner"
          role="progressbar"
          aria-label="Journey completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
        >
          <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <span className="hidden md:block text-label-caps text-secondary font-bold ml-2">STEP {currentStep} / {totalSteps}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all border border-transparent hover:border-outline-variant text-sm font-semibold"
          title="Reset Progress"
          aria-label="Reset all progress"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reset</span>
        </button>
        {/* Removed non-functional help and account buttons */}
      </div>
    </header>
  );
};

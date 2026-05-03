// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageCircleQuestion } from 'lucide-react';

import { Header } from './components/Header';
import { JourneyMap } from './components/JourneyMap';
import { LessonCard } from './components/LessonCard';
import { FaqAssistant } from './components/FaqAssistant';
import { BadgeNotification } from './components/BadgeNotification';
import { LandingPage } from './components/LandingPage';
import { GlobalChatbot } from './components/GlobalChatbot';
import { GoogleServicesPanel } from './components/GoogleServicesPanel';

import { lessons } from './data/lessons';
import {
  loadProgress,
  saveProgress,
  resetProgress,
  completeStep,
  saveQuizScore,
  saveCertificate,
  type UserProgress,
} from './utils/storage';

const MICROCOPY: Record<number, string> = {
  1: '🚀 Journey started! Welcome to the Election Journey.',
  2: '✅ Great! You now know eligibility rules.',
  3: '📝 Nice work! Registration knowledge unlocked.',
  4: '🔍 You can now verify your voter list status!',
  5: '✏️ You know how to keep your details updated.',
  6: '📣 Great! You are now an informed voter.',
  7: '🏫 You are prepared for voting day!',
  8: '🗳️ Amazing! You\'ve experienced the full voting process.',
  9: '🖥️ Tech-aware! You understand EVM & VVPAT.',
  10: '📊 You witnessed the counting process.',
  11: '🌟 You\'re thinking like a responsible citizen!',
  12: '🧠 Quiz complete! You\'re closer to your certificate.',
};

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 40,
    origin: { y: 0.6 },
    colors: ['#FF9933', '#FFFFFF', '#138808', '#2563EB', '#F59E0B'],
  });
}

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [viewStep, setViewStep] = useState<number>(loadProgress().currentStep);
  const [hasStarted, setHasStarted] = useState<boolean>(loadProgress().completedSteps.length > 0);
  const [faqOpen, setFaqOpen] = useState(false);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [microcopy, setMicrocopy] = useState<string | null>(null);

  // Sync viewStep with currentStep when progress changes from outside
  useEffect(() => {
    setViewStep(progress.currentStep);
  }, []);

  const showBadge = useCallback((badge: string, msg: string) => {
    setNewBadge(badge);
    setMicrocopy(msg);
    setTimeout(() => {
      setNewBadge(null);
      setMicrocopy(null);
    }, 3500);
  }, []);

  const handleComplete = useCallback(() => {
    const lesson = lessons.find((l) => l.id === viewStep);
    if (!lesson) return;

    const updated = completeStep(progress, viewStep, lesson.badgeLabel);
    setProgress(updated);

    const msg = MICROCOPY[viewStep] ?? 'Well done! Keep going!';
    showBadge(lesson.badgeLabel, msg);

    // Move to next step
    const nextStep = Math.min(viewStep + 1, 13);
    setViewStep(nextStep);

    // Confetti on final completion
    if (viewStep >= 11) {
      setTimeout(fireConfetti, 400);
    }
  }, [progress, viewStep, showBadge]);

  const handleQuizComplete = useCallback(
    (score: number) => {
      const updated = saveQuizScore(progress, score);
      const withStep = completeStep(updated, 12, 'Scholar');
      setProgress(withStep);
      showBadge('Scholar', `🧠 Quiz done! You scored ${score}/10.`);
      setTimeout(() => {
        setViewStep(13);
        fireConfetti();
      }, 300);
    },
    [progress, showBadge]
  );

  const handleCertificateSave = useCallback(
    (name: string) => {
      const updated = saveCertificate(progress, name);
      const withStep = completeStep(updated, 13, 'Certified');
      setProgress(withStep);
      showBadge('Certified Citizen', '🏆 Congratulations! You are a Responsible Citizen!');
      setTimeout(fireConfetti, 500);
      setTimeout(fireConfetti, 1200);
    },
    [progress, showBadge]
  );

  const handleStepClick = (stepId: number) => {
    // Only allow clicking completed steps or the current step
    if (
      progress.completedSteps.includes(stepId) ||
      stepId === progress.currentStep
    ) {
      setViewStep(stepId);
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all progress? This cannot be undone.'
    );
    if (!confirmed) return;
    resetProgress();
    const fresh = loadProgress();
    setProgress(fresh);
    setViewStep(1);
    setNewBadge(null);
  };

  const currentLesson = lessons.find((l) => l.id === viewStep);
  const isCompleted = progress.completedSteps.includes(viewStep);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-surface">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 flex justify-center h-16 bg-white/90 backdrop-blur-md border-b border-blue-50 shadow-sm">
          <div className="w-full max-w-[1280px] flex justify-between items-center px-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">account_balance</span>
              </div>
              <div className="text-xl font-bold text-primary tracking-tight font-h2">Election Journey</div>
            </div>
            {/* Removed unnecessary navigation and buttons */}
          </div>
        </header>
        <LandingPage onStart={() => setHasStarted(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body-md text-on-background">
      {/* Badge notification */}
      <BadgeNotification badge={newBadge} message={microcopy ?? undefined} />

      {/* Header */}
      <Header
        currentStep={progress.currentStep}
        completedSteps={progress.completedSteps}
        onReset={handleReset}
      />

      {/* Main content */}
      <main className="pt-24 pb-[64px] px-6 max-w-[1280px] mx-auto grid grid-cols-12 gap-[24px]">
        {/* Journey map (full width) */}
        <div className="col-span-12">
          <JourneyMap
            currentStep={progress.currentStep}
            completedSteps={progress.completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Lesson card (main column) */}
        <div className="col-span-12 lg:col-span-8 space-y-[24px]">
          {currentLesson && (
            <LessonCard
              lesson={currentLesson}
              isCompleted={isCompleted}
              quizScore={progress.quizScore}
              completedDate={progress.completedDate}
              userName={progress.userName}
              onComplete={handleComplete}
              onQuizComplete={handleQuizComplete}
              onCertificateSave={handleCertificateSave}
            />
          )}

          {/* Revisit note */}
          {viewStep !== progress.currentStep && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-center justify-between"
            >
              <span>📖 You are revisiting a completed step.</span>
              <button
                onClick={() => setViewStep(progress.currentStep)}
                className="text-xs font-semibold text-amber-900 underline underline-offset-2"
              >
                Go to current step →
              </button>
            </motion.div>
          )}
        </div>

        {/* Right column: FAQ + badges */}
        <aside className="col-span-12 lg:col-span-4 space-y-[24px]">
          {/* User Progress Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant shadow-md relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-secondary to-pink-300">
                    <div className="w-full h-full bg-white rounded-full overflow-hidden border-2 border-white">
                      <img alt="User" className="w-full h-full object-cover bg-amber-100 p-1" src="https://img.icons8.com/color/96/person-male.png"/>
                    </div>
                  </div>
                  {progress.badgeUnlocked.length > 0 && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <span className="material-symbols-outlined text-[12px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-h3 text-primary text-xl font-bold">{progress.userName || 'Citizen'}</h4>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                    Level {Math.max(1, Math.floor(progress.completedSteps.length / 3))}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-on-tertiary-fixed-variant flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-2xl">military_tech</span>
                </div>
                <span className="text-[8px] font-bold text-outline uppercase">Voter-in-Training</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-outline uppercase">Overall Mastery</span>
                <span className="text-2xl font-black text-primary">
                  {Math.round((progress.completedSteps.length / 13) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" 
                  style={{ width: `${(progress.completedSteps.length / 13) * 100}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* FAQ Assistant Container */}
          <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant shadow-md">
            <button
              onClick={() => setFaqOpen((v) => !v)}
              className="w-full p-6 bg-gradient-to-r from-primary to-on-primary-fixed-variant text-white flex items-center justify-between text-left transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-2xl">forum</span>
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Ask Election Guide</h4>
                  <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">Instant Support Bot</p>
                </div>
              </div>
              <span className={`material-symbols-outlined transition-transform duration-300 ${faqOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            
            <AnimatePresence>
              {faqOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-surface-container-lowest"
                >
                  <FaqAssistant isOpen={true} onClose={() => setFaqOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Activity List */}
          <GoogleServicesPanel />

          {/* Activity List */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Recent Activity</h4>
              <button className="text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1 rounded-full transition-colors">View All</button>
            </div>
            <ul className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-container-high"></div>
              {progress.completedSteps.slice(-3).map((step, idx) => {
                const lesson = lessons.find(l => l.id === step);
                return (
                  <li key={`act-${step}`} className="flex gap-5 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white shadow-sm">
                      <span className="material-symbols-outlined text-[14px] font-black">check</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-none mb-1">{lesson?.title}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">Completed • +100 Points</p>
                    </div>
                  </li>
                );
              })}
              
              <li className="flex gap-5 relative z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-secondary flex items-center justify-center ring-4 ring-white shadow-md">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-secondary leading-none mb-1">{currentLesson?.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">In Progress • Step {progress.currentStep}</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      <GlobalChatbot />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400">
          🇮🇳 Election Journey — Educational, Non-partisan Civic Learning App &nbsp;|&nbsp;
          Content is for educational purposes only. Does not represent any political party or election authority.
        </p>
      </footer>
    </div>
  );
}

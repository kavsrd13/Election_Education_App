// src/utils/storage.ts

export interface UserProgress {
  userName: string;
  currentStep: number;
  completedSteps: number[];
  quizScore: number | null;
  certificateGenerated: boolean;
  completedDate: string | null;
  badgeUnlocked: string[];
}

const STORAGE_KEY = 'election-journey-progress';

export const defaultProgress: UserProgress = {
  userName: '',
  currentStep: 1,
  completedSteps: [],
  quizScore: null,
  certificateGenerated: false,
  completedDate: null,
  badgeUnlocked: [],
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return { ...defaultProgress, ...parsed };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage might be full or unavailable — fail silently
  }
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}

export function completeStep(
  progress: UserProgress,
  stepId: number,
  badgeLabel: string
): UserProgress {
  const completedSteps = Array.from(new Set([...progress.completedSteps, stepId]));
  const badgeUnlocked = progress.badgeUnlocked.includes(badgeLabel)
    ? progress.badgeUnlocked
    : [...progress.badgeUnlocked, badgeLabel];
  const nextStep = Math.min(stepId + 1, 13);
  const updated: UserProgress = {
    ...progress,
    currentStep: Math.max(progress.currentStep, nextStep),
    completedSteps,
    badgeUnlocked,
  };
  saveProgress(updated);
  return updated;
}

export function saveQuizScore(progress: UserProgress, score: number): UserProgress {
  const updated: UserProgress = {
    ...progress,
    quizScore: score,
  };
  saveProgress(updated);
  return updated;
}

export function saveCertificate(
  progress: UserProgress,
  userName: string
): UserProgress {
  const updated: UserProgress = {
    ...progress,
    userName,
    certificateGenerated: true,
    completedDate: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };
  saveProgress(updated);
  return updated;
}

import {
  completeStep,
  defaultProgress,
  loadProgress,
  resetProgress,
  saveCertificate,
  saveQuizScore,
} from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default progress when storage is empty', () => {
    expect(loadProgress()).toEqual(defaultProgress);
  });

  it('completes a step and avoids duplicates', () => {
    const base = { ...defaultProgress };
    const once = completeStep(base, 1, 'Starter');
    const twice = completeStep(once, 1, 'Starter');

    expect(once.completedSteps).toEqual([1]);
    expect(twice.completedSteps).toEqual([1]);
    expect(twice.badgeUnlocked).toEqual(['Starter']);
    expect(twice.currentStep).toBe(2);
  });

  it('saves quiz score and certificate info', () => {
    const withScore = saveQuizScore(defaultProgress, 8);
    const withCert = saveCertificate(withScore, 'Krishna');

    expect(withCert.quizScore).toBe(8);
    expect(withCert.certificateGenerated).toBe(true);
    expect(withCert.userName).toBe('Krishna');
    expect(withCert.completedDate).toBeTruthy();
  });

  it('resets stored progress', () => {
    completeStep(defaultProgress, 2, 'Badge');
    resetProgress();
    expect(loadProgress()).toEqual(defaultProgress);
  });
});

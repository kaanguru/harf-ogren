import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressTracker } from '../progress-tracker';
import { createDefaultProgress } from '../../models/user-progress';

// Mock localStorage for Node.js environment
const mockLocalStorage = {
  store: {} as { [key: string]: string },
  getItem: (key: string) => mockLocalStorage.store[key] || null,
  setItem: (key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  },
  removeItem: (key: string) => {
    delete mockLocalStorage.store[key];
  },
  clear: () => {
    mockLocalStorage.store = {};
  },
  key: (index: number) => Object.keys(mockLocalStorage.store)[index] || null,
  length: 0 // This will be updated dynamically if needed
};

// Mock the global localStorage
global.localStorage = mockLocalStorage as any as Storage;

describe('ProgressTracker', () => {
  let progressTracker: ProgressTracker;

  beforeEach(() => {
    // Clear localStorage before each test
    mockLocalStorage.clear();
    progressTracker = new ProgressTracker();
  });

  it('should store progress separately for each set', () => {
    // Mark a letter as learned for Arabic set
    progressTracker.markLetterLearned('alef', 'ar');
    
    // Mark a different letter as learned for Russian set
    progressTracker.markLetterLearned('ya', 'ru');
    
    // Verify each set has its own learned letters
    expect(progressTracker.getLearnedLetters('ar')).toEqual(['alef']);
    expect(progressTracker.getLearnedLetters('ru')).toEqual(['ya']);
    
    // Verify switching between sets preserves separate progress
    expect(progressTracker.isLetterLearned('alef', 'ar')).toBe(true);
    expect(progressTracker.isLetterLearned('ya', 'ru')).toBe(true);
    expect(progressTracker.isLetterLearned('alef', 'ru')).toBe(false);
    expect(progressTracker.isLetterLearned('ya', 'ar')).toBe(false);
  });

  it('should create default progress for each set when no stored data exists', () => {
    const arProgress = progressTracker.getProgress('ar');
    const ruProgress = progressTracker.getProgress('ru');
    
    // Verify they are separate objects
    expect(arProgress.setId).toBe('ar');
    expect(ruProgress.setId).toBe('ru');
    expect(arProgress.learnedLetters).toEqual([]);
    expect(ruProgress.learnedLetters).toEqual([]);
  });

  it('should save progress to separate localStorage keys', () => {
    // Mark letters learned in different sets
    progressTracker.markLetterLearned('alef', 'ar');
    progressTracker.markLetterLearned('ya', 'ru');
    
    // Check that localStorage has separate keys
    expect(mockLocalStorage.getItem('progress_ar')).not.toBeNull();
    expect(mockLocalStorage.getItem('progress_ru')).not.toBeNull();
    
    // Check that each contains the expected data
    const arData = JSON.parse(mockLocalStorage.getItem('progress_ar')!);
    const ruData = JSON.parse(mockLocalStorage.getItem('progress_ru')!);
    
    expect(arData.learnedLetters).toContain('alef');
    expect(ruData.learnedLetters).toContain('ya');
  });

  it('should load progress from separate localStorage keys', () => {
    // Set up mock data in localStorage
    const initialArProgress = {
      setId: 'ar',
      learnedLetters: ['alef', 'beh'],
      lastActive: new Date().toISOString(),
    };
    const initialRuProgress = {
      setId: 'ru',
      learnedLetters: ['ya', 'yu'],
      lastActive: new Date().toISOString(),
    };
    
    mockLocalStorage.setItem('progress_ar', JSON.stringify(initialArProgress));
    mockLocalStorage.setItem('progress_ru', JSON.stringify(initialRuProgress));
    
    // Create new tracker (which should load from localStorage)
    const newTracker = new ProgressTracker();
    
    // Verify progress was loaded correctly
    expect(newTracker.getLearnedLetters('ar')).toEqual(['alef', 'beh']);
    expect(newTracker.getLearnedLetters('ru')).toEqual(['ya', 'yu']);
  });

  it('should reset progress separately for each set', () => {
    // Mark letters for Arabic
    progressTracker.markLetterLearned('alef', 'ar');
    expect(progressTracker.getLearnedLetters('ar')).toEqual(['alef']);
    
    // Reset Arabic progress
    progressTracker.resetProgress('ar');
    expect(progressTracker.getLearnedLetters('ar')).toEqual([]);
    
    // Verify Russian progress is unaffected
    progressTracker.markLetterLearned('ya', 'ru');
    expect(progressTracker.getLearnedLetters('ru')).toEqual(['ya']);
    
    // Reset Russian separately
    progressTracker.resetProgress('ru');
    expect(progressTracker.getLearnedLetters('ru')).toEqual([]);
  });

  it('should calculate progress percentage separately for each set', () => {
    // Add some letters to Arabic set
    progressTracker.markLetterLearned('alef', 'ar');
    progressTracker.markLetterLearned('beh', 'ar');
    
    // Calculate progress - if total letters is 10, that's 20% for Arabic
    const arPercentage = progressTracker.getProgressPercentage('ar', 10);
    expect(arPercentage).toBe(20);
    
    // Russian should still be at 0% since no letters have been learned
    const ruPercentage = progressTracker.getProgressPercentage('ru', 10);
    expect(ruPercentage).toBe(0);
  });

  it('should handle migration from old single storage to new multi-set structure', () => {
    // Simulate old format data
    const oldProgressData = {
      language: 'ar', // Old format used language
      learnedLetters: ['alef', 'beh'],
      lastActive: new Date().toISOString(),
    };
    
    mockLocalStorage.setItem('harf-ogren-progress', JSON.stringify(oldProgressData));
    
    // Create a new tracker, which should trigger migration
    const migratedTracker = new ProgressTracker();
    
    // Old key should be removed
    expect(mockLocalStorage.getItem('harf-ogren-progress')).toBeNull();
    
    // Data should be migrated to the new structure under 'progress_ar'
    expect(mockLocalStorage.getItem('progress_ar')).not.toBeNull();
    
    // Verify the migrated data is accessible
    expect(migratedTracker.getLearnedLetters('ar')).toEqual(['alef', 'beh']);
  });

  it('should clear all progress including both old and new storage keys', () => {
    // Add progress to sets
    progressTracker.markLetterLearned('alef', 'ar');
    progressTracker.markLetterLearned('ya', 'ru');
    
    // Also add some old format data
    mockLocalStorage.setItem('harf-ogren-progress', JSON.stringify(createDefaultProgress('ar')));
    
    // Clear all progress
    progressTracker.clearAllProgress();
    
    // All keys should be cleared
    expect(mockLocalStorage.getItem('progress_ar')).toBeNull();
    expect(mockLocalStorage.getItem('progress_ru')).toBeNull();
    expect(mockLocalStorage.getItem('harf-ogren-progress')).toBeNull();
    
    // And the in-memory cache should be cleared
    const newArProgress = progressTracker.getProgress('ar');
    expect(newArProgress.learnedLetters).toEqual([]);
  });
});
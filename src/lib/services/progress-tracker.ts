import type { UserProgress } from '$lib/models/user-progress';
import { createDefaultProgress } from '$lib/models/user-progress';

const STORAGE_KEY = 'harf-ogren-progress';

export class ProgressTracker {
	private progress: UserProgress | null = null;

	constructor() {
		this.loadProgress();
	}

	private loadProgress(): void {
		try {
			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored) {
					this.progress = JSON.parse(stored);
				}
			}
		} catch (error) {
			console.error('Error loading progress from localStorage:', error);
			this.progress = null;
		}
	}

	private saveProgress(): void {
		if (this.progress && typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
			} catch (error) {
				console.error('Error saving progress to localStorage:', error);
			}
		}
	}

	getProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): UserProgress {
		if (!this.progress || this.progress.setId !== setId) {
			this.progress = createDefaultProgress(setId);
			this.saveProgress();
		}
		return this.progress;
	}

	markLetterLearned(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		const progress = this.getProgress(setId);

		if (!progress.learnedLetters.includes(letterId)) {
			progress.learnedLetters.push(letterId);
			progress.lastActive = new Date().toISOString();
			this.saveProgress();
		}
	}

	getLearnedLetters(setId: 'ar' | 'ru' | 'ot' | 'fa'): string[] {
		const progress = this.getProgress(setId);
		return [...progress.learnedLetters];
	}

	resetProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		this.progress = createDefaultProgress(setId);
		this.saveProgress();
	}

	clearAllProgress(): void {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem(STORAGE_KEY);
		}
		this.progress = null;
	}

	getProgressPercentage(setId: 'ar' | 'ru' | 'ot' | 'fa', totalLetters: number): number {
		const progress = this.getProgress(setId);
		if (totalLetters === 0) return 0;
		return Math.round((progress.learnedLetters.length / totalLetters) * 100);
	}

	isLetterLearned(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): boolean {
		const progress = this.getProgress(setId);
		return progress.learnedLetters.includes(letterId);
	}
}

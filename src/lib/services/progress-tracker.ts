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
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				this.progress = JSON.parse(stored);
			}
		} catch (error) {
			console.error('Error loading progress from localStorage:', error);
			this.progress = null;
		}
	}

	private saveProgress(): void {
		if (this.progress) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
			} catch (error) {
				console.error('Error saving progress to localStorage:', error);
			}
		}
	}

	getProgress(language: 'ar' | 'ru'): UserProgress {
		if (!this.progress || this.progress.language !== language) {
			this.progress = createDefaultProgress(language);
			this.saveProgress();
		}
		return this.progress;
	}

	markLetterLearned(letterId: string, language: 'ar' | 'ru'): void {
		const progress = this.getProgress(language);

		if (!progress.learnedLetters.includes(letterId)) {
			progress.learnedLetters.push(letterId);
			progress.lastActive = new Date().toISOString();
			this.saveProgress();
		}
	}

	getLearnedLetters(language: 'ar' | 'ru'): string[] {
		const progress = this.getProgress(language);
		return [...progress.learnedLetters];
	}

	resetProgress(language: 'ar' | 'ru'): void {
		this.progress = createDefaultProgress(language);
		this.saveProgress();
	}

	clearAllProgress(): void {
		localStorage.removeItem(STORAGE_KEY);
		this.progress = null;
	}

	getProgressPercentage(language: 'ar' | 'ru', totalLetters: number): number {
		const progress = this.getProgress(language);
		if (totalLetters === 0) return 0;
		return Math.round((progress.learnedLetters.length / totalLetters) * 100);
	}

	isLetterLearned(letterId: string, language: 'ar' | 'ru'): boolean {
		const progress = this.getProgress(language);
		return progress.learnedLetters.includes(letterId);
	}
}

import type { UserProgress } from '$lib/models/user-progress';
import { createDefaultProgress, calculateProgressPercentage } from '$lib/models/user-progress';

const STORAGE_KEY_PREFIX = 'progress_';

export class ProgressTracker {
	private progress: { [key: string]: UserProgress } = {};

	constructor() {
		// Handle migration from old single storage to new multi-set structure
		this.migrateFromOldStorage();
	}

	private migrateFromOldStorage(): void {
		if (typeof localStorage !== 'undefined') {
			// Check if old single storage exists
			const oldStored = localStorage.getItem('harf-ogren-progress');
			if (oldStored) {
				try {
					const oldProgress = JSON.parse(oldStored);
					// Migrate old progress to AR (Arabic) set as default if it doesn't exist
					if (oldProgress && !localStorage.getItem('progress_ar')) {
						// Update the setId to 'ar' to match the new structure
						oldProgress.setId = 'ar';
						localStorage.setItem('progress_ar', JSON.stringify(oldProgress));
					}
					// Remove old storage key after migration
					localStorage.removeItem('harf-ogren-progress');
				} catch (error) {
					console.error('Error migrating from old storage:', error);
				}
			}
		}
	}

	private getStorageKey(setId: 'ar' | 'ru' | 'ot' | 'fa'): string {
		return `${STORAGE_KEY_PREFIX}${setId}`;
	}

	private loadProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		try {
			if (typeof localStorage !== 'undefined') {
				const storageKey = this.getStorageKey(setId);
				const stored = localStorage.getItem(storageKey);
				if (stored) {
					this.progress[setId] = JSON.parse(stored);
				} else {
					// If no stored progress exists, create default
					this.progress[setId] = createDefaultProgress(setId);
				}
			}
		} catch (error) {
			console.error('Error loading progress from localStorage:', error);
			this.progress[setId] = createDefaultProgress(setId);
		}
	}

	private saveProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		const progressToSave = this.progress[setId];
		if (progressToSave && typeof localStorage !== 'undefined') {
			try {
				const storageKey = this.getStorageKey(setId);
				localStorage.setItem(storageKey, JSON.stringify(progressToSave));
			} catch (error) {
				console.error('Error saving progress to localStorage:', error);
			}
		}
	}

	getProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): UserProgress {
		if (!this.progress[setId]) {
			this.loadProgress(setId);
		}
		return this.progress[setId];
	}

	markLetterLearned(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		const progress = this.getProgress(setId);

		if (!progress.learnedLetters.includes(letterId)) {
			progress.learnedLetters.push(letterId);
			progress.lastActive = new Date().toISOString();
			this.saveProgress(setId);
		}
	}

	unmarkLetterLearned(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		const progress = this.getProgress(setId);

		const index = progress.learnedLetters.indexOf(letterId);
		if (index > -1) {
			progress.learnedLetters.splice(index, 1);
			progress.lastActive = new Date().toISOString();
			this.saveProgress(setId);
		}
	}

	getLearnedLetters(setId: 'ar' | 'ru' | 'ot' | 'fa'): string[] {
		const progress = this.getProgress(setId);
		return [...progress.learnedLetters];
	}

	resetProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
		this.progress[setId] = createDefaultProgress(setId);
		this.saveProgress(setId);
	}

	clearAllProgress(): void {
		if (typeof localStorage !== 'undefined') {
			// Clear all progress for all sets
			const sets: Array<'ar' | 'ru' | 'ot' | 'fa'> = ['ar', 'ru', 'ot', 'fa'];
			sets.forEach(setId => {
				const storageKey = this.getStorageKey(setId);
				localStorage.removeItem(storageKey);
			});
			// Also remove old storage key if it exists
			localStorage.removeItem('harf-ogren-progress');
		}
		this.progress = {};
	}

	getProgressPercentage(setId: 'ar' | 'ru' | 'ot' | 'fa', totalLetters: number): number {
		const progress = this.getProgress(setId);
		return calculateProgressPercentage(progress, totalLetters);
	}

	isLetterLearned(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): boolean {
		const progress = this.getProgress(setId);
		return progress.learnedLetters.includes(letterId);
	}
}

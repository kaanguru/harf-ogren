import { writable } from 'svelte/store';
import type { UserProgress } from '$lib/models/user-progress';
import { ProgressTracker } from '$lib/services/progress-tracker';

const progressTracker = new ProgressTracker();

export const currentSetId = writable<'ar' | 'ru' | 'ot' | 'fa'>('ar');
export const userProgress = writable<UserProgress | null>(null);
export const isLoading = writable(false);

// Initialize progress store
currentSetId.subscribe((setId) => {
	if (setId) {
		const progress = progressTracker.getProgress(setId);
		userProgress.set(progress);
	}
});

export function markLetterLearned(letterId: string): void {
	isLoading.set(true);

	currentSetId.subscribe((setId) => {
		if (setId) {
			progressTracker.markLetterLearned(letterId, setId);
			const updatedProgress = progressTracker.getProgress(setId);
			userProgress.set(updatedProgress);
		}
		isLoading.set(false);
	})();
}

export function resetProgress(): void {
	isLoading.set(true);

	currentSetId.subscribe((setId) => {
		if (setId) {
			progressTracker.resetProgress(setId);
			const newProgress = progressTracker.getProgress(setId);
			userProgress.set(newProgress);
		}
		isLoading.set(false);
	})();
}

export function setSetId(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
	currentSetId.set(setId);
}

export function getLearnedLetters(): string[] {
	let learnedLetters: string[] = [];

	currentSetId.subscribe((setId) => {
		if (setId) {
			learnedLetters = progressTracker.getLearnedLetters(setId);
		}
	})();

	return learnedLetters;
}

export function isLetterLearned(letterId: string): boolean {
	let isLearned = false;

	currentSetId.subscribe((setId) => {
		if (setId) {
			isLearned = progressTracker.isLetterLearned(letterId, setId);
		}
	})();

	return isLearned;
}

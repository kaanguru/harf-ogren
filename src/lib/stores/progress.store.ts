import { writable } from 'svelte/store';
import type { UserProgress } from '$lib/models/user-progress';
import { ProgressTracker } from '$lib/services/progress-tracker';

const progressTracker = new ProgressTracker();

export const currentLanguage = writable<'ar' | 'ru'>('ar');
export const userProgress = writable<UserProgress | null>(null);
export const isLoading = writable(false);

// Initialize progress store
currentLanguage.subscribe((language) => {
	if (language) {
		const progress = progressTracker.getProgress(language);
		userProgress.set(progress);
	}
});

export function markLetterLearned(letterId: string): void {
	isLoading.set(true);

	currentLanguage.subscribe((language) => {
		if (language) {
			progressTracker.markLetterLearned(letterId, language);
			const updatedProgress = progressTracker.getProgress(language);
			userProgress.set(updatedProgress);
		}
		isLoading.set(false);
	})();
}

export function resetProgress(): void {
	isLoading.set(true);

	currentLanguage.subscribe((language) => {
		if (language) {
			progressTracker.resetProgress(language);
			const newProgress = progressTracker.getProgress(language);
			userProgress.set(newProgress);
		}
		isLoading.set(false);
	})();
}

export function setLanguage(language: 'ar' | 'ru'): void {
	currentLanguage.set(language);
}

export function getLearnedLetters(): string[] {
	let learnedLetters: string[] = [];

	currentLanguage.subscribe((language) => {
		if (language) {
			learnedLetters = progressTracker.getLearnedLetters(language);
		}
	})();

	return learnedLetters;
}

export function isLetterLearned(letterId: string): boolean {
	let isLearned = false;

	currentLanguage.subscribe((language) => {
		if (language) {
			isLearned = progressTracker.isLetterLearned(letterId, language);
		}
	})();

	return isLearned;
}

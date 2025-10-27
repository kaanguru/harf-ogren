import { writable, get } from 'svelte/store';
import type { UserProgress } from '$lib/models/user-progress';
import { ProgressTracker } from '$lib/services/progress-tracker';

const progressTracker = new ProgressTracker();

export const currentSetId = writable<'ar' | 'ru' | 'ot' | 'fa'>('ar');
export const userProgress = writable<UserProgress | null>(null);
export const isLoading = writable(false);

// Initialize progress store and react to set changes
currentSetId.subscribe((setId) => {
	if (setId) {
		const progress = progressTracker.getProgress(setId);
		userProgress.set(progress);
	}
});

export function markLetterLearned(letterId: string): void {
	isLoading.set(true);
	const setId = get(currentSetId);
	
	if (setId) {
		progressTracker.markLetterLearned(letterId, setId);
		const updatedProgress = progressTracker.getProgress(setId);
		userProgress.set(updatedProgress);
	}
	
	isLoading.set(false);
}

export function unmarkLetterLearned(letterId: string): void {
	isLoading.set(true);
	const setId = get(currentSetId);
	
	if (setId) {
		progressTracker.unmarkLetterLearned(letterId, setId);
		const updatedProgress = progressTracker.getProgress(setId);
		userProgress.set(updatedProgress);
	}
	
	isLoading.set(false);
}

export function resetProgress(): void {
	isLoading.set(true);
	const setId = get(currentSetId);
	
	if (setId) {
		progressTracker.resetProgress(setId);
		const newProgress = progressTracker.getProgress(setId);
		userProgress.set(newProgress);
	}
	
	isLoading.set(false);
}

export function setSetId(setId: 'ar' | 'ru' | 'ot' | 'fa'): void {
	currentSetId.set(setId);
}

export function getLearnedLetters(): string[] {
	const setId = get(currentSetId);
	return progressTracker.getLearnedLetters(setId);
}

export function isLetterLearned(letterId: string): boolean {
	const setId = get(currentSetId);
	return progressTracker.isLetterLearned(letterId, setId);
}

// Export a derived store to get learned letters for the current set
import { derived } from 'svelte/store';
export const learnedLetters = derived(
	[currentSetId],
	([$currentSetId]) => progressTracker.getLearnedLetters($currentSetId)
);

// Export a function to check if a specific letter is learned for the current set
export function checkLetterLearned(letterId: string) {
	return derived(
		[currentSetId],
		([$currentSetId]) => progressTracker.isLetterLearned(letterId, $currentSetId)
	);
}

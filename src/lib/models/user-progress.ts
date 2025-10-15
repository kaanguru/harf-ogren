export interface UserProgress {
	language: 'ar' | 'ru';
	learnedLetters: string[];
	lastActive: string;
}

export function createDefaultProgress(language: 'ar' | 'ru'): UserProgress {
	return {
		language,
		learnedLetters: [],
		lastActive: new Date().toISOString()
	};
}

export function isLetterLearned(progress: UserProgress, letterId: string): boolean {
	return progress.learnedLetters.includes(letterId);
}

export function calculateProgressPercentage(progress: UserProgress, totalLetters: number): number {
	if (totalLetters === 0) return 0;
	return Math.round((progress.learnedLetters.length / totalLetters) * 100);
}

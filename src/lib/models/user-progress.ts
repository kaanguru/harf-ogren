export interface UserProgress {
	setId: 'ar' | 'ru' | 'ot' | 'fa';
	learnedLetters: string[];
	lastActive: string;
}

export function createDefaultProgress(setId: 'ar' | 'ru' | 'ot' | 'fa'): UserProgress {
	return {
		setId,
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

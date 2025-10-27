import {
	getAlphabet,
	getLetter,
	getAudioFileName,
	type Letter
} from '$lib/models/alphabet-definition';
import { AudioService } from '$lib/services/audio-service';

export interface QuizQuestion {
	correctLetter: Letter;
	options: Letter[];
	audioFile: string;
}

export class QuizService {
	private audioService: AudioService;

	constructor() {
		this.audioService = AudioService.getInstance();
	}

	generateQuestion(
		setId: 'ar' | 'ru' | 'ot' | 'fa',
		difficulty: 'easy' | 'medium' | 'hard' = 'medium'
	): QuizQuestion {
		const alphabet = getAlphabet(setId);
		const allLetters = alphabet.letters;

		// Get correct letter
		const correctLetter = this.getRandomLetter(allLetters);

		// Get wrong options (distractors)
		const wrongOptions = this.getWrongOptions(allLetters, correctLetter, difficulty);

		// Combine options and shuffle
		const options = this.shuffleArray([correctLetter, ...wrongOptions]);

		return {
			correctLetter,
			options,
			audioFile: `/audio/letters/${setId}/${getAudioFileName(setId, correctLetter.id)}.ogg`
		};
	}

	private getRandomLetter(letters: Letter[]): Letter {
		const randomIndex = Math.floor(Math.random() * letters.length);
		return letters[randomIndex];
	}

	private getWrongOptions(
		allLetters: Letter[],
		correctLetter: Letter,
		difficulty: 'easy' | 'medium' | 'hard'
	): Letter[] {
		const numOptions = this.getNumberOfOptions(difficulty);
		const maxWrongOptions = numOptions - 1; // Subtract 1 for the correct answer
		const wrongLetters = allLetters.filter((letter) => letter.id !== correctLetter.id);
		
		// Ensure we don't request more options than available
		const requiredWrongOptions = Math.min(maxWrongOptions, wrongLetters.length);

		const selectedWrongLetters: Letter[] = [];

		while (selectedWrongLetters.length < requiredWrongOptions && wrongLetters.length > 0) {
			const randomIndex = Math.floor(Math.random() * wrongLetters.length);
			selectedWrongLetters.push(wrongLetters[randomIndex]);
			wrongLetters.splice(randomIndex, 1);
		}

		return selectedWrongLetters;
	}

	private getNumberOfOptions(difficulty: 'easy' | 'medium' | 'hard'): number {
		switch (difficulty) {
			case 'easy':
				return 3;
			case 'medium':
				return 4;
			case 'hard':
				return 6;
			default:
				return 4;
		}
	}

	private shuffleArray<T>(array: T[]): T[] {
		// Create a copy of the array to avoid mutating the original
		const result = [...array];
		
		// Fisher-Yates shuffle algorithm
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		
		return result;
	}

	async playQuestionAudio(setId: 'ar' | 'ru' | 'ot' | 'fa', letterId: string): Promise<void> {
		await this.audioService.playLetterSound(letterId, setId);
	}

	stopQuestionAudio(): void {
		this.audioService.stopAll();
	}

	validateAnswer(question: QuizQuestion, selectedLetterId: string): boolean {
		return question.correctLetter.id === selectedLetterId;
	}

	getNextQuestion(
		setId: 'ar' | 'ru' | 'ot' | 'fa',
		difficulty: 'easy' | 'medium' | 'hard' = 'medium'
	): QuizQuestion {
		return this.generateQuestion(setId, difficulty);
	}
}

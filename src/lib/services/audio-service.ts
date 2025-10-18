export class AudioService {
	private audioContext: AudioContext | null = null;
	private volume = 1;
	private audioContextInitialized = false;
	private currentAudio: HTMLAudioElement | null = null;

	private async ensureAudioContext(): Promise<void> {
		if (this.audioContextInitialized) return;

		try {
			this.audioContext = new (window.AudioContext ||
				(window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
			this.audioContextInitialized = true;
		} catch (error) {
			console.error('AudioContext not supported:', error);
			this.audioContextInitialized = true; // Mark as initialized even if failed
		}
	}

	async playLetterSound(letterId: string, language: 'ar' | 'ru'): Promise<void> {
		// Import the mapping function dynamically to avoid circular dependencies
		const { getAudioFileName } = await import('$lib/models/alphabet-definition');
		const audioFileName = getAudioFileName(language, letterId);
		const audioPath = `/audio/letters/${language}/${audioFileName}.mp3`;

		try {
			await this.playAudio(audioPath);
		} catch {
			console.warn(`Audio file not found: ${audioPath}. Using fallback.`);
			// Fallback: Use Web Speech API for pronunciation
			await this.speakLetter(letterId, language);
		}
	}

	private async playAudio(url: string): Promise<void> {
		// Ensure AudioContext is initialized before playing audio
		await this.ensureAudioContext();

		return new Promise((resolve, reject) => {
			// Stop any currently playing audio
			this.stopAudio();

			const audio = new Audio(url);
			this.currentAudio = audio;
			audio.volume = this.volume;

			audio.addEventListener('loadeddata', () => {
				audio.play().then(resolve).catch(reject);
			});

			audio.addEventListener('ended', () => {
				this.currentAudio = null;
			});

			audio.addEventListener('error', () => {
				this.currentAudio = null;
				reject(new Error(`Failed to load audio: ${url}`));
			});

			// Preload the audio
			audio.load();
		});
	}

	private async speakLetter(letterId: string, language: 'ar' | 'ru'): Promise<void> {
		// Ensure AudioContext is initialized before using speech synthesis
		await this.ensureAudioContext();

		if (!('speechSynthesis' in window)) {
			console.warn('Speech synthesis not supported');
			return;
		}

		return new Promise((resolve) => {
			const utterance = new SpeechSynthesisUtterance();

			// Set language and text based on letter
			if (language === 'ar') {
				utterance.lang = 'ar-SA';
				utterance.text = this.getArabicLetterName(letterId);
			} else {
				utterance.lang = 'ru-RU';
				utterance.text = this.getRussianLetterName(letterId);
			}

			utterance.volume = this.volume;
			utterance.rate = 0.8;
			utterance.pitch = 1;

			utterance.onend = () => resolve();
			utterance.onerror = () => resolve(); // Don't reject on error

			speechSynthesis.speak(utterance);
		});
	}

	private getArabicLetterName(letterId: string): string {
		const names: Record<string, string> = {
			alif: 'ألف',
			ba: 'باء',
			ta: 'تاء',
			tha: 'ثاء',
			jim: 'جيم',
			ha: 'حاء',
			kha: 'خاء',
			dal: 'دال',
			dhal: 'ذال',
			ra: 'راء',
			zay: 'زاي',
			sin: 'سين',
			shin: 'شين',
			sad: 'صاد',
			dad: 'ضاد',
			taa: 'طاء',
			zaa: 'ظاء',
			ayn: 'عين',
			ghayn: 'غين',
			fa: 'فاء',
			qaf: 'قاف',
			kaf: 'كاف',
			lam: 'لام',
			mim: 'ميم',
			nun: 'نون',
			haa: 'هاء',
			waw: 'واو',
			ya: 'ياء'
		};
		return names[letterId] || letterId;
	}

	private getRussianLetterName(letterId: string): string {
		const names: Record<string, string> = {
			a: 'а',
			b: 'бэ',
			v: 'вэ',
			g: 'гэ',
			d: 'дэ',
			ye: 'е',
			yo: 'ё',
			zh: 'жэ',
			z: 'зэ',
			i: 'и',
			'y-short': 'и краткое',
			k: 'ка',
			l: 'эль',
			m: 'эм',
			n: 'эн',
			o: 'о',
			p: 'пэ',
			r: 'эр',
			s: 'эс',
			t: 'тэ',
			u: 'у',
			f: 'эф',
			kh: 'ха',
			ts: 'цэ',
			ch: 'че',
			sh: 'ша',
			shch: 'ща',
			'hard-sign': 'твёрдый знак',
			y: 'ы',
			'soft-sign': 'мягкий знак',
			e: 'э',
			yu: 'ю',
			ya: 'я'
		};
		return names[letterId] || letterId;
	}

	setVolume(level: number): void {
		this.volume = Math.max(0, Math.min(1, level));
	}

	getVolume(): number {
		return this.volume;
	}

	stopAudio(): void {
		if (this.currentAudio) {
			this.currentAudio.pause();
			this.currentAudio.currentTime = 0;
			this.currentAudio = null;
		}
	}

	stopAll(): void {
		this.stopAudio();
		speechSynthesis.cancel();
	}
}

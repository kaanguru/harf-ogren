export class AudioService {
	private audioContext: AudioContext | null = null;
	private volume = 1;
	private audioContextInitialized = false;
	private currentAudio: HTMLAudioElement | null = null;

	// Singleton instance
	private static instance: AudioService;

	// Private constructor to prevent direct instantiation
	private constructor() {}

	// Method to get the singleton instance
	public static getInstance(): AudioService {
		if (!AudioService.instance) {
			AudioService.instance = new AudioService();
		}
		return AudioService.instance;
	}

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

	async playLetterSound(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): Promise<void> {
		// Import the mapping function dynamically to avoid circular dependencies
		const { getAudioFileName } = await import('$lib/models/alphabet-definition');
		const audioFileName = getAudioFileName(setId, letterId);
		const audioPath = `/audio/letters/${setId}/${audioFileName}.ogg`;

		try {
			await this.playAudio(audioPath);
		} catch {
			console.warn(`Audio file not found: ${audioPath}.`);
			
			// For Ottoman Turkish, try Arabic audio as fallback for shared letters
			if (setId === 'ot') {
				const arabicAudioPath = await this.getArabicAudioFallbackPath(letterId);
				if (arabicAudioPath) {
					try {
						await this.playAudio(arabicAudioPath);
						return;
					} catch {
						console.warn(`Arabic fallback audio not found: ${arabicAudioPath}. Using speech synthesis.`);
					}
				}
			}
			
			// Fallback: Use Web Speech API for pronunciation
			await this.speakLetter(letterId, setId);
		}
	}
	
	private async getArabicAudioFallbackPath(letterId: string): Promise<string | null> {
		// Map Ottoman Turkish letter IDs to their Arabic equivalent IDs to find matching audio files
		const otToArabicMap: Record<string, string> = {
			'alef': 'alif',   // alef -> alif
			'beh': 'ba',      // beh -> ba
			'te': 'ta',       // te -> ta
			'se': 'tha',      // se -> tha
			'jeem': 'jim',    // jeem -> jim
			'hah': 'ha',      // hah -> ha
			'khah': 'kha',    // khah -> kha
			'dal': 'dal',     // dal -> dal
			'dhal': 'dhal',   // dhal -> dhal
			're': 'ra',       // re -> ra
			'ze': 'zay',      // ze -> zay
			'seen': 'sin',    // seen -> sin
			'sheen': 'shin',  // sheen -> shin
			'sad': 'sad',     // sad -> sad
			'dad': 'dad',     // dad -> dad
			'tah': 'taa',     // tah -> taa
			'zah': 'zaa',     // zah -> zaa
			'ain': 'ayn',     // ain -> ayn
			'ghain': 'ghayn', // ghain -> ghayn
			'fe': 'fa',       // fe -> fa
			'qaf': 'qaf',     // qaf -> qaf
			'kaf': 'kaf',     // kaf -> kaf
			'lam': 'lam',     // lam -> lam
			'mim': 'mim',     // mim -> mim
			'nun': 'nun',     // nun -> nun
			'vav': 'waw',     // vav -> waw
			'he': 'haa',      // he -> haa
			'ye': 'ya'        // ye -> ya
		};

		const arabicLetterId = otToArabicMap[letterId];
		if (arabicLetterId) {
			const { getAudioFileName } = await import('$lib/models/alphabet-definition');
			const arabicAudioFileName = getAudioFileName('ar', arabicLetterId);
			return `/audio/letters/ar/${arabicAudioFileName}.ogg`;
		}
		
		return null;
	}

	private async playAudio(url: string): Promise<void> {
		// Ensure AudioContext is initialized before playing audio
		await this.ensureAudioContext();

		return new Promise((resolve, reject) => {
			try {
				// Stop any currently playing audio
				this.stopAudio();

				const audio = new Audio(url);
				this.currentAudio = audio;
				audio.volume = this.volume;

				audio.addEventListener('loadeddata', () => {
					audio.play().then(resolve).catch(reject);
				});

				audio.addEventListener('ended', () => {
					// Only clear currentAudio if it's the same instance we started
					if (this.currentAudio === audio) {
						this.currentAudio = null;
					}
				});

				audio.addEventListener('error', () => {
					// Only clear currentAudio if it's the same instance we started
					if (this.currentAudio === audio) {
						this.currentAudio = null;
					}
					reject(new Error(`Failed to load audio: ${url}`));
				});

				// Preload the audio
				audio.load();
			} catch (error) {
				this.currentAudio = null;
				reject(new Error(`Failed to create audio element: ${error instanceof Error ? error.message : 'Unknown error'}`));
			}
		});
	}

	private async speakLetter(letterId: string, setId: 'ar' | 'ru' | 'ot' | 'fa'): Promise<void> {
		// Ensure AudioContext is initialized before using speech synthesis
		await this.ensureAudioContext();

		if (!('speechSynthesis' in window)) {
			console.warn('Speech synthesis not supported');
			return;
		}

		return new Promise((resolve, reject) => {
			try {
				const utterance = new SpeechSynthesisUtterance();

				// Set language and text based on letter
				if (setId === 'ar' || setId === 'ot') {
					// Arabic and Ottoman Turkish both use Arabic script and similar pronunciation
					utterance.lang = 'ar-SA';
					utterance.text = this.getArabicLetterName(letterId);
				} else if (setId === 'fa') {
					utterance.lang = 'fa-IR';
					utterance.text = this.getPersianLetterName(letterId);
				} else {
					// Russian
					utterance.lang = 'ru-RU';
					utterance.text = this.getRussianLetterName(letterId);
				}

				utterance.volume = this.volume;
				utterance.rate = 0.8;
				utterance.pitch = 1;

				utterance.onend = () => resolve();
				utterance.onerror = (event) => {
					console.warn('Speech synthesis error:', event);
					resolve(); // Don't reject on error, continue execution
				};

				speechSynthesis.speak(utterance);
			} catch (error) {
				console.warn('Error during speech synthesis:', error);
				resolve(); // Continue execution even if speech fails
			}
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

	private getPersianLetterName(letterId: string): string {
		const names: Record<string, string> = {
			alef: 'الف',
			beh: 'به',
			pe: 'پ',
			te: 'ت',
			se: 'ث',
			jim: 'جیم',
			che: 'چ',
			he: 'ه',
			khe: 'خ',
			dal: 'دال',
			zal: 'ذال',
			re: 'ر',
			ze: 'ز',
			jeh: 'ژ',
			sin: 'سین',
			shin: 'شین',
			sad: 'صاد',
			zad: 'ضاد',
			ta: 'طاء',
			za: 'ظاء',
			ein: 'عین',
			ghain: 'غین',
			fe: 'ف',
			qaf: 'قاف',
			kaf: 'کاف',
			gaf: 'گاف',
			lam: 'لام',
			mim: 'میم',
			nun: 'نون',
			vav: 'واو',
			he2: 'ه',
			ye: 'ی'
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

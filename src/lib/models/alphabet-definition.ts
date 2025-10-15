export interface Letter {
	id: string;
	symbol: string;
	name: string;
	pronunciation?: string; // Turkish pronunciation description
}

export interface Alphabet {
	id: 'ar' | 'ru';
	name: string;
	letters: Letter[];
}

export const alphabets: Record<'ar' | 'ru', Alphabet> = {
	ar: {
		id: 'ar',
		name: 'Arapça',
		letters: [
			{ id: 'alif', symbol: 'ا', name: 'Elif' },
			{ id: 'ba', symbol: 'ب', name: 'Be' },
			{ id: 'ta', symbol: 'ت', name: 'Te' },
			{ id: 'tha', symbol: 'ث', name: 'Se' },
			{ id: 'jim', symbol: 'ج', name: 'Cim' },
			{ id: 'ha', symbol: 'ح', name: 'Ha' },
			{ id: 'kha', symbol: 'خ', name: 'Hı' },
			{ id: 'dal', symbol: 'د', name: 'Dal' },
			{ id: 'dhal', symbol: 'ذ', name: 'Zel' },
			{ id: 'ra', symbol: 'ر', name: 'Re' },
			{ id: 'zay', symbol: 'ز', name: 'Ze' },
			{ id: 'sin', symbol: 'س', name: 'Sin' },
			{ id: 'shin', symbol: 'ش', name: 'Şin' },
			{ id: 'sad', symbol: 'ص', name: 'Sad' },
			{ id: 'dad', symbol: 'ض', name: 'Dad' },
			{ id: 'taa', symbol: 'ط', name: 'Tı' },
			{ id: 'zaa', symbol: 'ظ', name: 'Zı' },
			{ id: 'ayn', symbol: 'ع', name: 'Ayn' },
			{ id: 'ghayn', symbol: 'غ', name: 'Gayn' },
			{ id: 'fa', symbol: 'ف', name: 'Fe' },
			{ id: 'qaf', symbol: 'ق', name: 'Kaf' },
			{ id: 'kaf', symbol: 'ك', name: 'Kef' },
			{ id: 'lam', symbol: 'ل', name: 'Lam' },
			{ id: 'mim', symbol: 'م', name: 'Mim' },
			{ id: 'nun', symbol: 'ن', name: 'Nun' },
			{ id: 'haa', symbol: 'ه', name: 'He' },
			{ id: 'waw', symbol: 'و', name: 'Vav' },
			{ id: 'ya', symbol: 'ي', name: 'Ye' }
		]
	},
	ru: {
		id: 'ru',
		name: 'Rusça',
		letters: [
			{ id: 'a', symbol: 'А', name: 'A' },
			{ id: 'b', symbol: 'Б', name: 'Be' },
			{ id: 'v', symbol: 'В', name: 'Ve' },
			{ id: 'g', symbol: 'Г', name: 'Ge' },
			{ id: 'd', symbol: 'Д', name: 'De' },
			{ id: 'ye', symbol: 'Е', name: 'Ye' },
			{ id: 'yo', symbol: 'Ё', name: 'Yo' },
			{ id: 'zh', symbol: 'Ж', name: 'Je' },
			{ id: 'z', symbol: 'З', name: 'Ze' },
			{ id: 'i', symbol: 'И', name: 'İ' },
			{ id: 'y-short', symbol: 'Й', name: 'Y' },
			{ id: 'k', symbol: 'К', name: 'Ka' },
			{ id: 'l', symbol: 'Л', name: 'El' },
			{ id: 'm', symbol: 'М', name: 'Em' },
			{ id: 'n', symbol: 'Н', name: 'En' },
			{ id: 'o', symbol: 'О', name: 'O' },
			{ id: 'p', symbol: 'П', name: 'Pe' },
			{ id: 'r', symbol: 'Р', name: 'Er' },
			{ id: 's', symbol: 'С', name: 'Es' },
			{ id: 't', symbol: 'Т', name: 'Te' },
			{ id: 'u', symbol: 'У', name: 'U' },
			{ id: 'f', symbol: 'Ф', name: 'Ef' },
			{ id: 'kh', symbol: 'Х', name: 'Ha' },
			{ id: 'ts', symbol: 'Ц', name: 'Tse' },
			{ id: 'ch', symbol: 'Ч', name: 'Çe' },
			{ id: 'sh', symbol: 'Ш', name: 'Şa' },
			{ id: 'shch', symbol: 'Щ', name: 'Şça' },
			{ id: 'hard-sign', symbol: 'Ъ', name: 'Sert İşaret' },
			{ id: 'y', symbol: 'Ы', name: 'I' },
			{ id: 'soft-sign', symbol: 'Ь', name: 'Yumuşak İşaret' },
			{ id: 'e', symbol: 'Э', name: 'E' },
			{ id: 'yu', symbol: 'Ю', name: 'Yu' },
			{ id: 'ya', symbol: 'Я', name: 'Ya' }
		]
	}
};

export function getAlphabet(language: 'ar' | 'ru'): Alphabet {
	return alphabets[language];
}

export function getLetter(language: 'ar' | 'ru', letterId: string): Letter | undefined {
	return alphabets[language].letters.find((letter) => letter.id === letterId);
}

export function getTotalLetters(language: 'ar' | 'ru'): number {
	return alphabets[language].letters.length;
}

export function getAudioFileName(language: 'ar' | 'ru', letterId: string): string {
	const audioFileMap: Record<string, Record<string, string>> = {
		ar: {
			alif: '001-alif',
			ba: '002-ba',
			ta: '003-taa',
			tha: '004-tha',
			jim: '005-jeem',
			ha: '006-haa',
			kha: '007-khaa',
			dal: '008-dal',
			dhal: '009-dhal',
			ra: '010-raa',
			zay: '011-jaa',
			sin: '012-seen',
			shin: '013-sheen',
			sad: '014-saad',
			dad: '015-dhaad',
			taa: '016-toa',
			zaa: '017-dhaa',
			ayn: '018-ain',
			ghayn: '019-ghain',
			fa: '020-faa',
			qaf: '021-qaaf',
			kaf: '022-kaaf',
			lam: '023-laam',
			mim: '024-meem',
			nun: '025-noon',
			haa: '027-ha',
			waw: '026-waw',
			ya: '029-yaa'
		},
		ru: {
			// Russian letters would use simple IDs since they don't have numeric prefixes
			a: 'a',
			b: 'b',
			v: 'v',
			g: 'g',
			d: 'd',
			ye: 'ye',
			yo: 'yo',
			zh: 'zh',
			z: 'z',
			i: 'i',
			'y-short': 'y-short',
			k: 'k',
			l: 'l',
			m: 'm',
			n: 'n',
			o: 'o',
			p: 'p',
			r: 'r',
			s: 's',
			t: 't',
			u: 'u',
			f: 'f',
			kh: 'kh',
			ts: 'ts',
			ch: 'ch',
			sh: 'sh',
			shch: 'shch',
			'hard-sign': 'hard-sign',
			y: 'y',
			'soft-sign': 'soft-sign',
			e: 'e',
			yu: 'yu',
			ya: 'ya'
		}
	};

	return audioFileMap[language]?.[letterId] || letterId;
}

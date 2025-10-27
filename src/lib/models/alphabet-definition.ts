export interface Letter {
	id: string;
	symbol: string;
	name: string;
	pronunciation?: string; // Turkish pronunciation description
}

export interface Alphabet {
	id: 'ar' | 'ru' | 'ot' | 'fa';
	name: string;
	letters: Letter[];
}

export const alphabets: Record<'ar' | 'ru' | 'ot' | 'fa', Alphabet> = {
	ar: {
		id: 'ar',
		name: 'Arapça',
		letters: [
			{ id: 'alif', symbol: 'ا', name: 'Elif' },
			{ id: 'ba', symbol: 'ب', name: 'Be' },
			{ id: 'ta', symbol: 'ت', name: 'Te' },
			{ id: 'tha', symbol: 'ث', name: 'TSe' },
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
	},
	ot: {
		id: 'ot',
		name: 'Osmanlıca',
		letters: [
			// Ottoman Turkish letters
			{ id: 'alef', symbol: 'ا', name: 'Alef' },
			{ id: 'beh', symbol: 'ب', name: 'Beh' },
			{ id: 'pe', symbol: 'پ', name: 'Pe' },
			{ id: 'te', symbol: 'ت', name: 'Te' },
			{ id: 'se', symbol: 'ث', name: 'Se' },
			{ id: 'jeem', symbol: 'ج', name: 'Cim' },
			{ id: 'hah', symbol: 'ح', name: 'Hah' },
			{ id: 'khah', symbol: 'خ', name: 'Hı' },
			{ id: 'dal', symbol: 'د', name: 'Dal' },
			{ id: 'dhal', symbol: 'ذ', name: 'Zel' },
			{ id: 're', symbol: 'ر', name: 'Re' },
			{ id: 'ze', symbol: 'ز', name: 'Ze' },
			{ id: 'je', symbol: 'ژ', name: 'Je' },
			{ id: 'seen', symbol: 'س', name: 'Sin' },
			{ id: 'sheen', symbol: 'ش', name: 'Şin' },
			{ id: 'sad', symbol: 'ص', name: 'Sad' },
			{ id: 'dad', symbol: 'ض', name: 'Dad' },
			{ id: 'tah', symbol: 'ط', name: 'Tah' },
			{ id: 'zah', symbol: 'ظ', name: 'Zah' },
			{ id: 'ain', symbol: 'ع', name: 'Ayn' },
			{ id: 'ghain', symbol: 'غ', name: 'Gayn' },
			{ id: 'fe', symbol: 'ف', name: 'Fe' },
			{ id: 'qaf', symbol: 'ق', name: 'Kaf' },
			{ id: 'kaf', symbol: 'ك', name: 'Kef' },
			{ id: 'gaf', symbol: 'گ', name: 'Gaf' },
			{ id: 'lam', symbol: 'ل', name: 'Lam' },
			{ id: 'mim', symbol: 'م', name: 'Mim' },
			{ id: 'nun', symbol: 'ن', name: 'Nun' },
			{ id: 'vav', symbol: 'و', name: 'Vav' },
			{ id: 'he', symbol: 'ه', name: 'He' },
			{ id: 'ye', symbol: 'ي', name: 'Ye' },
			{ id: 'che', symbol: 'چ', name: 'Çe' },
			{ id: 'she', symbol: 'ش', name: 'Şe' }
		]
	},
	fa: {
		id: 'fa',
		name: 'Farsça',
		letters: [
			// Persian letters
			{ id: 'alef', symbol: 'ا', name: 'Alef' },
			{ id: 'beh', symbol: 'ب', name: 'Be' },
			{ id: 'pe', symbol: 'پ', name: 'Pe' },
			{ id: 'te', symbol: 'ت', name: 'Te' },
			{ id: 'se', symbol: 'ث', name: 'Se' },
			{ id: 'jim', symbol: 'ج', name: 'Jim' },
			{ id: 'che', symbol: 'چ', name: 'Çe' },
			{ id: 'he', symbol: 'ح', name: 'He' },
			{ id: 'khe', symbol: 'خ', name: 'kHe' }, // Khe is pronounced like 'khe' in Persian
			{ id: 'dal', symbol: 'د', name: 'Dal' },
			{ id: 'zal', symbol: 'ذ', name: 'Zal' },
			{ id: 're', symbol: 'ر', name: 'Re' },
			{ id: 'ze', symbol: 'ز', name: 'Ze' },
			{ id: 'jeh', symbol: 'ژ', name: 'Je' },
			{ id: 'sin', symbol: 'س', name: 'Sin' },
			{ id: 'shin', symbol: 'ش', name: 'Şin' },
			{ id: 'sad', symbol: 'ص', name: 'Sad' },
			{ id: 'zad', symbol: 'ض', name: 'Zad' },
			{ id: 'ta', symbol: 'ط', name: 'Ta' },
			{ id: 'za', symbol: 'ظ', name: 'Za' },
			{ id: 'ein', symbol: 'ع', name: 'Ein' },
			{ id: 'ghain', symbol: 'غ', name: 'Geyn' },
			{ id: 'fe', symbol: 'ف', name: 'Fe' },
			{ id: 'qaf', symbol: 'ق', name: 'Kaf' },
			{ id: 'kaf', symbol: 'ک', name: 'Kaf' }, // Persian kaf
			{ id: 'gaf', symbol: 'گ', name: 'Gaf' },
			{ id: 'lam', symbol: 'ل', name: 'Lam' },
			{ id: 'mim', symbol: 'م', name: 'Mim' },
			{ id: 'nun', symbol: 'ن', name: 'Nun' },
			{ id: 'vav', symbol: 'و', name: 'Vav' },
			{ id: 'he2', symbol: 'ه', name: 'He' },
			{ id: 'ye', symbol: 'ی', name: 'Ye' } // Persian ye
		]
	}
};

export function getAlphabet(setId: 'ar' | 'ru' | 'ot' | 'fa'): Alphabet {
	return alphabets[setId];
}

export function getLetter(setId: 'ar' | 'ru' | 'ot' | 'fa', letterId: string): Letter | undefined {
	return alphabets[setId].letters.find((letter) => letter.id === letterId);
}

export function getTotalLetters(setId: 'ar' | 'ru' | 'ot' | 'fa'): number {
	return alphabets[setId].letters.length;
}

export function getAudioFileName(setId: 'ar' | 'ru' | 'ot' | 'fa', letterId: string): string {
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
			// Russian letters use numeric prefixes like 01-a, 02-b, etc.
			a: '01-a',
			b: '02-b',
			v: '03-v',
			g: '04-g',
			d: '05-d',
			ye: '06-e',
			yo: '07-yo',
			zh: '08-zh',
			z: '09-z',
			i: '10-i',
			'y-short': '11-y-short',
			k: '12-k',
			l: '13-l',
			m: '14-m',
			n: '15-n',
			o: '16-o',
			p: '17-p',
			r: '18-r',
			s: '19-s',
			t: '20-t',
			u: '21-u',
			f: '22-f',
			kh: '23-h',
			ts: '24-ts',
			ch: '25-ch',
			sh: '26-sh',
			shch: '27-shch',
			'hard-sign': '28-hard-sign',
			y: '29-y',
			'soft-sign': '30-soft-sighn',
			e: '31-e',
			yu: '32-yu',
			ya: '33-ya'
		},
		ot: {
			// Ottoman Turkish letters use numeric prefixes like 01-alef, 02-beh, etc.
			alef: '01-alef',
			beh: '02-beh',
			pe: '03-pe',
			te: '04-te',
			se: '05-se',
			jeem: '06-jeem',
			hah: '07-hah',
			khah: '08-khah',
			dal: '09-dal',
			dhal: '10-dhal',
			re: '11-re',
			ze: '12-ze',
			je: '13-je',
			seen: '14-seen',
			sheen: '15-sheen',
			sad: '16-sad',
			dad: '17-dad',
			tah: '18-tah',
			zah: '19-zah',
			ain: '20-ain',
			ghain: '21-ghain',
			fe: '22-fe',
			qaf: '23-qaf',
			kaf: '24-kaf',
			gaf: '25-gaf',
			lam: '26-lam',
			mim: '27-mim',
			nun: '28-nun',
			vav: '29-vav',
			he: '30-he',
			ye: '31-ye',
			che: '32-che',
			she: '33-she'
		},
		fa: {
			// Persian letters use numeric prefixes like 01-alef, 02-beh, etc.
			alef: '01-alef',
			beh: '02-be',
			pe: '03-pe',
			te: '04-te',
			se: '05-se',
			jim: '06-jim',
			che: '07-che',
			he: '08-he',
			khe: '09-khe',
			dal: '10-dal',
			zal: '11-zal',
			re: '12-re',
			ze: '13-ze',
			jeh: '14-zhe',
			sin: '15-sin',
			shin: '16-shin',
			sad: '17-sad',
			zad: '18-zad',
			ta: '19-ta',
			za: '20-za',
			ein: '21-ein',
			ghain: '22-ghin',
			fe: '23-fe',
			qaf: '24-qāf',
			kaf: '25-kāf',
			gaf: '26-gāf',
			lam: '27-lam',
			mim: '28-mīm',
			nun: '29-nūn',
			vav: '30-vāv',
			he2: '31-he',
			ye: '32-ye'
		}
	};

	return audioFileMap[setId]?.[letterId] || letterId;
}

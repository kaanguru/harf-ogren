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
			{ id: 'y', symbol: 'Й', name: 'Y' },
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

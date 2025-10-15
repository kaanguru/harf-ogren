// Turkish UI Text Constants
export const UI_TEXT = {
	// App Title
	appTitle: 'Harf Öğren',
	appDescription: 'Arapça ve Rusça harfleri öğrenin',

	// Navigation
	home: 'Ana Sayfa',
	learn: 'Öğren',
	progress: 'İlerleme',

	// Language Selection
	selectLanguage: 'Dil Seçin',
	arabic: 'Arapça',
	russian: 'Rusça',
	startLearning: 'Öğrenmeye Başla',

	// Learning Interface
	letters: 'Harfler',
	clickToHear: 'Dinlemek için tıklayın',
	learned: 'Öğrenildi',
	notLearned: 'Öğrenilmedi',
	markAsLearned: 'Öğrenildi olarak işaretle',
	unmark: 'İşareti kaldır',

	// Progress
	progressTitle: 'İlerlemeniz',
	totalLetters: 'Toplam Harf',
	learnedLetters: 'Öğrenilen Harf',
	progressPercentage: 'İlerleme',
	resetProgress: 'İlerlemeyi Sıfırla',
	resetConfirm: 'İlerlemenizi sıfırlamak istediğinizden emin misiniz?',

	// Actions
	playSound: 'Sesi Çal',
	back: 'Geri',
	continue: 'Devam Et',

	// Status Messages
	loading: 'Yükleniyor...',
	saving: 'Kaydediliyor...',
	saved: 'Kaydedildi',

	// Errors
	audioError: 'Ses çalınamadı',
	networkError: 'Bağlantı hatası',
	unknownError: 'Bilinmeyen hata'
} as const;

export const COLORS = {
	primary: '#3B82F6',
	secondary: '#6366F1',
	success: '#10B981',
	warning: '#F59E0B',
	error: '#EF4444',
	background: '#F9FAFB',
	surface: '#FFFFFF',
	text: '#1F2937'
} as const;

export const SIZES = {
	borderRadius: '8px',
	spacing: {
		xs: '4px',
		sm: '8px',
		md: '16px',
		lg: '24px',
		xl: '32px'
	}
} as const;

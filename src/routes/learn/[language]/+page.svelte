<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentLanguage, userProgress } from '$lib/stores/progress.store';
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import LetterGrid from '$lib/components/LetterGrid.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import { UI_TEXT } from '$lib/utils/constants';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { AudioService } from '$lib/services/audio-service';

	let language: 'ar' | 'ru' = 'ar';

	$: {
		const params = $page.params;
		if (params.language === 'ar' || params.language === 'ru') {
			language = params.language;
			currentLanguage.set(language);
		} else {
			// Invalid language parameter, redirect to home
			goto('/');
		}
	}

	function goBack() {
		goto('/');
	}

	function goToQuiz() {
		// Stop any currently playing audio
		const audioService = AudioService.getInstance();
		audioService.stopAll();
		goto('/quiz/' + language);
	}

	$: alphabet = getAlphabet(language);
</script>

<PageLayout
	title={`${alphabet.name}${UI_TEXT.letters}`}
	onBack={goBack}
	rightContent="quiz-start"
	onQuizStart={goToQuiz}
	onDifficultyChange={undefined}
	hasSidebar={true}
>
	<div slot="sidebar">
		<ProgressIndicator {language} />

		<!-- Instructions -->
		<div class="mt-6 rounded-lg border border-blue-200 bg-sky-50 p-4">
			<h3 class="mb-2 text-sm font-semibold text-blue-800">Nasıl Kullanılır?</h3>
			<ul class="space-y-1 text-sm text-sky-700">
				<li>• Harfe tıklayarak sesini dinleyin</li>
				<li>• Öğrendiğiniz harfler mavi olarak işaretlenecek</li>
				<li>• İlerlemeniz otomatik olarak kaydedilir</li>
			</ul>
		</div>
	</div>

	<div slot="main">
		<LetterGrid {language} />
	</div>
</PageLayout>

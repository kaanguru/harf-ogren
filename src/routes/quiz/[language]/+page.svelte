<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentLanguage } from '$lib/stores/progress.store';
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import Quiz from '$lib/components/Quiz.svelte';
	import { UI_TEXT } from '$lib/utils/constants';
	import PageLayout from '$lib/components/PageLayout.svelte';

	let language: 'ar' | 'ru' = 'ar';
	let difficulty: 'easy' | 'medium' | 'hard' = 'medium';

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
		goto('/learn/' + language);
	}

	function setDifficulty(newDifficulty: 'easy' | 'medium' | 'hard') {
		difficulty = newDifficulty;
	}

	$: alphabet = getAlphabet(language);
</script>

<PageLayout
	title={`${alphabet.name} Quiz`}
	onBack={goBack}
	rightContent="difficulty-selector"
	{difficulty}
	onDifficultyChange={setDifficulty}
	onQuizStart={undefined}
	hasSidebar={false}
>
	<div slot="main">
		<Quiz {language} {difficulty} />
	</div>
</PageLayout>

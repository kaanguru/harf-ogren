<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentSetId } from '$lib/stores/progress.store';
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import Quiz from '$lib/components/Quiz.svelte';
	import { UI_TEXT } from '$lib/utils/constants';
	import PageLayout from '$lib/components/PageLayout.svelte';

	let setId: 'ar' | 'ru' | 'ot' | 'fa' = 'ar';
	let difficulty: 'easy' | 'medium' | 'hard' = 'medium';

	$: {
		const params = $page.params;
		if (
			params.setId === 'ar' ||
			params.setId === 'ru' ||
			params.setId === 'ot' ||
			params.setId === 'fa'
		) {
			setId = params.setId as 'ar' | 'ru' | 'ot' | 'fa';
			currentSetId.set(setId);
		} else {
			// Invalid setId parameter, redirect to home
			goto('/');
		}
	}

	function goBack() {
		goto('/learn/' + setId);
	}

	function setDifficulty(newDifficulty: 'easy' | 'medium' | 'hard') {
		difficulty = newDifficulty;
	}

	$: alphabet = getAlphabet(setId);
</script>

<PageLayout
	title={`${alphabet.name}`}
	onBack={goBack}
	rightContent="difficulty-selector"
	{difficulty}
	onDifficultyChange={setDifficulty}
	onQuizStart={undefined}
	hasSidebar={false}
>
	<div slot="main">
		<Quiz {setId} {difficulty} />
	</div>
</PageLayout>

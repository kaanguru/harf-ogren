<script lang="ts">
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import LetterCard from './LetterCard.svelte';
	import { currentSetId } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';

	export let setId: 'ar' | 'ru' | 'ot' | 'fa';

	$: alphabet = getAlphabet(setId);
</script>

<div class="letter-grid-container">
	<!-- <h3 class="mb-6 text-center text-2xl font-bold text-gray-800">
		{alphabet.name}
		{UI_TEXT.letters}
	</h3> -->

	<div class="letter-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each alphabet.letters as letter (letter.id)}
			<LetterCard {letter} {setId} />
		{/each}
	</div>
</div>

<style>
	.letter-grid-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	@media (max-width: 640px) {
		.letter-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}
	}
</style>

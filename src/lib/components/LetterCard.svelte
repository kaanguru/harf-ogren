<script lang="ts">
	import type { Letter } from '$lib/models/alphabet-definition';
	import { isLetterLearned } from '$lib/stores/progress.store';
	import { AudioService } from '$lib/services/audio-service';
	import { markLetterLearned } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';
	import { Volume2, CheckCircle, Circle } from 'lucide-svelte';

	export let letter: Letter;
	export let language: 'ar' | 'ru';

	// Use a singleton instance to ensure audio stops properly between letters
	const audioService = AudioService.getInstance();
	let isLoading = false;

	async function playSound() {
		isLoading = true;
		try {
			await audioService.playLetterSound(letter.id, language);
		} catch (error) {
			console.error('Failed to play audio:', error);
		} finally {
			isLoading = false;
		}
	}

	function toggleLearned() {
		if (isLetterLearned(letter.id)) {
			// For simplicity, we'll only mark as learned
			// Unmarking would require more complex logic
			return;
		}
		markLetterLearned(letter.id);
	}

	$: learned = isLetterLearned(letter.id);
</script>

<button
	type="button"
	class="letter-card focus:ring-opacity-50 relative cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
	class:bg-green-50={learned}
	class:border-green-200={learned}
	on:click={playSound}
	title="{UI_TEXT.playSound} {letter.name}"
>
	<!-- Learned Indicator -->
	{#if learned}
		<div
			class="absolute top-2 right-2 h-3 w-3 rounded-full bg-sky-500"
			title={UI_TEXT.learned}
		></div>
	{/if}

	<!-- Letter Symbol -->
	<div class="mb-2 text-center text-4xl font-bold text-gray-800">
		{letter.symbol}
	</div>

	<!-- Letter Name -->
	<div class="mb-3 text-center text-sm text-gray-600">
		{letter.name}
	</div>

	<!-- Status Badge -->
	<div class="text-center">
		{#if learned}
			<CheckCircle size={16} class="text-sky-500 inline" />
		{:else}
			<Circle size={16} class="text-gray-400 inline" />
		{/if}
	</div>

	<!-- Loading Indicator -->
	{#if isLoading}
		<div
			class="bg-opacity-75 absolute inset-0 flex items-center justify-center rounded-lg bg-white"
		>
			<div
				class="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
			></div>
		</div>
	{/if}
</button>

<style>
	.letter-card {
		min-height: 120px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.letter-card:hover {
		transform: translateY(-2px);
	}

	.letter-card:active {
		transform: translateY(0px);
	}
</style>

<script lang="ts">
	import type { Letter } from '$lib/models/alphabet-definition';
	import { isLetterLearned } from '$lib/stores/progress.store';
	import { AudioService } from '$lib/services/audio-service';
	import { markLetterLearned, unmarkLetterLearned } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';
	import { Volume2, CheckCircle, Circle } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let letter: Letter;
	export let setId: 'ar' | 'ru' | 'ot' | 'fa';

	// Use a singleton instance to ensure audio stops properly between letters
	const audioService = AudioService.getInstance();
	let isLoading = false;

	// Variable to store reduced motion preference
	let prefersReducedMotion = false;

	// Reactive statement to check for reduced motion preference
	$: {
		if (typeof window !== 'undefined' && window.matchMedia) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} else {
			prefersReducedMotion = false;
		}
	}

	async function playSound() {
		isLoading = true;
		try {
			await audioService.playLetterSound(letter.id, setId);
		} catch (error) {
			console.error('Failed to play audio:', error);
		} finally {
			isLoading = false;
		}
	}

	function toggleLearned() {
		if (isLetterLearned(letter.id)) {
			// If already learned, unmark it (unlearn)
			unmarkLetterLearned(letter.id);
		} else {
			// Mark as learned
			markLetterLearned(letter.id);
		}
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
	<!-- Learned Indicator with fade animation -->
	{#if learned}
		<div
			class="absolute top-2 right-2 h-3 w-3 rounded-full bg-sky-500"
			title={UI_TEXT.learned}
			transition:fade={{ duration: prefersReducedMotion ? 0 : 200 }}
		></div>
	{/if}

	<!-- Letter Symbol -->
	<div class="mb-2 text-center text-4xl font-bold text-gray-800 transition-opacity duration-200">
		{letter.symbol}
	</div>

	<!-- Letter Name -->
	<div class="mb-3 text-center text-sm text-gray-600 transition-opacity duration-200">
		{letter.name}
	</div>

	<!-- Status Badge with fade animation -->
	<div class="text-center">
		{#if learned}
			<span 
				transition:fade={{ duration: prefersReducedMotion ? 0 : 200 }}
				class="inline-block transition-opacity duration-200"
			>
				<CheckCircle size={16} class="inline text-sky-500" />
			</span>
		{:else}
			<span 
				transition:fade={{ duration: prefersReducedMotion ? 0 : 200 }}
				class="inline-block transition-opacity duration-200"
			>
				<Circle size={16} class="inline text-gray-400" />
			</span>
		{/if}
	</div>

	<!-- Loading Indicator -->
	{#if isLoading}
		<div
			class="bg-opacity-75 absolute inset-0 flex items-center justify-center rounded-lg bg-white transition-opacity duration-200 ease-out"
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
		/* Use hardware acceleration for better performance */
		will-change: transform;
	}

	.letter-card:hover {
		transform: translateY(-2px);
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.letter-card:active {
		transform: translateY(0px) scale(0.98);
		transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>

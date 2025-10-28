<script lang="ts">
	import { ArrowLeft, BrainCircuit } from 'lucide-svelte';

	export let title: string;
	export let onBack: () => void;
	export let rightContent: 'quiz-start' | 'difficulty-selector' = 'quiz-start';
	export let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
	export let onDifficultyChange: ((difficulty: 'easy' | 'medium' | 'hard') => void) | undefined;
	export let onQuizStart: (() => void) | undefined;
</script>

<header class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Back Button -->
			<button
				class="flex items-center text-gray-600 transition-colors hover:text-gray-900"
				on:click={onBack}
			>
				<ArrowLeft class="mr-3 h-5 w-5" />
				<img src="/harf-ogren-logo.png" alt="Harf Öğren Logo" class="smlogo" />
			</button>

			<!-- Page Title -->
			<h2 class="font-semibold text-gray-800 sm:text-sm md:text-lg">
				{title}
			</h2>

			<!-- Right Content -->
			{#if rightContent === 'quiz-start'}
				<!-- Quiz Start Button for Learn Mode -->
				<button
					class="flex items-center gap-2 rounded-lg bg-sky-950 px-4 py-2 text-white transition-colors hover:bg-sky-700"
					on:click={() => onQuizStart && onQuizStart()}
				>
					<BrainCircuit />
					Quiz
				</button>
			{:else if rightContent === 'difficulty-selector'}
				<!-- Difficulty Selector for Quiz Mode -->
				<div class="flex gap-2">
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'easy' ? 'bg-sky-950 text-white' : 'bg-orange-200 text-gray-700 hover:bg-orange-300'}`}
						on:click={() => onDifficultyChange && onDifficultyChange('easy')}
					>
						Kolay
					</button>
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'medium' ? 'bg-sky-950 text-white' : 'bg-orange-200 text-gray-700 hover:bg-orange-300'}`}
						on:click={() => onDifficultyChange && onDifficultyChange('medium')}
					>
						Orta
					</button>
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'hard' ? 'bg-sky-950 text-white' : 'bg-orange-200 text-gray-700 hover:bg-orange-300'}`}
						on:click={() => onDifficultyChange && onDifficultyChange('hard')}
					>
						Zor
					</button>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	img.smlogo {
		width: 4rem;
	}
</style>

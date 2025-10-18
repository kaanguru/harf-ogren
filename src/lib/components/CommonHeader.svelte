<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

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
			<h1 class="text-xl font-semibold text-gray-800">
				{title}
			</h1>

			<!-- Right Content -->
			{#if rightContent === 'quiz-start'}
				<!-- Quiz Start Button for Learn Mode -->
				<button
					class="flex items-center gap-2 rounded-lg bg-sky-950 px-4 py-2 text-white transition-colors hover:bg-sky-700"
					on:click={() => onQuizStart && onQuizStart()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M2 12 C2 12 5 8 12 8 C19 8 22 12 22 12 C22 12 19 16 12 16 C5 16 2 12 2 12 Z" />
						<path
							d="M12 15 C13.6569 15 15 13.6569 15 12 C15 10.3431 13.6569 9 12 9 C10.3431 9 9 10.3431 9 12 C9 13.6569 10.3431 15 12 15 Z"
						/>
					</svg>
					Quiz'e Başla
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

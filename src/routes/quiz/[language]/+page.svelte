<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentLanguage } from '$lib/stores/progress.store';
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import Quiz from '$lib/components/Quiz.svelte';
	import { UI_TEXT } from '$lib/utils/constants';

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

<div class="quiz-page min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Back Button -->
				<button
					class="flex items-center text-gray-600 transition-colors hover:text-gray-900"
					on:click={goBack}
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span class="sm:hidden md:hidden lg:block">
						{UI_TEXT.back}
					</span>
				</button>

				<!-- Page Title -->
				<h1 class="text-xl font-semibold text-gray-800">
					{alphabet.name} Quiz
				</h1>

				<!-- Difficulty Selector -->
				<div class="flex gap-2">
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'easy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
						on:click={() => setDifficulty('easy')}
					>
						Kolay
					</button>
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
						on:click={() => setDifficulty('medium')}
					>
						Orta
					</button>
					<button
						class={`rounded px-3 py-1 text-sm transition-colors ${difficulty === 'hard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
						on:click={() => setDifficulty('hard')}
					>
						Zor
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<Quiz {language} {difficulty} />
	</main>
</div>

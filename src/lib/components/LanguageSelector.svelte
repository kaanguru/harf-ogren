<script lang="ts">
	import { alphabets } from '$lib/models/alphabet-definition';
	import { setLanguage } from '$lib/stores/progress.store';
	import { goto } from '$app/navigation';
	import { UI_TEXT } from '$lib/utils/constants';

	function selectLanguage(language: 'ar' | 'ru') {
		setLanguage(language);
		goto(`/learn/${language}`);
	}
</script>

<div class="language-selector flex min-h-screen items-center justify-center bg-gray-50 p-4">
	<div class="w-full max-w-md">
		<!-- App Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-800">{UI_TEXT.appTitle}</h1>
			<p class="text-gray-600">{UI_TEXT.appDescription}</p>
		</div>

		<!-- Language Selection Cards -->
		<div class="space-y-4">
			<h2 class="mb-6 text-center text-xl font-semibold text-gray-700">
				{UI_TEXT.selectLanguage}
			</h2>

			{#each Object.entries(alphabets) as [key, alphabet]}
				<button
					class="language-card w-full rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:shadow-md"
					on:click={() => selectLanguage(key as 'ar' | 'ru')}
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="mb-2 text-xl font-semibold text-gray-800">
								{alphabet.name}
							</h3>
							<p class="text-gray-600">
								{alphabet.letters.length}
								{UI_TEXT.letters.toLowerCase()}
							</p>
						</div>
						<div class="text-3xl text-blue-600">
							{#if key === 'ar'}
								<span class="font-arabic">ا</span>
							{:else}
								<span class="font-cyrillic">А</span>
							{/if}
						</div>
					</div>
					<div class="mt-4 text-sm font-medium text-blue-600">
						{UI_TEXT.startLearning} →
					</div>
				</button>
			{/each}
		</div>

		<!-- Instructions -->
		<div class="mt-8 text-center text-sm text-gray-500">
			<p>Bir dil seçerek öğrenmeye başlayın</p>
		</div>
	</div>
</div>

<style>
	.language-card:hover {
		transform: translateY(-2px);
	}

	.language-card:active {
		transform: translateY(0px);
	}

	.font-arabic {
		font-family: system-ui, sans-serif;
	}

	.font-cyrillic {
		font-family: system-ui, sans-serif;
	}
</style>

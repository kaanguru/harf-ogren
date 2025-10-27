<script lang="ts">
	import { alphabets } from '$lib/models/alphabet-definition';
	import { setSetId } from '$lib/stores/progress.store';
	import { goto } from '$app/navigation';
	import { UI_TEXT } from '$lib/utils/constants';
	import { Play, ArrowRight } from 'lucide-svelte';

	function selectSet(setId: 'ar' | 'ru' | 'ot' | 'fa') {
		setSetId(setId);
		goto(`/learn/${setId}`);
	}
</script>

<div class="set-selector flex items-center justify-center bg-orange-50 p-4">
	<div class="w-full max-w-md">
		<!-- App Header -->
		<div class="mb-8 text-center">
			<!-- <h2 class="mb-2 text-4xl font-bold text-gray-800">{UI_TEXT.appTitle}</h2> -->
			<p class="text-gray-600">{UI_TEXT.appDescription}</p>
		</div>

		<!-- Set Selection Cards -->
		<div class="space-y-4">
			<!-- <h2 class="mb-6 text-center text-xl font-semibold text-gray-700">
				{UI_TEXT.selectLanguage}
			</h2> -->

			{#each Object.entries(alphabets) as [key, alphabet]}
				<button
					class="set-card w-full rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:shadow-md"
					on:click={() => selectSet(key as 'ar' | 'ru' | 'ot' | 'fa')}
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
						<div class="text-3xl text-sky-950">
							{#if key === 'ar'}
								<span class="font-arabic">ا</span>
							{:else}
								<span class="font-cyrillic">А</span>
							{/if}
						</div>
					</div>
					<div class="mt-4 flex items-center justify-between text-sm font-medium text-sky-950">
						<span>{UI_TEXT.startLearning}</span>
						<ArrowRight class="h-4 w-4" />
					</div>
				</button>
			{/each}
		</div>

		<!-- Instructions -->
		<div class="mt-8 text-center text-sm text-gray-500">
			<p>Bir alfabe seti seçerek öğrenmeye başlayın</p>
		</div>
	</div>
</div>

<style>
	.set-card:hover {
		transform: translateY(-2px);
	}

	.set-card:active {
		transform: translateY(0px);
	}

	.font-arabic {
		font-family: system-ui, sans-serif;
	}

	.font-cyrillic {
		font-family: system-ui, sans-serif;
	}
</style>

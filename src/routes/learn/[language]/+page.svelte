<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentLanguage, userProgress } from '$lib/stores/progress.store';
	import { getAlphabet } from '$lib/models/alphabet-definition';
	import LetterGrid from '$lib/components/LetterGrid.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import { UI_TEXT } from '$lib/utils/constants';
	import { ArrowLeft, CheckCircle } from 'lucide-svelte';

	let language: 'ar' | 'ru' = 'ar';

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
		goto('/');
	}

	function goToQuiz() {
		goto('/quiz/' + language);
	}

	$: alphabet = getAlphabet(language);
</script>

<div class="learn-page min-h-screen bg-orange-50">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Back Button -->
				<button
					class="flex items-center text-gray-600 transition-colors hover:text-gray-900"
					on:click={goBack}
				>
					<ArrowLeft class="mr-2 h-5 w-5" />
					{UI_TEXT.back}
				</button>

				<!-- Page Title -->
				<h1 class="text-xl font-semibold text-gray-800">
					{alphabet.name}
					{UI_TEXT.letters}
				</h1>

				<!-- Quiz Button -->
				<button
					class="flex items-center gap-2 rounded-lg bg-sky-950 px-4 py-2 text-white transition-colors hover:bg-sky-700"
					on:click={goToQuiz}
				>
					<CheckCircle class="h-4 w-4" />
					Quiz'e Başla
				</button>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- Progress Sidebar -->
			<div class="lg:col-span-1">
				<ProgressIndicator {language} />

				<!-- Instructions -->
				<div class="mt-6 rounded-lg border border-blue-200 bg-sky-50 p-4">
					<h3 class="mb-2 text-sm font-semibold text-blue-800">Nasıl Kullanılır?</h3>
					<ul class="space-y-1 text-sm text-sky-700">
						<li>• Harfe tıklayarak sesini dinleyin</li>
						<li>• Öğrendiğiniz harfler yeşil olarak işaretlenecek</li>
						<li>• İlerlemeniz otomatik olarak kaydedilir</li>
					</ul>
				</div>
			</div>

			<!-- Letter Grid -->
			<div class="lg:col-span-3">
				<LetterGrid {language} />
			</div>
		</div>
	</main>
</div>

<style>
	.learn-page {
		min-height: 100vh;
	}
</style>

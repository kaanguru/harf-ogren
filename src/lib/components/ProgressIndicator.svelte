<script lang="ts">
	import { userProgress } from '$lib/stores/progress.store';
	import { getTotalLetters } from '$lib/models/alphabet-definition';
	import { resetProgress } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';

	export let language: 'ar' | 'ru';

	let showResetConfirm = false;

	function handleReset() {
		showResetConfirm = true;
	}

	function confirmReset() {
		resetProgress();
		showResetConfirm = false;
	}

	function cancelReset() {
		showResetConfirm = false;
	}

	$: totalLetters = getTotalLetters(language);
	$: learnedCount = $userProgress?.learnedLetters.length || 0;
	$: progressPercentage = totalLetters > 0 ? Math.round((learnedCount / totalLetters) * 100) : 0;
</script>

<div class="progress-indicator rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="text-lg font-semibold text-gray-800">{UI_TEXT.progressTitle}</h3>
		<button class="text-sm font-medium text-red-600 hover:text-red-700" on:click={handleReset}>
			{UI_TEXT.resetProgress}
		</button>
	</div>

	<!-- Progress Stats -->
	<div class="mb-4 grid grid-cols-3 gap-4">
		<div class="text-center">
			<div class="text-2xl font-bold text-blue-600">{learnedCount}</div>
			<div class="text-sm text-gray-600">{UI_TEXT.learnedLetters}</div>
		</div>
		<div class="text-center">
			<div class="text-2xl font-bold text-gray-700">{totalLetters}</div>
			<div class="text-sm text-gray-600">{UI_TEXT.totalLetters}</div>
		</div>
		<div class="text-center">
			<div class="text-2xl font-bold text-green-600">{progressPercentage}%</div>
			<div class="text-sm text-gray-600">{UI_TEXT.progressPercentage}</div>
		</div>
	</div>

	<!-- Progress Bar -->
	<div class="mb-4 h-3 w-full rounded-full bg-gray-200">
		<div
			class="h-3 rounded-full bg-green-500 transition-all duration-300"
			style="width: {progressPercentage}%"
		></div>
	</div>

	<!-- Reset Confirmation Modal -->
	{#if showResetConfirm}
		<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
			<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-6">
				<h4 class="mb-4 text-lg font-semibold text-gray-800">
					{UI_TEXT.resetProgress}
				</h4>
				<p class="mb-6 text-gray-600">
					{UI_TEXT.resetConfirm}
				</p>
				<div class="flex gap-3">
					<button
						class="flex-1 rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
						on:click={confirmReset}
					>
						Evet
					</button>
					<button
						class="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
						on:click={cancelReset}
					>
						Hayır
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

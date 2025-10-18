<script lang="ts">
	import type { QuizQuestion } from '$lib/services/quiz-service';
	import { QuizService } from '$lib/services/quiz-service';
	import { markLetterLearned } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	import { Volume2, RotateCcw } from 'lucide-svelte';

	export let language: 'ar' | 'ru';
	export let difficulty: 'easy' | 'medium' | 'hard' = 'medium';

	const quizService = new QuizService();
	let currentQuestion: QuizQuestion | null = null;
	let selectedOption: string | null = null;
	let isCorrect: boolean | null = null;
	let isLoading = false;
	let score = 0;
	let questionsAnswered = 0;
	let showResult = false;

	function initializeQuiz() {
		currentQuestion = quizService.getNextQuestion(language, difficulty);
		selectedOption = null;
		isCorrect = null;
		showResult = false;
	}

	function selectOption(letterId: string) {
		if (selectedOption || !currentQuestion) return;

		selectedOption = letterId;
		isCorrect = quizService.validateAnswer(currentQuestion, letterId);

		if (isCorrect) {
			score++;
			markLetterLearned(currentQuestion.correctLetter.id);
		}

		questionsAnswered++;
		showResult = true;
	}

	function nextQuestion() {
		// Stop any currently playing audio before loading next question
		quizService.stopQuestionAudio();
		currentQuestion = quizService.getNextQuestion(language, difficulty);
		selectedOption = null;
		isCorrect = null;
		showResult = false;
	}

	async function playQuestionAudio() {
		if (!currentQuestion) return;

		isLoading = true;
		try {
			await quizService.playQuestionAudio(language, currentQuestion.correctLetter.id);
		} catch (error) {
			console.error('Failed to play audio:', error);
		} finally {
			isLoading = false;
		}
	}

	function getOptionClass(letterId: string) {
		if (!selectedOption) {
			return 'bg-white hover:bg-orange-50 border-gray-200';
		}

		if (letterId === currentQuestion?.correctLetter.id) {
			return 'bg-green-100 border-green-400 text-green-800';
		}

		if (letterId === selectedOption && letterId !== currentQuestion?.correctLetter.id) {
			return 'bg-red-100 border-red-400 text-red-800';
		}

		return 'bg-orange-100 border-gray-200 text-gray-500';
	}

	onMount(() => {
		initializeQuiz();
	});

	$: if (currentQuestion && !showResult) {
		playQuestionAudio();
	}
</script>

<div class="quiz-container mx-auto max-w-2xl p-6">
	<!-- Quiz Header -->
	<div class="mb-8 text-center">
		<div class="flex justify-center gap-4 text-sm text-gray-600">
			<span>Skor: {score}/{questionsAnswered}</span>
			<span
				>Zorluk: {difficulty === 'easy' ? 'Kolay' : difficulty === 'medium' ? 'Orta' : 'Zor'}</span
			>
		</div>
	</div>

	<!-- Question Area -->
	{#if currentQuestion}
		<div class="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<!-- Audio Play Button -->
			<div class="mb-6 text-center">
				<button
					on:click={playQuestionAudio}
					disabled={isLoading}
					class="inline-flex items-center gap-2 rounded-lg bg-sky-950 px-6 py-3 text-white transition-colors hover:bg-sky-700 disabled:bg-sky-400"
				>
					{#if isLoading}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
					{:else}
						<Volume2 class="h-5 w-5" />
					{/if}
					{UI_TEXT.playSound}
				</button>
			</div>

			<!-- Options Grid -->
			<div class="grid grid-cols-2 gap-4">
				{#each currentQuestion.options as option}
					<button
						type="button"
						on:click={() => selectOption(option.id)}
						disabled={selectedOption !== null}
						class={`rounded-lg border-2 p-4 text-center transition-all duration-200 ${getOptionClass(option.id)} ${selectedOption ? '' : 'cursor-pointer hover:shadow-md'}`}
					>
						<div class="mb-2 text-3xl font-bold">{option.symbol}</div>
						<!-- <div class=" text-gray-200">{option.name}</div> -->
					</button>
				{/each}
			</div>

			<!-- Result Feedback -->
			{#if showResult}
				<div class="mt-6 text-center">
					{#if isCorrect}
						<div class="mb-4 text-lg font-semibold text-sky-500">✓ Doğru! Tebrikler!</div>
					{:else}
						<div class="mb-4 text-lg font-semibold text-red-600">
							✗ Yanlış! Doğru cevap: {currentQuestion.correctLetter.symbol} ({currentQuestion
								.correctLetter.name})
						</div>
					{/if}

					<button
						on:click={nextQuestion}
						class="inline-flex items-center gap-2 rounded-lg bg-sky-950 px-6 py-2 text-white transition-colors hover:bg-sky-700"
					>
						<RotateCcw class="h-4 w-4" />
						Sonraki Soru
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center text-gray-500">Quiz yükleniyor...</div>
	{/if}

	<!-- Instructions -->
	<div class="mt-8 text-center text-sm text-gray-500">
		<p>Dinlediğiniz sesin hangi harfe ait olduğunu seçin.</p>
	</div>
</div>

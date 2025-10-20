<script lang="ts">
	import type { QuizQuestion } from '$lib/services/quiz-service';
	import { QuizService } from '$lib/services/quiz-service';
	import { markLetterLearned } from '$lib/stores/progress.store';
	import { UI_TEXT } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	import { Volume2, RotateCcw } from 'lucide-svelte';
	import confetti from 'canvas-confetti';

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
	let quizCompleted = false;
	// Set a fixed number of questions for a quiz session
	const totalQuestionsInSet = 10; // Can be changed based on requirements

	function initializeQuiz() {
		currentQuestion = quizService.getNextQuestion(language, difficulty);
		selectedOption = null;
		isCorrect = null;
		showResult = false;
		score = 0;
		questionsAnswered = 0;
		quizCompleted = false;
	}

	function selectOption(letterId: string) {
		if (selectedOption || !currentQuestion) return;

		// Stop the question audio when an option is selected
		quizService.stopQuestionAudio();

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
		
		// Check if we've reached the end of the quiz set
		if (questionsAnswered >= totalQuestionsInSet) {
			quizCompleted = true;
			// Trigger confetti for completing the quiz set
			triggerFullConfetti();
		} else {
			currentQuestion = quizService.getNextQuestion(language, difficulty);
			selectedOption = null;
			isCorrect = null;
			showResult = false;
		}
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

	function triggerFullConfetti() {
		// Play the celebration sound for completing the set
		playSetCompletionSound();
		
		// More elaborate confetti for completing a set
		confetti({
			particleCount: 300,
			spread: 180,
			origin: { y: 0.6 },
			startVelocity: 50,
			gravity: 0.5,
			drift: -0.5,
			ticks: 200,
			zIndex: 1000,
			colors: [
				'#780000', // barn-red
				'#c1121f', // fire-brick
				'#fdf0d5', // papaya-whip
				'#669bbc', // air-superiority-blue
				'#003049', // prussian-blue
				'#2a9d8f', // teal
				'#e9c46a', // golden
				'#f4a261'  // orange
			]
		});
		
		// Add a second burst for more effect
		setTimeout(() => {
			confetti({
				particleCount: 150,
				angle: 60,
				spread: 70,
				origin: { x: 0 },
				colors: [
					'#780000', 
					'#c1121f', 
					'#fdf0d5', 
					'#669bbc', 
					'#003049'
				]
			});
		}, 150);
		
		setTimeout(() => {
			confetti({
				particleCount: 150,
				angle: 120,
				spread: 70,
				origin: { x: 1 },
				colors: [
					'#780000', 
					'#c1121f', 
					'#fdf0d5', 
					'#669bbc', 
					'#003049'
				]
			});
		}, 300);
	}
	
	function playSetCompletionSound() {
		const audio = new Audio('/audio/confetti-fade-in.mp3');
		audio.play().catch((error) => {
			console.error('Failed to play set completion sound:', error);
		});
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
					{#if quizCompleted}
						<div class="mb-6">
							<div class="text-2xl font-bold text-sky-600 mb-2">🎉 Tebrikler!</div>
							<div class="text-lg text-gray-700 mb-2">Quiz Setini Tamamladınız!</div>
							<div class="text-md text-gray-600">
								Skor: {score}/{totalQuestionsInSet} ({Math.round((score/totalQuestionsInSet)*100)}%)
							</div>
							<button
								on:click={initializeQuiz}
								class="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-950 px-6 py-3 text-white transition-colors hover:bg-sky-700"
							>
								<RotateCcw class="h-5 w-5" />
								Yeni Quiz Başlat
							</button>
						</div>
					{:else}
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
					{/if}
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
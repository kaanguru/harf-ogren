<script lang="ts">
	import CommonHeader from './CommonHeader.svelte';
	
	export let title: string;
	export let onBack: () => void;
	export let rightContent: 'quiz-start' | 'difficulty-selector' = 'quiz-start';
	export let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
	export let onDifficultyChange: ((difficulty: 'easy' | 'medium' | 'hard') => void) | undefined;
	export let onQuizStart: (() => void) | undefined;
	export let hasSidebar: boolean = false;
</script>

<div class="min-h-screen bg-orange-50">
	<!-- Header -->
	<CommonHeader
		{title}
		{onBack}
		{rightContent}
		{difficulty}
		{onDifficultyChange}
		{onQuizStart}
	/>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		{#if hasSidebar}
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				<div class="lg:col-span-1">
					<slot name="sidebar" />
				</div>
				<div class="lg:col-span-3">
					<slot name="main" />
				</div>
			</div>
		{:else}
			<slot name="main" />
		{/if}
	</main>
</div>
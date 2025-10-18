<script>
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
</script>

<div class="logo-container">
	<img src="/harf-ogren-logo.png" alt="Harf Öğren Logo" class="logo" />
</div>

<LanguageSelector />

<style>
	.logo-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.logo {
		max-width: 200px;
		height: auto;
	}
</style>

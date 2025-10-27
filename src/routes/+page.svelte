<script>
	import SetSelector from '$lib/components/SetSelector.svelte';
</script>

<div class="logo-container">
	<img src="/harf-ogren-logo.png" alt="Harf Öğren Logo" class="logo" />
</div>

<SetSelector />

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

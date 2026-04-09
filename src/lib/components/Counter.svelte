<script lang="ts">
	let count = 0;

	function increment() {
		count += 1;
	}
</script>

<div class="counter-container">
	<button on:click={increment} class="counter-button">
		Count: {count}
	</button>
</div>

<style>
	.counter-container {
		margin: 2rem 0;
		display: flex;
		justify-content: center;
	}

	.counter-button {
		background: var(--link);
		color: white;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		font-weight: bold;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: transform 0.1s ease, opacity 0.2s ease;
		font-family: 'Montserrat', sans-serif;
	}

	.counter-button:hover {
		opacity: 0.9;
		transform: scale(1.05);
	}

	.counter-button:active {
		transform: scale(0.95);
	}
</style>


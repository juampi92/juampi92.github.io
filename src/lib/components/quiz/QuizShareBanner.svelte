<script lang="ts">
	interface Props {
		name: string | null;
		score: number;
		total: number;
	}

	let { name, score, total }: Props = $props();
</script>

<div class="quiz-share-banner">
	<p class="quiz-share-banner__text">
		{#if name}
			<strong>{name}</strong> scored
		{:else}
			Someone scored
		{/if}
		<strong>{score}/{total}</strong> on the Laravel Status Quode Quiz
	</p>
	<p class="quiz-share-banner__cta">Scroll down to take the quiz yourself</p>
</div>

<style>
	.quiz-share-banner {
		border: 2px solid var(--h3-title);
		border-radius: 0.75rem;
		padding: 1.5rem 2rem;
		margin-bottom: 2.5rem;
		background: color-mix(in srgb, var(--h3-title) 6%, var(--bg));
		text-align: center;
	}

	.quiz-share-banner__text {
		margin: 0 0 0.5rem;
		font-size: 1.15rem;
	}

	.quiz-share-banner__cta {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.6;
	}
</style>

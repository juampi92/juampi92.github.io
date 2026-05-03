<script lang="ts">
	import { buildShareURL, trackQuizShare } from './laravel-status-quode-utils';

	interface Props {
		score: number;
		total: number;
		isComplete: boolean;
	}

	let { score, total, isComplete }: Props = $props();

	let playerName = $state('');
	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | undefined;

	let scorePct = $derived(Math.round((score / total) * 100));

	function getScoreMessage(pct: number): string {
		if (pct === 100) return 'Perfect score!';
		if (pct >= 80) return 'Impressive!';
		if (pct >= 60) return 'Solid foundation.';
		if (pct >= 40) return 'Room to grow.';
		return 'Not there yet...';
	}

	function handleShare() {
		const url = buildShareURL(score, total, playerName);
		navigator.clipboard.writeText(url).then(() => {
			copied = true;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => (copied = false), 2000);
		});
		trackQuizShare(playerName.trim().length > 0, score, total);
	}
</script>

<div class="quiz-results" class:quiz-results--visible={isComplete}>
	{#if isComplete}
		<div class="quiz-results__score">
			<span class="quiz-results__score-value">{score}</span>
			<span class="quiz-results__score-sep">/</span>
			<span class="quiz-results__score-total">{total}</span>
		</div>

		<div class="quiz-results__pct">{scorePct}%</div>

		<p class="quiz-results__message">{getScoreMessage(scorePct)}</p>

		<div class="quiz-results__share">
			<input
				type="text"
				bind:value={playerName}
				placeholder="Your name (optional)"
				class="quiz-results__name-input"
			/>
			<button class="quiz-results__share-btn" onclick={handleShare}>
				{copied ? 'Copied!' : 'Share'}
			</button>
		</div>
	{:else}
		<div class="quiz-results__progress">
			<span class="quiz-results__progress-label">Score so far</span>
			<span class="quiz-results__progress-value">{score} / {total}</span>
		</div>
	{/if}
</div>

<style>
	.quiz-results {
		border: 1.5px solid var(--border);
		border-radius: 0.75rem;
		padding: 2rem;
		text-align: center;
		margin-top: 2rem;
		transition: border-color 0.3s, background-color 0.3s;
	}

	.quiz-results--visible {
		border-color: var(--h3-title);
		background: color-mix(in srgb, var(--h3-title) 4%, var(--bg));
	}

	.quiz-results__score {
		font-family: 'Montserrat', sans-serif;
		font-weight: 900;
		font-size: 3rem;
		line-height: 1;
		color: var(--title);
	}

	.quiz-results__score-sep,
	.quiz-results__score-total {
		opacity: 0.35;
	}

	.quiz-results__pct {
		font-family: 'Courier New', Courier, monospace;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--h3-title);
		margin-top: 0.25rem;
	}

	.quiz-results__message {
		margin: 1rem 0 1.5rem;
		font-size: 1rem;
		opacity: 0.8;
	}

	.quiz-results__share {
		display: flex;
		gap: 0.5rem;
		max-width: 24rem;
		margin: 0 auto;
	}

	.quiz-results__name-input {
		flex: 1;
		border: 1.5px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.6rem 1rem;
		font-family: inherit;
		font-size: 0.9rem;
		color: var(--text);
		background: var(--bg);
		outline: none;
		transition: border-color 0.15s;
	}

	.quiz-results__name-input:focus {
		border-color: var(--h3-title);
	}

	.quiz-results__share-btn {
		border: none;
		border-radius: 0.5rem;
		padding: 0.6rem 1.5rem;
		font-family: 'Montserrat', sans-serif;
		font-weight: 900;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: white;
		background: var(--h3-title);
		cursor: pointer;
		transition: opacity 0.15s;
		white-space: nowrap;
	}

	.quiz-results__share-btn:hover {
		opacity: 0.85;
	}

	.quiz-results__progress {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.quiz-results__progress-label {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.85rem;
		opacity: 0.5;
	}

	.quiz-results__progress-value {
		font-family: 'Montserrat', sans-serif;
		font-weight: 900;
		font-size: 1.1rem;
		color: var(--title);
	}
</style>

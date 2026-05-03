<script lang="ts">
	import { renderMarkdown, getSourceType, type QuizQuestion, type QuizOptionRaw, type RenderedQuestion } from './laravel-status-quode-utils';

	interface Props {
		question: QuizQuestion;
		rendered?: RenderedQuestion;
		questionNumber: number;
		totalQuestions: number;
		categoryName: string;
		selectedAnswer: number | null; // option index or null
		onAnswer: (questionId: string, optionIndex: number, isCorrect: boolean) => void;
	}

	let { question, rendered, questionNumber, totalQuestions, categoryName, selectedAnswer, onAnswer }: Props = $props();

	let isAnswered = $derived(selectedAnswer !== null);

	function handleSelect(option: QuizOptionRaw, index: number) {
		if (isAnswered) return;
		onAnswer(question.id, index, option.is_status_quode);
	}

	function optionClass(option: QuizOptionRaw, index: number): string {
		if (!isAnswered) return 'quiz-option';
		const classes = ['quiz-option', 'quiz-option--answered'];
		if (index === selectedAnswer) classes.push('quiz-option--selected');
		if (option.is_status_quode) {
			classes.push('quiz-option--correct');
		} else if (index === selectedAnswer) {
			classes.push('quiz-option--wrong');
		}
		return classes.join(' ');
	}

	const sourceIcons: Record<string, string> = {
		github: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`,
		laravel: `<svg viewBox="0 0 50 52" width="16" height="16" fill="currentColor"><path d="M49.626 11.564a.809.809 0 01.028.209v10.972a.8.8 0 01-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 01-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 010 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.02-.02.047-.034.069-.052.027-.021.05-.046.08-.064h.001L9.749.68a.804.804 0 01.803 0l9.466 5.453h.002c.028.018.051.043.078.064.023.018.049.032.069.052.027.028.048.06.071.093.018.024.04.045.055.071.022.04.036.082.051.124.009.023.022.044.028.068a.81.81 0 01.028.209v20.559l8.008-4.611V10.82c0-.071.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.014-.027.036-.048.054-.072.024-.031.045-.064.072-.092.02-.02.046-.035.068-.053.028-.02.051-.045.08-.063h0l9.466-5.453a.803.803 0 01.804 0l9.465 5.453c.03.018.054.042.08.063.023.018.05.033.07.053.026.028.047.06.07.092.02.024.041.045.056.072.022.039.035.082.05.124.01.023.023.044.029.068zM48.02 21.99V12.4l-3.363 1.936-4.646 2.675v9.589l8.01-4.611zm-9.466 16.28V28.68l-4.57 2.614-12.902 7.38v9.69l17.472-10.063zM1.606 7.15v31.782l17.472 10.063V39.26L9.768 33.836l-.004-.002-.004-.002c-.028-.018-.05-.042-.076-.062-.023-.02-.05-.035-.07-.056l-.003-.004c-.024-.025-.044-.056-.066-.084-.02-.025-.043-.047-.06-.074l-.001-.003c-.018-.03-.032-.066-.046-.1-.014-.027-.03-.05-.04-.078l-.001-.004c-.011-.032-.017-.067-.023-.102-.007-.025-.018-.048-.022-.074-.01-.064-.014-.13-.014-.192V11.86L5.248 9.484 1.607 7.15zm8.544-5.268L1.96 6.334l8.183 4.714 8.19-4.714-8.184-4.452zm4.283 24.663l4.646-2.675V7.15l-3.363 1.936-4.646 2.675v16.72l3.363-1.936zM39.758 7.15l-8.19 4.452 8.19 4.714 8.184-4.714-8.184-4.452zM38.956 18.2l-4.646-2.675-3.363-1.936v9.589l4.646 2.675 3.363 1.937V18.2zM20.018 38.07l11.657-6.67 5.807-3.322-8.174-4.707-9.215 5.308-8.27 4.762 8.195 4.629z"/></svg>`,
		symfony: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.168 3.48c1.606-.054 2.924.59 3.101 2.027.142 1.15-.476 2.145-1.079 2.836l-.748.81.358.103c.903.283 1.768.965 1.747 2.2-.023 1.437-1.236 2.587-2.88 2.73l-.132.01c-.465.026-.98-.063-1.38-.22l.098-.665c.367.137.767.2 1.17.18l.09-.006c.948-.083 1.704-.72 1.717-1.613.015-1.003-.876-1.443-1.718-1.627l-.535-.11.685-.756c.504-.543 1.07-1.32.956-2.24-.132-1.078-1.194-1.53-2.247-1.49-.755.03-1.386.236-1.772.423l-.125-.664c.435-.216 1.173-.43 1.944-.458zm-6.348 2.3c.403.002.85.09 1.277.3 1.084.533 1.576 1.52.97 2.756-.57 1.165-1.816 1.744-3.028 1.193a2.373 2.373 0 01-.458-.282l.34-.523c.155.112.31.193.464.252.83.315 1.652-.115 2.072-.87.407-.735.296-1.51-.488-1.89-.315-.152-.662-.185-.97-.126l-.283-.62c.51-.16.81-.444.932-.77.158-.428-.014-.9-.577-1.1a1.432 1.432 0 00-.448-.085c-.327-.006-.62.068-.862.165l-.16-.63c.291-.14.73-.273 1.22-.28zm11.32 5.12c.466 0 .88.126 1.17.398.29.27.417.66.417 1.11 0 .55-.18 1.05-.6 1.7l-1.524 2.32 2.12-.003v.74H14.51l2.075-3.192c.337-.515.497-.957.497-1.432 0-.28-.067-.497-.215-.636a.788.788 0 00-.56-.2c-.448 0-.843.253-1.14.585l-.457-.483c.43-.467.995-.798 1.73-.798zM8.94 13.132l-.126 2.73h2.098v.68H8.786l-.09 1.93h-.75l.09-1.93H5.96v-.538l2.788-2.872h.82zm-.15 1.21l-2.032 2.2h2.056l.088-2.2z"/></svg>`,
		other: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M1.5 0A1.5 1.5 0 000 1.5v13A1.5 1.5 0 001.5 16h13a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0014.5 0h-13zM8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/></svg>`
	};
</script>

<div class="quiz-question" id="q-{question.id}">
	<div class="quiz-question__header">
		<span class="quiz-category">{categoryName}</span>
		<span class="quiz-question__number-wrap">
			<span class="quiz-question__number-deco" aria-hidden="true">{questionNumber}</span>
			<span class="quiz-question__number">{questionNumber} / {totalQuestions}</span>
		</span>
	</div>

	<div class="quiz-question__text">
		{@html rendered?.questionHtml ?? renderMarkdown(question.question)}
	</div>

	<div class="quiz-options">
		{#each question.options as option, i (i)}
			<button
				class={optionClass(option, i)}
				disabled={isAnswered}
				onclick={() => handleSelect(option, i)}
			>
				<div class="quiz-option__value">
					{@html rendered?.options[i]?.valueHtml ?? renderMarkdown(option.value)}
				</div>
				{#if isAnswered}
					<div class="quiz-option__rationale" class:quiz-option__rationale--visible={isAnswered}>
						{#if option.is_status_quode}
							<span class="quiz-rationale-badge quiz-rationale-badge--correct">Status Quode</span>
						{/if}
						{@html rendered?.options[i]?.rationaleHtml ?? renderMarkdown(option.rationale)}
					</div>
				{/if}
			</button>
		{/each}
	</div>

	{#if isAnswered}
		<div class="quiz-pattern">
			<div class="quiz-pattern__label">The pattern</div>
			{@html rendered?.patternHtml ?? renderMarkdown(question.pattern)}
		</div>

		{#if question.sources.length > 0}
			<div class="quiz-sources">
				<span class="quiz-sources__label">Sources:</span>
				{#each question.sources as source, i}
					<a
						href={source}
						target="_blank"
						rel="noopener noreferrer"
						class="quiz-source-link"
						title={source}
					>
						{@html sourceIcons[getSourceType(source)]}
						<span>[{i + 1}]</span>
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.quiz-question {
		margin-bottom: 3rem;
		scroll-margin-top: 2rem;
	}

	.quiz-question__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.quiz-category {
		display: inline-block;
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--h3-title);
		background: color-mix(in srgb, var(--h3-title) 10%, var(--bg));
		padding: 0.2em 0.6em;
		border-radius: 0.25rem;
	}

	.quiz-question__number-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.quiz-question__number {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.8rem;
		opacity: 0.5;
		position: relative;
		z-index: 1;
	}

	.quiz-question__number-deco {
		position: absolute;
		right: -0.1em;
		top: 50%;
		transform: translateY(-50%);
		font-family: 'Courier New', Courier, monospace;
		font-size: 4.5rem;
		font-weight: 700;
		line-height: 1;
		opacity: 0.07;
		pointer-events: none;
		user-select: none;
		color: inherit;
	}

	.quiz-question__text {
		margin-bottom: 1rem;
	}

	.quiz-question__text :global(p:first-child) {
		margin-top: 0;
	}

	.quiz-question__text :global(p:last-child) {
		margin-bottom: 0;
	}

	.quiz-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.quiz-option {
		display: block;
		width: 100%;
		text-align: left;
		border: 1.5px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--bg);
		cursor: pointer;
		transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		line-height: 1.5;
	}

	.quiz-option:not(:disabled):hover {
		border-color: var(--link);
		background: color-mix(in srgb, var(--link) 4%, var(--bg));
	}

	.quiz-option:not(:disabled):active {
		background: color-mix(in srgb, var(--link) 8%, var(--bg));
	}

	.quiz-option--answered {
		cursor: default;
	}

	.quiz-option--correct {
		border-color: #22c55e;
		background: color-mix(in srgb, #22c55e 6%, var(--bg));
	}

	.quiz-option--correct.quiz-option--selected {
		border-width: 2.5px;
		box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
	}

	.quiz-option--wrong.quiz-option--selected {
		border-color: #ef4444;
		background: color-mix(in srgb, #ef4444 6%, var(--bg));
		border-width: 2.5px;
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.quiz-option__value :global(p) {
		margin: 0;
	}

	.quiz-option__value :global(pre) {
		margin: 0.5rem 0;
	}

	.quiz-option__rationale {
		border-top: 1px solid var(--border);
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		font-size: 0.9rem;
		opacity: 0.85;
	}

	.quiz-option__rationale :global(p) {
		margin: 0;
	}

	.quiz-rationale-badge {
		display: inline-block;
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.15em 0.5em;
		border-radius: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.quiz-rationale-badge--correct {
		color: #15803d;
		background: color-mix(in srgb, #22c55e 15%, var(--bg));
	}

	.quiz-pattern {
		margin-top: 1.25rem;
		border-left: 3px solid var(--h3-title);
		padding: 0.75rem 1.25rem;
		background: color-mix(in srgb, var(--h3-title) 4%, var(--bg));
		border-radius: 0 0.5rem 0.5rem 0;
		font-size: 0.95rem;
	}

	.quiz-pattern__label {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--h3-title);
		margin-bottom: 0.25rem;
	}

	.quiz-pattern :global(p:first-of-type) {
		margin-top: 0;
	}

	.quiz-pattern :global(p:last-child) {
		margin-bottom: 0;
	}

	.quiz-sources {
		margin-top: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.8rem;
	}

	.quiz-sources__label {
		opacity: 0.5;
		font-family: 'Courier New', Courier, monospace;
	}

	.quiz-source-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--link);
		opacity: 0.7;
		transition: opacity 0.15s;
	}

	.quiz-source-link:hover {
		opacity: 1;
		text-decoration: none;
	}
</style>

<script lang="ts">
	import {
		prepareQuestions,
		loadQuizState,
		saveQuizState,
		decodeShareData,
		calculateScore,
		trackQuizAnswer,
		trackQuizComplete,
		renderQuestionContent
	} from './quiz-utils';
	import type {
		QuizData,
		QuizQuestion as QuizQuestionType,
		StoredQuizState,
		RenderedQuestion
	} from './quiz-utils';
	import QuizQuestion from './QuizQuestion.svelte';
	import QuizResults from './QuizResults.svelte';
	import QuizShareBanner from './QuizShareBanner.svelte';

	interface Props {
		quizData: QuizData;
	}

	let { quizData }: Props = $props();

	// Prepare questions once (shuffle options per page load)
	const questions: QuizQuestionType[] = prepareQuestions(quizData.questions);

	// State
	let answers = $state<Record<string, number>>({});
	let shareParams = $state<{ name: string | null; score: number; total: number } | null>(null);
	let initialized = $state(false);
	let renderedQuestions = $state<RenderedQuestion[]>([]);

	// Derived
	let score = $derived(calculateScore(answers, quizData.questions));
	let scoreableCount = $derived(quizData.questions.filter((q) => !q.skipScore).length);
	let isComplete = $derived(Object.keys(answers).length === questions.length);

	// Track quiz completion
	let wasComplete = false;
	$effect(() => {
		if (isComplete && !wasComplete && initialized) {
			wasComplete = true;
			trackQuizComplete(score, scoreableCount);
		}
	});

	// Restore from localStorage on mount
	$effect(() => {
		if (typeof window === 'undefined') return;

		// Check for share params
		const params = new URLSearchParams(window.location.search);
		const sq = params.get('sq');
		if (sq) {
			const decoded = decodeShareData(sq);
			if (decoded) {
				shareParams = {
					name: decoded.n ?? null,
					score: decoded.s,
					total: decoded.t
				};
			}
		}

		// Restore quiz state from localStorage
		const stored: StoredQuizState | null = loadQuizState();
		if (stored) {
			answers = stored.answers;
		}

		initialized = true;

		// Pre-render markdown with syntax highlighting
		Promise.all(questions.map(renderQuestionContent)).then((rendered) => {
			renderedQuestions = rendered;
		});
	});

	// Persist to localStorage when answers change (after init)
	$effect(() => {
		if (!initialized) return;
		const _ = answers; // track dependency
		saveQuizState({
			answers,
			score,
			completedAt: isComplete ? new Date().toISOString() : null
		});
	});

	function getCategoryName(categoryId: string): string {
		return quizData.categories.find((c) => c.id === categoryId)?.name ?? categoryId;
	}

	function handleAnswer(questionId: string, optionIndex: number, isCorrect: boolean) {
		const question = quizData.questions.find((q) => q.id === questionId);
		if (!question) return;

		answers = { ...answers, [questionId]: optionIndex };

		const answerValue = question.options[optionIndex]?.value ?? '';
		const completionPct = (Object.keys(answers).length / questions.length) * 100;
		trackQuizAnswer(questionId, question.question, isCorrect, answerValue, completionPct);
	}

	function getSelectedAnswer(question: QuizQuestionType): number | null {
		const idx = answers[question.id];
		return idx !== undefined ? idx : null;
	}
</script>

{#if shareParams}
	<QuizShareBanner name={shareParams.name} score={shareParams.score} total={shareParams.total} />
{/if}

<div class="quiz">
	{#each questions as question, i}
		<QuizQuestion
			{question}
			rendered={renderedQuestions[i]}
			questionNumber={i + 1}
			totalQuestions={questions.length}
			categoryName={getCategoryName(question.category_id)}
			selectedAnswer={getSelectedAnswer(question)}
			onAnswer={handleAnswer}
		/>
	{/each}

	<QuizResults {score} total={scoreableCount} {isComplete} />
</div>

<style>
	.quiz {
		margin-top: 2rem;
	}

	.quiz :global(.quiz-question + .quiz-question) {
		border-top: 3px solid var(--border);
		padding-top: 2.5rem;
	}
</style>

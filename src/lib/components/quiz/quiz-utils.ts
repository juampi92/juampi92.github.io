import { marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';

// --- Types ---

export interface QuizOptionRaw {
	value: string;
	is_status_quode: boolean;
	rationale: string;
}

export interface QuizQuestionRaw {
	id: string;
	category_id: string;
	question: string;
	pattern: string;
	options: QuizOptionRaw[];
	sources: string[];
	skipScore?: boolean;
}

export type QuizQuestion = QuizQuestionRaw;

export interface QuizCategory {
	id: string;
	name: string;
}

export interface QuizData {
	name: string;
	description: string;
	categories: QuizCategory[];
	questions: QuizQuestionRaw[];
}

export interface StoredQuizState {
	answers: Record<string, number>; // questionId -> option index
	score: number;
	completedAt: string | null;
}

export interface SharePayload {
	s: number; // score
	t: number; // total questions
	n?: string; // name (optional)
	v: string; // signature
}

// --- Markdown Rendering ---

marked.setOptions({
	breaks: false,
	gfm: true
});

export function renderMarkdown(md: string): string {
	return marked.parse(md, { async: false }) as string;
}

// --- Async Rendering with Syntax Highlighting ---

export interface RenderedOption {
	valueHtml: string;
	rationaleHtml: string;
}

export interface RenderedQuestion {
	questionHtml: string;
	patternHtml: string;
	options: RenderedOption[];
}

let highlighter: Highlighter | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-light'],
			langs: ['php', 'bash', 'javascript', 'typescript', 'text']
		});
	}
	return highlighter;
}

async function renderMarkdownHighlighted(md: string): Promise<string> {
	const hl = await getHighlighter();
	const renderer = new marked.Renderer();
	renderer.code = ({ text, lang }) => {
		const language = lang && hl.getLoadedLanguages().includes(lang as never) ? lang : 'text';
		return hl.codeToHtml(text, { lang: language, theme: 'github-light' });
	};
	return await marked.parse(md, { renderer });
}

export async function renderQuestionContent(question: QuizQuestion): Promise<RenderedQuestion> {
	const [questionHtml, patternHtml, ...optionParts] = await Promise.all([
		renderMarkdownHighlighted(question.question),
		renderMarkdownHighlighted(question.pattern),
		...question.options.flatMap((opt) => [
			renderMarkdownHighlighted(opt.value),
			renderMarkdownHighlighted(opt.rationale)
		])
	]);

	const options: RenderedOption[] = [];
	for (let i = 0; i < question.options.length; i++) {
		options.push({
			valueHtml: optionParts[i * 2],
			rationaleHtml: optionParts[i * 2 + 1]
		});
	}

	return { questionHtml, patternHtml, options };
}

export function prepareQuestions(questions: QuizQuestionRaw[]): QuizQuestion[] {
	return questions;
}

// --- Signature ---

const SALT = 'sq-laravel-2026';

function djb2(input: string): number {
	let hash = 5381;
	for (let i = 0; i < input.length; i++) {
		hash = ((hash << 5) + hash + input.charCodeAt(i)) & 0xffffffff;
	}
	return Math.abs(hash);
}

export function generateSignature(score: number, total: number, name: string): string {
	return djb2(`${SALT}:${score}:${total}:${name}`).toString(36);
}

// --- Share URL ---

export function encodeShareData(score: number, total: number, name: string): string {
	const trimmedName = name.trim();
	const payload: SharePayload = {
		s: score,
		t: total,
		v: generateSignature(score, total, trimmedName)
	};
	if (trimmedName) payload.n = trimmedName;
	return btoa(JSON.stringify(payload))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export function decodeShareData(encoded: string): SharePayload | null {
	try {
		const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
		const json = atob(padded);
		const payload = JSON.parse(json) as SharePayload;
		const expectedSig = generateSignature(payload.s, payload.t, payload.n || '');
		if (payload.v !== expectedSig) return null;
		return payload;
	} catch {
		return null;
	}
}

export function buildShareURL(score: number, total: number, name: string): string {
	const encoded = encodeShareData(score, total, name);
	const url = new URL(window.location.href.split('?')[0]);
	url.searchParams.set('sq', encoded);
	return url.toString();
}

// --- Source Icons ---

export type SourceType = 'github' | 'laravel' | 'symfony' | 'other';

export function getSourceType(url: string): SourceType {
	if (url.includes('github.com')) return 'github';
	if (url.includes('laravel.com')) return 'laravel';
	if (url.includes('symfony.com') || url.includes('cs.symfony.com')) return 'symfony';
	return 'other';
}

// --- localStorage ---

const STORAGE_KEY = 'sq-laravel-quiz';

export function loadQuizState(): StoredQuizState | null {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return null;
		return JSON.parse(stored) as StoredQuizState;
	} catch {
		return null;
	}
}

export function saveQuizState(state: StoredQuizState): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// localStorage might be full or disabled
	}
}

// --- GA4 Tracking ---

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

function trackEvent(eventName: string, params: Record<string, unknown>) {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', eventName, params);
	}
}

export function trackQuizAnswer(
	questionId: string,
	questionText: string,
	correct: boolean,
	answerValue: string,
	completionPct: number
) {
	trackEvent('quiz_answer', {
		question_id: questionId,
		question_text: questionText.substring(0, 100),
		correct,
		answer_value: answerValue.substring(0, 100),
		completion_pct: Math.round(completionPct)
	});
}

export function trackQuizComplete(score: number, total: number) {
	trackEvent('quiz_complete', {
		score,
		total,
		score_pct: Math.round((score / total) * 100)
	});
}

export function trackQuizShare(hasName: boolean, score: number, total: number) {
	trackEvent('quiz_share', { has_name: hasName, score, total });
}

// --- Score Calculation ---

export function calculateScore(
	answers: Record<string, number>,
	questions: QuizQuestionRaw[]
): number {
	return questions.filter((q) => {
		if (q.skipScore) return false;
		const selectedIdx = answers[q.id];
		if (selectedIdx === undefined) return false;
		return q.options[selectedIdx]?.is_status_quode === true;
	}).length;
}

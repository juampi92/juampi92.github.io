<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { dev } from '$app/environment';
	import { page } from '$app/state';

	const GITHUB_REPO = 'https://github.com/juampi92/juampi92.github.io';

	let slug = $derived(page.data?.post?.slug ?? null);
	let isPost = $derived(slug !== null);
	let githubUrl = $derived(isPost ? `${GITHUB_REPO}/blob/main/posts/${slug}/index.md` : GITHUB_REPO);
	let githubLabel = $derived(isPost ? 'View source' : 'Source on GitHub');

	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/400-italic.css';
	import '@fontsource/merriweather/700-italic.css';
	import '@fontsource/montserrat/900.css';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if !dev}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-FKJEWDM5N9"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'G-FKJEWDM5N9');
		</script>
	{/if}
</svelte:head>

<div class="mx-auto max-w-3xl bg-[--bg] px-8 py-16 text-[--text]">
	<header class="mb-2 flex flex-row place-content-between items-center">
		<a
			href="/"
			class="inline-block text-2xl font-sans font-black text-[--title] no-underline hover:no-underline"
		>
			Juampi's Blog
		</a>
		<a 
			href="https://github.com/juampi92" 
			target="_blank"
			rel="noopener noreferrer"
			class="hover:opacity-80 transition-opacity"
		>
			<img 
				src="/avatar.png" 
				alt="Avatar" 
				class="w-10 h-10 rounded-full"
				style="border-radius: 50%;"
			/>
		</a>
	</header>
	<main class="min-h-[65vh]">
		<slot />
	</main>
	<footer class="mt-24 pt-8 border-t text-sm opacity-60" style="border-color: var(--border);">
		<div class="flex justify-between items-center">
			<div class="flex gap-4">
				{#if isPost}
					<a href="/">← Home</a>
				{/if}
				<a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
			</div>
			<a href={githubUrl} target="_blank" rel="noopener noreferrer">{githubLabel}</a>
		</div>
	</footer>
</div>

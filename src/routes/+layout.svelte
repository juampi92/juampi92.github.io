<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';

	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/400-italic.css';
	import '@fontsource/merriweather/700-italic.css';
	import '@fontsource/montserrat/900.css';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
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
		<p class="text-center m-0">
			Built with <a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer">SvelteKit</a>
		</p>
	</footer>
</div>

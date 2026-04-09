<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:image" content="/blog/{data.post.slug}/{data.post.thumbnail_image}" />
</svelte:head>

<article>
	<header class="mb-10">
		<h1 class="text-[2.25rem] leading-tight font-sans font-black text-[--title] mb-4">
			{data.post.title}
		</h1>
		<p class="text-sm opacity-50 m-0">
			{formatDate(data.post.date)}
		</p>
	</header>

	<div class="prose">
		{#if data.PostContent}
			<svelte:component this={data.PostContent} />
		{:else}
			<p>Post content could not be loaded.</p>
		{/if}
	</div>
</article>


<script lang="ts">
	import type { PageData } from './$types';
	import Link from '$lib/components/Link.svelte';

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
	<title>Juampi's Blog</title>
	<meta name="description" content="Just another blog" />
</svelte:head>

<div class="flex flex-col gap-16">
	{#each data.posts as post (post.slug)}
		<article>
			<Link href="/blog/{post.slug}/" className="block group">
				<h2 class="text-3xl font-sans font-black leading-tight mb-2 text-[--title] group-hover:text-[--link] transition-colors">
					{post.title}
				</h2>
			</Link>
			<p class="text-sm mb-3 opacity-50">
				{formatDate(post.date)}
			</p>
			<p class="text-[17px] leading-relaxed opacity-90">{post.description}</p>
		</article>
	{/each}
</div>

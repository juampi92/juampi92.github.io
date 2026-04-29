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
	<title>Juampi Barreto</title>
	<meta name="description" content="I write mainly about software." />
</svelte:head>

<div class="flex flex-col gap-5">
	{#each data.posts as post (post.slug)}
		<article>
			<Link href="/blog/{post.slug}/" className="block group">
				<h2 class="text-2xl font-sans leading-tight text-[--title] group-hover:text-[--link] transition-colors">
					{post.title}
				</h2>
			</Link>
			<p class="text-sm opacity-50">
				{formatDate(post.date)}
			</p>
		</article>
	{/each}
</div>

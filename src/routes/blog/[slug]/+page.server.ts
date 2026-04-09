import { getPost, getPosts } from '$lib/posts';

export const prerender = true;

// Tell SvelteKit which slugs to generate at build time
export async function entries() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
	const post = await getPost(params.slug);
	return { post };
}


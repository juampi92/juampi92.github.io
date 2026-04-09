import { getListedPosts } from '$lib/posts';

export async function load() {
	const posts = await getListedPosts();
	return { posts };
}


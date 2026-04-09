import { error } from '@sveltejs/kit';

export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	thumbnail_image: string;
	content?: string;
	is_archived?: boolean;
}

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/posts/*/index.md', { eager: true });
	const posts: Post[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.match(/\/posts\/(.+?)\/index\.md$/)?.[1];
		if (slug && module && typeof module === 'object' && 'metadata' in module) {
			const metadata = module.metadata as any;
			posts.push({
				slug,
				...metadata,
				thumbnail_image: metadata.thumbnail_image?.replace(/^\.\//, '') || metadata.thumbnail_image
			});
		}
	}

	posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
	return posts;
}

export async function getListedPosts(): Promise<Post[]> {
	const allPosts = await getPosts();
	return allPosts.filter(post => !post.is_archived);
}

export async function getPost(slug: string): Promise<Post> {
	const modules = import.meta.glob('/posts/*/index.md', { eager: true });
	const modulePath = `/posts/${slug}/index.md`;
	
	const module = modules[modulePath];
	if (!module || typeof module !== 'object' || !('metadata' in module)) {
		throw error(404, 'Post not found');
	}
	
	const metadata = module.metadata as any;
	return {
		slug,
		...metadata,
		thumbnail_image: metadata.thumbnail_image?.replace(/^\.\//, '') || metadata.thumbnail_image
	} as Post;
}


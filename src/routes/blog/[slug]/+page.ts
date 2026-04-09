import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	// Dynamically import the MDsveX component (runs in browser)
	let PostContent;
	try {
		const modules = import.meta.glob('/posts/*/index.md');
		const modulePath = `/posts/${params.slug}/index.md`;
		
		if (modules[modulePath]) {
			const module = await modules[modulePath]();
			PostContent = (module as any).default;
		}
	} catch (e) {
		console.error('Failed to load post content:', e);
		PostContent = null;
	}

	return {
		...data,
		PostContent
	};
};


import { Feed } from 'feed';
import { getListedPosts } from './posts';

export const metadata = {
	title: 'My Blog',
	description: 'A blog powered by SvelteKit',
	author: {
		name: 'Your Name',
		email: 'your.email@example.com',
		link: 'https://yourblog.com/'
	}
};

export async function generateFeed() {
	const posts = await getListedPosts();
	const site_url = 'https://yourblog.com/';

	const feedOptions = {
		author: metadata.author,
		description: metadata.description,
		favicon: `${site_url}favicon.ico`,
		feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
		generator: 'Feed for Node.js',
		id: site_url,
		link: site_url,
		title: metadata.title
	};

	const feed = new Feed(feedOptions as any);

	for (const post of posts) {
		feed.addItem({
			date: new Date(post.date),
			description: post.description,
			id: `${site_url}blog/${post.slug}/`,
			link: `${site_url}blog/${post.slug}/`,
			title: post.title
		});
	}

	return feed;
}


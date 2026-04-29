import { Feed } from 'feed';
import { getListedPosts } from './posts';

export const SITE_URL = 'https://barreto.jp/';

export const metadata = {
	title: "Juampi Barreto",
	description: 'I write mainly about software.',
	author: {
		name: 'Juan Pablo Barreto',
		email: 'juampi92@gmail.com',
		link: SITE_URL
	}
};

export async function generateFeed() {
	const posts = await getListedPosts();
	const site_url = SITE_URL;

	const feedOptions = {
		author: metadata.author,
		description: metadata.description,
		favicon: `${site_url}favicon.ico`,
		feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
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


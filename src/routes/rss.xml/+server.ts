import { generateFeed } from '$lib/feeds';

export const prerender = true;

export async function GET() {
	const feed = await generateFeed();
	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}


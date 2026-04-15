import { SITE_URL } from '$lib/feeds';
import { getListedPosts } from '$lib/posts';

export const prerender = true;

export async function GET() {
	const posts = await getListedPosts();

	const urls = [
		{ loc: SITE_URL, priority: '1.0' },
		...posts.map((post) => ({
			loc: `${SITE_URL}blog/${post.slug}/`,
			lastmod: post.date,
			priority: '0.8'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ loc, lastmod, priority }) => `\t<url>
\t\t<loc>${loc}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}
\t\t<priority>${priority}</priority>
\t</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

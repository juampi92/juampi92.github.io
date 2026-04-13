import { defineMDSveXConfig } from 'mdsvex';
import { createHighlighter } from '@svelte-dev/pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkSmartypants from 'remark-smartypants';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from './src/lib/markdown/external-links.js';

export default defineMDSveXConfig({
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: createHighlighter({
			theme: 'github-light',
			keepBackground: true
		})
	},
	remarkPlugins: [remarkSmartypants, remarkGfm],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: { className: 'linked-heading' }
			}
		],
		rehypeExternalLinks
	]
});

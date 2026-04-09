import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for post assets during prerendering
				// These are copied by the Vite plugin after prerendering
				if (path.match(/\/(.*?)\/(.*?\.(jpg|jpeg|png|gif|webp|svg))$/)) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;

// @ts-nocheck
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// Plugin to copy post assets (images, etc.) to build output
function copyPostAssets() {
	return {
		name: 'copy-post-assets',
		
		// For development mode: prevent 404s by serving from posts/ if file exists
		configureServer(server) {
			server.middlewares.use((req, res, next) => {

				// Match pattern: /blog/slug/filename (would 404 otherwise)
				const match = req.url?.match(/^\/blog\/([^\/\?]+)\/([^\/\?]+)$/);
				
				if (match) {
					const slug = match[1];
					const filename = match[2];
					const filePath = join('posts', slug, filename);

					console.log(filePath);
					
					try {
						// Try to read from posts/ - if this fails, continue to normal routing (which 404s)
						const content = readFileSync(filePath);
						const ext = filename.split('.').pop()?.toLowerCase();
						
						// Set appropriate content type based on extension
						const contentTypes: Record<string, string> = {
							'jpg': 'image/jpeg',
							'jpeg': 'image/jpeg',
							'png': 'image/png',
							'gif': 'image/gif',
							'webp': 'image/webp',
							'svg': 'image/svg+xml',
							'js': 'text/javascript',
							'css': 'text/css',
							'json': 'application/json',
							'md': 'text/markdown'
						};
						
						res.statusCode = 200;
						res.setHeader('Content-Type', contentTypes[ext || ''] || 'application/octet-stream');
						res.end(content);
						return;
					} catch (e) {
						// File doesn't exist in posts/, let normal routing handle it (will 404)
						console.log('File does not exist');
					}
				}
				next();
			});
		},

		// For preview mode: prevent 404s by serving from build/ if file exists
		configurePreviewServer(server) {
			server.middlewares.use((req, res, next) => {
				const match = req.url?.match(/^\/blog\/([^\/\?]+)\/([^\/\?]+)$/);
				
				if (match) {
					const slug = match[1];
					const filename = match[2];
					const filePath = join('build', 'blog', slug, filename);
					
					try {
						const content = readFileSync(filePath);
						const ext = filename.split('.').pop()?.toLowerCase();
						
						const contentTypes: Record<string, string> = {
							'jpg': 'image/jpeg',
							'jpeg': 'image/jpeg',
							'png': 'image/png',
							'gif': 'image/gif',
							'webp': 'image/webp',
							'svg': 'image/svg+xml',
							'js': 'text/javascript',
							'css': 'text/css',
							'json': 'application/json',
							'md': 'text/markdown'
						};
						
						res.statusCode = 200;
						res.setHeader('Content-Type', contentTypes[ext || ''] || 'application/octet-stream');
						res.end(content);
						return;
					} catch (e) {
						// Let normal routing handle it
					}
				}
				next();
			});
		},
		
		// For production build: copy assets to build directory
		closeBundle() {
			const postsDir = 'posts';
			const outDir = 'build/blog';
			
			// For each post directory
			const postDirs = readdirSync(postsDir, { withFileTypes: true })
				.filter(entry => entry.isDirectory())
				.map(entry => entry.name);
			
			for (const postSlug of postDirs) {
				const srcDir = join(postsDir, postSlug);
				const destDir = join(outDir, postSlug);
				
				mkdirSync(destDir, { recursive: true });
				
				// Copy all files EXCEPT index.md
				const files = readdirSync(srcDir, { withFileTypes: true });
				for (const file of files) {
					if (file.isFile() && file.name !== 'index.md') {
						copyFileSync(
							join(srcDir, file.name),
							join(destDir, file.name)
						);
					}
				}
			}
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), copyPostAssets()],
	server: {
		fs: {
			allow: ['posts']  // Allow Vite to process /posts/ directory
		}
	}
});

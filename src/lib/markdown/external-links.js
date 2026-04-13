import { visit } from 'unist-util-visit';

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function getRelTokens(value) {
	if (Array.isArray(value)) {
		return value.flatMap((item) => getRelTokens(item));
	}

	if (typeof value === 'string') {
		return value.split(/\s+/).filter(Boolean);
	}

	return [];
}

/**
 * Strict-relative markdown links are treated as internal.
 *
 * @param {unknown} href
 * @returns {boolean}
 */
function isInternalMarkdownHref(href) {
	if (typeof href !== 'string' || href.length === 0) {
		return false;
	}

	if (href.startsWith('#')) {
		return true;
	}

	if (href.startsWith('./') || href.startsWith('../')) {
		return true;
	}

	return href.startsWith('/') && !href.startsWith('//');
}

/**
 * @returns {(tree: import('hast').Root) => void}
 */
export default function rehypeExternalLinks() {
	/**
	 * @param {import('hast').Root} tree
	 */
	function rehypeExternalLinksTransformer(tree) {
		visit(tree, 'element', /**
		 * @param {import('hast').Element} node
		 */ (node) => {
			if (node.tagName !== 'a' || !node.properties) {
				return;
			}

			const href = node.properties.href;
			if (typeof href !== 'string' || href.length === 0) {
				return;
			}

			if (isInternalMarkdownHref(href)) {
				return;
			}

			node.properties.target = '_blank';

			const relTokens = new Set([
				...getRelTokens(node.properties.rel),
				'noopener',
				'noreferrer'
			]);

			node.properties.rel = [...relTokens];
		});
	}

	return rehypeExternalLinksTransformer;
}

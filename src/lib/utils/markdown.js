import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

/**
 * Render Markdown with Syntax Highlighting
 * @param {string} content
 * @returns {string | Promise<string>} rendered HTML string with syntax highlighting
 */
export function renderMarkdown(content) {
	const md = marked(content);

	setTimeout(() => {
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightElement(block); // Apply syntax highlighting
		});
	}, 0);

	return md;
}

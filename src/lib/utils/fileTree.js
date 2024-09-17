export function buildFileTree(fileReviews) {
	const tree = {};

	fileReviews.forEach((file) => {
		const parts = file.filename.split('/');
		let current = tree;

		parts.forEach((part, index) => {
			if (!current[part]) {
				current[part] = {
					children: {},
					type: index === parts.length - 1 ? 'file' : 'folder',
					name: part,
					fileReview: index === parts.length - 1 ? file : null // Assign file review at leaf
				};
			}
			current = current[part].children;
		});
	});

	// After building the tree, collapse single-folder paths
	for (const key in tree) {
		collapseSingleFolders(tree[key]);
	}

	return tree;
}

// Collapse unnecessary folders that have only one child and are redundant (like "src/")
function collapseSingleFolders(node) {
	if (node.type === 'folder') {
		while (Object.keys(node.children).length === 1) {
			const childKey = Object.keys(node.children)[0];
			const child = node.children[childKey];
			if (child.type === 'folder') {
				node.name += '/' + child.name; // Merge folder names
				node.children = child.children; // Merge children
			} else {
				break; // Child is a file, cannot collapse further
			}
		}

		// Now process children recursively
		for (const key in node.children) {
			collapseSingleFolders(node.children[key]);
		}
	}
}

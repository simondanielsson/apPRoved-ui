import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

function constructUnifiedDiff(filename, patch) {
	return `
diff --git a/${filename} b/${filename}
index abcdef1..1234567 100644
--- a/${filename}
+++ b/${filename}
${patch}
  `;
}

export function renderDiff(filename, patch) {
	var diff = constructUnifiedDiff(filename, patch);

	const diffHtml = Diff2Html.html(diff, {
		drawFileList: true,
		matching: 'lines',
		outputFormat: 'side-by-side'
	});

	return diffHtml;
}

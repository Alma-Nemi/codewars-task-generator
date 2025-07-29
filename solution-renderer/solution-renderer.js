window.addEventListener('DOMContentLoaded', () => {
	const headerEl = document.getElementById('solutionHeader');
	const codeEl = document.getElementById('solution-code');
	const descriptionContent = document.getElementById('solutionHeader');

	let currentSolutionPath = null;

	// Loading the solution
	window.electronAPI.onSolutionPath(async (filePath) => {
		currentSolutionPath = filePath;
		if (!filePath) {
			headerEl.textContent = 'File not found.';
			codeEl.textContent = '';
			return;
		}

		try {
			const response = await fetch(`file://${filePath}`);
			if (!response.ok) throw new Error('Failed to load solution file');

			const text = await response.text();

			// Eliminating the headline from the commentary
			const headerMatch = text.match(/^\/\*([\s\S]*?)\*\//);
			if (headerMatch) {
				let rawHeader = headerMatch[1];

				rawHeader = rawHeader.replace(/\*\s*@\s*/g, '\n');

				const cleanedLines = rawHeader
					.split('\n')
					.map(line => line.trim())
					.filter(line => line.length > 0)
					.map(line => line.replace(/^\* ?/, '').trim());

				headerEl.innerHTML = cleanedLines.join('<br>');
			} else {
				headerEl.textContent = 'No header comment found.';
			}

			// Code without a title
			const codeWithoutHeader = text.replace(/^\/\*[\s\S]*?\*\//, '').trim();
			codeEl.textContent = codeWithoutHeader;

		} catch (err) {
			headerEl.textContent = 'Error loading solution.';
			codeEl.textContent = '';
			console.error(err);
		}
	});

	function updateToggleText() {
		const expanded = descriptionContent.classList.contains('expanded');
		descriptionToggle.textContent = expanded ? 'Collapse ▲' : 'Expand ▼';
		descriptionToggle.setAttribute('aria-expanded', expanded.toString());
	}

	descriptionToggle.addEventListener('click', () => {
		descriptionContent.classList.toggle('expanded');
		updateToggleText();
	});

	descriptionContent.addEventListener('click', () => {
		descriptionContent.classList.toggle('expanded');
		updateToggleText();
	});

	// Management buttons
	document.getElementById('exitBtn').addEventListener('click', () => {
		window.electronAPI.exitApp();
	});

	document.getElementById('backToArchiveBtn').addEventListener('click', () => {
		window.electronAPI.closeWindow();
	});

	document.getElementById('saveSolutionBtn').addEventListener('click', () => {
		const codeOnly = document.getElementById('solution-code').value;
		if (currentSolutionPath) {
			window.electronAPI.saveSolutionContent(currentSolutionPath, codeOnly);
		}
	});
});
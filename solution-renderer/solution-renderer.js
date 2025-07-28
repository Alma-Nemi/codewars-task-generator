// Function for switching the visibility of the description
function toggleDescription() {
	const content = document.getElementById('solutionHeader');
	content.classList.toggle('expanded');
}

window.addEventListener('DOMContentLoaded', () => {
	const headerEl = document.getElementById('solutionHeader');
	const codeEl = document.getElementById('solution-code');

	// When clicking on the description - switch its view
	headerEl.addEventListener('click', () => {
		toggleDescription();
	});

	// Loading the solution
	window.electronAPI.onSolutionPath(async (filePath) => {
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

				// If the description is long, turn it automatically
				const descriptionText = cleanedLines.join(' ');
				if (descriptionText.length > 350) {
					setTimeout(() => {
						toggleDescription();
					}, 100);
				}
			} else {
				headerEl.textContent = 'No header comment found.';
			}

			// Код без заголовка
			const codeWithoutHeader = text.replace(/^\/\*[\s\S]*?\*\//, '').trim();
			codeEl.textContent = codeWithoutHeader;

		} catch (err) {
			headerEl.textContent = 'Error loading solution.';
			codeEl.textContent = '';
			console.error(err);
		}
	});

	// Management buttons
	document.getElementById('exitBtn').addEventListener('click', () => {
		window.electronAPI.exitApp();
	});

	document.getElementById('backToArchiveBtn').addEventListener('click', () => {
		window.electronAPI.closeWindow();
	});
});

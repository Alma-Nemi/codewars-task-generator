window.addEventListener('DOMContentLoaded', () => {
	const headerEl = document.getElementById('solution-header');
	const codeEl = document.getElementById('solution-code');

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

			// Make a comment from the start of the file
			const headerMatch = text.match(/^\/\*([\s\S]*?)\*\//);
			if (headerMatch) {
				let rawHeader = headerMatch[1];

				rawHeader = rawHeader.replace(/\*\s*@\s*/g, '\n');

				const cleanedLines = rawHeader
					.split('\n')
					.map(line => line.trim())
					.filter(line => line.length > 0)
					.map(line => line.replace(/^\* ?/, '').trim());

				// Используем innerHTML с <br> для переноса строк
				headerEl.innerHTML = cleanedLines.join('<br>');
			} else {
				headerEl.textContent = 'No header comment found.';
			}

			// Remove the hat from the code
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

window.addEventListener('DOMContentLoaded', async () => {
	const headerEl = document.getElementById('solutionHeader');
	const codeEl = document.getElementById('solution-code');
	const descriptionContent = document.getElementById('solutionHeader');
	const descriptionToggle = document.getElementById('descriptionToggle');

	let currentSolutionPath = null;

	// Get path from URL query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const filePath = urlParams.get('path');
	currentSolutionPath = filePath;

	if (!filePath) {
		headerEl.textContent = 'File path not provided.';
		codeEl.textContent = '';
		return;
	}

	// Loading the solution
	try {
		const response = await fetch(`/api/solution?path=${encodeURIComponent(filePath)}`);
		if (!response.ok) throw new Error('Failed to load solution file');
		const data = await response.json();
		const text = data.content;

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
		codeEl.value = codeWithoutHeader;

	} catch (err) {
		headerEl.textContent = 'Error loading solution.';
		codeEl.textContent = '';
		console.error(err);
	}

	function updateToggleText() {
		if (!descriptionToggle) return;
		const expanded = descriptionContent.classList.contains('expanded');
		descriptionToggle.textContent = expanded ? 'Collapse ▲' : 'Expand ▼';
		descriptionToggle.setAttribute('aria-expanded', expanded.toString());
	}

	if (descriptionToggle) {
		descriptionToggle.addEventListener('click', () => {
			descriptionContent.classList.toggle('expanded');
			updateToggleText();
		});
	}

	descriptionContent.addEventListener('click', () => {
		descriptionContent.classList.toggle('expanded');
		updateToggleText();
	});

	// Management buttons
	document.getElementById('backToArchiveBtn').addEventListener('click', () => {
		window.location.href = '/archive';
	});

	document.getElementById('toGeneratorBtn').addEventListener('click', () => {
		window.location.href = '/';
	});

	document.getElementById('saveSolutionBtn').addEventListener('click', async () => {
		const codeOnly = document.getElementById('solution-code').value;
		if (currentSolutionPath) {
			try {
				const response = await fetch('/api/solution/save', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ filePath: currentSolutionPath, codeOnly })
				});
				const result = await response.json();
				if (result.success) {
					alert('✅ Решение успешно сохранено!');
				} else {
					alert(`❌ Ошибка при сохранении: ${result.error}`);
				}
			} catch (err) {
				alert(`❌ Ошибка при сохранении: ${err.message}`);
			}
		}
	});
});
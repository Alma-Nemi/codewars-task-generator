const archiveContainer = document.getElementById('archiveContainer');
const filterLevel = document.getElementById('filterLevel');
const refreshBtn = document.getElementById('refreshBtn');
const exitBtn = document.getElementById('exitBtn');
const totalCountEl = document.getElementById('totalCount');
const backToGenBtn = document.getElementById('backToGenBtn');

let allData = [];

async function loadArchive() {
	archiveContainer.innerHTML = '<p>⏳ Loading archive...</p>';

	try {
		const res = await fetch('../meta/solutions.json');
		if (!res.ok) throw new Error('Failed to load archive meta');
		allData = await res.json();

		const selectedLevel = filterLevel.value.toLowerCase();
		let filtered = allData;
		if (selectedLevel !== 'all') {
			filtered = allData.filter(item => item.level.toLowerCase() === selectedLevel);
		}

		if (filtered.length === 0) {
			archiveContainer.innerHTML = '<p>No solutions found for this filter.</p>';
			totalCountEl.textContent = '';
			return;
		}

		const levelCounts = allData.reduce((acc, cur) => {
			acc[cur.level] = (acc[cur.level] || 0) + 1;
			return acc;
		}, {});

		const totalSolved = allData.length;
		const filteredInfo = selectedLevel === 'all' ? '' : ` | ${filtered.length} tasks shown`;
		totalCountEl.textContent = `Total: ${totalSolved} solutions${filteredInfo}`;

		const table = document.createElement('table');
		table.innerHTML = `
			<thead>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Level</th>
					<th>Description</th>
					<th class="center-col">Solution</th>
					<th>Date</th>
					<th class="center-col">Link</th>
				</tr>
			</thead>
			<tbody>
				${filtered.map(item => `
					<tr>
						<td>${item.id}</td>
						<td>${item.title.en}</td>
						<td>${item.level} (${levelCounts[item.level]})</td>
						<td>${item.description.en.length > 25 ? item.description.en.slice(0, 25) + '...' : item.description.en}</td>
						<td class="center-col">
  <a href="#" title="${item.path}" onclick="window.electronAPI.openSolution('${item.path.replace(/\\/g, '\\\\')}')">🗂️</a>
</td>
						<td>${item.date}</td>
						<td class="center-col"><a href="${item.link}" target="_blank">🔗</a></td>
					</tr>
				`).join('')}
			</tbody>
		`;

		archiveContainer.innerHTML = '';
		archiveContainer.appendChild(table);
	} catch (e) {
		archiveContainer.innerHTML = `<p style="color:red;">❌ Error loading archive:<br>${e.message}</p>`;
		totalCountEl.textContent = '';
	}
}

window.addEventListener('DOMContentLoaded', () => {
	loadArchive();

	refreshBtn.addEventListener('click', loadArchive);
	filterLevel.addEventListener('change', loadArchive);

	if (exitBtn) {
		exitBtn.addEventListener('click', () => {
			window.electronAPI?.exitApp?.();
		});
	}

	if (backToGenBtn) {
		backToGenBtn.addEventListener('click', () => {
			if (window?.electronAPI?.closeWindow) {
				window.electronAPI.closeWindow();
			} else {
				console.warn("❗ electronAPI.closeWindow not available");
			}
		});
	} else {
		console.warn("❗ backToGenBtn not found in DOM");
	}
});

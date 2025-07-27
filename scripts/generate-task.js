const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// --- Safe JSON loader ---
function safeLoadJSON(filePath) {
	if (!fs.existsSync(filePath)) return [];
	const raw = fs.readFileSync(filePath, 'utf-8');
	try {
		return JSON.parse(raw);
	} catch {
		return [];
	}
}

function normalizeLevel(rank) {
	if (!rank) return 'unknown-level';
	if (typeof rank === 'string') return rank.toLowerCase().replace(/\s+/g, '-');
	if (rank.name) return rank.name.toLowerCase().replace(/\s+/g, '-');
	return 'unknown-level';
}

function sanitizeTitle(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// --- Новая функция очистки описания ---
function cleanDescription(desc) {
	const lines = desc.split('\n');
	let cleanedLines = [];

	for (let line of lines) {
		line = line.trim();

		// Пропускаем только строки, начинающиеся с ~~~ (включая условия)
		if (line.startsWith('~~~')) {
			continue;
		}

		if (line.length > 0) {
			cleanedLines.push(line);
		}
	}

	return cleanedLines.join(' ');
}

async function fetchKataInfo(id) {
	const url = `https://www.codewars.com/api/v1/code-challenges/${id}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to get information about the task: ${id}`);
	return res.json();
}

async function updateMeta(entry) {
	const metaPath = path.resolve('meta', 'solutions.json');
	let meta = [];
	try {
		meta = safeLoadJSON(metaPath);
	} catch (err) {
		console.error('[FAIL] Meta file is damaged.');
		return;
	}

	const existingIndex = meta.findIndex(e => e.id === entry.id || e.path === entry.path);
	if (existingIndex !== -1) {
		meta[existingIndex] = entry;
	} else {
		meta.push(entry);
	}

	fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
	console.log('[SUCCESS] Meta updated.');
}

async function generateTask(id, code) {
	const data = await fetchKataInfo(id);
	const levelRaw = normalizeLevel(data.rank);
	const levelMeta = levelRaw.replace(/-/g, ' ');
	const slug = sanitizeTitle(data.slug || data.name || id);
	const titleEN = data.name || 'Unknown Title';

	// Очищаем описание от блоков ~~~
	const descriptionEN = cleanDescription(data.description || 'No description.');

	const baseDir = process.cwd();
	const levelFolder = path.join(baseDir, levelRaw);
	if (!fs.existsSync(levelFolder)) fs.mkdirSync(levelFolder, { recursive: true });

	const today = new Date().toISOString().split('T')[0];
	const solutionPath = path.join(levelFolder, `${slug}.js`);

	const solutionContent = `/**
 * ID: ${id}
 * @link https://www.codewars.com/kata/${id}
 * @date ${today}
 * @lvl: ${levelMeta}
 * @title: ${titleEN}
 * @description: ${descriptionEN.replace(/\n/g, '\n *   ')}
 */

${code}
`;

	fs.writeFileSync(solutionPath, solutionContent, 'utf-8');
	console.log(`[SUCCESS] The solution is saved: ${solutionPath}`);

	await updateMeta({
		id,
		slug,
		level: levelMeta,
		title: { en: titleEN },
		description: {
			en: descriptionEN.split('\n')[0]
		},
		path: `${levelRaw}/${slug}.js`,
		date: today,
		link: `https://www.codewars.com/kata/${id}`
	});

	return {
		solutionPath,
		title: titleEN
	};
}

module.exports = generateTask;

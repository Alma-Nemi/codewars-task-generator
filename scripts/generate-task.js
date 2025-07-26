// scripts/generate-task.js
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
const { translate } = require('@vitalets/google-translate-api');

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

function translateLevelToRU(level) {
	return level.replace(/(\d+)\s*kyu/i, '$1 кю');
}

function sanitizeTitle(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fetchKataInfo(id) {
	const url = `https://www.codewars.com/api/v1/code-challenges/${id}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Не удалось получить информацию о задаче: ${id}`);
	return res.json();
}

async function updateMeta(entry) {
	const metaPath = path.resolve('meta', 'solutions.json');
	let meta = [];
	try {
		meta = safeLoadJSON(metaPath);
	} catch (err) {
		console.error('❌ META файл повреждён.');
		return;
	}

	const existingIndex = meta.findIndex(e => e.id === entry.id || e.path === entry.path);
	if (existingIndex !== -1) {
		meta[existingIndex] = entry;
	} else {
		meta.push(entry);
	}

	fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
	console.log('✅ Meta updated.');
}

function autoFixRawTests(raw, functionName) {
	if (!raw) return '';
	let fixed = raw;

	const testerRegex = /tester\(([^,]+?),\s*(.+?)\);?/g;
	fixed = fixed.replace(testerRegex, (_, input, expected) => {
		return `assert.strictEqual(${functionName}(${input.trim()}), ${expected.trim()});`;
	});

	fixed = fixed.replace(/(["'`])([^"'\n]*?)\1/g, (_, q, str) => {
		if (/\n/.test(str)) {
			return '`' + str.replace(/`/g, '\\`') + '`';
		}
		return q + str.replace(/\\?"/g, '\\"') + q;
	});

	fixed = fixed.replace(/expect\(([^)]+?)\)\.toBe\(([^)]+?)$/gm, (_, call, expected) => {
		return `expect(${call.trim()}).toBe(${expected.trim()});`;
	});

	fixed = fixed.replace(/\/\/.*$/gm, '');

	return fixed.trim();
}

function convertChaiToJest(raw, functionName) {
	if (!raw) return null;

	const lines = raw.split('\n');
	let testName = 'Sample tests';
	let insideIt = false;
	const tests = [];

	for (let line of lines.map(l => l.trim())) {
		if (line.startsWith('describe(')) {
			const match = line.match(/describe\((["'`])(.+?)\1/);
			if (match) testName = match[2];
		}
		if (line.startsWith('it(')) insideIt = true;

		if (insideIt && /assert\.strictEqual/.test(line)) {
			const match = line.match(/assert\.strictEqual\((.+?),\s*(.+?)\);?/);
			if (match) tests.push({ call: match[1].trim(), expected: match[2].trim() });
		}

		if (insideIt && line.startsWith('});')) insideIt = false;
	}

	if (tests.length === 0) return null;

	const blocks = tests.map(({ call, expected }, i) =>
		`  test('case #${i + 1}', () => {\n    expect(${call}).toBe(${expected});\n  });`
	).join('\n');

	return `describe('${testName}', () => {\n${blocks}\n});`;
}

async function generateTask(id, code, rawTests) {
	const data = await fetchKataInfo(id);
	const levelRaw = normalizeLevel(data.rank);
	const levelMeta = levelRaw.replace(/-/g, ' ');
	const levelRU = translateLevelToRU(levelMeta);
	const slug = sanitizeTitle(data.slug || data.name || id);
	const titleEN = data.name || 'Unknown Title';
	const functionName = slug.replace(/-/g, '_');
	const descriptionEN = (data.description || 'No description.').trim();

	let titleRU = '', descriptionRU = '';
	try {
		const translatedTitle = await translate(titleEN, { to: 'ru' });
		titleRU = translatedTitle?.text || titleEN;

		const translatedDesc = await translate(descriptionEN, { to: 'ru' });
		descriptionRU = translatedDesc?.text || '';
	} catch (err) {
		console.warn('❗ Не удалось перевести описание.');
		titleRU = titleEN;
	}

	const baseDir = process.cwd();
	const levelFolder = path.join(baseDir, levelRaw);
	const testFolder = path.join(baseDir, 'test');
	if (!fs.existsSync(levelFolder)) fs.mkdirSync(levelFolder, { recursive: true });
	if (!fs.existsSync(testFolder)) fs.mkdirSync(testFolder, { recursive: true });

	const today = new Date().toISOString().split('T')[0];
	const solutionPath = path.join(levelFolder, `${slug}.js`);
	const testPath = path.join(testFolder, `${slug}.test.js`);

	const solutionContent = `/**
 * ID: ${id}
 * @link https://www.codewars.com/kata/${id}
 * @date ${today}
 * @lvl: ${levelMeta}
 * @lvl.ru: ${levelRU}
 * @title: ${titleEN}
 * @title.ru: ${titleRU}
 * @description: ${descriptionEN.replace(/\n/g, '\n *   ')}
 * @description.ru: ${descriptionRU ? descriptionRU.replace(/\n/g, '\n *   ') : 'Описание недоступно.'}
 */

${code}

// Sample tests
const sampleTestsRaw = \`
${rawTests}
\`;

module.exports = {
  ${functionName},
  sampleTestsRaw
};`;

	// --- Обработка тестов ---
	const fixedRaw = autoFixRawTests(rawTests, functionName);
	let jestCode = fixedRaw ? convertChaiToJest(fixedRaw, functionName) : null;

	if (!jestCode) {
		jestCode = `describe('${titleEN}', () => {
  test('TODO: Add tests manually', () => {
    expect(true).toBe(true);
  });
});`;
	}

	const testContent = `const { ${functionName} } = require('../${levelRaw}/${slug}');

${jestCode}
`;

	fs.writeFileSync(solutionPath, solutionContent, 'utf-8');
	fs.writeFileSync(testPath, testContent, 'utf-8');

	console.log(`✅ Решение сохранено: ${solutionPath}`);
	console.log(`✅ Тест сохранён: ${testPath}`);

	await updateMeta({
		id,
		slug,
		level: levelMeta,
		title: { en: titleEN, ru: titleRU },
		description: {
			en: descriptionEN.split('\n')[0],
			ru: descriptionRU?.split('\n')[0] || ''
		},
		path: `${levelRaw}/${slug}.js`,
		date: today,
		link: `https://www.codewars.com/kata/${id}`
	});

	return {
		solutionPath,
		testPath,
		title: titleEN
	};
}

module.exports = generateTask;

const express = require('express');
const path = require('path');
const fs = require('fs');
const generateTask = require('./scripts/generate-task');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'generator-index.html'));
});

app.get('/archive', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'archive-index.html'));
});

app.get('/solution', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'solution-index.html'));
});

// API: Generate task
app.post('/api/generate-task', async (req, res) => {
  try {
    const { id, code } = req.body;
    if (!id || !code) {
      return res.status(400).json({ success: false, error: 'ID and code are required' });
    }
    const result = await generateTask(id, code);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get archive meta
app.get('/api/archive', (req, res) => {
  try {
    const metaPath = path.join(__dirname, 'meta', 'solutions.json');
    if (!fs.existsSync(metaPath)) {
      return res.json([]);
    }
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    res.json(meta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Get solution file
app.get('/api/solution', (req, res) => {
  try {
    const { path: filePath } = req.query;
    if (!filePath) {
      return res.status(400).json({ error: 'Path parameter is required' });
    }
    const absolutePath = path.resolve(__dirname, filePath);
    // Security check: ensure path is within project directory
    if (!absolutePath.startsWith(path.resolve(__dirname))) {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    const content = fs.readFileSync(absolutePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Save solution
app.post('/api/solution/save', (req, res) => {
  try {
    const { filePath, codeOnly } = req.body;
    if (!filePath || !codeOnly) {
      return res.status(400).json({ error: 'filePath and codeOnly are required' });
    }
    const absolutePath = path.resolve(__dirname, filePath);
    // Security check: ensure path is within project directory
    if (!absolutePath.startsWith(path.resolve(__dirname))) {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    const original = fs.readFileSync(absolutePath, 'utf-8');
    const headerMatch = original.match(/^\/\*[\s\S]*?\*\//);
    const header = headerMatch ? headerMatch[0] : '';
    const updated = `${header}\n\n${codeOnly.trim()}`;
    fs.writeFileSync(absolutePath, updated, 'utf-8');
    res.json({ success: true, message: 'Solution saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Generator: http://localhost:${PORT}/`);
  console.log(`🗃️  Archive: http://localhost:${PORT}/archive`);
});


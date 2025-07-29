const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const generateTask = require('./scripts/generate-task');

// Data storage path
app.setPath('userData', path.join(__dirname, 'user_data'));

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'generator-renderer', 'generator-index.html'));
  win.setMenu(null);
}

function createArchiveWindow() {
  const archiveWin = new BrowserWindow({
    width: 900,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // If it is used
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  archiveWin.loadFile(path.join(__dirname, 'archive-renderer', 'archive-index.html'));
  archiveWin.setMenu(null);
  return archiveWin;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Task generation processor
ipcMain.handle('generate-task', async (event, { id, code, rawTests }) => {
  try {
    const result = await generateTask(id, code, rawTests);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Archive window opening handler
ipcMain.handle('open-archive', () => {
  createArchiveWindow();
});

// Back to Generator handler
ipcMain.on('close-archive-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});

// Exit handler
ipcMain.on('app-exit', () => {
  app.quit();
});

// Open solution handler
ipcMain.on('open-solution', (event, relativeFilePath) => {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const solutionPage = path.join(__dirname, 'solution-renderer', 'solution-index.html');
  win.loadFile(solutionPage);
  win.setMenu(null);

  // Convert the relative path to absolute
  const absolutePath = path.resolve(__dirname, relativeFilePath);

  win.webContents.once('did-finish-load', () => {
    win.webContents.send('solution-path', absolutePath);
  });

  ipcMain.on('save-solution-content', (event, { filePath, codeOnly }) => {
    try {
      const original = fs.readFileSync(filePath, 'utf-8');
      const headerMatch = original.match(/^\/\*[\s\S]*?\*\//);
      const header = headerMatch ? headerMatch[0] : '';
      const updated = `${header}\n\n${codeOnly.trim()}`;
      fs.writeFileSync(filePath, updated, 'utf-8');
      console.log('[SUCCESS]: Solution saved:', filePath);
    } catch (err) {
      console.error('[ERROR]: Failed to save solution:', err);
    }
  });

});

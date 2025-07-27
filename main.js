const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
app.setPath('userData', path.join(__dirname, 'user_data'));
const generateTask = require('./scripts/generate-task');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('renderer/index.html');
  win.setMenu(null);
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

ipcMain.handle('generate-task', async (event, { id, code, rawTests }) => {
  try {
    const result = await generateTask(id, code, rawTests);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.on('app-exit', () => {
  app.quit();
});
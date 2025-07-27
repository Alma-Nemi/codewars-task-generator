const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generateTask: (payload) => ipcRenderer.invoke('generate-task', payload),
  exitApp: () => ipcRenderer.send('app-exit'),
  openArchive: () => ipcRenderer.invoke('open-archive'),
  closeWindow: () => ipcRenderer.send('close-archive-window'),
  openSolution: (filePath) => ipcRenderer.send('open-solution', filePath),
  onSolutionPath: (callback) => ipcRenderer.on('solution-path', (event, path) => callback(path)),
  loadArchiveMeta: () => ipcRenderer.invoke('load-archive-meta')
});

contextBridge.exposeInMainWorld('solutionAPI', {
  getSolutionPath: () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('solutionPath');
  }
});

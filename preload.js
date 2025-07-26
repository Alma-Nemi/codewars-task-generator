const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generateTask: (payload) => ipcRenderer.invoke('generate-task', payload)
});
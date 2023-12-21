const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('context', {
  onActiveChange: (callback) =>
    ipcRenderer.on('active-change', (_event, value) => {
      callback(value);
    }),
});

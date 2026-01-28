const { contextBridge, ipcRenderer } = require("electron");

console.log("✅ PRELOAD LOADED (CJS)");

contextBridge.exposeInMainWorld("api", {
  users: {
    getAll: () => ipcRenderer.invoke("users:getAll"),
    add: (name) => ipcRenderer.invoke("users:add", name),
  },
});
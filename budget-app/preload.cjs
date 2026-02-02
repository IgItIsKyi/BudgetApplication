const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  auth: {
    login: (email, password) =>
      ipcRenderer.invoke("auth:login", { email, password }),
    register: (name, email, password) =>
      ipcRenderer.invoke("auth:register", { name, email, password }),
    me: (token) => ipcRenderer.invoke("auth:me", token),
    logout: (token) => ipcRenderer.invoke("auth:logout", token),
  },
});

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Get all users
  getUsers: () => ipcRenderer.invoke("users:get"),

  // Get a single user by ID
  getUserById: (id: number) => ipcRenderer.invoke("user:getById", id),
});

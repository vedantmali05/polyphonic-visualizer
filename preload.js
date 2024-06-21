// Dependancies Requirements
const { contextBridge, ipcRenderer } = require("electron");

// Bridging UI process to Main process
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
})

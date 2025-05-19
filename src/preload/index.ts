import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  testIpcInvoke: () => ipcRenderer.invoke('test-ipc-invoke'),
  createWebSocketConnection: () => ipcRenderer.invoke('create-ws-connection'),
  sendWebSocketMessage: (socketId, message) =>
    ipcRenderer.invoke('send-ws-message', socketId, message),
  closeWebSocketConnection: (socketId) => ipcRenderer.invoke('close-ws-connection', socketId),
  onWebSocketMessage: (socketId, callback) => {
    ipcRenderer.on(`ws-message-${socketId}`, (_, data) => {
      callback(data);
    });
    return () => {
      ipcRenderer.off(`ws-message-${socketId}`, (_, data) => {
        callback(data);
      });
    };
  },
  onWebSocketOpen: (socketId, callback) => {
    ipcRenderer.on(`ws-connection-open-${socketId}`, callback);
    return () => {
      ipcRenderer.off(`ws-connection-open-${socketId}`, callback);
    };
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

export type WindowApiType = typeof api;

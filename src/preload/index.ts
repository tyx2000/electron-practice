import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
// 提供给HTML中以window.api.[function name]的方式调用
const api = {
  testIpcInvoke: () => ipcRenderer.invoke('test-ipc-invoke'),
  createWebSocketConnection: () => ipcRenderer.invoke('create-ws-connection'),
  sendWebSocketMessage: (socketId, message) =>
    ipcRenderer.invoke('send-ws-message', socketId, message),
  closeWebSocketConnection: (socketId) => ipcRenderer.invoke('close-ws-connection', socketId),
  onWebSocketMessage: (socketId, callback) => {
    // 监听 event.sender.send([name], arg)
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
  onWebSocketClosed: (socketId, callback) => {
    ipcRenderer.on(`ws-connection-closed-${socketId}`, callback);
  },
  uploadFileHandler: (callback) => {
    // ipcRender.invoke([name], arg) arg cannot be func !?
    ipcRenderer.invoke('upload-file');
    ipcRenderer.once('upload-success', callback);
    ipcRenderer.once('upload-error', callback);
  },
  createConferenceWindow: (socketId) => {
    ipcRenderer.invoke('create-conference-window', socketId);
  },
  onSignalingSocketId: (callback) =>
    ipcRenderer.on('signaling-socket-id', (_, socketId) => callback(socketId)),
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

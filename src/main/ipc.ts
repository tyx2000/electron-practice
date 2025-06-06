import { BrowserWindow, ipcMain } from 'electron';
import { closeWsConnection, initWsConnection, sendWsMessage } from './services/WebSocketService';
// import { AppUpdater } from 'electron-updater';
import { openPreviewWindow, uploadFile } from './services/UploadFileService';

// 在 window-ready-to-show 回调中注册，在 preload 中可以 ipcRenderer.invoke(name, arg) 方式触发
export function registerIpc(mainWindow: BrowserWindow, app: Electron.App) {
  // const appUpdater = new AppUpdater(mainWindow);

  // ipcMain.handle(触发标识，触发回调[可以接收invoke中的arg]),
  // 回调的第一个参数默认是 event
  ipcMain.handle('test-ipc-invoke', () => {
    console.log('test-ipc-invoke');
    return 123;
  });

  ipcMain.handle('create-ws-connection', initWsConnection);

  ipcMain.handle('send-ws-message', sendWsMessage);

  ipcMain.handle('close-ws-connection', closeWsConnection);

  ipcMain.handle('upload-file', uploadFile);

  ipcMain.handle('open-preview-window', openPreviewWindow);
}

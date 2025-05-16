import { BrowserWindow, ipcMain } from 'electron';
import { closeWsConnection, initWsConnection, sendWsMessage } from './services/WebSocketService';
// import { AppUpdater } from 'electron-updater';

export function registerIpc(mainWindow: BrowserWindow, app: Electron.App) {
  // const appUpdater = new AppUpdater(mainWindow);

  ipcMain.handle('test-ipc-invoke', () => {
    console.log('test-ipc-invoke');
    return 123;
  });

  ipcMain.handle('create-ws-connection', initWsConnection);

  ipcMain.handle('send-ws-message', sendWsMessage);

  ipcMain.handle('close-ws-connection', closeWsConnection);
}

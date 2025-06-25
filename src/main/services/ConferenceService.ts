import { BrowserWindow, ipcMain } from 'electron';
import icon from '../../../resources/icon.png?asset';
import { join } from 'path';

export const createConferenceWindow = (_, socketId) => {
  console.log('createConferenceW', socketId);
  const conferenceWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      sandbox: false,
    },
  });

  conferenceWindow.on('ready-to-show', () => {
    conferenceWindow.show();

    ipcMain.handle('inter-invoke', (a, b, c) => {
      console.log('inter-invoke', a, b, c);
    });
  });

  conferenceWindow.loadFile(join(__dirname, '../../src/renderer/conference.html'));

  conferenceWindow.webContents.on('did-finish-load', () => {
    conferenceWindow.webContents.send('signaling-socket-id', { socketId });
  });
};

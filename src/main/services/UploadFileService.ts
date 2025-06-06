import * as fs from 'fs';
import { BrowserWindow, dialog } from 'electron';
import { join } from 'path';

export const uploadFile = async (event, callback) => {
  try {
    const filePath = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
    });

    if (!filePath.canceled) {
      const formData = new FormData();
      console.log(filePath.filePaths);
      // callback(filePath);
      console.log('=========', callback);

      filePath.filePaths.forEach((filePath) => {
        const fileStream = fs.createReadStream(filePath);
        formData.append('files', fileStream);
      });

      // const res = await upload

      event.sender.send('upload-success', 'upload-success');
    }
  } catch (error) {
    console.log('upload-failed', error);
    event.sender.send('upload-error', error.message);
  }
};

export const openPreviewWindow = async (event, url) => {
  console.log({ url });
  const previewWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: true,
      preload: join(__dirname, '../../preload/index.ts'),
    },
  });

  previewWindow.loadURL(url);

  // const content = previewWindow.webContents;

  // content.on('did-start-loading', () => {
  //   console.log('start loading');
  // });

  // content.on('did-frame-finish-load', (event, isMainFrame) => {
  //   console.log({ isMainFrame });
  // });

  // content.on('did-finish-load', () => {
  //   console.log('page loaded');

  //   content.executeJavaScript(`document.title = 'modified by electron'`);
  // });

  // previewWindow.on('closed', () => {
  //   console.log('preview window closed');
  // });
};

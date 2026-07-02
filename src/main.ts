import { app, BrowserWindow, Menu } from 'electron';

import path from 'node:path';
import started from 'electron-squirrel-startup';

import { createMenu } from './browser/menu'
import { enableShortcuts } from './browser/hotkeys'
import { APP_CONFIG } from './config/app'
import { startAutoUpdateCheck } from './app/update'

if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: APP_CONFIG.width,
    height: APP_CONFIG.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(APP_CONFIG.website.url);

  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenu(mainWindow)))

  enableShortcuts(mainWindow)

  if (APP_CONFIG.isConsoleOpened) {
    mainWindow.webContents.openDevTools();
  }
};

app.on('ready', () => {
  startAutoUpdateCheck();
  createWindow();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

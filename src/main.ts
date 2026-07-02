import { app, BrowserWindow, Menu } from 'electron';
import { updateElectronApp } from 'update-electron-app';

import path from 'node:path';
import started from 'electron-squirrel-startup';

import { createMenu } from './browser/menu'
import { enableShortcuts } from './browser/hotkeys'
import { APP_CONFIG } from './config/app'

let updateCheckStarted = false;

const startAutoUpdateCheck = () => {
  if (updateCheckStarted) {
    return;
  }

  updateCheckStarted = true;
  updateElectronApp({
    repo: 'Ca-tt/codelevels-app',
    updateInterval: '30 minutes',
    notifyUser: false,
  });
};

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
  // Menu.
  enableShortcuts(mainWindow)
  startAutoUpdateCheck();

  if (APP_CONFIG.isConsoleOpened) {
    mainWindow.webContents.openDevTools();
  }
};


app.on('ready', createWindow);


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

// and load the index.html of the app.
// if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
//   mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
// } else {
//   mainWindow.loadFile(
//     path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
//   );
// }
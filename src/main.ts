import { app, autoUpdater, BrowserWindow, Menu } from 'electron';

import path from 'node:path';
import started from 'electron-squirrel-startup';

import { createMenu } from './browser/menu'
import { enableShortcuts } from './browser/hotkeys'
import { APP_CONFIG } from './config/app'
import { startAutoUpdateCheck } from './app/update'

import { showOverlayText } from './browser/overlay'


if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let pendingUpdateOverlay = false;

const showPendingUpdateOverlay = () => {
  if (!mainWindow) {
    pendingUpdateOverlay = true;
    return;
  }

  if (mainWindow.webContents.isLoadingMainFrame()) {
    pendingUpdateOverlay = true;
    return;
  }

  pendingUpdateOverlay = false;
  showOverlayText(mainWindow);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: APP_CONFIG.width,
    height: APP_CONFIG.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(APP_CONFIG.website.url);

  mainWindow.webContents.once('did-finish-load', () => {
    if (pendingUpdateOverlay) {
      showPendingUpdateOverlay();
    }
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenu(mainWindow)))

  enableShortcuts(mainWindow)

  if (APP_CONFIG.isConsoleOpened) {
    mainWindow.webContents.openDevTools();
  }
  
  // if (APP_CONFIG.isDevelopment) {
  //   showOverlayText(mainWindow)
  // }
};

autoUpdater.on('update-downloaded', () => {
  showPendingUpdateOverlay();
});

app.on('ready', () => {
  createWindow();
  startAutoUpdateCheck();
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

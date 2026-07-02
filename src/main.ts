import { app, autoUpdater, BrowserWindow, Menu } from 'electron';

import path from 'node:path';
import started from 'electron-squirrel-startup';

import { createMenu } from './browser/menu'
import { enableShortcuts } from './browser/hotkeys'
import { APP_CONFIG } from './config/app'
import { startAutoUpdateCheck } from './app/update'

if (started) {
  app.quit();
}

const OVERLAY_TEXT = 'Update is ready. It will be installed in the background';
const OVERLAY_CLOSE_DELAY_MS = 12000;

let mainWindow: BrowserWindow | null = null;

const showOverlayText = (window: BrowserWindow) => {
  const css = `
    .electron-top-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 44px;
      padding: 8px 14px;
      background: rgba(15, 23, 42, 0.95);
      color: #f8fafc;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.01em;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      pointer-events: auto;
    }

    .electron-top-banner__close {
      border: 1px solid rgba(255, 255, 255, 0.25);
      background: transparent;
      color: #ffffff;
      border-radius: 999px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.2;
    }

    .electron-top-banner__close:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  `;

  void window.webContents.executeJavaScript(`
    (() => {
      if (document.getElementById('electron-top-banner')) return;

      const style = document.createElement('style');
      style.id = 'electron-top-banner-style';
      style.textContent = ${JSON.stringify(css)};
      document.head.appendChild(style);

      const banner = document.createElement('div');
      banner.id = 'electron-top-banner';
      banner.className = 'electron-top-banner';

      const text = document.createElement('span');
      text.textContent = ${JSON.stringify(OVERLAY_TEXT)};
      banner.appendChild(text);

      const closeButton = document.createElement('button');
      closeButton.className = 'electron-top-banner__close';
      closeButton.type = 'button';
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
        banner.remove();
        style.remove();
      });
      banner.appendChild(closeButton);

      document.body.appendChild(banner);

      window.setTimeout(() => {
        banner.remove();
        style.remove();
      }, ${OVERLAY_CLOSE_DELAY_MS});
    })();
  `);
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

  // mainWindow.webContents.on('did-finish-load', () => {
  //   if (mainWindow) {
  //     showOverlayText(mainWindow);
  //   }
  // });

  mainWindow.loadURL(APP_CONFIG.website.url);

  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenu(mainWindow)))

  enableShortcuts(mainWindow)

  if (APP_CONFIG.isConsoleOpened) {
    mainWindow.webContents.openDevTools();
  }
};

autoUpdater.on('update-downloaded', () => {
  if (mainWindow) {
    showOverlayText(mainWindow);
  }
});

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

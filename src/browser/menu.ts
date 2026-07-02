import { app, dialog, type BrowserWindow } from 'electron'
import { navigateWindow, resizeWindow, toggleFullScreen } from './hotkeys'

import { APP_CONFIG } from '../config/app'

export function createMenu(window: BrowserWindow) {
  return [
    {
      label: "Menu",
      submenu: [
        {
          label: "Quit",
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : APP_CONFIG.hotkeys.close,
          click: () => {
            window.close()
          }
        }
      ]
    },
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Back',
          accelerator: process.platform === 'darwin' ? 'Cmd+[' : APP_CONFIG.hotkeys.back,
          click: () => navigateWindow(window, 'back')
        },
        {
          label: 'Forward',
          accelerator: process.platform === 'darwin' ? 'Cmd+]' : APP_CONFIG.hotkeys.forward,
          click: () => navigateWindow(window, 'forward')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: APP_CONFIG.hotkeys.fullscreen,
          click: () => toggleFullScreen(window)
        },
        {
          label: 'Normal Size',
          accelerator: APP_CONFIG.hotkeys.defaultSize,
          click: () => resizeWindow(window, APP_CONFIG.width, APP_CONFIG.height)
        },
        {
          label: 'Reading Mode',
          accelerator: APP_CONFIG.hotkeys.mobile,
          click: () => resizeWindow(window, APP_CONFIG.mobileWidth, APP_CONFIG.mobileHeight)
        },
      ]
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'Version',
          click: () => {
            dialog.showMessageBox(window, {
              title: 'CodeLevels.net desktop app',
              message: `${app.getName()}.net desktop app`,
              detail: `Current version: ${app.getVersion()}`
            })
          }
        }
      ]
    },
  ]
}

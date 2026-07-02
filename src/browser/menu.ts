import { app, dialog, type BrowserWindow } from 'electron'
import { navigateWindow } from './hotkeys'

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
          accelerator: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left',
          click: () => navigateWindow(window, 'back')
        },
        {
          label: 'Forward',
          accelerator: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
          click: () => navigateWindow(window, 'forward')
        }
      ]
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'Version',
          click: () => {
            dialog.showMessageBox(window, {
              title: 'About CodeLevels.net',
              message: `${app.getName()}.net`,
              detail: `App version: ${app.getVersion()}`
            })
          }
        }
      ]
    },
  ]
}

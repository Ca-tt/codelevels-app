import type { BrowserWindow } from 'electron'
import { navigateWindow } from './hotkeys'

import { APP_CONFIG } from '../config/app'

export function createMenu(win: BrowserWindow) {
  return [
    {
      label: "Menu",
      submenu: [
        {
          label: "Quit",
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : APP_CONFIG.hotkeys.close,
          click: () => {
            win.close()
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
          click: () => navigateWindow(win, 'back')
        },
        {
          label: 'Forward',
          accelerator: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
          click: () => navigateWindow(win, 'forward')
        }
      ]
    }
  ]
}

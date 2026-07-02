import type { BrowserWindow } from 'electron'

import { APP_CONFIG } from './../config/app'

export function navigateWindow(win: BrowserWindow, direction: 'back' | 'forward') {
  const history = win.webContents.navigationHistory

  if (direction === 'back' && history.canGoBack()) {
    history.goBack()
  } else if (direction === 'forward' && history.canGoForward()) {
    history.goForward()
  }
}

export function resizeWindow(win: BrowserWindow, width: number, height: number) {
  win.setFullScreen(false)
  win.setSize(width, height)
  win.center()
}

export function toggleFullScreen(win: BrowserWindow) {
  win.setFullScreen(!win.isFullScreen())
}

function enableHotkey(
  is_hotkey_available: boolean,
  event: { preventDefault: () => void },
  action: () => void
) {
  if (is_hotkey_available) {
    event.preventDefault()
    action()
  }
}

export function enableShortcuts(win: BrowserWindow) {
  win.webContents.on('before-input-event', (event, input) => {
    const isBackShortcut =
      (input.alt && (input.key === 'ArrowLeft' || input.key === 'Left')) ||
      (input.control && input.key === '[')

    const isForwardShortcut =
      (input.alt && (input.key === 'ArrowRight' || input.key === 'Right')) ||
      (input.control && input.key === ']')

    const isCloseShortcut = input.control && input.key.toLowerCase() === 'w'
    const isReloadShortcut = input.control && input.key.toLowerCase() === 'r'
    const isFullScreenShortcut = input.alt && input.key.toLowerCase() === 'f'
    const isMobileShortcut = input.alt && input.key.toLowerCase() === 'm'

    enableHotkey(isBackShortcut, event, () => navigateWindow(win, 'back'))
    enableHotkey(isForwardShortcut, event, () => navigateWindow(win, 'forward'))
    enableHotkey(isReloadShortcut, event, () => win.webContents.reload())
    enableHotkey(isCloseShortcut, event, () => win.close())
    enableHotkey(isFullScreenShortcut, event, () => toggleFullScreen(win))
    enableHotkey(isMobileShortcut, event, () => resizeWindow(win, APP_CONFIG.mobileWidth, APP_CONFIG.mobileHeight))
  })
}

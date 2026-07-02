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

    if (isBackShortcut) {
      event.preventDefault()
      navigateWindow(win, 'back')
    }

    else if (isForwardShortcut) {
      event.preventDefault()
      navigateWindow(win, 'forward')
    }
    
    else if (isReloadShortcut) {
      event.preventDefault()
      win.webContents.reload()
    }

    else if (isCloseShortcut) {
      event.preventDefault()
      win.close()
    }

    else if (isFullScreenShortcut) {
      event.preventDefault()
      toggleFullScreen(win)
    }

    else if (isMobileShortcut) {
      event.preventDefault()
      resizeWindow(win, APP_CONFIG.mobileWidth, APP_CONFIG.mobileHeight)
    }
  })
}

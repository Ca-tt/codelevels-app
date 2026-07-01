import type { BrowserWindow } from 'electron'

export function navigateWindow(win: BrowserWindow, direction: 'back' | 'forward') {
  const history = win.webContents.navigationHistory

  if (direction === 'back' && history.canGoBack()) {
    history.goBack()
  } else if (direction === 'forward' && history.canGoForward()) {
    history.goForward()
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

    if (isBackShortcut) {
      event.preventDefault()
      navigateWindow(win, 'back')
    } else if (isForwardShortcut) {
      event.preventDefault()
      navigateWindow(win, 'forward')
    } else if (isReloadShortcut) {
      event.preventDefault()
      win.webContents.reload()
    } else if (isCloseShortcut) {
      event.preventDefault()
      win.close()
    }
  })
}

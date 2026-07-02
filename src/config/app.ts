import { app } from 'electron';

export const APP_CONFIG = {
    isConsoleOpened: false,

    /* default size */
    width: 1300,
    height: 750,

    /* mobile */
    mobileWidth: 500,
    mobileHeight: 850,

    hotkeys: {
        back: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left',
        forward: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
        close: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
        fullscreen: process.platform === 'darwin' ? 'Option+F' : 'Alt+F',
        mobile: process.platform === 'darwin' ? 'Option+M' : 'Alt+R',
        defaultSize: process.platform === 'darwin' ? 'Option+D' : 'Alt+D'
    },

    website: {
        url: 'https://codelevels.net/projects/',
        title: 'CodeLevels'
    },

    updateMessage: {
        text: 'Update is ready. It will be installed in the background',
        closeDelay: 20000,
        buttonText: 'Okay',
    },

    isDevelopment: !app.isPackaged,
}

export default APP_CONFIG

export const APP_CONFIG = {
    isConsoleOpened: false,

    /* default size */
    width: 1300,
    height: 750,

    /* mobile */
    mobileWidth: 550,
    mobileHeight: 850,

    hotkeys: {
        back: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left',
        forward: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
        close: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
        fullscreen: process.platform === 'darwin' ? 'Option+F' : 'Alt+F',
        mobile: process.platform === 'darwin' ? 'Option+M' : 'Alt+M',
        defaultSize: process.platform === 'darwin' ? 'Option+D' : 'Alt+D'
    },

    website: {
        url: 'https://codelevels.net/projects/',
        title: 'CodeLevels'
    },
}

export default APP_CONFIG

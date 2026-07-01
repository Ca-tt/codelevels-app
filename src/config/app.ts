export const APP_CONFIG = {
    isConsoleOpened: false,

    width: 1300,
    height: 800,

    hotkeys: {
        back: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left',
        forward: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
        close: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W'
    },

    website: {
        url: 'https://codelevels.net/projects/',
        title: 'CodeLevels'
    },
}

export default APP_CONFIG

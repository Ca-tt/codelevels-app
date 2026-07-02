import { type BrowserWindow } from 'electron';
import { APP_CONFIG } from '../config/app';

function showOverlayText(window: BrowserWindow) {
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
      text.textContent = ${JSON.stringify(APP_CONFIG.updateMessage.text)};
      banner.appendChild(text);

      const closeButton = document.createElement('button');
      closeButton.className = 'electron-top-banner__close';
      closeButton.type = 'button';
      closeButton.textContent = ${JSON.stringify(APP_CONFIG.updateMessage.buttonText)};
      closeButton.addEventListener('click', () => {
        banner.remove();
        style.remove();
      });
      banner.appendChild(closeButton);

      document.body.appendChild(banner);

      window.setTimeout(() => {
        banner.remove();
        style.remove();
      }, ${APP_CONFIG.updateMessage.closeDelay});
    })();
  `);
}

export { showOverlayText };
import { updateElectronApp } from 'update-electron-app';

const UPDATE_REPOSITORY = 'Ca-tt/codelevels-app';

let updateCheckStarted = false;

export const startAutoUpdateCheck = () => {
  if (updateCheckStarted) {
    return;
  }

  updateCheckStarted = true;

  updateElectronApp({
    repo: UPDATE_REPOSITORY,
    updateInterval: '120 minutes',
    notifyUser: false,
  });
};


# electron-react-boilerplate-2019

## How to use

### `yarn install-all`
Electron side deps will be installed then frontend side deps will be installed.

### `yarn dev`
You can use CRA dev mode in electron app. Electron app BrowserWindow will be created when `http://localhost:3000` will be available.

### `yarn fresh-prod-start`
Fresh frontend product will be built to `frontend/build` then be used.

### `yarn start`
Old buld product will be used in `frontend/build`.

## How this repository was created

**STEP 1:** `electron-quick-start`

- Clone the Quick Start repository `$ git clone https://github.com/electron/electron-quick-start`
- Go into the repository `$ cd electron-quick-start`
- Install the dependencies `$ npm install` (and run `npm start`)

**STEP 2:** CRA

- `$ create-react-app frontend && cd frontend`
- Add `"homepage": "./"` to `frontend/package.json`
- Replace `mainWindow.loadFile('./index.html')` to `mainWindow.loadFile('./frontend/build/index.html')` in `main.js`
- Coment all in `preload.js`
- Add to `fontend/package.json` scripts: `"dev": "BROWSER=none react-scripts start",`
- Add to `package.json` scripts: `"dev": "cd frontend/ && yarn start & NODE_ENV=development electron .",`
- Add changes to `main.js`:
```javascript
if (!dev) {
  // and load the index.html of the app.
  mainWindow.loadFile('./frontend/build/index.html');
} else {
  mainWindow.loadURL('http://localhost:3000');
}
```
- Add file `polling-to-frontend.js` for have ability to check is `http://localhost:3000` available.
- Add code to `main.js` _(WAY 1 should be replaced to WAY 2)_.
```javascript
const axios = require('axios');

const createPollingByConditions = require('./polling-to-frontend').createPollingByConditions;
const CONFIG = {
  FRONTEND_DEV_URL: 'http://localhost:3000',
  FRONTEND_FIRST_CONNECT_INTERVAL: 4000,
  FRONTERN_FIRST_CONNECT_METHOD: 'get'
};
let connectedToFrontend = false;

// WAY 1: Without checking conditions.
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// WAY 2: Need to check something conditions.
// I'm gonna to check is CONFIG.FRONTEND_DEV_URL resource available then create window...
if (dev) {
  createPollingByConditions ({
    url: CONFIG.FRONTEND_DEV_URL,
    method: CONFIG.FRONTERN_FIRST_CONNECT_METHOD,
    toBeOrNotToBe: () => !connectedToFrontend,
    interval: CONFIG.FRONTEND_FIRST_CONNECT_INTERVAL,
    callbackAsResolve: () => {
      console.log(`SUCCESS! CONNECTED TO ${CONFIG.FRONTEND_DEV_URL}`);
      connectedToFrontend = true;

      createWindow();
    },
    callbackAsReject: () => {
      console.log(`FUCKUP! ${CONFIG.FRONTEND_DEV_URL} IS NOT AVAILABLE YET!`);
      console.log(`TRYING TO RECONNECT in ${CONFIG.FRONTEND_FIRST_CONNECT_INTERVAL / 1000} seconds...`);
    }
  });
} else {
  app.on('ready', createWindow);
}
```

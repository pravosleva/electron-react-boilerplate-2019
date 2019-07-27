// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const dev = process.env.NODE_ENV === 'development';
const axios = require('axios');

const createPollingByConditions = require('./polling-to-frontend').createPollingByConditions;
const CONFIG = {
  FRONTEND_DEV_URL: 'http://localhost:3000',
  FRONTEND_FIRST_CONNECT_INTERVAL: 4000,
  FRONTERN_FIRST_CONNECT_METHOD: 'get'
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let connectedToFrontend = false;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // show: false
  });

  if (!dev) {
    // and load the index.html of the app.
    mainWindow.loadFile('./frontend/build/index.html');
  } else {
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3000');
  }

  // if (true) {
  //   mainWindow.once('ready-to-show', () => {
  //     mainWindow.show();
  //   });
  // }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

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

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

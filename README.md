# electron-react-boilerplate-2019

## How to use

### `yarn install-all`
Electron side will be installed then frontend side will be installed.

### `yarn dev`
You can use CRA dev mode in electron app. **But!** Need to reload the app when `http://localhost:3000` will be ready. _We're working on it..._

### `yarn fresh-prod-start`
Fresh frontend will be built to `frontend/build` then be used.

### `yarn start`
Old product will be used in `frontend/build`.

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

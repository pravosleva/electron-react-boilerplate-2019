# electron-react-boilerplate-2019

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

const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');

const store = new Store();

const startUrl = url.format({
  pathname: path.join(__dirname, './build/index.html'),
  protocol: 'file:',
  slashes: true,
})

const devUrl = url.format({
  protocol: 'http',
  hostname: 'localhost',
  port: 3000,
})

const resourcePath = process.env.NODE_ENV === 'dev' ? __dirname : process.resourcesPath;

let win;
let closeJob;

const WIDTH = 400;
const SMALL_HEIGHT = 420;
const BIG_HEIGHT = 875;


const createWindow = () => {
  const bounds = store.get('pos');

  win = new BrowserWindow({
    x: bounds?.x,
    y: bounds?.y,
    width: WIDTH,
    height: SMALL_HEIGHT,
    frame: false,
    autoHideMenuBar: true,
    skipTaskbar: true,
    backgroundColor: '#00FFFFFF',
    transparent: true,
    resizable: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.on('blur', () => {
    closeJob = setTimeout(() => {
      win.setSize(WIDTH, SMALL_HEIGHT);
    }, 1000);
    win.webContents.send("active-change", false);
  });

  win.on('focus', () => {
    if (closeJob) {
      clearTimeout(closeJob);
    }
    win.setSize(WIDTH, BIG_HEIGHT);
    win.webContents.send("active-change", true);
  });

  win.on('close', () => {
    store.set('pos', win.getBounds());
  })

  win.loadURL(process.env.NODE_ENV === 'dev' ? devUrl : startUrl);
}

app.whenReady().then(() => {
  const tray = new Tray(path.join(resourcePath, 'assets', 'trayicon.png'));
  tray.setToolTip('그리숨었수.');
  const contextMenu = Menu.buildFromTemplate([
    { label: '닫기', type: 'normal', click: (menuItem, window, event) => {
      win.close();
    }},
    { label: '보기', type: 'normal', click: (menuItem, window, event) => {
      if (win !== undefined) {
        win.focus();
      }
    }},
  ])
  tray.setContextMenu(contextMenu);

  createWindow();
})

app.on('window-all-closed', () => {
  app.quit()
})
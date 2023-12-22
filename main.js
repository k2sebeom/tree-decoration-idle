const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const url = require('url');


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

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 875,
    frame: false,
    autoHideMenuBar: true,
    skipTaskbar: true,
    backgroundColor: '#00FFFFFF',
    transparent: true,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.on('blur', () => {
    closeJob = setTimeout(() => {
      win.setSize(400, 420);
    }, 1000);
    win.webContents.send("active-change", false);
  });

  win.on('focus', () => {
    if (closeJob) {
      clearTimeout(closeJob);
    }
    win.setSize(400, 875);
    win.webContents.send("active-change", true);
  });

  win.loadURL(process.env.NODE_ENV === 'dev' ? devUrl : startUrl);
}

app.whenReady().then(() => {
  const tray = new Tray(path.join(resourcePath, 'assets', 'trayicon.png'));
  tray.setToolTip('그리숨었수.');
  const contextMenu = Menu.buildFromTemplate([
    { label: '닫기', type: 'normal', click: (menuItem, window, event) => {
      app.quit();
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
  if (process.platform !== 'darwin') app.quit()
})
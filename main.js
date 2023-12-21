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

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 850,
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
    setTimeout(() => {
      win.setSize(400, 420);
    }, 1000);
    win.webContents.send("active-change", false);
  });

  win.on('focus', () => {
    win.setSize(400, 850);
    win.webContents.send("active-change", true);
  });

  win.loadURL(process.env.NODE_ENV === 'dev' ? devUrl : startUrl);
}

app.whenReady().then(() => {
  const tray = new Tray(path.join(resourcePath, 'assets', 'trayicon.png'));
  tray.setToolTip('Waiting for Christmas...');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', type: 'normal', click: (menuItem, window, event) => {
      app.quit()
    }},
  ])
  tray.setContextMenu(contextMenu);

  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
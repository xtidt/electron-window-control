const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow } = electron;
const windowManager = require('./node/electron-window-control/index');

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        // titleBarStyle: 'hidden',
    });

    mainWindow.loadURL(url.format({
        host: 'yunkai.com',
        protocol: 'http',
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

var electronControlDemo = function() {
    windowManager.init({
        'mode': 'main'
    }).then(() => {
        windowManager.bridge.init();

        windowManager.createWin({
            url: __dirname + '/node/electron-window-control/index.html'
        });
    });
}

app.on('ready', () => {
    createWindow();
});
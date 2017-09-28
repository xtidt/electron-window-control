const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow } = electron;
const windowManager = require('./node/electron-window-control/index');

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
    electronControlDemo();
});
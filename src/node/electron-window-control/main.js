const path = require('path');
const electron = require('electron');
const remote = electron.remote;
const windowManager = require('./index');



windowManager.init({
    'mode': 'render'
}).then(() => {
    windowManager.bridge.init();

    listenMessage();
});

function create() {
    var newpage = windowManager.createWin({
        url: __dirname + '/new.html'
    });
}

function getWindows() {
    console.log(windowManager.getAllWindows());
}

function getRenderWindows() {
    console.log(windowManager.getRenderWindows())
}

function showWindowByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    windowManager.showWindowByName(_target);
}

function hideWindowByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    windowManager.hideWindowByName(_target);
}

function closeWindowByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    windowManager.closeWindowByName(_target);
}

function fullScreenByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    windowManager.fullScreenByName(_target);
}


function getWindowByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    console.log(windowManager.getWindowByName(_target));
}

function focusWindowByName(name) {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }
    console.log(windowManager.focusWindowByName(_target));
}

function getFocusedWindow() {
    windowManager.getFocusedWindow();
}

function closeAllRenderWindows() {
    windowManager.closeAllRenderWindows();
}

function closeAllWindows() {
    windowManager.closeAllWindows();
}

function countRenderWindow() {
    console.log(windowManager.countRenderWindow());
}

//set global data
function setData() {
    windowManager.global.set('name', 'tony');
}

function getData() {
    console.log(windowManager.global.fetch('name'));
}

//ipc
function sendMessageToMainProgress() {
    windowManager.bridge.sendMessageToMainProgress('ping')
}

function sendMessageToRenderProgress() {
    var wins = windowManager.getRenderWindows();
    var _target = null;

    for (var key in wins) {
        _target = key
    }

    windowManager.bridge.sendMessageToRenderProgress(_target, 'pong');
}

function listenMessage() {
    windowManager.bridge.on(event, function(param) {
        console.log(param);
        document.getElementById('content').innerHTML = document.getElementById('content').innerHTML + '<br>' + param;
    });
}
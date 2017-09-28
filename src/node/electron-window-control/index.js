'use strict';

const Electron = require('electron');
const EventEmitter = new(require('events').EventEmitter);
const FileSystem = require('fs');
let Application, BrowserWindow;


/**
 * Creates a new Window instance
 * */
let Window = function(options) {
    this.options = {
        width: 800,
        height: 600,
        show: false,
        icon: 'favicon.ico'
    };

    if (typeof options == 'object') {
        this.options = Object.assign(this.options, options);
    } else {
        console.error('config error');
        return;
    }

    // // Register the window on the window manager
    // windowManager.windows[this.name] = this;

    this.object = new BrowserWindow({
        width: this.options.width,
        height: this.options.height,
        show: this.options.show,
        icon: this.options.icon
    })
};

Window.prototype.create = function() {
        this.object.loadURL(this.options.url);
        this.object.show();
        this.listener();
    }
    /**
     * regisiter event listener for windows
     */
Window.prototype.listener = function() {
    let _self = this;
    this.object.on('closed', function() {
        windowManager.eventEmitter.emit('closeOneWindow', _self.options)
        this.object = null;
    });
}


/**
 * The module interface
 * */
let windowManager = {
    /**
     * The event emitter
     * */
    'eventEmitter': EventEmitter,

    /**
     * The global configuration
     * */
    'config': {
        'appBase': null,
        'mode': 'render'
    },

    /**
     * The Window instances, stored by names
     * */
    'windows': {},

    /**
     * Initiate the module
     * @param config The configuration for the module
     * */
    'init': function(config) {
        let _self = this;
        let promise = new Promise(function(resolve, reject) {
            if (typeof config == 'object') {
                _self.config = Object.assign(_self.config, config);
            } else {
                console.error('config error');
            }

            //default type is render progress
            if (_self.config.mode == 'render') {
                Application = Electron.remote.app;
                BrowserWindow = Electron.remote.BrowserWindow;
            } else if (_self.config.mode == 'main') {
                Application = Electron.app;
                BrowserWindow = Electron.BrowserWindow;
            } else {}

            _self.eventsListenter();

            console.info('window manager init');
            resolve();
        });

        return promise;
    },

    /**
     * Create a new window instance. Check the Window object for documentation.
     **/
    'createWin': function(options) {
        // // Check if the window already exists
        if (!!options.name && this.windows[options.name]) {
            console.log('Window ' + options.name + ' already exists!');

            // Move the focus on it
            this.focusOn(options.name);
            return;
        }

        let defaultOptions = {
            name: utils.guid(),
            group: utils.guid()
        }
        defaultOptions = Object.assign(defaultOptions, options);
        let window = new Window(defaultOptions);
        window.create();
        this.windows[defaultOptions.name] = window;
    },

    /**
     * remove exists window
     */
    'removeWinByName': function(name) {
        let _self = this;
        for (let key in _self.windows) {
            if (name == key) {
                delete _self.windows[key];
            }
        }
    },

    /**
     * get all windows
     */
    'getAllWindows': function() {
        return BrowserWindow.getAllWindows();
    },

    /**
     * get render progress windows
     */
    'getRenderWindows': function() {
        return this.windows;
    },

    /**
     * return BrowserWindow instance
     */
    'getBrowserWindow': function() {
        return BrowserWindow;
    },

    /**
     * get renderWindow byname
     */
    'getWindowByName': function(name) {
        if (!name) {
            console.error('miss param');
            return;
        }

        return this.windows[name];
    },

    'getWindowById': function(id) {
        if (!id) {
            console.error('miss window id');
            return;
        }

        return BrowserWindow.fromId(id);
    },

    /**
     * show renderWindow byname
     */
    'showWindowByName': function(name) {
        let win = this.getWindowByName(name);
        if (!win) {
            console.error('does noe exist the win');
        } else {
            win.object.show();
        }
    },

    /**
     * hide renderWindow byname
     */
    'hideWindowByName': function(name) {
        let win = this.getWindowByName(name);
        if (!win) {
            console.error('does noe exist the win');
        } else {
            win.object.hide();
        }
    },

    /**
     * close renderWindow byname
     */
    'closeWindowByName': function(name) {
        let win = this.getWindowByName(name);
        if (!win) {
            console.error('does noe exist the win');
        } else {
            win.object.close();
        }
    },

    /**
     * toggle fullScreen window ByName or unfullScreen
     */
    'fullScreenByName': function(name) {
        let win = this.getWindowByName(name);
        if (!win) {
            console.error('does noe exist the win');
        } else {
            if (win.object.isMaximized()) {
                win.object.unmaximize()
            } else {
                win.object.maximize();
            }
        }
    },

    /**
     * get current window
     */
    'getFocusedWindow': function() {
        return BrowserWindow.getFocusedWindow();
    },


    /**
     * Focuses on a specific, by name
     * */
    'focusWindowByName': function(name) {
        let win = this.getWindowByName(name);
        if (!win) {
            console.error('does noe exist the win');
        } else {
            win.object.focus();
        }
    },

    /**
     * close All render windows include main progress
     */
    'closeAllRenderWindows': function() {
        let _self = this;
        let _total = this.countRenderWindow();
        let _numb = 0;
        let promise = new Promise(function(resolve, reject) {
            if (_total > 0) {
                for (let key in _self.windows) {
                    _self.getWindowByName(key).object.close();

                    if (++_numb >= _total) {
                        resolve();
                    }
                }
            } else {
                resolve();
            }
        })

        return promise;
    },

    /**
     * close main progress window
     */
    'closeMainProgressWindow': function() {
        let wins = this.getAllWindows();
        wins[0].close();
    },

    /**
     * close all windows
     */
    'closeAllWindows': function() {
        let _self = this;
        _self.closeAllRenderWindows().then(function() {
            _self.closeMainProgressWindow();
        });
    },


    'eventsListenter': function() {
        let _self = this;
        this.eventEmitter.on('closeOneWindow', function(param) {
            _self.removeWinByName(param.name);
        })
    },

    'countRenderWindow': function() {
        let _self = this,
            count = 0;
        for (let key in _self.windows) {
            if (_self.windows.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    },

    'global': {
        _data: {},

        /**
         * Sets a new key/value pair
         * */
        'set': function(key, value) {
            this._data[key] = value;
        },

        /**
         * Fetches a stored value from the data store, by the property name
         * @param key The key of the value
         * */
        'fetch': function(key) {
            return this._data[key];
        }
    },

    'bridge': {
        ipcHandler: null,
        init: function() {
            if (windowManager.config.mode == 'main') {
                this.ipcHandler = Electron.ipcMain;
            } else {
                this.ipcHandler = Electron.ipcRenderer;
            }

            console.info('init electron ipc');
        },

        sendMessageToMainProgress: function(message) {
            this.ipcHandler.send('messagefromRender', message);
        },

        sendMessageToRenderProgress: function(name, message) {
            if (typeof name == 'string') {
                windowManager.getWindowByName(name).object.webContents.send('message', message);
            } else if (typeof name == 'number') {
                windowManager.getWindowById(name).webContents.send('message', message);
            } else {}
        },

        on: function(event, callback) {
            this.ipcHandler.on('message', function(event, arg) {
                if (typeof callback == 'function') {
                    callback.call(null, arg);
                }
            });
        },

        once: function(event, callback) {
            this.ipcHandler.once('message', function(event, arg) {
                if (typeof callback == 'function') {
                    callback.call(null, arg);
                }
            });
        },

        removeAllListeners: function(event, handler) {
            this.ipcHandler.removeAllListeners(['message']);
        }
    }
}

/**
 * A bunch of tools/utilities for the module
 * */
let utils = {
    /**
     * create a uuid
     */
    guid: function(str) {
        let uuid = 'xxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        if (str) {
            return String(str) + '-' + uuid;
        }
        return uuid;
    }
};

module.exports = windowManager;
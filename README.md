# Electron Window Control
> electron 控制类

## Emitter 事件机制
> 继承于 Node Event模块(events.EventEmitter)

## config 配置表
- @param <String> appBase 当前目录地址
- @param <String> mode 渲染模式 默认为 render

## windows
> 所有渲染窗口 

## init 

> 初始化 window control 实例配置

- @param <Object> config

  ```
    windowManager.init({
      'mode': 'render' //默认渲染进程
    });
  ```

## createWin
> 新建一个窗口
- @param <Object> option { width:xxx }
- @param width <Integer> - 窗口宽度,单位像素. 默认是 800。
- @param height <Integer> - 窗口高度,单位像素. 默认是 600。
- @param x <Integer> - 窗口相对于屏幕的左偏移位置.默认居中。
- @param y <Integer> - 窗口相对于屏幕的顶部偏移位置.默认居中。
- @param useContentSize <Boolean> - width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认为 false。
- @param center <Boolean> - 窗口屏幕居中。
- @param minWidth <Integer> - 窗口最小宽度，默认为 0。
- @param minHeight <Integer> - 窗口最小高度，默认为 0。
- @param maxWidth <Integer> - 窗口最大宽度，默认无限制。
- @param maxHeight <Integer> - 窗口最大高度，默认无限制。
- @param resizable <Boolean> - 是否可以改变窗口size，默认为 true。
- @param movable <Boolean> - 窗口是否可以拖动. 在 Linux 上无效. 默认为 true。
- @param minimizable <Boolean> - 窗口是否可以最小化. 在 Linux 上无效. 默认为 true。
- @param maximizable <Boolean> - 窗口是否可以最大化. 在 Linux 上无效. 默认为 true。
- @param closable <Boolean> - 窗口是否可以关闭. 在 Linux 上无效. 默认为 true。
- @param alwaysOnTop <Boolean> - 窗口是否总是显示在其他窗口之前. 在 Linux 上无效. 默认为 false。
- @param fullscreen <Boolean> - 窗口是否可以全屏幕. 当明确设置值为When false ，全屏化按钮将会隐藏，在 OS X 将禁用. 默认 false。
- @param fullscreenable <Boolean> - 在 OS X 上，全屏化按钮是否可用，默认为 true。
- @param skipTaskbar <Boolean> - 是否在人物栏中显示窗口. 默认是false。
- @param kiosk <Boolean> - kiosk 方式. 默认为 false。
- @param title <String> - 窗口默认title. 默认 "Electron"。
- @param icon NativeImage - 窗口图标, 如果不设置，窗口将使用可用的默认图标。
- @param show <Boolean> - 窗口创建的时候是否显示. 默认为 true。
- @param frame <Boolean> - 指定 false 来创建一个 Frameless Window. 默认为 true。
- @param acceptFirstMouse <Boolean> - 是否允许单击web view来激活窗口。默认为 false。
- @param disableAutoHideCursor <Boolean> - 当 typing 时是否隐藏鼠标.默认 false。
- @param autoHideMenuBar <Boolean> - 除非点击 Alt，否则隐藏菜单栏.默认为 false。
- @param enableLargerThanScreen <Boolean> - 是否允许允许改变窗口大小大于屏幕. 默认是 false。
- @param backgroundColor <String> -窗口的 background color 值为十六进制，如 #66CD00 或 #FFF 或 #80FFFFFF (支持透明度)。默认为在 Linux 和 Windows 上为 #000 (黑色)，Mac上为 #FFF(或透明)。
- @param hasShadow <Boolean> - 窗口是否有阴影。只在 OS X 上有效. 默认为 true。
- @param darkTheme <Boolean> - 为窗口使用 dark 主题，只在一些拥有 GTK+3 桌面环境上有效. 默认为 false。
- @param transparent <Boolean> - 窗口透明。默认为 false。
- @param type <String> - 窗口type，默认普通窗口，下面查看更多。
- @param titleBarStyle <String> - 窗口标题栏样式，下面查看更多。
- @param webPreferences Object - 设置界面特性，下面查看更多。

```
windowManager.createWin({
    url: __dirname + '/new.html'
});
```

## removeWinByName

> 根据窗口name从栈中移除一个窗口对象

- @param <String> name

## getAllWindows

> 根据 BrowserWindow 实例获得所有 windows 实例

## getRenderWindows

> 获得所有渲染进程窗口

## getBrowserWindow

> 获得 BrowserWindow 实例

## getWindowByName

> 根据窗口name从栈中获得一个窗口对象

## getWindowById

> 根据窗口 id 从栈中获得一个窗口对象

## showWindowByName

> 根据窗口name显示渲染进程窗口

## hideWindowByName

> 根据窗口name隐藏渲染进程窗口

## closeWindowByName

> 根据窗口name关闭渲染进程窗口

## fullScreenByName

> 根据窗口name最大化窗口

## getFocusedWindow

> 返回应用当前获得焦点窗口,如果没有就返回 null.

## focusWindowByName

> 根据窗口name关闭渲染进程窗口

## closeAllRenderWindows

> 关闭所有渲染进程窗口

## closeMainProgressWindow

> 关闭主进程窗口

## closeAllWindows

> 关闭所有进程窗口

## countRenderWindow

> 计算所有渲染进程窗口数目

## 窗口共享数据

> 私有对象 _data 存取数据

## 设置共享数据

```
windowManager.global.set('name', 'tony');
```

## 获取共享数据

























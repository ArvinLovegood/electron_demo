const electron = require('electron')// Module to control application life.
const dialog = require('electron').dialog;


var app = electron.app // 控制应用生命周期的模块。
var BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
var Menu = electron.Menu;

//自定义应用的菜单
var template = [
  {
    label: '首选项',
    submenu: [
      {
        label: '重新加载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        type: 'separator'
      },
      {
        label: '返回主页',
        accelerator: 'CmdOrCtrl+H',
        click: function (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.loadURL('file://' + __dirname + '/index.html');
        }
      },
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: '重复',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '全屏切换',
        accelerator: (function () {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: '开发人员工具',
        accelerator: (function () {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      },
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
	    label: '工具',
	    role: 'window',
	    submenu: [
	              {
	                  label: '分段工具',
	                  accelerator: 'CmdOrCtrl+F1',
	                  click: function (item, focusedWindow) {
	                    if (focusedWindow)
	                      focusedWindow.loadURL('file://' + __dirname + '/fun.html');
	                  }
	                },
                  {
	                  label: '数据库',
	                  accelerator: 'CmdOrCtrl+F2',
	                  click: function (item, focusedWindow) {
	                    if (focusedWindow)
	                      focusedWindow.loadURL('file://' + __dirname + '/db.html');
	                  }
	                }
	    ]
	  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '官方网站',
        click: function () { require('electron').shell.openExternal('http://electron.atom.io') }
      },
      {
        label: '系统版本',
        click: function () {
          var msg = 'process.versions.node:' + process.versions.node + "\n" + "process.versions.chrome:" + process.versions.chrome + "\n" + "process.versions.electron:" + process.versions.electron;

          dialog.showMessageBox({ icon:require('electron').nativeImage.createFromPath('./res/images/info.png'),type: 'info', title: "版本信息", message: msg+"\n"+__dirname, buttons: ["OK"] });

        }
      },
    ]
  },
];

if (process.platform == 'darwin') {
  var name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({ width: 800, height: 700, title: '信息采集系统' });

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.loadURL('http://114.251.65.91:8080/bjtf_pf/bjtf_pf/front/sftj/sftj_front.jsp?p=sftj&kw=');

  // 打开开发工具
  //mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
});






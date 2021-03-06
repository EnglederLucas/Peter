// const fs = require("fs");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
require("electron-reload");
let mainWindow;
require("dotenv").config(); // const customTitlebar = require("custom-electron-titlebar");
const storage = require("electron-json-storage");

const ipc = electron.ipcMain;

function createWindow() {
  console.log("JOJO");

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      webviewTag: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
    // frame: false,
  });

  mainWindow.loadURL(
    isDev
      ? `http://localhost:${process.env.PORT || 3006}`
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // new customTitlebar.Titlebar({
  //   backgroundColor: customTitlebar.Color.fromHex("#f4f4f4"),
  // });

  mainWindow.removeMenu();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on("ready", function () {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on("save-new-service", function (event, arg) {
  storage.set("services", [arg], function (error) {
    if (error) throw error;
  });

  mainWindow.webContents.send("all-services", arg);
});

ipc.on("get-all-services", function (event, arg) {
  // win.webContents.send('targetPriceVal', arg)
  storage.get("services", (error, data) => {
    if (error) throw error;

    mainWindow.webContents.send("all-services", data[0] ? data[0] : []);
  });
});

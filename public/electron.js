const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

// const customTitlebar = require("custom-electron-titlebar");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: { webviewTag: true },
    // frame: false,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  // new customTitlebar.Titlebar({
  //   backgroundColor: customTitlebar.Color.fromHex("#f4f4f4"),
  // });

  mainWindow.removeMenu();
  // mainWindow.webContents.openDevTools();
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

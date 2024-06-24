import path from "path";
import { fork, ChildProcess } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
import {
  getFolders,
  addFolders,
  deleteFolders,
  deleteAllFolders,
} from "./main/db";
import { selectFolders } from "./main/files";
import { umzug } from "./main/schema";
import { requestPresignedURL } from "./main/api";

export interface WatcherConfig {
  folderPaths: string[];
  ignorePatterns: string[];
}

let mainWindow: BrowserWindow;
let watcherProcess: ChildProcess | null = null;
let URL: string;
let APIKey: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

function startWatcher(config: WatcherConfig) {
  watcherProcess?.kill();

  const watcherPath = path.join(__dirname, "watcher.js");
  watcherProcess = fork(watcherPath);
  watcherProcess.send(config);

  watcherProcess.on("message", (message) => {
    handleWatcherMessage(message);
  });
}

function handleWatcherMessage(message: any) {
  console.log("Message from watcher: ", message);
  const {type, data } = message;
  switch (type) {
    case "add":
      break;
    case "change":
      break;
    case "unlink":
      break;
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);
app.on("ready", async () => {
  ipcMain.handle("selectFolders", selectFolders);
  ipcMain.handle("getFolders", getFolders);
  ipcMain.handle("addFolders", (_event, folderPaths) =>
    addFolders(folderPaths),
  );
  ipcMain.handle("deleteFolders", (_event, folderPaths) =>
    deleteFolders(folderPaths),
  );
  ipcMain.handle("deleteAllFolders", deleteAllFolders);
  ipcMain.handle("startWatcher", (_event, config: WatcherConfig) =>
    startWatcher(config),
  );

  await umzug.up();

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  watcherProcess?.kill();

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

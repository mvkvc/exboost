import fs from "fs";
import os from "os";

export function getAppDir() {
  const homeDir = os.homedir();
  const appDir = `${homeDir}/.config/exboost`;
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir);
  }
  return appDir;
}

export function getDBPath() {
  const appDir = getAppDir();
  return `${appDir}/exboost.db`;
}

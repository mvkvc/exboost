import { WatcherConfig } from "./main/watcher";
import { Settings } from "./main/settings";

export interface IElectronAPI {
  selectFolders: () => Promise<string[]>;
  getFolders: () => Promise<string[]>;
  addFolders: (folderPaths: string[]) => Promise<void>;
  deleteFolders: (folderPaths: string[]) => Promise<void>;
  deleteAllFolders: () => Promise<void>;
  startWatcher: (config: WatcherConfig) => Promise<void>;
  startQueue: () => Promise<void>;
  resetSettings: () => Promise<Settings>;
  getSettings: () => Promise<Settings>;
  setSettings: (settings: Settings) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

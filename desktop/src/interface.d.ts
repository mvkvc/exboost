import { WatcherConfig } from "./main";

export interface IElectronAPI {
  selectFolders: () => Promise<string[]>;
  getFolders: () => Promise<string[]>;
  addFolders: (folderPaths: string[]) => Promise<void>;
  deleteFolders: (folderPaths: string[]) => Promise<void>;
  deleteAllFolders: () => Promise<void>;
  startWatcher: (config: WatcherConfig) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

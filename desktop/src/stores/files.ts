import { WatcherConfig } from "src/main";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

const DEFAULT_IGNORE_PATTERNS = ["*.jpg", "*.jpeg", "*.png", "*.gif"];

type State = {
  folderPaths: string[];
  ignorePatterns: string[];
};

type Actions = {
  setFolders: (folderPaths: string[]) => void;
  addFolders: (folderPaths: string[]) => void;
  deleteFolders: (folder: string[]) => void;
  resetIgnorePatterns: () => void;
  addIgnorePatterns: (ignorePatterns: string[]) => void;
  removeIgnorePatterns: (ignorePatterns: string[]) => void;
};

const useFilesStore = create<State & Actions>()(
  subscribeWithSelector(
    immer((set) => ({
      folderPaths: [],
      ignorePatterns: DEFAULT_IGNORE_PATTERNS,
      setFolders: (folderPaths: string[]) => {
        set((state) => {
          state.folderPaths = folderPaths;
        });
      },
      addFolders: (folderPaths: string[]) => {
        set((state) => {
          folderPaths.forEach((folderPath) => {
            if (state.folderPaths.findIndex((f) => f === folderPath) === -1) {
              state.folderPaths.push(folderPath);
            }
          });
        });
      },
      deleteFolders: (folderPaths: string[]) => {
        set((state) => {
          state.folderPaths = state.folderPaths.filter(
            (f) => !folderPaths.includes(f),
          );
        });
      },
      resetIgnorePatterns: () => {
        set((state) => {
          state.ignorePatterns = DEFAULT_IGNORE_PATTERNS;
        });
      },
      addIgnorePatterns: (ignorePatterns: string[]) => {
        set((state) => {
          state.ignorePatterns = [...state.ignorePatterns, ...ignorePatterns];
        });
      },
      removeIgnorePatterns: (ignorePatterns: string[]) => {
        set((state) => {
          state.ignorePatterns = state.ignorePatterns.filter(
            (ignorePattern) => !ignorePatterns.includes(ignorePattern),
          );
        });
      },
    })),
  ),
);

// Subscribe to changes in folderPaths or ignorePatterns
useFilesStore.subscribe(
  (state) => [state.folderPaths, state.ignorePatterns],
  async ([folderPaths, ignorePatterns]) => {
    const config: WatcherConfig = {
      folderPaths,
      ignorePatterns,
    };
    await window.electronAPI.startWatcher(config);
  },
);

export default useFilesStore;

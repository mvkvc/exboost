import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  folders: string[];
};

type Actions = {
  setFolders: (folders: string[]) => void;
  addFolders: (folder: string[]) => void;
  removeFolders: (folder: string[]) => void;
};

const useFilesStore = create<State & Actions>()(
  immer((set) => ({
    folders: [],
    setFolders: (folders: string[]) =>
      set((state) => {
        state.folders = folders;
      }),
    addFolders: (folders: string[]) =>
      set((state) => {
        folders.forEach((folder) => {
          if (state.folders.findIndex((f) => f === folder) === -1) {
            state.folders.push(folder);
          }
        });
      }),
    removeFolders: (folders: string[]) =>
      set((state) => {
        folders.forEach((folder) => {
          state.folders = state.folders.filter((f) => f !== folder);
        });
      }),
  })),
);

export default useFilesStore;

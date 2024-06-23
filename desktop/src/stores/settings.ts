import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_SERVER_URL = "https://exboost.replicantzk.com";

type State = {
  serverURL: string;
  serverAPIKey: string;
};

type Actions = {
  setServerURL: (serverURL: string) => void;
  setServerAPIKey: (serverAPIKey: string) => void;
};

const useSettingsStore = create<State & Actions>()(
  immer((set) => ({
    serverURL: DEFAULT_SERVER_URL,
    serverAPIKey: "",
    setServerURL: (serverURL: string) => {
      set((state) => {
        state.serverURL = serverURL;
      });
    },
    setServerAPIKey: (serverAPIKey: string) => {
      set((state) => {
        state.serverAPIKey = serverAPIKey;
      });
    },
  })),
);

export default useSettingsStore;

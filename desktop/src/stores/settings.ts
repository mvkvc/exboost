import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  serverURL: string;
  serverAPIKey: string;
  ignorePatterns: string[];
};

type Actions = {
  //   setServerURL: (serverURL: string) => void;
  //   setServerAPIKey: (serverAPIKey: string) => void;
  //   setIgnorePatterns: (ignorePatterns: string[]) => void;
  //   addIgnorePatterns: (ignorePatterns: string[]) => void;
  //   removeIgnorePatterns: (ignorePatterns: string[]) => void;
};

const useSettingsStore = create<State & Actions>()(
  immer((set) => ({
    serverURL: "exboost.replicantzk.com",
    serverAPIKey: "",
    ignorePatterns: [],
  })),
);

export default useSettingsStore;

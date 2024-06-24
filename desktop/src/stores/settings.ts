import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Settings, DEFAULT_SETTINGS } from "../utils/settings";

type State = Settings;

type Actions = {
  getSettings: () => Settings;
  setSettings: (settings: Partial<Settings>) => void;
};

const useSettingsStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      ...DEFAULT_SETTINGS,
      getSettings: () => get(),
      setSettings: (settings: Partial<Settings>) => {
        set((state) => {
          Object.assign(state, settings);
        });
      },
    })),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSettingsStore;

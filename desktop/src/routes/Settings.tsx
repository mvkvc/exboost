import React from "react";
import { useState } from "react";
import useSettingsStore from "../stores/settings";
import { Settings as TSettings, DEFAULT_SETTINGS } from "../utils/settings";

export default function Settings() {
  const getSettings = useSettingsStore((state) => state.getSettings);
  const setSettings = useSettingsStore((state) => state.setSettings);

  const [formData, setFormData] = useState(getSettings());
  const [savedSettings, setSavedSettings] = useState(getSettings());
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const settingsChanged = (oldSettings: TSettings, newSettings: TSettings) => {
    return Object.entries(newSettings).every(
      ([key, value]) => oldSettings[key as keyof TSettings] === value
    );
  };

  const handleReset = (event: any) => {
    event.preventDefault();

    const newSettings = {
      ...savedSettings,
      URL: DEFAULT_SETTINGS.URL,
      APIKey: DEFAULT_SETTINGS.APIKey,
    };

    setSettings(newSettings);
    setFormData(newSettings);
    setUnsavedChanges(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setSettings({ ...formData });

    setSavedSettings({ ...formData });
    setUnsavedChanges(false);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
    setUnsavedChanges(!settingsChanged(formData, newFormData));
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1>Settings</h1>
        <div className="flex flex-row space-x-2 items-center">
          <button onClick={handleSubmit} className="btn">
            Save
          </button>
          <button onClick={handleReset} className="btn">
            Reset
          </button>
          {unsavedChanges && (
            <p className="text-sm align-middle">You have unsaved changes.</p>
          )}
        </div>
        <form className="form-control w-full max-w-lg">
          <div className="flex items-center mb-4">
            <label className="label flex-none w-1/4" htmlFor="workerAPIKey">
              <span>API Key</span>
            </label>
            <input
              type="password"
              name="APIKey"
              value={formData.APIKey}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="label flex-none w-1/4" htmlFor="urlServer">
              <span>URL server</span>
            </label>
            <input
              type="text"
              name="URL"
              value={formData.URL}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
        </form>
      </div>
    </>
  );
}

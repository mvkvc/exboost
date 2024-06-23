import React from "react";
import useFilesStore from "../stores/files";

export default function Sources() {
  const folders = useFilesStore((state) => state.folders);
  const addFolders = useFilesStore((state) => state.addFolders);
  const removeFolders = useFilesStore((state) => state.removeFolders);
  const setFolders = useFilesStore((state) => state.setFolders);

  const handleSelectFolders = async () => {
    const paths = await window.electronAPI.selectFolders();
    addFolders(paths);
  };

  const handleDeleteFolders = async () => {
    setFolders([]);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1>Sources</h1>
        <div className="flex flex-row space-x-4">
          <button onClick={handleSelectFolders}>Add Folder</button>
          <button onClick={handleDeleteFolders}>Delete Folders</button>
        </div>
        {folders.map((folder) => (
          <div key={folder} className="flex flex-row space-x-4">
            <p>{folder}</p>
            <button onClick={() => removeFolders([folder])}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}

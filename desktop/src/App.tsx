import React from "react";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Error from "./routes/Error";
import Sources from "./routes/Sources";
import Settings from "./routes/Settings";
import useFilesStore from "./stores/files";
import { WatcherConfig } from "./main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Sources />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default function App() {
  const ignorePatterns = useFilesStore((state) => state.ignorePatterns);
  const setFolders = useFilesStore((state) => state.setFolders);

  const handleInit = async () => {
    const storedFolderPaths = await window.electronAPI.getFolders();
    if (storedFolderPaths.length >= 0) {
      setFolders(storedFolderPaths);
    }

    const config: WatcherConfig = {
      ignorePatterns: ignorePatterns,
      folderPaths: storedFolderPaths,
    };
    await window.electronAPI.startWatcher(config);
  };

  useEffect(() => {
    handleInit();
  }, []);

  return <RouterProvider router={router} />;
}

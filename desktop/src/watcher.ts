import * as chokidar from "chokidar";
import { WatcherConfig } from "./main";

let watcher: chokidar.FSWatcher;

process.on("message", (config: WatcherConfig) => {
  watcher?.close();

  watcher = chokidar.watch(config.folderPaths, {
    ignored: config.ignorePatterns,
    persistent: true,
    ignoreInitial: false,
  });

  watcher
    .on("add", (path) => process.send?.({ type: "add", path }))
    .on("change", (path) => process.send?.({ type: "change", path }))
    .on("unlink", (path) => process.send?.({ type: "unlink", path }));
});

process.on("disconnect", () => {
  if (watcher) {
    watcher.close();
  }
});

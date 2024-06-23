import crypto from "crypto";
import fs from "fs";
import { dialog, MessageChannelMain, MessagePortMain } from "electron";
import chokidar from "chokidar";

export async function selectFolders() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: [
      "openDirectory",
      // "multiSelections"
    ],
  });
  if (!canceled) {
    return filePaths;
  }
}

export async function addFolder(path: string) {
  const lastUpdated = new Date();
  const paths = await getFilesInFolder(path);
  const pathsWithHashes = await Promise.all(
    paths.map(async (path) => {
      const hash = await hashFile(path);
      return {
        path,
        hash,
        lastUpdated,
      };
    })
  );
  return pathsWithHashes;
}

export async function getFilesInFolder(
  path: string,
  ignorePatterns: string[] = []
): Promise<string[]> {
  const files = await fs.promises.readdir(path, {
    recursive: true,
  });

  return files.filter((file) => {
    ignorePatterns.some((pattern) => {
      return file.includes(pattern);
    });
  });
}

export async function hashFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(path);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

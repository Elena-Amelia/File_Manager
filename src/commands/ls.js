import { cwd } from "node:process";
import { resolve } from "node:path";
import { readdir } from "node:fs/promises";
import { showError, showLocation } from "../displaying.js";

export async function lsCommand() {
  try {
    const currentDir = resolve(cwd());
    const files = await readdir(currentDir, { withFileTypes: true });

    const dataDir = [];
    const dataFile = [];

    files.forEach((file) => {
      if (!file.isFile()) {
        dataDir.push({ Name: file.name, Type: "directory" });
      } else {
        dataFile.push({ Name: file.name, Type: "file" });
      }
    });

    const structData = [].concat(
      dataDir.sort((a, b) => {
        b - a;
      }),
      dataFile.sort((a, b) => {
        b - a;
      })
    );

    console.table(structData);
    showLocation();
  } catch (err) {
    showError();
  }
}

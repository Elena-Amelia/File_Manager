import fsPromises from "node:fs/promises";
import { showError, showLocation } from "../displaying.js";

export async function removeCommand(path) {
  try {
    await fsPromises.unlink(path);
    await showLocation();
  } catch (err) {
    showError();
    showLocation();
  }
}

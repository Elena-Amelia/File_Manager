import fsPromises from "node:fs/promises";
import { showError, showLocation } from "../displaying.js";

export async function removeCommand(path) {
  try {
    await fsPromises.unlink(path);
    console.log("The file has been deleted");
    showLocation();
  } catch (err) {
    showError();
    showLocation();
  }
}

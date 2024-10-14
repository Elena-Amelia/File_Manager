import { unlink } from "node:fs";
import { showError, showLocation } from "../displaying.js";

export async function removeCommand(path) {
  unlink(path, (err) => {
    if (err) {
      showError();
      showLocation();
      return;
    }
    showLocation();
  });
}

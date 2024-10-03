import { stat, rename } from "node:fs";
import { showError, showLocation, showWrongInput } from "../displaying.js";
import { resolve, basename, join } from "node:path";

export async function renameCommand(oldFilePath, newFileName) {
  if (!oldFilePath || !newFileName) {
    showWrongInput();
    showLocation();
    return;
  }

  const ind = resolve(oldFilePath).indexOf(basename(oldFilePath));
  const base = resolve(oldFilePath).slice(0, ind);
  const newFilePath = resolve(join(base, newFileName));

  stat(oldFilePath, (err) => {
    if (err) {
      showError();
      showLocation();
    } else {
      stat(newFilePath, (err) => {
        if (err) {
          rename(oldFilePath, newFilePath, (e) => {
            if (e) {
              showError();
              showLocation();
              return;
            }
            showLocation();
          });
        } else {
          showError();
          showLocation();
        }
      });
    }
  });
}

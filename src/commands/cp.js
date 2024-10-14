import { stat, createWriteStream, createReadStream } from "node:fs";
import { showError, showLocation, showWrongInput } from "../displaying.js";
import { resolve, basename, join } from "node:path";
import { removeCommand } from "./rm.js";
import { error } from "node:console";

export async function copyCommand(oldFilePath, newFileDir, isRemove = false) {
  if (!oldFilePath || !newFileDir) {
    showWrongInput();
    showLocation();
    return;
  }

  const newFilePath = resolve(join(newFileDir, basename(oldFilePath)));

  stat(oldFilePath, (err, data) => {
    if (err) {
      showError();
      showLocation();
    } else {
      if (!data.isFile()) {
        showError();
        showLocation();
      } else {
        stat(newFileDir, (err) => {
          if (err) {
            showError();
            showLocation();
          } else {
            const readableStream = createReadStream(oldFilePath);
            const writeableStream = createWriteStream(newFilePath);
            writeableStream.on("error", () => {
              showError();
              showLocation();
            });
            readableStream.pipe(writeableStream);
            readableStream.on("end", () => {
              if (isRemove === true) {
                removeCommand(oldFilePath);
              } else {
                showLocation();
              }
            });
          }
        });
      }
    }
  });
}

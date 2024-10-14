import { stat, createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream";
import { showWrongInput, showError, showLocation } from "../displaying.js";
import { resolve } from "node:path";

export async function compressCommand(filePath, destPath) {
  if (!filePath || !destPath) {
    showWrongInput();
    showLocation();
    return;
  }

  const validFilePath = resolve(filePath);
  const validDestPath = resolve(destPath);

  stat(validFilePath, (err, data) => {
    if (err) {
      showError();
      showLocation();
    } else {
      if (!data.isFile()) {
        showError();
        showLocation();
      } else {
        const readableStream = createReadStream(validFilePath);
        const writeableStream = createWriteStream(validDestPath);
        const brCom = createBrotliCompress();
        pipeline(readableStream, brCom, writeableStream, (err) => {
          if (err) {
            showError();
            showLocation();
          } else {
            showLocation();
          }
        });
      }
    }
  });
}

import { stat, createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { showWrongInput, showError, showLocation } from "../displaying.js";
import { resolve } from "node:path";

export async function decompressCommand(filePath, destPath) {
  if (!filePath || !destPath) {
    showWrongInput();
    showLocation();
    return;
  }

  const validFilePath = resolve(filePath);
  const validDestPath = resolve(destPath);

  stat(validFilePath, (err, data) => {
    if (err) {
      // console.error("Wrong path_to_file");
      showError();
      showLocation();
    } else {
      if (!data.isFile()) {
        // console.error("The file to compress doesn't exist");
        showError();
        showLocation();
      } else {
        const readableStream = createReadStream(validFilePath);
        const writeableStream = createWriteStream(validDestPath);
        const brCom = createBrotliDecompress();
        pipeline(readableStream, brCom, writeableStream, (err) => {
          if (err) {
            // console.error("Wrong path_to_destination");
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

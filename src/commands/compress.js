import fs from "node:fs/promises";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { showError, showLocation } from "../displaying.js";

export async function compressCommand(pathArr) {
  try {
    const input = await fs.createReadStream(pathArr[0].join(""));
    const output = await fs.createWriteStream(pathArr[1].join(""));
    console.log(input, output);
    input.pipe(createGzip().pipe(output));
  } catch (err) {
    err.message;
    showError();
    showLocation();
  }
}
// compress C:\Users\ELENA\text.txt C:\Users\ELENA\arch.gz

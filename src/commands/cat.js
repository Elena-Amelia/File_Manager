import fs from "node:fs";
import { EOL } from "node:os";
import { showError, showLocation } from "../displaying.js";

export async function catCommand(path) {
  fs.stat(path, (err, data) => {
    if (err) {
      showError();
      showLocation();
    } else {
      if (!data.isFile()) {
        showError();
        showLocation();
      } else {
        const input = fs.createReadStream(path);
        const output = process.stdout;
        input.pipe(output);
      }
    }
  });
}

// cat C:\Users\ELENA\text.txt

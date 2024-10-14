import { stat, createReadStream } from "node:fs";
import { EOL } from "node:os";
import { showError, showLocation } from "../displaying.js";

export async function catCommand(path) {
  stat(path, (err, data) => {
    if (err) {
      showError();
      showLocation();
    } else {
      if (!data.isFile()) {
        showError();
        showLocation();
      } else {
        const input = createReadStream(path);
        const output = process.stdout;
        input.pipe(output);
        input.on("end", () => {
          output.write(EOL);
          showLocation();
        });
      }
    }
  });
}

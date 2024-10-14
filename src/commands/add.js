import { stat, writeFile } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { showError, showLocation } from "../displaying.js";

export async function addCommand(fileName) {
  const filePath = resolve(cwd(), fileName);

  stat(filePath, (err) => {
    if (err) {
      writeFile(filePath, "", (err) => {
        if (err) {
          showError();
          showLocation();
        } else {
          showLocation();
        }
      });
    } else {
      showError();
      showLocation();
    }
  });
}

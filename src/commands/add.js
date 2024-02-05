import fs from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { showError, showLocation } from "../displaying.js";

export async function addCommand(fileName) {
  try {
    const filePath = resolve(cwd(), fileName);
    fs.writeFile(filePath, "", (err) => {
      if (err) {
        showError();
        showLocation();
      } else {
        showLocation();
      }
    });
  } catch (err) {
    showError();
    showLocation();
  }
}

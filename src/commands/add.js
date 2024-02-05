import fs from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { showError, showLocation } from "../displaying.js";

export async function addCommand(fileName) {
  const filePath = resolve(cwd(), fileName);
  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.log("Operation not permitted");
      showError();
      showLocation();
    } else {
      showLocation();
    }
  });
}

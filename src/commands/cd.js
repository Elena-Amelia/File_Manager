import { chdir } from "node:process";
import { resolve } from "node:path";
import { showError, showLocation } from "../displaying.js";

export async function cdCommand(path) {
  try {
    chdir(resolve(path));
    showLocation();
  } catch (err) {
    showError();
    showLocation();
  }
}

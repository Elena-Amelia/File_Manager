import { chdir } from "node:process";
import { showError, showLocation } from "../displaying.js";

export function upCommand() {
  try {
    chdir("..");
    showLocation();
  } catch (err) {
    showError();
  }
}

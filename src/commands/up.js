import { chdir } from "node:process";
import { showError, showLocation } from "../displaying.js";

export async function upCommand() {
  try {
    chdir("..");
    showLocation();
  } catch (err) {
    showError();
  }
}

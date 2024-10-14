import { chdir } from "node:process";
import { resolve } from "node:path";
import { showError, showLocation, showWrongInput } from "../displaying.js";
import { sep } from "node:path";

export async function cdCommand(path) {
  if (!path) showWrongInput();
  try {
    if (/^\w:$/.test(path)) {
      chdir(path + sep);
    } else {
      chdir(resolve(path));
    }
    showLocation();
  } catch (err) {
    showError();
    showLocation();
  }
}

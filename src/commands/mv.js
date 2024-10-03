import { showLocation, showWrongInput } from "../displaying.js";
import { copyCommand } from "./cp.js";

export async function moveCommand(oldFilePath, newFileDir) {
  copyCommand(oldFilePath, newFileDir, true);
}

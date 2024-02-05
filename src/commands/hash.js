import { readFile } from "node:fs/promises";

import { showError, showLocation } from "../displaying.js";
const { createHash } = await import("node:crypto");

export async function hashCommand(path) {
  try {
    const input = await readFile(path);
    const hash = createHash("sha256").update(input).digest("hex");
    console.log(hash);
    showLocation();
  } catch (err) {
    showError();
    showLocation();
  }
}

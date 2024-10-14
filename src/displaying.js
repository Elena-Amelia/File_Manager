import { cwd } from "node:process";
import { EOL } from "node:os";

export async function showLocation() {
  const path = cwd();
  console.log(EOL + "You are currently in", path + EOL);
}

export async function showError() {
  console.error("Operation failed");
}

export async function showWrongInput() {
  console.error("Invalid input");
}

import { cwd } from "node:process";

export function showLocation() {
  const path = cwd();
  console.log("You are currently in", path);
}

export function showError() {
  console.error("Operation failed");
}

export function showWrongInput() {
  console.log("Invalid input");
}

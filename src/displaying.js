import { cwd } from "node:process";

export async function showLocation() {
  const path = cwd();
  console.log("You are currently in", path);
}

export async function showError() {
  console.error("Operation failed");
}

export async function showWrongInput() {
  console.log("Invalid input");
}

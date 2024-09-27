import fs from "node:fs";
import { EOL, arch, cpus, homedir, userInfo } from "node:os";
import { showLocation, showWrongInput } from "../displaying.js";

export async function osCommand(comm) {
  switch (comm) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      showLocation();
      break;
    case "--cpus":
      console.table(cpus());
      showLocation();
      break;
    case "--homedir":
      console.log(JSON.stringify(homedir()));
      showLocation();
      break;
    case "--username":
      console.log(userInfo().username);
      showLocation();
      break;
    case "--architecture":
      console.log(JSON.stringify(arch()));
      showLocation();
      break;
    default:
      showWrongInput();
      showLocation();
      break;
  }
}

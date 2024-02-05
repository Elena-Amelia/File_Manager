import fs from "node:fs";
import { EOL, arch, cpus, homedir, userInfo } from "node:os";
import { showLocation, showWrongInput } from "../displaying.js";

export async function osCommand(comm) {
  switch (comm) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      console.table(cpus());
      break;
    case "--homedir":
      console.log(JSON.stringify(homedir()));
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(JSON.stringify(arch()));
      break;
    default:
      showWrongInput();
      showLocation();
      break;
  }
}

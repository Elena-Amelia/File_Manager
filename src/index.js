import * as readline from "node:readline";
import {
  argv,
  env,
  chdir,
  stdin as input,
  stdout as output,
} from "node:process";
import { parseArgs } from "./cli/cli.js";
import { showLocation } from "./displaying.js";
import { EOL, homedir } from "node:os";

const rl = readline.createInterface({ input, output });
rl.on("line", (data) => {
  parseArgs(data);
});

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!` + EOL);
chdir(homedir());
showLocation();

function getUserName() {
  let result = env.npm_config_username;
  if (!result) {
    argv.forEach((elem) => {
      if (elem.startsWith("--username")) {
        result = elem.slice(elem.indexOf("=") + 1);
      }
    });
  }
  if (!result) {
    result = "Username";
  }
  return result;
}

process.on("SIGINT", () => {
  process.exit();
});

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);

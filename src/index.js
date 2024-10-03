import * as readline from "node:readline";
import { argv, chdir, stdin as input, stdout as output } from "node:process";
import { parseArgs } from "./cli/cli.js";
import { showLocation } from "./displaying.js";
import { EOL, homedir } from "node:os";

const rl = readline.createInterface({ input, output });
rl.on("line", (data) => {
  parseArgs(data);
});

const userName = await getUserName();
console.log(`Welcome to the File Manager, ${userName}!` + EOL);
chdir(homedir());
showLocation();

async function getUserName() {
  let result = "Username";
  console.log(argv);
  argv.forEach((elem) => {
    if (elem.startsWith("--username")) {
      result = elem.slice(elem.indexOf("=") + 1);
    }
  });
  return result;
}

process.on("SIGINT", () => {
  process.exit();
});

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);

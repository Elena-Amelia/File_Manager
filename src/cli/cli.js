import fs from "node:fs";
import { upCommand } from "../commands/up.js";
import { lsCommand } from "../commands/ls.js";
import { cdCommand } from "../commands/cd.js";
import { catCommand } from "../commands/cat.js";
import { addCommand } from "../commands/add.js";
import { osCommand } from "../commands/os.js";
import { hashCommand } from "../commands/hash.js";
import { removeCommand } from "../commands/rm.js";
import { compressCommand } from "../commands/compress.js";
import { showError, showLocation, showWrongInput } from "../displaying.js";

export async function parseArgs(data) {
  const command = data.toString().trim().split(" ");
  const paths = command.slice(1).join(" ");
  const validatedPath = await validatePath(paths);

  switch (command[0]) {
    case ".exit":
      process.exit();
      break;
    case "up":
      await upCommand();
      break;
    case "ls":
      await lsCommand();
      break;
    case "cd":
      await cdCommand(validatedPath[0]);
      break;
    case "cat":
      await catCommand(validatedPath[0]);
      break;
    case "add":
      await addCommand(validatedPath[0]);
      break;
    case "rm":
      await removeCommand(validatedPath[0]);
      break;
    case "os":
      await osCommand(command[1]);
      break;
    case "hash":
      await hashCommand(validatedPath[0]);
      break;
    case "rn":
      console.log("The command isn't implemented");
      break;
    case "cp":
      console.log("The command isn't implemented");
      break;
    case "mv":
      console.log("The command isn't implemented");
      break;
    case "compress":
      // const compressPath = await validatePath(command.slice(1, command.length));
      // compressCommand(compressPath);
      console.log("The command isn't implemented");
      break;
    case "decompress":
      console.log("The command isn't implemented");
      break;
    default:
      showWrongInput();
  }
}

async function validatePath(str) {
  let hasSpace = false;
  let paths = [];
  let path = "";

  for (let char of str) {
    if (char === '"' || char === "'") {
      hasSpace = !hasSpace;
    }

    if (hasSpace === false) {
      if (char === " ") {
        paths.push(path);
        path = "";
      } else {
        path += char;
      }
    } else {
      path += char;
    }
  }
  paths.push(path);
  paths = paths.map((elem) => (elem = elem.replace(/\"|\'/g, "")));
  return paths;
}

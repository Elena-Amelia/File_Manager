import { upCommand } from "../commands/up.js";
import { lsCommand } from "../commands/ls.js";
import { cdCommand } from "../commands/cd.js";
import { catCommand } from "../commands/cat.js";
import { addCommand } from "../commands/add.js";
import { osCommand } from "../commands/os.js";
import { hashCommand } from "../commands/hash.js";
import { removeCommand } from "../commands/rm.js";
import { renameCommand } from "../commands/rn.js";
import { copyCommand } from "../commands/cp.js";
import { moveCommand } from "../commands/mv.js";
import { compressCommand } from "../commands/compress.js";
import { decompressCommand } from "../commands/decompress.js";
import { showWrongInput } from "../displaying.js";

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
      await renameCommand(validatedPath[0], validatedPath[1]);
      break;
    case "cp":
      await copyCommand(validatedPath[0], validatedPath[1]);
      break;
    case "mv":
      await moveCommand(validatedPath[0], validatedPath[1]);
      break;
    case "compress":
      await compressCommand(validatedPath[0], validatedPath[1]);
      break;
    case "decompress":
      await decompressCommand(validatedPath[0], validatedPath[1]);
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

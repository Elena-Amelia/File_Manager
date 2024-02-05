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
import { showError, showWrongInput } from "../displaying.js";

export async function parseArgs(data) {
  const command = data.toString().split(" ");

  switch (command[0]) {
    case ".exit":
      process.exit();
      break;
    case "up":
      upCommand();
      break;
    case "ls":
      lsCommand();
      break;
    case "cd":
      const cdPath = await validatePath(command.slice(1, command.length));
      await cdCommand(cdPath.join(""));
      break;
    case "cat":
      const catPath = await validatePath(command.slice(1, command.length));
      await catCommand(catPath.join(""));
      break;
    case "add":
      await addCommand(command[1]);
      break;
    case "rm":
      const rmPath = await validatePath(command.slice(1, command.length));
      removeCommand(rmPath.join(""));
      break;
    case "os":
      osCommand(command[1]);
      break;
    case "hash":
      const hashPath = await validatePath(command.slice(1, command.length));
      hashCommand(hashPath.join(""));
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

const validatePath = async (arr) => {
  return new Promise((resolve) => {
    let path1 = "";
    let path2 = "";
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i]);

      fs.stat(result.join(" "), (err) => {
        if (err) {
        } else {
          if (path1.length === 0) {
            path1 = result.join(" ");
            result = [];
          } else {
            path2 = result.join(" ");
            result = [];
          }
        }

        if (path1.length > 0 && path2.length === 0) {
          resolve([path1]);
        } else if (path1.length > 0 && path2.length > 0) {
          console.log(path1, path2);
          resolve([path1, path2]);
        } else if (i === arr.length - 1 && path1.length === 0) {
          resolve([]);
        }
        // resolve([path1, path2]);
      });
    }
  });
};

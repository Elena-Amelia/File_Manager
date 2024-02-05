import fs from "node:fs";
import { upCommand } from "../commands/up.js";
import { lsCommand } from "../commands/ls.js";
import { cdCommand } from "../commands/cd.js";
import { catCommand } from "../commands/cat.js";
import { addCommand } from "../commands/add.js";
import { osCommand } from "../commands/os.js";
import { showError } from "../displaying.js";

export async function parseArgs(data) {
  const command = data.toString().trim().split(" ");

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
    case "os":
      osCommand(command[1]);
      break;
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
          resolve([path1, path2]);
        } else if (i === arr.length - 1 && path1.length === 0) {
          resolve([]);
        }
        // resolve([path1, path2]);
      });
    }
  });
};

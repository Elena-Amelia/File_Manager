import { upCommand } from "../commands/up.js";
import { lsCommand } from "../commands/ls.js";
import { cdCommand } from "../commands/cd.js";
import { catCommand } from "../commands/cat.js";

export function parseArgs(data) {
  const command = data.toString().trim().split(" ");

  // console.log(command);

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
      cdCommand(command.slice(1, command.length).join(" "));
      break;
    case "cat":
      catCommand(command.slice(1, command.length).join(" "));
      break;
  }
}

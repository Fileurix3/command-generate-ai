#!/usr/bin/env node

import { enableOrDisableHistory } from "./commands/history.js";
import { generateCommand } from "./commands/generate_command.js";
import { setModel } from "./commands/set_model.js";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("cgai")
  .option("-r, --req <string>", "your request for generate command")
  .option("-m, --model <string>", "set your ollama model")
  .option("-e, --execute", "to execute the command immediately")
  .option("--history <string>", "enable or disable history");

program.parse(process.argv);
const option = program.opts();

if (option.model) {
  try {
    setModel(option.model);
  } catch (err) {
    console.error(`${chalk.red("Error")}: ${err}`);
  }
} else if (option.req) {
  generateCommand(option.req, option.execute ? true : undefined).catch((err) =>
    console.error(`${chalk.red("Error")}: ${err}`),
  );
} else if (option.history) {
  try {
    const history = option.history.trim().toLowerCase();

    if (history !== "true" && history !== "false") {
      throw "'--history' can only be 'true' or' 'false'";
    }

    enableOrDisableHistory(history === "true" ? true : false);
  } catch (err) {
    console.error(`${chalk.red("Error")}: ${err}`);
  }
}

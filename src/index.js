#!/usr/bin/env node

import { generateCommand } from "./commands/generate_command.js";
import { setModel } from "./commands/set_model.js";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("cgai")
  .option("-r, --req <string>", "your request for generate command")
  .option("-m, --model <string>", "set your ollama model");

program.parse(process.argv);
const option = program.opts();

if (option.model) {
  try {
     setModel(option.model);
  } catch (err) {
    console.error(`${chalk.red("Error")}: ${err}`);
  }
} else if (option.req) {
  generateCommand(option.req).catch((err) =>
    console.error(`${chalk.red("Error")}: ${err}`),
  );
}

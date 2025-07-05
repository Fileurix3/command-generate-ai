import { CONFIG_FILE_PATH } from "../global_variables.js";
import { exec } from "child_process";
import readline from "readline";
import chalk from "chalk";
import util from "util";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function generateCommand(request, execute) {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    throw "config file `~/.config/cgai/config.json' not found";
  }

  const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
  const config = data === "" ? {} : JSON.parse(data);

  if (!config.model) {
    throw "Model not found, add your model using the '--model <model>' command";
  }

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      prompt: request,
      system:
        "you only respond with linux commands, which will be on a single line so that they can be entered directly into the terminal",
      stream: false,
    }),
  });

  const response_data = await response.json();

  if (response.status !== 200) {
    throw response_data.error;
  }

  const command = response_data.response.toString();

  let validateCommand;

  if (
    (command.startsWith("'") && command.endsWith("'")) ||
    (command.startsWith("`") && command.endsWith("`")) ||
    (command.startsWith('"') && command.endsWith('"'))
  ) {
    validateCommand = command.slice(1, -1);
  } else {
    validateCommand = command;
  }

  console.log(chalk.bold(validateCommand));

  if (execute) {
    await executeCommand(validateCommand);
  }
}

async function executeCommand(command) {
  const answer = await askYesNo();
  const execPromise = util.promisify(exec);

  if (answer) {
    const { stdout } = await execPromise(command);

    console.log(stdout);
  } else {
    return;
  }
}

function askYesNo() {
  return new Promise((resolve) => {
    rl.question("Execute command (y/n): ", (data) => {
      const answer = data.trim().toLowerCase();
      if (answer === "y" || answer === "yes") {
        rl.close();
        resolve(true);
      } else if (answer === "n" || answer === "no") {
        rl.close();
        resolve(false);
      } else {
        console.log("Enter 'y' or 'n'");
        resolve(askYesNo());
      }
    });
  });
}

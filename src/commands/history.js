import { HISTORY_FILE_PATH, CONFIG_FILE_PATH } from "../global_variables.js";
import fs from "fs";

export function getHistory() {
  createFileIfNotExists();

  const data = fs.readFileSync(HISTORY_FILE_PATH, "utf-8");
  const history = data === "" ? [] : JSON.parse(data);

  return history;
}

export function addHistory(prompt, response) {
  createFileIfNotExists();

  const history = getHistory();

  const historyData = [
    { role: "User", content: prompt },
    { role: "Assistant", content: response },
  ];

  history.push(...historyData);

  const MAX_LENGTH_HISTORY = 10;

  if (history.length > MAX_LENGTH_HISTORY * 2) {
    history.shift();
    history.shift();
  }

  fs.writeFileSync(
    HISTORY_FILE_PATH,
    JSON.stringify(history, null, 2),
    "utf-8",
  );
}

export function enableOrDisableHistory(enable) {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    throw "config file `~/.config/cgai/config.json' not found";
  }

  const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");

  const config = data === "" ? {} : JSON.parse(data);


  if (enable === true) {
    config.enableHistory = true;
  } else if (enable === false) {
    config.enableHistory = false;
  }

  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), "utf-8");

  console.log(`Enable history ${enable}`);
}

function createFileIfNotExists() {
  if (!fs.existsSync(HISTORY_FILE_PATH)) {
    fs.writeFile(HISTORY_FILE_PATH, "", (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

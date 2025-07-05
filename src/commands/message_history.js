import fs from "fs";
import { HISTORY_FILE_PATH } from "../global_variables.js";

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

  if (history.length > 5 * 2) {
    history.shift();
    history.shift();
  }

  fs.writeFileSync(
    HISTORY_FILE_PATH,
    JSON.stringify(history, null, 2),
    "utf-8",
  );
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

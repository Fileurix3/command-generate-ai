import { CONFIG_FILE_PATH } from "../global_variables.js";
import fs from "fs";

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

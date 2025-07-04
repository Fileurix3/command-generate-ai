import { CONFIG_FILE_PATH } from "../global_variables.js";
import fs from "fs";

export function setModel(model) {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    throw "config file `~/.config/cgai/config.json' not found";
  }

  const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
  const config = data === "" ? {} : JSON.parse(data);

  config.model = model;

  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), "utf-8");

  console.log(`New uses model: ${model}`);
}

import path from "path";
import os from "os";

export const CONFIG_FILE_PATH = path.join(
  os.homedir(),
  ".config/cgai/config.json",
);

export const HISTORY_FILE_PATH = path.join(
  os.homedir(),
  ".config/cgai/history.json",
);

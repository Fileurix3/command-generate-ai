import { CONFIG_FILE_PATH } from "../global_variables.js";
import fs from "fs";

export async function generateCommand(request) {
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
      system: "you only respond with linux commands which will be on one line",
      stream: false,
    }),
  });

  const response_data = await response.json();

  if (response.status !== 200) {
    throw response_data.error;
  }

  console.log(response_data.response);
}

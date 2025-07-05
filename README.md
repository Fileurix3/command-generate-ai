# command-generate-ai

> [!WARNING]  
> Don't use commands you don't understand

## About

A wrapper over ollama for cli application to generate cli commands from natural language

## Usage

CLI name: `cgai`

1. `-r, --req`:

   Request to ai to generate a command.

   Example:
   - input: `--req "create a main.py file"`
   - output: `touch main.py` *(this is a sample answer, it may be different)*

2. `-m, --model`:

   Set your ollama model.

   Example:
   - input: `--model ollama3`

## Install

**You should install `nodejs`, `ollama` and any `ollama model`**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Fileurix3/command-generate-ai.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd command-generate-ai
   ```

3. **Install CLI**

   ```bash
   make install
   ```

## Uninstall

1. **Navigate to the project folder**

   ```bash
   cd command-generate-ai
   ```

2. **Remove CLI**

   ```bash
   make uninstall
   ```

3. **Remove folder with this project**
   ```bash
   rm -rf command-generate-ai
   rm -rf ~/.config/cgai
   ```

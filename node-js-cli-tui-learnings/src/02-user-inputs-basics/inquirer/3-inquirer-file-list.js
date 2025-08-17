import { exec } from "child_process";
import inquirer from "inquirer";
import { spawn } from "child_process";
import fs from "fs"

async function fileSelection() {
  const files = fs.readdirSync(".");
  const { selected } = await inquirer.prompt([
    {
      type: "list",
      name: "selected",
      message: "Pick a file to open:",
      choices: files
    }
  ]);

  console.log("📂 You chose:", selected);
}

// fileSelection()




// TODO : Not working for now
async function fileSelectionAndExecute() {
  // 1. List all .js files in current folder
  const files = fs.readdirSync(".").filter((f) => f.endsWith(".js"));

  if (files.length === 0) {
    console.log("❌ No .js files found.");
    return;
  }

  // 2. Ask user to select a file
  const { selectedFile } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedFile",
      message: "📂 Select a file to run with Node:",
      choices: files,
    },
  ]);

  console.log(`🚀 Running: node ${selectedFile}`);

  // 3. Spawn child process with inherited stdio
  const child = spawn("node", [selectedFile], { stdio: "inherit" });

  // Wait for child process to exit
  child.on("exit", (code) => {
    console.log(`\n⚡ Process exited with code ${code}`);
  });
}

// Run the async function
fileSelectionAndExecute();
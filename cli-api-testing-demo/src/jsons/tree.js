import inquirer from "inquirer";
import fs from "fs";

// Load API JSON
const templates = JSON.parse(fs.readFileSync("./api-template.json", "utf-8"));

// Recursive function to navigate nested choices
async function navigateTree(items, label = "Select an option") {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: label,
      choices: items.map((item, index) => {
        if (item.apis) return { name: item.entity, value: index, isEntity: true };
        return { name: item.name, value: index, isEntity: false };
      }),
    },
  ]);

  const selected = items[choice];

  // If entity (has apis), go one level deeper
  if (selected.apis) {
    return navigateTree(selected.apis, `Select API under ${selected.entity}:`);
  } else {
    // Final API selected
    return selected;
  }
}

async function main() {
  const selectedApi = await navigateTree(templates);

  console.log("\n✅ Final Selection:");
  console.log("API Name:", selectedApi.name);
  console.log("Method:", selectedApi.method);
  console.log("URL:", selectedApi.url);

  // If API has body, ask for inputs
  let bodyData = {};
  if (selectedApi.body && Object.keys(selectedApi.body).length > 0) {
    for (let key of Object.keys(selectedApi.body)) {
      const { value } = await inquirer.prompt([
        { type: "input", name: "value", message: `Enter value for ${key}:` },
      ]);
      bodyData[key] = value;
    }
    console.log("Body:", bodyData);
  }
}

main();

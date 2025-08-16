import inquirer from "inquirer";
import fs from "fs";
import fetch from "node-fetch"; // in Node 18+, you can remove this import

// Load API templates
const templates = JSON.parse(fs.readFileSync("./api-template.json", "utf-8"));

async function main() {
  // Step 1: Pick an entity (User, Institute, etc.)
  const { entityIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "entityIndex",
      message: "Select API entity:",
      choices: templates.map((c, i) => ({ name: c.entity, value: i })),
    },
  ]);

  const selectedEntity = templates[entityIndex];

  // Step 2: Pick an API from that entity
  const { apiIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "apiIndex",
      message: `Select API in ${selectedEntity.entity}:`,
      choices: selectedEntity.apis.map((a, i) => ({ name: a.name, value: i })),
    },
  ]);

  const selectedApi = selectedEntity.apis[apiIndex];

  // Step 3: If body exists, ask for input
  let bodyData = {};
  if (selectedApi.body && Object.keys(selectedApi.body).length > 0) {
    for (let key of Object.keys(selectedApi.body)) {
      const { value } = await inquirer.prompt([
        {
          type: "input",
          name: "value",
          message: `Enter value for ${key}:`,
        },
      ]);
      bodyData[key] = value;
    }
  }

  // Step 4: Show request summary
  console.log("\n🚀 Final Request:");
  console.log("Method:", selectedApi.method);
  console.log("URL:", selectedApi.url);
  if (Object.keys(bodyData).length > 0) console.log("Body:", bodyData);

  // Step 5: Confirm hitting API
  const { confirm } = await inquirer.prompt([
    { type: "confirm", name: "confirm", message: "Do you want to hit this API?" },
  ]);

  if (confirm) {
    try {
      const res = await fetch(selectedApi.url, {
        method: selectedApi.method,
        headers: { "Content-Type": "application/json" },
        body: selectedApi.method !== "GET" ? JSON.stringify(bodyData) : undefined,
      });

      const data = await res.json();
      console.log("✅ API Response:", data);
    } catch (err) {
      console.error("❌ Error hitting API:", err.message);
    }
  } else {
    console.log("❎ Request cancelled.");
  }
}

main();

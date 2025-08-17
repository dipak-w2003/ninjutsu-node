import axios from "axios";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

// --------------------
// Load API template JSON
// --------------------
// This JSON contains all API entities and their endpoints.
const API_JSON = JSON.parse(fs.readFileSync("./api-template.json", "utf-8"));

// --------------------
// Login data file
// --------------------
// This file will store the username and token after a successful login.
const loginJsonFname = "logins-data.json";
const loginsJSON = JSON.parse(fs.readFileSync(loginJsonFname, "utf-8"));

// --------------------
// Check if login JSON exists
// --------------------
const isExistLoginJSON = () => {
  if (fs.existsSync(`./${loginJsonFname}`)) return true;

  // If file doesn't exist, create an empty JSON file
  console.log(chalk.green(`Creating New One: ./${loginJsonFname}`));
  fs.writeFileSync("./logins-data.json", "{}");
  return false;
};

// --------------------
// Axios instance
// --------------------
// Set up base URL and headers for all requests.
const API = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    Authorization: "", // can be updated later with token
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    Authorization: "", // can be updated later with token
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --------------------
// Utility function: Format choices with numbers
// --------------------
// Adds a numbered prefix to entities or APIs for readability in the CLI.
function formatChoicesWithNumbers(items) {
  return items.map((item, i) => ({ name: `${i + 1}. ${item.entity || item.name}`, value: i }));
}

// --------------------
// Prompt user to select an API entity
// --------------------
async function selectEntity(entities) {
  const { entityIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "entityIndex",
      message: "Select API entity:",
      choices: formatChoicesWithNumbers(entities),
      loop: false, // stops the arrow keys from wrapping around
    },
  ]);
  return entities[entityIndex];
}

// --------------------
// Prompt user to select an API from a specific entity
// --------------------
async function selectApi(entity) {
  let choices = formatChoicesWithNumbers(entity.apis);

  // Add "Back" option to return to entity selection
  choices.push({ name: "⬅ Back", value: -1 });

  const { apiIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "apiIndex",
      message: `Select API in ${entity.entity}:`,
      choices,
      loop: false,
    },
  ]);

  return apiIndex === -1 ? null : entity.apis[apiIndex];
}

// --------------------
// Prompt user for API body input (if any)
// --------------------
async function getBodyData(api) {
  let bodyData = {};

  // Only prompt if the API requires a body
  if (api.body && Object.keys(api.body).length > 0) {
    for (let key of Object.keys(api.body)) {
      const { value } = await inquirer.prompt([
        { type: "input", name: "value", message: `${key}:` },
      ]);
      bodyData[key] = value;
    }
  }

  return bodyData;
}

// --------------------
// Main CLI loop
// --------------------
async function main() {
  // Ensure login JSON exists before starting
  isExistLoginJSON();

  while (true) {
    // Step 1: Select an entity
    const entity = await selectEntity(API_JSON);

    // Step 2: Select an API within that entity
    const api = await selectApi(entity);

    // If "Back" is selected, restart the loop (go back to entity selection)
    if (!api) continue;

    // Step 3: Collect body data if API requires it
    const bodyData = await getBodyData(api);

    // Step 4: Show a summary of the request before hitting the API
    console.log("\n🚀 Final Request:");
    console.log("Method:", api.method);
    console.log("URL:", api.url);
    if (Object.keys(bodyData).length > 0) console.log("Body:", bodyData);

    // Step 5: Ask for confirmation to proceed
    const { confirm } = await inquirer.prompt([
      { type: "confirm", name: "confirm", message: "Do you want to hit this API?" },
    ]);

    if (confirm) {
      try {
        const method = api.method.toLowerCase();
        const url = api.url;
        let response;

        // Step 6: Hit API based on method type
        if (method === "get") response = await API.get(url, { params: bodyData });
        else if (method === "delete") response = await API.delete(url, { data: bodyData });
        else response = await API[method](url, bodyData);
        // Step 7: Store token if this is a login API
        if (url === "/auth/login" && response.data?.data) {
          storeTokenIfResponseHas(response.data?.data);
        } 
        
        if ( response.data?.data) {
          storeTokenIfResponseHas(response.data?.data);
        }

        // Step 8: Print response
        console.log(chalk.green("✅ API Response:"), response.data);
      } catch (err) {
        console.error(chalk.red("❌ Backend Error:"), err.response?.data || err.message);
      }
    } else {
      console.log(chalk.yellow("❎ Request cancelled."));
    }

    // Loop continues automatically for next selection
  }
}

// --------------------
// Function to store token in login JSON
// --------------------
function storeTokenIfResponseHas(data = { username: "", token: "" }) {
  if (data && "username" in data && "token" in data) {
    const storeObj = {
      username: data.username,
      token: data.token,
      storedAt: new Date().toISOString(),
    };
    fs.writeFileSync("./logins-data.json", JSON.stringify(storeObj, null, 2));
    console.log(chalk.green("🔒 Token saved to logins-data.json"));
  }
}

// --------------------
// Start CLI
// --------------------
main();

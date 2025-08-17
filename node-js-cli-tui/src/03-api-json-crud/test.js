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
// Stores username and token after successful login.
const loginJsonFname = "logins-data.json";

// Load existing login JSON if it exists, else empty object
let loginsJSON = {};
if (fs.existsSync(`./${loginJsonFname}`)) {
  loginsJSON = JSON.parse(fs.readFileSync(loginJsonFname, "utf-8"));
} else {
  fs.writeFileSync(loginJsonFname, "{}");
}

// --------------------
// Axios instance
// --------------------
// Base instance for all API calls; token will be added dynamically
const axiosInstance = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --------------------
// Utility: Format choices with numbers
// --------------------
function formatChoicesWithNumbers(items) {
  return items.map((item, i) => ({ name: `[${i + 1}] ${item.entity || item.name}`, value: i }));
}

// --------------------
// Select an API entity
// --------------------
async function selectEntity(entities) {
  const { entityIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "entityIndex",
      message: "Select API entity:",
      choices: formatChoicesWithNumbers(entities),
      loop: false,
    },
  ]);
  return entities[entityIndex];
}

// --------------------
// Select an API endpoint from entity
// --------------------
async function selectApi(entity) {
  let choices = formatChoicesWithNumbers(entity.apis);

  // Add back option
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

  // If back selected
  return apiIndex === -1 ? null : entity.apis[apiIndex];
}

// --------------------
// Collect body data if required
// --------------------
async function getBodyData(api) {
  const bodyData = {};
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
  while (true) {
    // Step 1: Select entity
    const entity = await selectEntity(API_JSON);

    // Step 2: Select API
    const api = await selectApi(entity);
    if (!api) continue; // back to entity selection

    // Step 3: Collect body data
    const bodyData = await getBodyData(api);

    // Step 4: Show request summary
    console.log("\n🚀 Final Request:");
    console.log("Method:", api.method);
    console.log("URL:", api.url);
    if (Object.keys(bodyData).length > 0) console.log("Body:", bodyData);

    // Step 5: Confirm request
    const { confirm } = await inquirer.prompt([
      { type: "confirm", name: "confirm", message: "Do you want to hit this API?" },
    ]);

    if (!confirm) {
      console.log(chalk.yellow("❎ Request cancelled."));
      continue; // back to entity selection
    }
    try {
      // Step 6: Handle headers
      const isFormDataAPI = [
        "/institute/teacher",
        "/institute/course",
        "/institute/student",
        "/teacher",
        "/course",
        "/student",
      ];

      if (api.isToken && loginsJSON?.token) {
        axiosInstance.defaults.headers.common["Authorization"] = loginsJSON.token;
        axiosInstance.defaults.headers["Content-Type"] = isFormDataAPI.includes(api.url)
          ? "multipart/form-data"
          : "application/json";
      } else {
        // Remove auth header if no token required
        delete axiosInstance.defaults.headers.common["Authorization"];
      }

      // Step 7: Hit API based on method
      const method = api.method.toLowerCase();
      const url = api.url;
      let response;

      if (method === "get") {
        response = await axiosInstance.get(url, { params: bodyData });
      } else if (method === "delete") {
        response = await axiosInstance.get(url)
        console.log(chalk.green("✅ API Response:"), response.data);
        const delId = await inquirer.prompt([{
          name: "delete",
          type: "input",
          message: "enter delete id : ",
          validate: (val) => val.length >= 6 || "❌ delete id must be at least 6 characters long",
        }])
        response = await axiosInstance.delete(url + delId.delete);
      } else if (["post", "put", "patch"].includes(method)) {
        response = await axiosInstance[method](url, bodyData);
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }

      // Step 8: Store token if login API
      if (url === "/auth/login" && response.data?.data?.token) {
        storeToken(response.data.data);
      }
      console.log("content type", axiosInstance.defaults.headers["Content-Type"]);

      console.log(chalk.green("✅ API Response:"), response.data);
    } catch (err) {
      console.log("🔑 Current Token Header:", axiosInstance.defaults.headers.common["Authorization"]);
      console.error(chalk.red("❌ Backend Error:"), err.response?.data || err.message);
    }


  }
}

// --------------------
// Store token after login
// --------------------
function storeToken(data = { username: "", token: "" }) {
  if (!data || !data.token) return;
  loginsJSON = {
    username: data.username,
    token: data.token,
    storedAt: new Date().toISOString(),
  };
  fs.writeFileSync(loginJsonFname, JSON.stringify(loginsJSON, null, 2));
  console.log(chalk.green("🔒 Token saved to logins-data.json"));
}

// --------------------
// Start CLI
// --------------------
main();

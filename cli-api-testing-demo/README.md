# NodeJS CLI : SAMPLE FOR TESTING

# Folder Structure

cli-api-testing-demo/

```tree
│
├── index.js # Main CLI entry point
├── package.json # Node project configuration
├── node_modules/ # Installed packages
│
└── src/
├── jsons/
│ ├── api-template.json # All API entities and endpoints
│ ├── logins-data.json # Stored login credentials/token
│ ├── axios.api.js # Optional: can hold axios wrapper if needed
│ └── tree.js # Optional: utility file if used
│
├── constants/ # Optional: store constants (like API URLs, headers)
└── modules/ # Optional: can hold reusable functions/helpers
```

# File Responsibilities

## 1. index.js

- Purpose: Main CLI runner.
- Handles:
  - Loading API definitions (`api-template.json`)
  - Loading/storing login tokens (`logins-data.json`)
  - CLI prompts for selecting API entity and endpoint
  - Collecting body input
  - Sending requests via Axios
  - Showing responses and saving token on login
- Key Modules Used:
  - `axios` → for API requests
  - `inquirer` → for interactive CLI prompts
  - `fs` → read/write JSON files
  - `chalk` → colored CLI output
  - `path` + fileURLToPath → resolving paths correctly in ES module

<br>

## 2. src/jsons/api-template.json

- **Purpose**: Define all API entities and endpoints in one structured JSON.
- **Structure**:

```json
[
  {
    "entity": "User",
    "apis": [
      {
        "name": "Create User",
        "method": "POST",
        "url": "/auth/register",
        "isToken": true,
        "body": {
          "username": "",
          "email": "",
          "password": ""
        }
      },
      {
        "name": "Rgister User",
        "method": "POST",
        "url": "/auth/register",
        "isToken": true,
        "body": {}
      }
    ]
  },
  {
    "entity": "Institute",
    "apis": [
      {
        "name": "Create Institute",
        "method": "POST",
        "url": "/institute",
        "isToken": true,
        "body": {
          "instituteName": "",
          "instituteEmail": "",
          "institutePhoneNumber": "",
          "instituteAddress": "",
          "institutePanNo": "",
          "instituteVatNo": ""
        }
      }
    ]
  }
]
//  Define all your routes here which are needed for tesing as that format structure
```

- **Usage**: `index.js` reads this JSON to dynamically generate CLI menus.

<br>

## 3. **src/jsons/logins-data.json**

Purpose: Store last successful login username and token.
Auto-created if missing:

```json
{
  "username": "",
  "token": "",
  "storedAt": "2025-08-17T10:44:16.996Z"
}
```

- **Usage**: index.js reads/writes this to automatically add Authorization headers when required.

## 4. Optional src/jsons/axios.api.js

- Could be used as a centralized Axios wrapper if your project grows.
- Example:

```js
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
```

## 5. Optional src/constants/

- Could store constants like:
  - `API_BASE_URL`
  - Default headers
  - API method types

## 6. Optional src/modules/

- Could hold reusable utility functions:
- formatChoicesWithNumbers(items) → already in index.js
- CLI helpers
- File upload helpers
- Any future expansions

<br>

# Key Architectural Notes

- **ES Module Friendly**: Uses `import` syntax and `fileURLToPath` for paths.
- **CLI Driven**: `inquirer` dynamically reads JSON structure to generate menus.
- **JSON Driven API**: Easy to add/remove APIs without touching code.
- **Token Management**: `logins-data.json` ensures authenticated requests are seamless.
- **Scalable**: You can split functions into `modules/` as project grows.

<br>

# Simple Flow Chart

![](./src/assets/ChatGPT%20Image%20Aug%2017,%202025,%2010_30_16%20PM.png)

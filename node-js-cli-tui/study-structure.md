api-testing-cli/
│
├── 00-setup/                    # Hour 0–1: Environment setup & CLI basics
│   └── index.js                  # Print banner, colored console logs
│
├── 01-cli-input/                 # Hour 1–2: User input basics
│   └── index.js                  # readline + inquirer, simple prompts
│
├── 02-file-operations/           # Hour 2–3: JSON templates & file operations
│   ├── index.js                  # Read/write JSON
│   └── apiTemplates.json         # Example API definitions
│
├── 03-http-basics/               # Hour 3–4: Making API requests
│   └── index.js                  # node-fetch GET/POST/PUT/DELETE
│
├── 04-dynamic-json/              # Hour 4–5: User JSON input
│   └── index.js                  # Multi-line input, editor prompt
│
├── 05-menu-navigation/           # Hour 5–6: Interactive arrow menus
│   └── index.js                  # Inquirer list, arrow key navigation
│
├── 06-ux-feedback/               # Hour 6–7: Spinners & colored output
│   └── index.js                  # ora spinner, chalk colors
│
├── 07-api-organization/          # Hour 7–8: Multiple APIs & categories
│   ├── index.js                  # Categories, sub-menus
│   └── apiTemplates.json         # Expanded APIs (10+)
│
├── 08-advanced-input/            # Hour 8–9: JSON file input & validation
│   └── index.js                  # Load JSON from file, validate format
│
├── 09-logging-history/           # Hour 9–10: Logging and replay
│   ├── index.js                  # Record requests/responses
│   └── history.json              # Stores API history
│
├── 10-cli-args-packaging/        # Hour 10–11: CLI args & build
│   └── index.js                  # Commander.js for args, pkg build
│
├── 11-polish-advanced/           # Hour 11–12: Advanced UX & polish
│   └── index.js                  # Mouse support, colorized JSON, final touches
│
└── package.json                  # Project dependencies & scripts


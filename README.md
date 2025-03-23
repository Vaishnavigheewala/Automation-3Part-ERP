******Folder Structure ***********
my-playwright-project/
├── locators/                   # Store locators in JSON or other files
│   └── locators.json
├── tests/                      # Store test files grouped by feature or module
│   ├── homepage.test.js
│   ├── login.test.js
│   └── GSTSale/
│       └── Add_GST_Sales.spec.js
├── fixtures/                   # Test data and reusable setups ******Not used yet******
│   └── testData.json
├── utils/                      # Helper utilities and common functions ******Not used yet******
│   ├── apiHelpers.js
│   ├── customAssertions.js
│   └── locatorHelper.js
├── reports/                    # Store test reports (generated after execution) ******Not used yet******
│   └── report.html
├── screenshots/                # Store failure screenshots (optional) ******Not used yet******
│   └── homepage-error.png
├── videos/                     # Store failure videos (if enabled) ******Not used yet******
│   └── login-error.mp4
├── playwright.config.js        # Playwright configuration 
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Dependency lock file
├── README.md                   # Documentation for the project
└── node_modules/               # Installed dependencies
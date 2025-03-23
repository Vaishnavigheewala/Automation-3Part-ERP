// @ts-check
const { defineConfig, devices } = require('@playwright/test');
 
// Read environment variables from file.
require('dotenv').config();
 
module.exports = defineConfig({
  workers: 6, // Run tests with 6 workers
  timeout: 90000, // 90 seconds per test
  expect: {
    timeout: 7000, // 7 seconds for assertions
  },
  use: {
    actionTimeout: 10000, // 10 seconds for actions
    navigationTimeout: 30000, // 30 seconds for navigation
  },

 
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : 1,
 
  // ✅ Fix: Added missing comma after reporter array
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }], // JUnit for Azure DevOps
    ['allure-playwright', { outputFolder: 'allure-results' }], // Allure reports
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // Prevents auto-start
  ], 
 
  use: {
    baseURL: 'http://withidforautomation.aquacare.thinkhpconsultant.com:73/',
    launchOptions: {
      headless: true,
    },
    video: 'retain-on-failure',
    screenshot: 'on',
    testIdAttribute: 'autocomplete',
    trace: 'on',
  },
 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
 
 
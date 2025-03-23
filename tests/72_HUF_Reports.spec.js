const { test, expect } = require('@playwright/test');
const ledger = require('../Pages/Ledger_report/ledger.json');
const locator = require('../HUF/HUF_reports/HUF_reports.json');

const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenuofledger, selectfilterResetbank, selectfiltersearchbank, sortingbank, selectfilterResetcash, selectfilterSearchcash, sortingcash } = require('../Pages/Ledger_report/ledger.js');
const { navigatereportpage,filter_record,reset_filter,search_filter } = require('../HUF/HUF_reports/HUF_reports.js');

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let vendorName = updatedVariables.Vendor.Vendor_Account_Name;;

test('Verify Ledger Reports -  Ledger Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofledger(page, "Reports");
  console.log('Step 4: Reports -  Bank Ledger Report - Bank Ledger Report Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetbank(page, "Receive", customerName);
  await selectfiltersearchbank(page, "Receive", customerName);
  await sortingbank(page);
  await selectfilterResetcash(page, "Payable", vendorName)
  await selectfilterSearchcash(page, "Payable", vendorName)
  await sortingcash(page);
});

test('Verify Direct HUF Sale Reports -  Direct HUF Sale Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await navigatereportpage(page);
  await page.waitForTimeout(1000);
  await filter_record(page,customerName);
  await page.waitForTimeout(1000);
  await reset_filter(page);
  await page.waitForTimeout(1000);
  await filter_record(page,customerName);
  await page.waitForTimeout(1000);
  await search_filter(page);

});
const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Edit_Cash_Ledger/Edit_Cash_Ledger.json');
const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}
//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Search_User, DisabledFields, Open_View_Link, Edit_User, Dbl_Bill_Entry, Customer_Outstanding_Report, Customer_Account_Ledger_Report, Cash_Ledger_Report, Vendor_Account_Ledger, Payble_Reoprt_Vendor } = require('../Pages/Edit_Cash_Ledger/Edit_Cash_Ledger.js');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let vendor_name = updatedVariables.Vendor.Vendor_Account_Name;

test('Edit Cash Ledger Page', async ({ page }) => {
 
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction");
  await page.locator(locators.Ledger_Menu).click();
  await page.waitForTimeout(200);
  await page.locator(locators.Cash_Ledger_Menu).click();
  console.log('Step 3: Sucessfully navigate to CashLedger.');
  await page.waitForTimeout(200);
  await Search_User(page, "07-01-2020 - 26-11-2030", null, customer_name, null);
  console.log('full Payment Ledger Open & Colsed');
  await page.waitForTimeout(200);
  await Open_View_Link(page);
  await Edit_User(page);
  console.log('Customer Cash Leder Edited with only Receive Amount.');
  

  await selectmenu(page, "Transaction");
  await page.locator(locators.Ledger_Menu).click();
  await page.waitForTimeout(200);
  await page.locator(locators.Cash_Ledger_Menu).click();
  await Search_User(page, null, "Vendor", null, vendor_name);
  await page.waitForTimeout(200);
  console.log('Vendor Searched.');
  await Open_View_Link(page);
  await page.waitForTimeout(500);
  // await Dbl_Bill_Entry(page, "Purchase");
  // await page.waitForTimeout(500);
  await Edit_User(page);
  console.log('Customer Cash Leder Edited with only Receive Amount.');

  await Cash_Ledger_Report(page, "Payable", vendor_name);
  console.log('Cash Ledger Report For Vendor.');
    await Vendor_Account_Ledger(page, vendor_name, null);
  console.log('Vendor Account Ledger Report.');
  await Payble_Reoprt_Vendor(page, vendor_name, null);
  console.log('Payble Reports.');

  await Customer_Outstanding_Report(page, customer_name, null);
  console.log('Customer outstanding Report.');
});


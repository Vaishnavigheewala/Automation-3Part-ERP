const { test, expect   } = require('@playwright/test');
const locators = require('../Cashonly/EditCashLedger/EditCashLedger.json');
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
const { editcashledger , Report} = require("../Cashonly/EditCashLedger/EditCashLedger.js");

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name; // Get the latest Vendor_Name

test('  CashOnly - Edit Cash Ledger ', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await editcashledger(page , "50000");
    console.log('Step 4: Sucessfully Edit the Cash Ledger ');
    await page.waitForTimeout(2000);
    await Report(page , customer_name , Vendor_Name );
    console.log('Step 4: Sucessfully verify reports ');
  
});

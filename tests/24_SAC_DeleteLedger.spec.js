const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Delete_Ledger/Delete_Ledger.json');


/******************Reusable functions imported***********************/
const { log_in, Get_Current_Date_Time, Generate_Unique_String } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { deleteledger} = require('../Pages/Delete_Ledger/Delete_Ledger.js');

/********************************************************************/

const fs = require('fs');
const path = require('path');
 
// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name 

let Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name; // Get the latest Customer_Name 
test('Delete ledger', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete");
    console.log('Step 3: Sucessfully Clicked on Tools Menu');
    await deleteledger(page,Customer_Name,Vendor_Name);
    
});
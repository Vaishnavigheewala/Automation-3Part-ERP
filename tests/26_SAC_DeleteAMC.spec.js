const { test, expect } = require('@playwright/test');
const locators = require('../Pages/DeleteAMC/DeleteAMC.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { deleteamc ,deletest} = require('../Pages/DeleteAMC/DeleteAMC.js');
const { stat } = require('fs');
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

test('Delete Amc', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Tools Menu');
    await deleteamc(page);
    
});

test('Delete Amc with service Ticket', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Tools Menu');
    await deletest(page,Customer_Name,"aafinish");
    
});
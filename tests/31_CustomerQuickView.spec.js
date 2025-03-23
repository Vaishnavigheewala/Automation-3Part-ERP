const { test, expect } = require('@playwright/test');
const locators = require('../Pages/CustomerQuickView/CustomerQuickView.json');

const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}
/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {  customerquickview } = require('../Pages/CustomerQuickView/CustomerQuickView.js');
/********************************************************************/

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerAddress = updatedVariables.Address_User; 

test('Customer Quick View', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.23:88/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Tools"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Tools Menu');
    await customerquickview(page,customerAddress);

});
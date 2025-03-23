const { test, expect } = require('@playwright/test');
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
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;
let Inventory_Name = updatedVariables.Inventory.Inventory_Name;

//******************Reusable functions imported**********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {  DeletePage } = require('../Pages/DeleteSale/deletesale.js');


test('delete Sales', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await DeletePage(page,Customer_Name,Inventory_Name);   
  });
  
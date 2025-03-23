const { test, expect   } = require('@playwright/test');
const locators = require('../Cashonly/VerifySale/Verifysale.json');
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
const { DeleteCashSale } = require('../Cashonly/VerifySale/VerifySale.js');

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name;

test(' CashOnly - Delete Cash Sale ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await DeleteCashSale(page,"Receive",customer_name,"50000","CashSale","aafinish"); 
     console.log('Step 4: Sucessfully Clicked on Delete Menu');
    
});
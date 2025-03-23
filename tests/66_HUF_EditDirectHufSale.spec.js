const { test, expect   } = require('@playwright/test');
const locators = require('../HUF/EditDirectHufSale/EditDirectHufSale.json');
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
const { editsale , verifyeditsale_Ledger} = require('../HUF/EditDirectHufSale/EditDirectHufSale.js');

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name;


test('KBT - Edit Direct Huf Sale ', async ({ page }) => {
    
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await editsale(page , "1" , "5000" , customer_name, "Cash Only");
    console.log('Step 4: Sucessfully Edit the Sales and verify reports ');
    await page.waitForTimeout(1000);
    await verifyeditsale_Ledger(page , customer_name , "5000" , "DirectHUFSales");
    console.log('Step 5:  edited Direct Huf sale bill no verify in ledger');

});


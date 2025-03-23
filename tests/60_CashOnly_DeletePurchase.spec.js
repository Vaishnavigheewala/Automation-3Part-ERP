const { test, expect   } = require('@playwright/test');
const locators = require('../Cashonly/VerifyPurchase/VerifyPurchase.json');
let sharedNetAmount ;
let sharedpreviousBillNumber =0;
let sharedlatestBillNumber ;
let sharedcustomername;
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
const { DeletePage } = require('../Cashonly/VerifyPurchase/VerifyPurchase.js');
const { TIMEOUT } = require('dns/promises');


/********************************************************************/
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let vendor_name = updatedVariables.Vendor.Vendor_Account_Name; // Get the latest vendor name

test('Cash Only - Delete Purchase', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await DeletePage(page,"Payable",vendor_name,"50000","CashPurchase","aafinish"); 
     console.log('Step 4: Sucessfully Clicked on Delete Menu');
});


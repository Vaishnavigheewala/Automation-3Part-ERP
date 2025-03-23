const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Edit_Bank_Ledger/Edit_Bank_Ledger.json');
const fs = require('fs');
const path = require('path');


/******************Reusable functions imported***********************/
const { log_in, Get_Current_Date_Time, Generate_Unique_String, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { editbankledger } = require('../Pages/BankLedgerEdit/BankLedgerEdit.js');
const { Edit_Bank_Ledger, outstandingforcustomer, customeraccledger, VerifyConsistency } = require ('../Archie/Edit_Bank_Ledger/Edit_Bank_Ledger.js');
/********************************************************************/
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name

test('Edit Ledger', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);

    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu!!!');
    await editbankledger(page);
    console.log('Step 4: Sucessfully Verify Edit Bank Ledger!!!');

    await selectmenu(page, "Reports"); 
    console.log('Step 5: Sucessfully Clicked on Reports Menu!!!');
    await outstandingforcustomer(page, customerName); 
    console.log('Step 6: Sucessfully Verify Outstanding Reports!!!');

    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(1000);
    await selectmenu(page, "Reports"); 
    console.log('Step 7: Sucessfully Clicked on Reports Menu!!!');
    await customeraccledger(page, customerName); 
    console.log('Step 8: Sucessfully Verify Customer Account Ledger!!!');

    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 9: Sucessfully Clicked on Reports Menu!!!');
    await VerifyConsistency(page);
    console.log('Step 10: Sucessfully Verify Consistency in Customer Account Ledger And Outstanding Reports!!!');

});
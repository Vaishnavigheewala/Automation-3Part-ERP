const { test, expect } = require('@playwright/test');
const locators = require('../Pages/VerifyInventoryPage/inventory.json');

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
const { verifydebitnotepage , adddebitnote,debitnotereport,VendoraccountLedgerreport,editdebitnote} = require('../Pages/DebitNote/debitnote.js');

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name; // Get the latest Customer_Name  
test('verify Debit Note page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await verifydebitnotepage(page,Vendor_Name);
    console.log('Step:5 debit note is verified');


});

test('Create Debit Note', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await adddebitnote(page,Vendor_Name);
    console.log('Step:5 debit note page');


});

test('Verify Created Debit note report in Grid', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await debitnotereport(page,Vendor_Name);
    console.log('Step:4 debit note report page ');


});

test('vendor account ledger report for Created Debit Note', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await VendoraccountLedgerreport(page,Vendor_Name);
    console.log('Step:4 vendor account ledger report page ');


});

test('Update Debit Note', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await editdebitnote(page,Vendor_Name);
   
 
});

test('Debit note report for Updated record', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await debitnotereport(page,Vendor_Name);
    console.log('Step:4 debit note report page ');


});

test('vendor account ledger report for Updated record', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await VendoraccountLedgerreport(page,Vendor_Name);
    console.log('Step:4 vendor account ledger report page ');


});


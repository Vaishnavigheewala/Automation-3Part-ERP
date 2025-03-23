const { test, expect } = require('@playwright/test');
const locators = require('../HUF/AddBankLedger/AddBankLedger.json');
const fs = require('fs');
const path = require('path');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { verifyledgersection,
    verifypaymentnatureandmethod,
    fullandpartialPayment ,
    Report
   
} = require('../HUF/AddBankLedger/AddBankLedger.js');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('verify BankLedger Section', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await verifyledgersection(page);
    console.log('Step 4: Sucessfully verify bank ledger page');

});

test('verify payment nature and payment method', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await verifypaymentnatureandmethod(page);
    console.log('Step 4: Sucessfully verify bank ledger page');

});

test('Add Bank Ledger (Full Payment & Partial Payment)', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await fullandpartialPayment(page, "TST1524", customerName, "50000", "DirectHUFSales" );
    console.log('Step 4: Sucessfully added ledger with partial and full payment');

});

test('Verify Reports', async ({ page}) => {
    test.setTimeout(60000);
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await Report(page , customerName);
    console.log('Step 3: Sucessfully verify reports ');

});


const { test, expect } = require('@playwright/test');
const locators = require('../HUF/BankLedgerEdit/BankLedgerEdit.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { editbankledger,editforvendor,outstandingforcustomer,customeraccledger ,VerifyConsistency,payablereportforvendor,Vendoraccountledger } = require('../Pages/BankLedgerEdit/BankLedgerEdit.js');

/********************************************************************/

test('verify and Update bank ledger', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await editbankledger(page);
    console.log('Step 4: Sucessfully Verify Edit Bank Ledger');
});

test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingforcustomer(page);
});

test('Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await customeraccledger(page);
});

test('Verify Outstanding Reports and Customer Account Ledger consistency', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await VerifyConsistency(page);
});

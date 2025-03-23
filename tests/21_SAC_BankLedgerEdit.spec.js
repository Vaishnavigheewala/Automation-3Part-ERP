const { test, expect   } = require('@playwright/test');
const locators = require('../Pages/BankLedgerEdit/BankLedgerEdit.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js'); 
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { editbankledger,editforvendor,outstandingforcustomer,customeraccledger ,VerifyConsistency,payablereportforvendor,Vendoraccountledger } = require('../Pages/BankLedgerEdit/BankLedgerEdit.js');

/********************************************************************/

test('verify edit bank ledger', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Transaction Menu');
     await editbankledger(page);
 
 });

 test('verify edit bank ledger for vendor', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Transaction Menu');
     await editforvendor(page);
 
 });


 test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingforcustomer(page); 
});

test('Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await customeraccledger(page); 
});

test('Verify Outstanding Reports and Customer Account Ledger consistency', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await VerifyConsistency(page); 
    
});

test(' Verify Payble report- edit bank ledger ', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    await payablereportforvendor(page);
    console.log('Step 3: Records Sucessfully display');

 });

 test(' Verify Vendor Account ledger Report- edit bank ledger ', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    await Vendoraccountledger(page);
    console.log('Step 3: Records Sucessfully display');

 });






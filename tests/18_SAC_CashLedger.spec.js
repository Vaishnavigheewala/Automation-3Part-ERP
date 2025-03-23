const { test, expect } = require('@playwright/test');
const locators = require('../Pages/CashLedger/CashLedger.json');
const locator = require('../Pages/Add_Cash_Ledger_Vendor/Add_Cash_Ledger_Vendor.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { verifyledger,addcashledger,verifypartialpayment,verifyduplicatebillno,addledgerforsale,outstandingReport,
    customeraccledger,VerifyConsistency,Cashledgerreport,VerifyReceiveAmt} = require('../Pages/CashLedger/CashLedger.js');
const { addnew , outstanding,vendoraccledger,Cashledger} = require('../Pages/Add_Cash_Ledger_Vendor/Add_Cash_Ledger_Vendor.js');


//Verify Cash Ledger
test('verify CashLedger page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await verifyledger(page); 

});

//Add Cash Ledger For Customer
test('Verify Add CashLedger page For Customer', async ({ page }) => {
  test.setTimeout(60000);
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addcashledger(page); 
    await verifypartialpayment(page); 
    await verifyduplicatebillno(page); 
    //await VerifyReceiveAmt(page);
});

test('Add CashLedger for sale & GST', async ({ page }) => {
    test.setTimeout(60000);
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addledgerforsale(page); 
   
});

test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingReport(page); 
});

test('Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
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
    await selectmenu(page, "Reports"); 
    await Cashledgerreport(page);
});



//Add Cash Ledger for Vendor
test('Add CashLedger page For Vendor', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addnew(page); 

});

test('Outstanding report for vendor', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstanding(page); 
});

test('Customer Account Ledger report for vendor', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await vendoraccledger(page); 
});

test('Verify Cash Ledger For Vendor', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await Cashledger(page);
});




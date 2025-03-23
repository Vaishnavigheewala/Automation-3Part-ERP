const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Edit_Cash_Ledger/Edit_Cash_Ledger.json');
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
const { verifyledger,addcashledger,verifypartialpayment,verifyduplicatebillno,addledgerforsale,outstandingReport,
    customeraccledger,VerifyConsistency,Cashledgerreport,VerifyReceiveAmt} = require('../Archie/Cash Ledger/Cash_Ledger.js');
const { Search_User, DisabledFields, Open_View_Link, Edit_User, Dbl_Bill_Entry, Customer_Outstanding_Report, Customer_Account_Ledger_Report, Cash_Ledger_Report, Vendor_Account_Ledger, Payble_Reoprt_Vendor } = require('../Pages/Edit_Cash_Ledger/Edit_Cash_Ledger.js');
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name

//Verify Cash Ledger
test('verify CashLedger page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await verifyledger(page); 

});

//Add Cash Ledger For Customer
test('Verify Add CashLedger page For Customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addcashledger(page); 
    await verifypartialpayment(page); 
    await verifyduplicatebillno(page); 
});

test('Add CashLedger for Service Ticket & AMC', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addledgerforsale(page); 
   
});

test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingReport(page); 
});

test('Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await customeraccledger(page); 
});

test('Verify Cash Ledger Report in Archie', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await Cashledgerreport(page);
});

test('Edit Cash Ledger Page', async ({ page }) => {
 
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction");
  await page.locator(locators.Ledger_Menu).click();
  await page.waitForTimeout(200);
  await page.locator(locators.Cash_Ledger_Menu).click();
  console.log('Step 3: Sucessfully navigate to CashLedger.');
  await page.waitForTimeout(200);
  await Search_User(page, "07-01-2020 - 26-11-2024", null, customer_name, null);
  console.log('full Payment Ledger Open & Colsed');
  await page.waitForTimeout(200);
  await Open_View_Link(page);
  await page.locator(locators.Reset).click();
  await Search_User(page, null, null, customer_name, null);
  console.log('Customer Searched.');
  await page.waitForTimeout(200);
  await Open_View_Link(page);
  console.log('Customer Link opend.');
  await DisabledFields(page);
  await Edit_User(page);
  console.log('Customer Cash Leder Edited with only Receive Amount.');
  await Customer_Outstanding_Report(page, customer_name, null);
  console.log('Customer outstanding Report.');
  await page.waitForTimeout(200);
  await Cash_Ledger_Report(page, "Receive", customer_name);
  console.log('Cash Ledger Report for customer.');
  await page.waitForTimeout(500);

});



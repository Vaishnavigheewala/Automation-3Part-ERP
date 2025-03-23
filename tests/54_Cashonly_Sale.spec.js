const { test, expect } = require('@playwright/test');
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
const { verifysalepage, addsale, editsale, verifyeditsale_Ledger } = require('../Cashonly/VerifySale/VerifySale.js');

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
test('CashOnly - Verify Sale Page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(2000);
    await verifysalepage(page, customer_name);
    console.log('Step 4: Sucessfully Verify Sales Page');

});

test(' CashOnly - Add Sale ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await addsale(page, customer_name, "2", "10000", "Cash Only");
    console.log('Step 4: Sucessfully Added Sales and verify all reports ');

});


test('  CashOnly - Edit Sale ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await editsale(page, "1", "5000", customer_name, "Cash Only");
    console.log('Step 4: Sucessfully Edit the Sales and verify reports ');
    await page.waitForTimeout(1000);
    await verifyeditsale_Ledger(page, customer_name, "5000", "CashSales");
    console.log('Step 5:  edited sale bill no verify in ledger');

});

test(' CashOnly - Add Sale for Cash Ledger use in Partial Payment ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await addsale(page, customer_name, "2", "10000", "Cash Only");
    console.log('Step 4: Sucessfully Added Sales and verify all reports ');

});



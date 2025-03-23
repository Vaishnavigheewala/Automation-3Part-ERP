const { test, expect } = require('@playwright/test');
const locators = require('../Pages/ProformaSale/proformaSale.json');
let sharedNetAmount;
let sharedpreviousBillNumber = 0;
let sharedlatestBillNumber;
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
const { selectsubmenu, verifyPerformaSale, verifyPerformaSaleGrid, viewlink, Invoicelink, addproformaSale, editproformaSale } = require('../Pages/ProformaSale/proformaSale.js');
const { TIMEOUT } = require('dns/promises');


/********************************************************************/
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let Raw_inventory = updatedVariables.Inventory.Raw_inventory;
test('Verify Proforma Sale Page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Proforma Sale Page is Displayed');
    await verifyPerformaSale(page, customerName); // called selectcustomer to select customer from dropdown
    await verifyPerformaSaleGrid(page);
    await page.waitForTimeout(3000);
    await viewlink(page);
    await Invoicelink(page);
    await page.waitForTimeout(3000);



});


test('Create Proforma Sale', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Proforma Sale Page is Displayed');

    await editproformaSale(page, customerName, "Fenvial", Raw_inventory, '2');
    await page.waitForTimeout(1000);
    console.log('step 8 : Reset Successfully');

    await addproformaSale(page, customerName, "Fenvial", Raw_inventory, '2');
    await page.waitForTimeout(1000);
    console.log('step 9 : Submit Successfully ');


});


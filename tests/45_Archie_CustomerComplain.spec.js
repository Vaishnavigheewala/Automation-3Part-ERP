const { test, expect } = require('@playwright/test');
const locators = require('../Archie/CustomerComplain/CustomerComplain.json');
const fs = require('fs');
const path = require('path');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { verifypage, addcomplainforCompany, addcomplainAquaCareComplain, editcomplain } = require('../Archie/CustomerComplain/CustomerComplain.js')
/********************************************************************/

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('verify customer complain page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // Call login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // Select Reports Menu
    console.log('Step 3: Successfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await verifypage(page);
    //Add Customer Complain as Company Complain
    await addcomplainforCompany(page , customerName);
    //Add Customer Complain as Aqua Care Complain
    await addcomplainAquaCareComplain(page , customerName , "LALUBHAI");
    //Edit Customer Complain
    await editcomplain(page , "VIJAYBHAI");



});
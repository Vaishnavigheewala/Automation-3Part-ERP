const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Update_Billing_Address/Update_Billing_Address.json');
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
const {Update_Billing_Address_Menu_Selection, Update_Billing_Address, Verify_Page, View_Change_Update_Billing_Address, Customer_Quick_View} = require('../Pages/Update_Billing_Address/Update_Billing_Address.js');

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Update Billing Address', async({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await selectmenu(page, "Tools");
    await page.waitForTimeout(1000);
    await Update_Billing_Address_Menu_Selection(page);
    console.log('Navigated to Update Billing Address Page.');
    await Verify_Page(page);
    console.log('Verifyed Update Billing Address Page Component.');
    await Update_Billing_Address(page, customerName, "Pal RTO");
    await page.locator(locators.Update_Billing_Address.Reset).click();
    await View_Change_Update_Billing_Address(page ,customerName);
    await selectmenu(page, "Tools");
    await Customer_Quick_View(page);
});
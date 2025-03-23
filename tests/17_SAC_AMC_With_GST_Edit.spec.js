const { test, expect } = require('@playwright/test');
const locators = require('../Pages/AMC_With_GST_Edit/AMC_With_GST_Edit.json');
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
const { OpenView, OpenEditPage, Verify_Edit, Edit_AMC_GST, Reset_Close_Edit, Outstanding_Reports_Edit_AMC_GST, Customer_Account_Ledger_Edit_AMC_GST, Inventory_Stock_Edit_AMC_GST, AMC_With_GST_Reports_Edited_AMC_GST } = require('../Pages/AMC_With_GST_Edit/AMC_With_GST_Edit.js');
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer_Name;
let Raw_inventory = updatedVariables.Inventory.Raw_inventory;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

test('Verify Reset Close Functionality Updated AMC With GST Page', async({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
 
    await page.locator(locators.AMC_With_GST_Menu).click();
    await page.waitForTimeout(1000);
    await OpenView(page);
    await OpenEditPage(page);
    await Reset_Close_Edit(page, "A-123,HOme", "3");
    await OpenView(page);
    await OpenEditPage(page);
    await Verify_Edit(page);
    
});


test('Update AMC With GST ', async({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await page.locator(locators.AMC_With_GST_Menu).click();
    await page.waitForTimeout(1000);
    await OpenView(page);
    await OpenEditPage(page);
    await Verify_Edit(page);
    await page.waitForTimeout(600);
    await Edit_AMC_GST(page, "31-12-2024", null, null, null, "V_AUTO", null, null, null, null, "6", null, "No", null, null, null, null);
    
});


test('View AMC With GST Updated Data', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    await AMC_With_GST_Reports_Edited_AMC_GST(page, Customer_Name)
    await page.waitForTimeout(2000);
});

test('Outstanding Report Updated AMC With GST', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    await Outstanding_Reports_Edit_AMC_GST(page, Customer_Name);
    console.log('Outstanding Reoprts.');

});

test('Customer Account Ledger Reports Updated AMC With GST', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    await Customer_Account_Ledger_Edit_AMC_GST(page, Customer_Name);
    console.log('Customer Account Ledger Reoprts.');

});


test('Inventory Stock Report Updated AMC With GST ', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");

    await Inventory_Stock_Edit_AMC_GST(page, Raw_inventory);
    console.log('Customer Account Ledger Reoprts.');

}); 
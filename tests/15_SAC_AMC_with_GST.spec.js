const { test, expect } = require('@playwright/test');
const locators = require('../Pages/AMC_with_GST/AMC_with_GST.json');
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
const { selectsubmenu, selectcustomer, pdfexport, addnew, amc_add_new, Expire_amc, Reactivate_amc } = require('../Pages/AMC_with_GST/AMC_with_GST.js');
/********************************************************************/
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;


test('verify AMC with GST page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Sales Return Page Displayed');
    await addnew(page);
    await amc_add_new(page, Customer_Name, "WARRANTY", "PRATIK", "Paid", "5", InventoryRO_Name);
    await page.waitForTimeout(2000);
    await page.locator(locators.AMC_add_new.update).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.AMC_add_new.update_ok).click();
    await page.locator(locators.AMC_with_GST.addnew_pdf).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.AMC_with_GST.addnew_reset).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.AMC_with_GST.addnew_close).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.AMC_with_GST.view).nth(0).click();
    await page.locator("#AmcWithGstViewClose").click();
    await page.locator(locators.AMC_with_GST.invoice).nth(0).click();
    await page.locator(locators.AMC_with_GST.invoice_yes).click();
    await Expire_amc(page);
    await Reactivate_amc(page);

});



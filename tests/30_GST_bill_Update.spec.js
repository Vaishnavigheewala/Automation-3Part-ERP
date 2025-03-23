const { test, expect } = require('@playwright/test');
const locators = require('../Pages/GST Sales bill Update/GST_bill_Update.json');


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
const { Verify_AMC_bill_Update,Reset_AMC_bill_Update,view_amc_bill_update,update_amc_bill, Verify_GST_Sales_bill_Update, Verify_Sales_return_reports, Verify_Salse_Reports,verify_reports } = require('../Pages/GST Sales bill Update/GST_bill_Update.js');
/********************************************************************/
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Bill number Update', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);

    await selectmenu(page, "Tools");
    console.log('Step 3: Sucessfully Clicked on Tools Menu');

    // Verify GST Salse Bill Number Update
    await Verify_GST_Sales_bill_Update(page,customerName);
    console.log('Step 4: Sucessfully Verify and Update Bill Number')
    await page.waitForTimeout(1000);
    
    await selectmenu(page, "Transaction");

    // Verify Updated Bill Number in Salse Return Reports
    await Verify_Sales_return_reports(page, customerName);
    console.log('Step 5: Sucessfully Verify Updated Bill Number in Sales Return Report')
    await page.waitForTimeout(2000);

    // Verify Updated Bill Number in Item Wise And Sales Summary Reports
    await selectmenu(page, "Reports");
    await Verify_Salse_Reports(page, customerName);
    console.log('Step 6: Sucessfully Verify Updated Bill Number in Reports')

    //Redirect to Tools
    await selectmenu(page, "Tools");
    console.log('Step 7: Sucessfully Redirect on Tools Menu');
    
    //Reset Functionallity of AMC  Bill Number update page
    await Reset_AMC_bill_Update(page,"20-5-2024 - 20-01-2025",customerName);
    console.log('Step 8: Sucessfully work on Reset Functionallity');

    //Search Functionallity of AMC Bill Number update page
    await Verify_AMC_bill_Update(page,customerName);
    console.log('Step 9: Sucessfully work on Search Functionallity');

    //Verify AMC Bill Number view page
    await view_amc_bill_update(page);
    console.log('Step 10: Sucessfully Verify AMC Bill Number view page');

    //Verify AMC Bill Number Search page
    await Verify_AMC_bill_Update(page,customerName);
    console.log('Step 11: Sucessfully Verify AMC Bill Number Search page and Grid');

    //Update AMC Bill Number
    await update_amc_bill(page);
    console.log('Step 12: Sucessfully Update AMC Bill Number');

    //Verify Reports [AMC Report , Customer Account Ledger]
    await verify_reports(page,customerName);
    console.log('Step 13: Sucessfully Verify Reports on updated AMC Bill Number');


});
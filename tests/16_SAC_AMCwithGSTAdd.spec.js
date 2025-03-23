const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Add_AmC/AMC.json');
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
const { addamc,amcreport,outstanding,customerAccountledger,Inventorystock} = require('../Pages/Add_AmC/AMC.js');
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;
let Raw_inventory = updatedVariables.Inventory.Raw_inventory;
test('Create AMC With GST', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await addamc(page,Customer_Name,"AMC WITH PRE FILTER","LALUBHAI","Paid",InventoryRO_Name,Raw_inventory);


});


test(' Report for Created AMC With GST', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await amcreport(page,Customer_Name);
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstanding(page,Customer_Name);
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 5: Sucessfully Clicked on Reports Menu');
    await customerAccountledger(page,Customer_Name);
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 6: Sucessfully Clicked on Reports Menu');
    await Inventorystock(page,Customer_Name);

    


});
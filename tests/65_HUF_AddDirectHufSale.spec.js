const { test, expect   } = require('@playwright/test');
const locators = require('../HUF/VerifyDirectHufSale/VerifyDirectHufSale.json');
//const locator = require('../HUF/AddDirectHUFSale/AddDirectHUFSale.json');
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
const { verifysalepage} = require('../HUF/VerifyDirectHufSale/VerifyDirectHufSale.js');
const { navigatesalepage,Reset_add_sale,add_sale,selectfilteritemwise,selectfiltersalesummary,verifydetailssalesummary,selectfiltercombinesale,selectfilterOutstanding,DirectHUF } = require('../HUF/AddDirectHUFSale/AddDirectHUFSale.js'); 

// ********************************************************************
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;
test('KBT - Verify Direct Huf Sale Page', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await verifysalepage(page ,customer_name);
    console.log('Step 4: Sucessfully Verify Direct Huf Sales Page');

});

test('KBT - Add Direct Huf Sale Page', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await navigatesalepage(page);
    console.log('Step 4: Sucessfully Verify Direct Huf Sales Page');
    await Reset_add_sale(page,customer_name,InventoryRO_Name,"1");
    console.log('Step 5: Reset Functionallity of Direct Huf Sales Page');
    await add_sale(page,customer_name,InventoryRO_Name,"1");
    console.log('Step 6: Add Functionallity of Direct Huf Sales Page');

});

test(' Verify Sales Report - Itemwise Report', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await selectfilteritemwise(page, customer_name);
    await page.waitForTimeout(1000);
    //await verifydetailsitemwise(page);
  });
  
  test(' Verify Sales Report - Sales Summary', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    //await selectsubmenu(page, "Reports");
    //console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
    await page.waitForTimeout(3000);
    await selectfiltersalesummary(page, customer_name);
    await verifydetailssalesummary(page);
  });
  
  
  test(' Verify Sales Report - Combine Sale', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    //await selectsubmenu(page, "Reports");
    //console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
    await page.waitForTimeout(3000);
    await selectfiltercombinesale(page, customer_name);
    //await verifydetailssalesummary(page);
  });
  
  test(' Verify Sales Report - Outstanding Reports', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfilterOutstanding(page, customer_name);
  });

  test(' Verify Sales Report - Direct HUF Sales Reports', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await DirectHUF(page, customer_name);
  });

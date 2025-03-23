const { test, expect } = require('@playwright/test');
//Master Menu
const locators = require('../Pages/03Broker/Broker.json');
const fs = require('fs');
const path = require('path');

// =====================Reusable functions imported =====================/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Service_Card_Navigation, Pagination_Checking, Search_Customer, Service_Card, Reset_Service_Card, Verify_Grid } = require('../Archie/Service_Card/Service_Card.js');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Verify Service Card', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.14:88/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Dashboard Page displayed');
    await page.waitForTimeout(1000);
    await Service_Card_Navigation(page);
    console.log('Step 4: Service Card Page ');
    await Search_Customer(page, customerName);
    console.log('Step 5: Service Card Search Customer');
    await Service_Card(page);
    console.log('Step 6 : Service Card Geanarated');
    await Reset_Service_Card(page);
    console.log('Service Card Page Reset');
    await Verify_Grid(page);
    console.log('Step 7: Service Card Page Grid Verify ');
    await Pagination_Checking(page);
    console.log('Step 8: Service Card Page Pagination');
});

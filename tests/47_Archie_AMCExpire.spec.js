const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Archie_AMC_Expire/Archie_AMC_Expire.json');
const fs = require('fs');
const path = require('path');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {  ExpireAmc , ReactivateAmc } = require('../Archie/Archie_AMC_Expire/Archie_AMC_Expire.js');
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
 
test('Expire AMC', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await ExpireAmc(page); 
    console.log('Step 3: Expired AMc');
    await ReactivateAmc(page)
    console.log('Step 3: Reactivate AMc');




});



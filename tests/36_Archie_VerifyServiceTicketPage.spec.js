const { test, expect   } = require('@playwright/test');
const locators = require('../Archie/VerifyServiceTicketPage/VerifyServiceTicketPage.json');
const fs = require('fs');
const path = require('path');

//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {verifyserviceticket} = require('../Archie/VerifyServiceTicketPage/VerifyServiceTicketPage.js');

// ********************************************************************

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Archie - Verify Service Ticket Page', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    await page.waitForTimeout(2000);
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await verifyserviceticket(page , customerName );

});
const { test, expect   } = require('@playwright/test');
const locators = require('../Archie/AddFreeServiceTicketWithoutInventory/AddFreeServiceTicketWithoutInventory.json');
const fs = require('fs');
const path = require('path');


//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {addserviceticket , SACcustomeraccledger} = require('../Archie/AddFreeServiceTicketWithoutInventory/AddFreeServiceTicketWithoutInventory.js');
const {deleteservice}= require('../Archie/Delete_Service_Ticket/Delete_Service_Ticket.js');
// ********************************************************************

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name


test('Archie - Verify Service Ticket Page', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
   // await expect(page).toHaveURL('http://192.168.29.112:88/');
   await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await addserviceticket(page , customerName , "RO", "ASHOKBHAI");
    console.log('Step 4: Sucessfully Added service tickets');
    
});

test('SAC - Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await SACcustomeraccledger(page , customerName); 
    console.log('Step 5: Sucessfully Customer Account Ledger verify report');

});


test('delete service ticket without inventory',async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await deleteservice(page,"FreeNo",customerName,"VIMP1");
    
});
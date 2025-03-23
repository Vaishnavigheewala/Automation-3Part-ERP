const { test, expect } = require('@playwright/test');
const locators = require('../HUF/Cash_Ledger/cash_ledger.json');
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
const { verifyledger,addcashledger,verifypartialpayment,verifyduplicatebillno,addledgerforsale,outstandingReport,VerifyReceiveAmt,
    customeraccledger,VerifyConsistency,Cashledgerreport,Checks_Grid_After_New_Data_Added} = require('../HUF/Cash_Ledger/cash_ledger.js');
const { editcashledger ,Report} = require('../HUF/Cash_Ledger/cash_ledger.js');
const { navigatesalepage,Reset_add_sale,add_sale } = require('../HUF/AddDirectHUFSale/AddDirectHUFSale.js'); 
    
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customer_name = updatedVariables.Customer.Customer_Account_Name;

test('verify CashLedger page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await verifyledger(page); 

});

test('KBT - Add Direct Huf Sale for cash Ledger', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await navigatesalepage(page);
    console.log('Step 4: Sucessfully Verify Direct Huf Sales Page');
    await Reset_add_sale(page,customer_name,"vaishnavi automation","1","1000");
    console.log('Step 5: Reset Functionallity of Direct Huf Sales Page');
    await add_sale(page,customer_name,"vaishnavi automation","1","1000");
    console.log('Step 6: Add Functionallity of Direct Huf Sales Page');

});

//Add Cash Ledger For Customer
test('Add CashLedger page For Customer', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addcashledger(page); 
    await verifypartialpayment(page); 
    await verifyduplicatebillno(page); 

});

test('Add CashLedger for sale', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addledgerforsale(page); 
    await Checks_Grid_After_New_Data_Added(page);
   
});

test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingReport(page); 
});

test('Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await customeraccledger(page); 
});

test('Verify Cash Ledger Reports for Customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await selectmenu(page, "Reports"); 
    await Cashledgerreport(page);
});

test('KBT - Edit Cash Ledger ', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await editcashledger(page , "50000");
    console.log('Step 4: Sucessfully Edit the Cash Ledger ');
   
  
});

test('KBT - Verify Reports after Edit Cash Ledger ', async ({ page }) => {
   
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.40:85/');
    await page.waitForTimeout(2000);
    await Report(page , customer_name);
    console.log('Step 4: Sucessfully verify reports ');
  
});

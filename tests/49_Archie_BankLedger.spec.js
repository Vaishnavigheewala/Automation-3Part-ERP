const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Verify_Bank_Ledger_Page/Verify_Bank_Ledger_Page.json');
const fs = require('fs');
const path = require('path');

//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Search_User, PDF_Export, Add_Bank_Ledger, View_Bank_Ledger_link, Bank_Ledger_Menu, Verify_Add_Bank_Ledger_Page, Add_New_Click } = require('../Pages/Verify_Bank_Ledger_Page/Verify_Bank_Ledger_Page.js');
const { verifyaddledger,verifypartialpayment,verifyduplicatebillno,VerifyReceiveAmt,addledgerforsale,outstandingReport, customeraccledger, VerifyConsistency, Bankledgerreport } = require('../Archie/Add_Bankledger_Customer/Bankledger.js');
const { addledgerforpurchase,outstandingReport2, customeraccledger2, VerifyConsistency2, Bankledgerreport2 } = require('../Pages/BankLedgerAdd/BankLedgerVendor.js');


// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name

test('Bank Ledger Page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await page.waitForTimeout(1000);
    await Bank_Ledger_Menu(page);
    console.log('Step 3: Sucessfully navigate to bankLedger.');
    await page.waitForTimeout(500);
    await Search_User(page, null, null, customerName, null);
    console.log('Step 4: Sucessfully Customer Search');
    await page.locator(locators.Reset).click();
    console.log('Step 5: Sucessfully Reset');
    await PDF_Export(page);
    console.log('Step 7: Sucessfully PDF Export');
    await Add_Bank_Ledger(page);
    console.log('Step 8: Sucessfully Add navigate N close');
    await View_Bank_Ledger_link(page);
    console.log('Step 9: Sucessfully view navigate N close');
    await Add_New_Click(page);
    await Verify_Add_Bank_Ledger_Page(page);
   
});


test('Verify Add Bank Ledger Page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await page.waitForTimeout(1000);
    await verifyaddledger(page);
    await verifypartialpayment(page);
    await verifyduplicatebillno(page);
    await VerifyReceiveAmt(page);

   
});

test('Add BankLedger for Ticket & AMC', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await addledgerforsale(page); 
   
});

test('Outstanding report for customer', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await outstandingReport(page); 
});

test('Verify Bank Ledger Report in Archie Campany', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); 
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await Bankledgerreport(page);
});

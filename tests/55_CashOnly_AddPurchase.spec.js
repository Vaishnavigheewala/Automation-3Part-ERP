const { test, expect } = require('@playwright/test');

let sharedNetAmount;
let sharedpreviousBillNumber = 0;
let sharedlatestBillNumber;
let sharedcustomername;
const fs = require('fs');


const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, AddPurchasePage, viewlink, verifypurchase, PurchaseEntry, addpurchasedetails, updatepurchasesdetails, storenetamount, submitbutton, SelectItemwiseReport, selectfilteritemwise, SelectsummaryReport, EditPurchasePage,
    selectfiltersummary, verifydetailssummary, SelectpaybleReport, selectfilterpayble, SelectvendorledgerReport, selectfiltervendorledger, SelectInventorystockReport, selectfilterInventorystock } = require('../Cashonly/Purchase/Purchase.js');
const { TIMEOUT } = require('dns/promises');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Vendor_Bill,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

let V_Bill_No;
// Global variable for updated JSON data
let updatedVariables = {};

// Function to load and clean JSON data dynamically
function loadUpdatedVariables() {
    let filePath = Variable_File_Path();
    let updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    return Remove_Empty_Strings(updatedData);
}

// Before each test, load fresh data
test.beforeEach(() => {
    updatedVariables = loadUpdatedVariables();
});


test('verify Purchase page', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Purchase Page is Displayed');

    /****************** Scroll down ******************/
    //  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight);});

    await verifypurchase(page, Vendor_Name); // called selectcustomer to select customer from dropdown
    await viewlink(page);

    console.log('Successfully verify purchase page');
    //await page.waitForTimeout(3000);

});

test('Add Purchase', async ({ page }) => {

    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 4: Purchase Page is Displayed');
    await page.waitForTimeout(2000);
    await AddPurchasePage(page);
    console.log(' Add Purchase page is Displayed');
    /****************** Add Vendor , VendorBillNo ******************/
    await PurchaseEntry(page, "Vabc", Vendor_Name); // called selectcustomer to select customer from dropdown
    console.log(' Selecte Vendor Billno as V101 and Vendor Name as - Vendor_Name');
    await page.waitForTimeout(2000);
    /****************** Scroll down ******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    /****************** Add purchase  ******************/
    await addpurchasedetails(page, "FinishMaterial", "SNEH2", "4");
    await page.waitForTimeout(2000);
    await submitbutton(page);
    console.log(' Submit without Update');
    await page.waitForTimeout(2000);
    /****************** Update purchase Details ******************/
    await updatepurchasesdetails(page);
    console.log('purchase Details Updated Successfully');
    /****************** Scroll down again ******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    /****************** Store Net Amount ******************/
    let netAmount = await storenetamount(page, 'input#PurchaseEntryNetAmount');
    console.log('Net Amount is', netAmount);
    await page.waitForTimeout(2000);
    /****************** Submit Details ******************/
    await submitbutton(page);
    console.log(' Submit Data');

    await EditPurchasePage(page);
    V_Bill_No = await Generate_Variable('Purchase.V_Bill_No', async () => `VB${await Generate_Unique_Vendor_Bill()}`);
    /****************** Add Vendor , VendorBillNo ******************/
    await PurchaseEntry(page, V_Bill_No, Vendor_Name); // called selectcustomer to select customer from dropdown
    console.log(' Selecte Vendor Billno as V101 and Vendor Name as - Vendor_Name');
    await page.waitForTimeout(2000);
    /****************** Scroll down ******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    /****************** Add purchase  ******************/
    await addpurchasedetails(page, "FinishMaterial", "test fmm", "4");
    await page.waitForTimeout(2000);
    await submitbutton(page);
    console.log(' Submit without Update');
    await page.waitForTimeout(2000);
    /****************** Update purchase Details ******************/
    await updatepurchasesdetails(page);
    console.log('purchase Details Updated Successfully');
    /****************** Scroll down again ******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    /****************** Store Net Amount ******************/
    netAmount = await storenetamount(page, 'input#PurchaseEntryNetAmount');
    console.log('Net Amount is', netAmount);
    await page.waitForTimeout(2000);
    /****************** Submit Details ******************/
    await submitbutton(page);
    console.log(' Submit Data');

});

test(' Verify purchase Report - Itemwise', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectItemwiseReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfilteritemwise(page, Vendor_Name);
    console.log('Step 5: Sucessfully verify itemwise Reports ');

});

test(' Verify purchase Report - Purchase summary', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectsummaryReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfiltersummary(page, Vendor_Name);
    await verifydetailssummary(page);
    console.log('Step 5: Sucessfully verify summary Reports ');

});

test(' Verify purchase Report - Purchase Payble', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectpaybleReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfilterpayble(page, Vendor_Name);
    console.log('Step 5: Sucessfully verify Payble Reports');

});

test(' Verify purchase Report - Purchase Vendor account ledger', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectvendorledgerReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfiltervendorledger(page, Vendor_Name);
    console.log('Step 5: Sucessfully verify Vendor account ledger Reports');

});

test(' Verify purchase Report - Purchase Inventory stock', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectInventorystockReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfilterInventorystock(page, "SNEH2");
    console.log(' Records Sucessfully display');

});
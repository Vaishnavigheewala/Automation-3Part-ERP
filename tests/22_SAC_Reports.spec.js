const { test, expect } = require('@playwright/test');

const locators = require('../Pages/Sale_Reports/sale_reports.json');
const locator = require('../Pages/Payable_Reports/payable.json');
const loc = require('../Pages/Purchase_Reports/purchase_report.json');
const loca = require('../Pages/DebitNote_reports/Debitnote.json');
const locat = require('../Pages/AMC_report/amc_report.json');
const lo = require('../Pages/Account_ledger_reports/accountreports.json');
const outstandingRepots = require('../Pages/oustanding_reports/outstanding.json');
const creditreports = require('../Pages/CreditNote_reports/credit.json');
const inventoryreports = require('../Pages/Inventory_reports/Inventory.json');
const ledger = require('../Pages/Ledger_report/ledger.json');

let sharedNetAmount;
let sharedpreviousBillNumber = 0;
let sharedlatestBillNumber;
let sharedcustomername;
let bill_From_New_Tab, vendor_Bill;
const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, selectfilteritemwise, verifydetailsitemwise, selectfilterResetitemwise, selectfiltersalesummary, selectfilterResetsalesummary, verifydetailssalesummary, selectfiltercombinesale, selectfiltercombineResetsale } = require('../Pages/Sale_Reports/sale_reports.js');
const { selectsubmenuofpayable, selectfilterResetPayable, selectfilterPayable, sortingPayable } = require('../Pages/Payable_Reports/payable.js');
const { selectsubmenuofpurchase, selectfilterResetpurchaseItemwise, selectfilterPurchaseItemwise, sortingItemwise, selectfilterpurchasesummary, selectfilterResetsummary, sortingPurchaseSummary } = require('../Pages/Purchase_Reports/purchase_report.js');
const { selectsubmenuofdebit, selectfilterResetDebit, selectfilterDebit } = require('../Pages/DebitNote_reports/Debitnote.js');
const { selectsubmenuofamc, selectfilterResetamc, selectfilteramc, sortingamc } = require('../Pages/AMC_report/amc_report.js');
const { selectsubmenuofaccountledger, selectfiltervendor, selectfilterResetvendor, selectfiltercustomer, selectfilterResetcustomer, Handle_New_Tab, handleNewTab } = require('../Pages/Account_ledger_reports/accountreports.js');
const { selectsubmenuofoutstanding, selectfilterResetOutstanding, selectfilterSearchOutstandingcust, selectfilterSearchOutstandingvendor, sorting } = require('../Pages/oustanding_reports/outstanding.js');
const { selectsubmenuofcredit, selectfilterResetCredit, selectfilterSearchCredit, sortingcredit } = require('../Pages/CreditNote_reports/credit.js');
const { selectsubmenuofInventory, selectfilterResetInventory, selectfilterSearchInventory, sortingInventory } = require('../Pages/Inventory_reports/Inventory.js');
const { selectsubmenuofledger, selectfilterResetbank, selectfiltersearchbank, sortingbank, selectfilterResetcash, selectfilterSearchcash, sortingcash } = require('../Pages/Ledger_report/ledger.js');

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let vendorName = updatedVariables.Vendor.Vendor_Account_Name;
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;

test(' Verify Sales Report - Itemwise Sale Report', async ({ page }) => {

  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await selectsubmenu(page, "Reports");
  console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetitemwise(page, customerName);
  await page.waitForTimeout(1000);
  await selectfilteritemwise(page, customerName);
  await page.waitForTimeout(3000);
  await verifydetailsitemwise(page);
  await page.locator(locators.Itemwise_report.itemwise_back).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Itemwise_report.itemwise_pdf).click();
  await page.waitForTimeout(1000);


});

test(' Verify Sales Report - Sale Summary Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  //await selectsubmenu(page, "Reports");
  console.log('Step 5: Reports - Sales - Sale Summary Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetsalesummary(page, customerName);
  await page.waitForTimeout(1000);
  await selectfiltersalesummary(page, customerName);
  await page.waitForTimeout(3000);
  await verifydetailssalesummary(page);
  await page.locator(locators.sale_summary.summary_back).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_summary.saleSummary_pdf).click();

});

test(' Verify Sales Report - Combine Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await selectfiltercombineResetsale(page, customerName, "26-12-2030 - 26-12-2030");
  await page.waitForTimeout(1000);
  await selectfiltercombinesale(page, customerName);
  await page.waitForTimeout(1000);
  await page.locator(locators.combine_summary.combine_back).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.combine_summary.combine_pdf).click();
});

test('Verify Payable Reports - Payable', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofpayable(page, "Reports");
  console.log('Step 4: Reports - Payable - Payable Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterPayable(page, vendorName);
  await page.waitForTimeout(3000)
  await selectfilterResetPayable(page, vendorName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(1000);
  await sortingPayable(page);
  //await page.waitForTimeout(1000);
});

test('Verify Purchase Reports - Itemwise', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofpurchase(page, "Reports");
  console.log('Step 4: Reports - Purchase - Purchase Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterPurchaseItemwise(page, vendorName);
  await page.waitForTimeout(3000)
  await selectfilterResetpurchaseItemwise(page, vendorName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(1000);
  await sortingItemwise(page);
  await page.waitForTimeout(1000);
});

test('Verify Purchase Reports - Purchase Summary', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  //await selectsubmenuofpurchase(page, "Reports");
  console.log('Step 4: Reports - Purchase - Purchase Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterpurchasesummary(page, vendorName);
  await page.waitForTimeout(3000)
  await selectfilterResetsummary(page, vendorName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(1000);
  await sortingPurchaseSummary(page);
  await page.waitForTimeout(1000);
});


test('Verify AMC Reports - AMC Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofamc(page, "Reports");
  console.log('Step 4: Reports - AMC - AMC Report Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilteramc(page, customerName);
  await page.waitForTimeout(3000)
  await selectfilterResetamc(page, customerName, "07-01-2020 - 07-01-2030");
  await page.waitForTimeout(1000);
  await sortingamc(page);
  await page.waitForTimeout(1000);
});

test('Verify Debit Note Reports - Debit Note', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofdebit(page, "Reports");
  console.log('Step 4: Reports - DebitNote - Debit Note Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterDebit(page, vendorName);
  await page.waitForTimeout(3000)
  await selectfilterResetDebit(page, vendorName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(1000);
});

test('Verify Credit Note Reports - Credit Note', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofcredit(page, "Reports");
  console.log('Step 4: Reports - CreditNote - Credit Note Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetCredit(page, customerName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(3000)
  await selectfilterSearchCredit(page, customerName);
  await page.waitForTimeout(1000);
  await sortingcredit(page);
  await page.waitForTimeout(1000);
});

test('Verify Outstanding Reports - Outstanding Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofoutstanding(page, "Reports");
  console.log('Step 4: Reports -  Outstanding Report - Outstanding Report Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetOutstanding(page, customerName, "31-12-2023 - 31-12-2030", "Shree Aqua Care");
  await page.waitForTimeout(1000);
  await selectfilterSearchOutstandingcust(page, customerName, "Shree Aqua Care");
  await page.waitForTimeout(1000);
  await selectfilterSearchOutstandingvendor(page, vendorName, "Shree Aqua Care");
  await page.waitForTimeout(3000);
  await sorting(page);
  await page.waitForTimeout(1000);

});

test('Verify Ledger Reports -  Ledger Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofledger(page, "Reports");
  console.log('Step 4: Reports -  Bank Ledger Report - Bank Ledger Report Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetbank(page, "Receive", customerName);
  await selectfiltersearchbank(page, "Receive", customerName);
  await sortingbank(page);
  await selectfilterResetcash(page, "Payable", vendorName)
  await selectfilterSearchcash(page, "Payable", vendorName)
  await sortingcash(page);
});

test('Verify Inventory Stock Reports - Inventory Stock Report', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofInventory(page, "Reports");
  console.log('Step 4: Reports -  Inventory Stock Report - Inventory Stock Report Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterResetInventory(page, "FinishMaterial", InventoryRO_Name);
  await page.waitForTimeout(1000);
  await selectfilterSearchInventory(page,InventoryRO_Name);
  await page.waitForTimeout(1000);
  await sortingInventory(page);
  await page.waitForTimeout(1000);

});

test('Verify Account Ledger Reports - Account Ledger', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL("http://192.168.1.40:88/"); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuofaccountledger(page, "Reports");
  console.log('Step 4: Reports -  Account Ledger -  Account Ledger Page is Displayed');
  await page.waitForTimeout(1000);
  await selectfiltervendor(page, vendorName);
  await page.waitForTimeout(2000);
  // customer account ledger
  await selectfilterResetcustomer(page, customerName, "31-12-2023 - 31-12-2030");
  await page.waitForTimeout(1000);
  await selectfiltercustomer(page, customerName);

});
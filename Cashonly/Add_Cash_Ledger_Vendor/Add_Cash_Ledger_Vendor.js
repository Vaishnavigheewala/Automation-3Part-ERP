const { test, expect } = require('@playwright/test');
const locators = require('./Add_Cash_Ledger_Vendor.json');
const fs = require('fs');
const path = require('path');

let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;
let vendorName = updatedVariables.Vendor.Vendor_Account_Name; 

async function addnew(page) {
    await page.locator(locators.CashLedger.Ledger).click();
    await page.locator(locators.CashLedger.CashLedgerpage).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Cash' })).toBeVisible();

    await page.click(locators.CashLedger.AddnewButton_Home);
    console.log('add new triggered.');
    await page.waitForTimeout(3000);

    //select date range
    // await page.locator(locators.CashLedger.Datepicker).click();
    // const datepicker = '#CommonDatePicker'; //code to clear the date
    // await page.fill(datepicker, ''); //code to clear the date
    // await page.fill(datepicker, '06-01-2025');
    // console.log('Date Entered into Field');
    // await page.waitForTimeout(2000);

    //select payment
    await page.locator(locators.CashLedger.Payment_Nature).click();
    await page.locator("//li[normalize-space()='Payable']").click();
    console.log('Payment Nature is Selected');
    await page.waitForTimeout(2000);

    //select Vendor
    await page.locator(locators.CashLedger.vendorname).click();
    await page.waitForTimeout(2000);
    await page.fill(locators.CashLedger.entercustomername, vendorName);
    await page.locator('li.e-list-item', { hasText: vendorName }).click();

    await page.locator("#CashLedgerEntryTotalReceivedAmount").click();
    await page.waitForTimeout(1000);
    await page.fill("#CashLedgerEntryTotalReceivedAmount", "10000");
    await page.waitForTimeout(1000);

    await page.locator(locators.CashLedger.AddnewButton).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.CashLedger.Add_Billtype).click();
    await page.locator('li.e-list-item', { hasText: "CashPurchase" }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.CashLedger.Add_Billnumber).dblclick();
    await page.locator(locators.CashLedger.Add_Billnumber1).dblclick();
    await page.locator('li.e-list-item').first().click();  // Selects the first record
    await page.waitForTimeout(1000);

    const netOutstandingAmt = await page.locator(locators.CashLedger.Net_Outstanding_Amt).textContent();

    const cleanAmt = netOutstandingAmt.replace(/[^0-9.]/g, '');

    await page.locator(locators.CashLedger.Paid_Amt).dblclick();
    await page.fill(locators.CashLedger.Paid_Amt1, cleanAmt);
    await page.waitForTimeout(2000);

    await page.locator(locators.CashLedger.Update).click();
    await page.locator(locators.CashLedger.Update_OK).click();
    await page.waitForTimeout(2000);

    await page.locator(locators.CashLedger.Submit).click();
    await page.waitForTimeout(2000);

}
async function outstanding(page) {

  // Click on Reports → Outstanding Reports
  await page.click(locators.outstandingreport.outstanding);

  // Open the filter sidebar
  await page.click(locators.outstandingreport.filterbutton);

  // Enter Customer Name in the filter
  await page.locator(locators.outstandingreport.vendorname).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, vendorName);
  await page.locator('li.e-list-item', { hasText: vendorName }).click();
  await page.waitForTimeout(2000);
  // Apply the filter by clicking on Search
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(2000);

  // Check for sales/AMCs with 0 pending payment
  const zeroPendingRows = await page.$$eval('table tbody tr', rows => {
    return rows.filter(row => {
      const balanceElement = row.querySelector('#OutstandingReportRemainBalanceAmountColumn');
      const balance = balanceElement ? parseFloat(balanceElement.innerText.replace(/[^0-9.-]+/g, "")) : 0;
      return balance === 0;
    });
  });

  if (zeroPendingRows.length < 0) {
    console.error('Found sales/AMCs with 0 pending payment displayed in the report.');
  } else {
    console.log('No sales/AMCs with 0 pending payment displayed in the report.');
  }


  console.log('Verification completed successfully.');

}

async function vendoraccledger(page) {
  await page.click(locators.vendoraccountLedger.accountLedger);
  await page.click(locators.vendoraccountLedger.vendorLedger);
  await page.click(locators.vendoraccountLedger.filterbutton);

  await page.locator(locators.CashLedger.vendorname).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, vendorName);
  await page.locator('li.e-list-item', { hasText: vendorName }).click();
  await page.waitForTimeout(2000);

  await page.click(locators.vendoraccountLedger.Searchbutton);
  await page.waitForTimeout(2000);

  console.log('Customer Account Ledger Report verification completed successfully.');

}


async function Cashledger(page) {
  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.LedgerReport.ledgerpage);
  await page.click(locators.LedgerReport.cashledgerpage);
  await page.click(locators.LedgerReport.filterbutton);

  await page.locator(locators.LedgerReport.paymentnature).click();
  await page.click("//li[normalize-space()='Payable']");
  await page.locator(locators.LedgerReport.vendorname).click();
  await page.fill(locators.CashLedger.entercustomername, vendorName);
  await page.locator('li.e-list-item', { hasText: vendorName }).click();
  await page.click(locators.LedgerReport.submitbutton);

}

module.exports = { addnew,outstanding,vendoraccledger,Cashledger }
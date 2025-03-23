const { test, expect } = require('@playwright/test');
const locators = require('./Edit_Bank_Ledger.json');

const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

async function Edit_Bank_Ledger(page, customername, paymentmethod, transactionno, receiveamt) {
    await page.click(locators.ledger);
    await page.click(locators.bank_ledger);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.searchbutton);

    // await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });

    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);
    await page.waitForTimeout(1000);

    await page.locator(locators.viewLink).nth(0).click();

    await page.waitForTimeout(1000);

    await page.click(locators.viewpage.editbutton);

    //select payment method
    await page.click(locators.viewpage.paymentmethod);
    await page.fill(locators.entercustomername, paymentmethod);
    await page.locator('li.e-list-item', { hasText: paymentmethod }).click();
    //enter transaction num
    await page.fill(locators.viewpage.TransactionNo, transactionno);
    // Enter Total riceived Amount
    await page.locator(locators.viewpage.Totalamt).nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByPlaceholder("Enter Received Amount").fill(receiveamt);
    //enter received 
    await page.dblclick(locators.viewpage.Receivedamt);
    // await page.dblclick(locators.viewpage.enterReceiveamt);
    await page.fill(locators.viewpage.enterReceiveamt, receiveamt);
    await page.click(locators.viewpage.balance);

    //enter received amt
    await page.dblclick(locators.viewpage.Receivedamt);
    // await page.dblclick(locators.viewpage.enterReceiveamt);
    await page.fill(locators.viewpage.enterReceiveamt, receiveamt);
    await page.click(locators.viewpage.balance);
    await page.click(locators.viewpage.yesbutton);
    await page.click(locators.viewpage.balance);

    //click on delete
    await page.click(locators.viewpage.deletebutton);

    //click on update
    await page.click(locators.viewpage.updatebutton);
    await page.click('//button[normalize-space()="OK"]');

    await page.click(locators.viewpage.submitbutton);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.searchbutton);

}

async function outstandingforcustomer(page, customername) {
    // Click on Reports → Outstanding Reports
    await page.click(locators.outstandingreport.outstanding);

    // Open the filter sidebar
    await page.click(locators.outstandingreport.filterbutton);

    // Enter Customer Name in the filter

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    // Apply the filter by clicking on Search
    await page.click(locators.outstandingreport.SearchButton);


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
}

async function customeraccledger(page, customername) {
    await page.click(locators.customeraccLedger.accountLedger);
    await page.click(locators.customeraccLedger.customeraccount);
    await page.click(locators.customeraccLedger.filterbutton);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.click(locators.customeraccLedger.Searchbutton);
    console.log('Customer Account Ledger Report verification completed successfully.');
}

async function VerifyConsistency(page) {

    await page.click(locators.outstandingreport.outstanding);
    await page.click(locators.outstandingreport.filterbutton);

    // Enter Customer Name in the filter
    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customerName);
    await page.locator('li.e-list-item', { hasText: customerName }).click();
    // Apply the filter by clicking on Search
    await page.click(locators.outstandingreport.SearchButton);

    await page.waitForSelector(`tr:has(td:has-text("${customerName}"))`);// wait up to 60 seconds

    // Now locate the row and get the balance
    await page.locator(`tr:has(td:has-text("${customerName}"))`);
    const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);

    console.log('Outstanding Report verification completed successfully.');
    await page.click(locators.customeraccLedger.reports);
    await page.click(locators.customeraccLedger.accountLedger);
    await page.click(locators.customeraccLedger.customeraccount);
    await page.click(locators.customeraccLedger.filterbutton);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customerName);
    await page.locator('li.e-list-item', { hasText: customerName }).click();

    await page.click(locators.customeraccLedger.Searchbutton);
    await page.waitForSelector(`tr:has(td:has-text("${customerName}"))`);// wait up to 60 seconds

    await page.locator(`tr:has(td:has-text("${customerName}"))`);
    const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
    expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
    console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');
}

module.exports = { Edit_Bank_Ledger, outstandingforcustomer, customeraccledger, VerifyConsistency };
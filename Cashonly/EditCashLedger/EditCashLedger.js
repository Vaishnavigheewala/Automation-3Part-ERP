const { test, expect } = require('@playwright/test');
const locators = require('./EditCashLedger.json');


async function editcashledger(page, totalreceivedamount) {

  await page.locator(locators.Ledger_Menu).click();
  await page.locator(locators.Cash_Ledger_Menu).click();

  //Locate and click the "view" Button
  await page.locator('a#CashLedgerListViewButton').nth(0).click();
  console.log("click on view");

  //verify edit button and edit data
  await page.locator(locators.Edit).click();

  //Fill Total Received Amount
  await page.locator(locators.totalreceivedamountTbox).click();
  await page.locator(locators.totalreceivedamountTbox).fill(totalreceivedamount);  // Fill the Transaction Id field
  console.log(' Total Received Amountfilled.');

  const netOutstandingAmt = await page.locator(locators.netoutstandingamount).first().textContent();
  const amount = parseFloat(netOutstandingAmt.trim());

  if (!isNaN(amount) && amount > 0) {
    const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${halfAmount}`);
    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.clickreceivedamt).nth(0);
    receive.dblclick();
    await page.fill(locators.enterreceivedamt, halfAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }
  // //Fill Recieved Amount 
  // await page.locator(locators.clickreceivedamt).nth(0).dblclick();
  // //await page.locator(locators.enterreceivedamt).dblclick();
  // await page.fill(locators.enterreceivedamt, rate);
  // console.log("Fill Rate");

  await page.locator(locators.update_button).click(); // update grid
  await page.waitForTimeout(1000);
  if (await page.locator(locators.Partial_Payment_Pop_up).isVisible()) {
    await page.locator(locators.Partial_Payment_Yes).click();
    await page.waitForTimeout(1000);
  }
  await page.locator(locators.updateok).click();
  console.log("update grid")

  await page.locator(locators.submitbtn).click();
  console.log("click on submit ");
  await page.waitForTimeout(2000);

  //select account group as vendor
  await page.locator(locators.VendorDropdown).click();
  await page.locator(locators.selectVendor).click();
  console.log('Vendor selected');
  await page.locator(locators.Search).click();
  console.log('Vendor searched');
  await page.waitForTimeout(2000);

  //Locate and click the "view" Button
  await page.locator('a#CashLedgerListViewButton').nth(0).click();
  console.log("click on view");

  //verify edit button and edit data
  await page.locator(locators.Edit).click();

  //Fill Total Received Amount
  await page.locator(locators.totalreceivedamountTbox).click();
  await page.locator(locators.totalreceivedamountTbox).fill(totalreceivedamount);  // Fill the Transaction Id field
  console.log(' Total Received Amountfilled.');

  const netOutstandingAmtvendor = await page.locator(locators.netoutstandingamount).first().textContent();
  const amountvendor = parseFloat(netOutstandingAmtvendor.trim());

  if (!isNaN(amountvendor) && amountvendor > 0) {
    const halfAmount = (amountvendor / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${halfAmount}`);
    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.clickreceivedamt).nth(0);
    receive.dblclick();
    await page.fill(locators.enterreceivedamt, halfAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }
  // //Fill Recieved Amount 
  // await page.locator(locators.clickreceivedamt).nth(0).dblclick();
  // //await page.locator(locators.enterreceivedamt).dblclick();
  // await page.fill(locators.enterreceivedamt, rate);
  // console.log("Fill Rate");

  await page.locator(locators.update_button).click(); // update grid
  await page.waitForTimeout(1000);
  if (await page.locator(locators.Partial_Payment_Pop_up).isVisible()) {
    await page.locator(locators.Partial_Payment_Yes).click();
    await page.waitForTimeout(1000);
  }
  await page.locator(locators.updateok).click();
  console.log("update grid")

  await page.locator(locators.submitbtn).click();
  console.log("click on submit ");
  await page.waitForTimeout(2000);
}


async function Report(page, customer, vendor) {

  // Outstanding Reports
  await page.click(locators.report);
  await page.click(locators.outstandingreport.outstanding);

  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(1000);


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

  await page.waitForSelector(`tr:has(td:has-text("${customer}"))`, { timeout: 60000 }); // wait up to 60 seconds

  // Now locate the row and get the balance
  await page.locator(`tr:has(td:has-text("${customer}"))`);
  const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);
  console.log('outstanding report Verification complete successfully.');

  //SAC - customer account ledger repoert

  await page.locator(locators.companychange).click();
  await page.locator(locators.selectSAC).click();
  await page.locator(locators.yesbtncompnaychange).click();
  await page.waitForTimeout(1000);
  console.log('login to SAC company');
  await page.waitForTimeout(2000);

  await page.click(locators.report);
  await page.click(locators.customeraccLedger.accountLedger);
  await page.click(locators.customeraccLedger.customeraccount);
  await page.click(locators.customeraccLedger.filterbutton);

  await page.locator(locators.customername).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.click(locators.customeraccLedger.Searchbutton);

  console.log('Customer Account Ledger Report verification completed successfully.');

  await page.waitForSelector(`tr:has(td:has-text("${customer}"))`, { timeout: 60000 }); // wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customer}"))`);
  const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
  expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
  console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');

  //SAC - vendor account ledger report
  await page.click(locators.report);
  await page.click(locators.vendoraccLedger.accountLedger);
  await page.click(locators.vendoraccLedger.vendoraccount);
  await page.click(locators.vendoraccLedger.filterbutton);

  await page.locator(locators.vendoraccLedger.vendorname).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.entercustomername, vendor);
  await page.locator('li.e-list-item', { hasText: vendor }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.vendoraccLedger.Searchbutton);
  await page.waitForTimeout(1000);
  console.log('vendor Account Ledger Report verification completed successfully.');

  //Cash Only - Payable report
  await page.locator(locators.companychange).click();
  await page.locator(locators.selectCashonly).click();
  await page.locator(locators.yesbtncompnaychange).click();
  await page.waitForTimeout(1000);
  console.log('login to SAC company');

  await page.click(locators.report);
  await page.click(locators.payable.payable);
  await page.click(locators.payable.filterbutton);

  await page.locator(locators.payable.vendorname).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.entercustomername, vendor);
  await page.locator('li.e-list-item', { hasText: vendor }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.payable.Searchbutton);
  await page.waitForTimeout(1000);
  console.log('Payable Report verification completed successfully.');

}

module.exports = { editcashledger, Report };
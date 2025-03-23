const { test, expect } = require('@playwright/test');
const locators = require('./HUF_Delete.json');

async function Company_Change(page, companyname) {
  await page.locator(locators.Company_Dropdown_Two).click();
  await page.locator('li.e-list-item', { hasText: companyname }).click();
  await page.locator(locators.Change_Btn).click();
  console.log("Company Change to ", companyname);
}


async function DeleteHUFCompanySale(page) {

  await page.click(locators.HUFCompnay.TransactionMenu);
  await page.click(locators.HUFCompnay.Sales);
  await page.click(locators.HUFCompnay.HUFCycleSalePage);

  await page.waitForSelector("//td[@id='HUFCycleSalesHUFCompanyRegularBillNumberColumn']");

  // Fetch the latest Bill number from the Bill no column
  const latestBillNo = await page.locator("//td[@id='HUFCycleSalesHUFCompanyRegularBillNumberColumn']").nth(0).textContent();

  if (!latestBillNo || latestBillNo.trim() === "") {
    console.log('No latest Bill number found. Exiting...');


  }

  console.log(`Latest Ticket No: ${latestBillNo.trim()}`);
  await page.waitForTimeout(2000);
  await page.click(locators.HUFCompnay.DeleteMenu);
  await page.click(locators.HUFCompnay.HUfCycle);
  await page.click(locators.HUFCompnay.HUFCycleSale);


  // Enter the sales bill number
  await page.locator(locators.HUFCompnay.SalesNo).fill(latestBillNo);

  // Select the radio button
  await page.locator(locators.HUFCompnay.radioButton).scrollIntoViewIfNeeded();
  await page.locator(locators.HUFCompnay.radioButton).check({ force: true });
  // Click the Delete button
  await page.locator(locators.HUFCompnay.DeleteButton).click();
  const successMessage = await page.locator('.e-toast-content');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Cash Sales To Customer Deleted Successfully.');
  console.log(`Verified Cash Sales To Customer bill number ${latestBillNo} is deleted.`)
  await page.waitForTimeout(2000);
}

async function DeleteHufSAC(page) {
  await page.click(locators.HUFCompnay.TransactionMenu);
  await page.click(locators.HUFCompnay.Sales);
  await page.click(locators.SAC.HUFsale);

  await page.waitForSelector("//td[@id='HUFCycleSalesRegularBillNumberColumn']");

  // Fetch the latest Bill number from the Bill no column
  const latestBillNo = await page.locator("//td[@id='HUFCycleSalesRegularBillNumberColumn']").nth(0).textContent();

  if (!latestBillNo || latestBillNo.trim() === "") {
    console.log('No latest Bill number found. Exiting...');


  }

  console.log(`Latest Ticket No: ${latestBillNo.trim()}`);
  await page.click(locators.HUFCompnay.DeleteMenu);
  await page.click(locators.HUFCompnay.HUfCycle);
  await page.click(locators.HUFCompnay.HUFCycleSale);


  // Enter the sales bill number
  await page.locator(locators.HUFCompnay.SalesNo).fill(latestBillNo);

  // Select the radio button
  await page.locator(locators.SAC.RadioButton).scrollIntoViewIfNeeded();
  await page.locator(locators.SAC.RadioButton).check({ force: true });
  // Click the Delete button
  await page.locator(locators.HUFCompnay.DeleteButton).click();
  const successMessage = await page.locator('.e-toast-content');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Sales To The HUF Company Deleted Successfully.');
  console.log(`Verified Sales To The HUF Company bill number ${latestBillNo} is deleted.`)
  await page.waitForTimeout(2000);

  //HUf Cycle Sales Bill Link Report
  await page.click(locators.SACBillLink.ReportMenu);
  await page.click(locators.SACBillLink.billLink);

}

async function DeleteHufCashonly(page, customername, inventoryName) {
  await page.click(locators.HUFCompnay.TransactionMenu);
  await page.click(locators.HUFCompnay.Sales);
  await page.click(locators.CashOnly.HUF);

  await page.waitForSelector("//td[@id='HUFCycleSalesCashCompanyBillNoColumn']");

  // Fetch the latest Bill number from the Bill no column
  const latestBillNo = await page.locator("//td[@id='HUFCycleSalesCashCompanyBillNoColumn']").nth(0).textContent();

  if (!latestBillNo || latestBillNo.trim() === "") {
    console.log('No latest Bill number found. Exiting...');


  }

  console.log(`Latest Ticket No: ${latestBillNo.trim()}`);
  await page.click(locators.HUFCompnay.DeleteMenu);
  await page.click(locators.HUFCompnay.HUfCycle);
  await page.click(locators.HUFCompnay.HUFCycleSale);


  // Enter the sales bill number
  await page.locator(locators.HUFCompnay.SalesNo).fill(latestBillNo);

  // Select the radio button
  await page.locator(locators.CashOnly.radioButton).scrollIntoViewIfNeeded();
  await page.locator(locators.CashOnly.radioButton).check({ force: true });
  // Click the Delete button
  await page.locator(locators.HUFCompnay.DeleteButton).click();
  const successMessage = await page.locator('.e-toast-content');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Cash Sales(HUF Cycle) Deleted Successfully.');
  console.log(`Verified Cash Sales(HUF Cycle) bill number ${latestBillNo} is deleted.`)
  await page.waitForTimeout(2000);

  //HUF Bill Link Report
  await page.click(locators.SACBillLink.ReportMenu);
  await page.click(locators.SACBillLink.billLink);
  await page.waitForTimeout(2000);


  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundcombine = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowscombine = await page.locator('tr[aria-rowindex]');
  const rowCountcombine = await rowscombine.count();
  console.log(`Step 5: Total rows in grid: ${rowCountcombine}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountcombine; i++) {  // Loop through all available rows
    const currentRow = await rowscombine.nth(i);
    const billNumberCell = await currentRow.locator("td#HUFCycleSalesBillLinkReportCashSalesBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestBillNo) {
      billFoundcombine = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundcombine).toBe(false);
  if (!billFoundcombine) {
    console.log(` Successfully verified that deleted bill number ${latestBillNo} is not present in the grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestBillNo} was found in the grid.`);
  }

  //Outstanding Report
  await page.click(locators.SACBillLink.ReportMenu);
  await page.locator(locators.OutStanding.outstanding).click();
  await page.locator(locators.OutStanding.outstandingfilter).click();

  await page.waitForTimeout(2000);

  await page.locator(locators.OutStanding.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.OutStanding.entercustomername, customername);
  await page.waitForTimeout(1000);
  //  Select the desired customer by its text
  const itemLocator3 = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator3).toBeVisible();
  await itemLocator3.click();
  await page.locator(locators.OutStanding.outstandingserach).click();
  await page.locator(locators.OutStanding.billdate).click();
  await page.locator(locators.OutStanding.billdate).click();
  await page.waitForSelector(`tr:has(td:has-text("${customername}"))`);// wait up to 60 seconds

  // Now locate the row and get the balance
  await page.locator(`tr:has(td:has-text("${customername}"))`);
  const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundout = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowsout = await page.locator('tr[aria-rowindex]');
  const rowCountout = await rowsout.count();
  console.log(`Step 5: Total rows in grid: ${rowCountout}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountout; i++) {  // Loop through all available rows
    const currentRow = await rowsout.nth(i);
    const billNumberCell = await currentRow.locator("td#OutstandingReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestBillNo) {
      billFoundout = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundout).toBe(false);
  if (!billFoundout) {
    console.log(` Successfully verified that deleted bill number ${latestBillNo} is not present in the grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestBillNo} was found in the grid.`);
  }

  //customer account ledger report
  await Company_Change(page, "Shree Aqua Care");
  await page.click(locators.SACBillLink.ReportMenu);
  await page.locator(locators.SACCustomerAccountLedger.Accountledger).click();
  await page.locator(locators.SACCustomerAccountLedger.CustomerAccountledger).click();
  await page.locator(locators.SACCustomerAccountLedger.CustomerAccountfilterbutton).click();

  await page.locator(locators.OutStanding.customerdropdown).click();
  await page.fill(locators.OutStanding.entercustomername, customername);
  await page.waitForTimeout(1000);
  //  Select the desired customer by its text
  const itemLocator5 = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator5).toBeVisible();
  await itemLocator5.click();
  await page.locator(locators.SACCustomerAccountLedger.CustomerAccountsearchbutton).click();
  await page.waitForSelector(`tr:has(td:has-text("${customername}"))`);// wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customername}"))`);
  const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
  await page.waitForTimeout(3000);
  expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
  console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundAL = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowsAL = await page.locator('tr[aria-rowindex]');
  const rowCountAL = await rowsAL.count();
  console.log(`Step 5: Total rows in grid: ${rowsAL}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountAL; i++) {  // Loop through all available rows
    const currentRow = await rowsAL.nth(i);
    const billNumberCell = await currentRow.locator("td#AccountLedgerReportGridTransactionNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestBillNo) {
      billFoundAL = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundAL).toBe(false);
  if (!billFoundAL) {
    console.log(` Successfully verified that deleted bill number ${latestBillNo} is not present in the grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestBillNo} was found in the grid.`);
  }

  //Inventory Stock Report 
  await page.click(locators.SACBillLink.ReportMenu);
  // await page.waitForTimeout(2000);
  await page.locator(locators.InventoryStock.inventoryStock).click();
  await page.click('#InventoryReportopenSideBarButton');
  await page.click(locators.InventoryStock.selectinventorygroup);
  //await page.waitForTimeout(1000);
  await page.click("//li[normalize-space()='FinishMaterial']");
  await page.waitForTimeout(1000);
  await page.locator(locators.InventoryStock.inventoryselect).click();
  await page.waitForTimeout(3000);
  await page.fill(locators.OutStanding.entercustomername, inventoryName);
  await page.waitForTimeout(2000);
  await page.locator('li.e-list-item', { hasText: inventoryName }).click();
  await page.locator(locators.InventoryStock.inventorysearchbutton).click();
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.click('a#InventoryReportViewDetailedinventoryReportButton');

  let billFoundINV = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowsINV = await page.locator('tr[aria-rowindex]');
  const rowCountINV = await rowsINV.count();
  console.log(`Step 5: Total rows in grid: ${rowsINV}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountINV; i++) {  // Loop through all available rows
    const currentRow = await rowsINV.nth(i);
    const billNumberCell = await currentRow.locator("td#DetailedInventoryReportGridBillNoColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestBillNo) {
      billFoundINV = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundINV).toBe(false);
  if (!billFoundINV) {
    console.log(`Step 6: Successfully verified that deleted bill number ${latestBillNo} is not present in the  grid.`);
  } else {
    console.error(`Step 6: Error - Deleted bill number ${latestBillNo} was found in the  grid.`);
  }



}
module.exports = { DeleteHUFCompanySale, DeleteHufSAC, DeleteHufCashonly };
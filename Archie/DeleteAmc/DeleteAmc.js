const { test, expect } = require('@playwright/test');
const locators = require('./DeleteAmc.json');

async function deleteamc(page ,customer) {

  //go to the Amc Invoice page
  await page.locator(locators.deleteamcinvoice.amcpage).click();

  await page.waitForSelector("//td[@id='AmcInvoiceRegularInvoiceNumberColumn']");

  // Fetch the latest Amc  number from the regular amc no column
  const DeletedAmcNo = await page.locator("//td[@id='AmcInvoiceRegularInvoiceNumberColumn']").nth(0).textContent();

  if (!DeletedAmcNo || DeletedAmcNo.trim() === "") {
      console.log('No latest ticket number found. Exiting...');  
  }

  console.log(`Latest Ticket No: ${DeletedAmcNo.trim()}`);

  await page.locator(locators.deleteamcinvoice.delete_menu).click();
  await page.locator(locators.deleteamcinvoice.delete_amcinvoice).click();

   // Enter the latest  Amc  number
   await page.fill(locators.deleteamcinvoice.amcinvoiceNoField, DeletedAmcNo);

  
  // Select the "Amc Invoice without Ledger (Payment)" radio button
  await page.locator(locators.deleteamcinvoice.amcinvoiceRadioButton).scrollIntoViewIfNeeded();
  await page.locator(locators.deleteamcinvoice.amcinvoiceRadioButton).check({ force: true });
  await page.waitForTimeout(1000);
  // Click the Delete button
  await page.locator(locators.deleteamcinvoice.amcinvoiceDeleteButton).click();
  await page.waitForTimeout(1000);

  //verify amc invoice Grid where deleted amc number is not present
  await page.locator(locators.deleteamcinvoice.TransactionMenu).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.deleteamcinvoice.amcpage).click();

  /*****************Verify Amc No is not found ************************/

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFound = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rows = await page.locator('tr[aria-rowindex]');
  const rowCount = await rows.count();
  console.log(`Step 5: Total rows in grid: ${rowCount}`);


  // Iterate through each row to check if the deleted amc number exists
  for (let i = 0; i < 12; i++) {
    const currentRow = await rows.nth(i);
    const billNumberCell = await currentRow.locator("td#AmcInvoiceRegularInvoiceNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === DeletedAmcNo) {
      billFound = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFound).toBe(false);
  if (!billFound) {
    console.log(`Step 6: Successfully verified that deleted bill number ${DeletedAmcNo} is not present in the amc grid.`);
  } else {
    console.error(`Step 6: Error - Deleted bill number ${DeletedAmcNo} was found in the amc grid.`);
  }

// Verify Amc Report

  await page.click(locators.Report.reportmenu);
    await page.click(locators.Report.AMCInvoiceReport);
    await page.click(locators.Report.amc_filter);
  
    await page.locator(locators.Report.customerdropdwon).click();
    await page.fill(locators.Report.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.Report.amc_search);
    console.log('amc Report verification completed successfully.');
    await page.waitForTimeout(2000);

    /*****************Verify Amc Number is not found ************************/

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundinamcreport = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowsinamcreport = await page.locator('tr[aria-rowindex]');
  const rowCountinamcreport = await rowsinamcreport.count();
  console.log(`Step 5: Total rows in grid: ${rowCountinamcreport}`);


  // Iterate through each row to check if the deleted amc number exists
  for (let i = 0; i < rowCountinamcreport; i++) {
    const currentRow = await rowsinamcreport.nth(i);
    const billNumberCell = await currentRow.locator("td#CustomerAMCReportInvoiceNoColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === DeletedAmcNo) {
      billFoundinamcreport = true;
      break;
    }
  }

  // Assert that the deleted Amc number is not found in the grid
  expect(billFoundinamcreport).toBe(false);
  if (!billFoundinamcreport) {
    console.log(`Step 6: Successfully verified that deleted bill number ${DeletedAmcNo} is not present in amc Report  grid.`);
  } else {
    console.error(`Step 6: Error - Deleted bill number ${DeletedAmcNo} was found in the amc Report grid.`);
  }


  // Verify Outstanding Report 
    await page.click(locators.Report.reportmenu);
    await page.click(locators.Report.outstanding);
    await page.click(locators.Report.outstanding_filter);
  
    await page.locator(locators.Report.customerdropdwon).click();
    await page.fill(locators.Report.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.Report.outstanding_search);
    console.log('Outstanding Report verification completed successfully.');
    await page.waitForTimeout(2000);

    
  /*****************Verify Amc No is not found ************************/

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundinoutstandingreport = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  const rowsinoutstandingreport = await page.locator('tr[aria-rowindex]');
  const rowCountinoutstandingreport = await rowsinoutstandingreport.count();
  console.log(`Step 5: Total rows in grid: ${rowCountinoutstandingreport}`);


  // Iterate through each row to check if the deleted amc number exists
  for (let i = 0; i < rowCountinoutstandingreport; i++) {
    const currentRow = await rowsinoutstandingreport.nth(i);
    const billNumberCell = await currentRow.locator("td#OutstandingReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === DeletedAmcNo) {
      billFoundinoutstandingreport = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundinoutstandingreport).toBe(false);
  if (!billFoundinoutstandingreport) {
    console.log(`Step 6: Successfully verified that deleted bill number ${DeletedAmcNo} is not present in the Outstanding Report  grid.`);
  } else {
    console.error(`Step 6: Error - Deleted bill number ${DeletedAmcNo} was found in the Outstanding Report  grid.`);
  }
}


module.exports = { deleteamc };

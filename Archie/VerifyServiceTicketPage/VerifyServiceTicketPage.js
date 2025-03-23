const { test, expect } = require('@playwright/test');
const locators = require('./VerifyServiceTicketPage.json');

async function verifyserviceticket(page , customer ) {
  await page.locator(locators.verifyserviceticket.service).click();
  await page.locator(locators.verifyserviceticket.servicetickets).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Service Tickets' })).toBeVisible();

  //verify search section
  await expect(page.locator(locators.verifyserviceticket.datepicker)).toBeVisible();
  await expect(page.locator(locators.verifyserviceticket.deliveryaddressdropdown)).toBeVisible();
  await expect(page.locator(locators.verifyserviceticket.customerdropdown)).toBeVisible();
  console.log('successfully verify search section');

  //verify service ticket Grid
  const columns = [
    locators.Grid.TicketNo,
    locators.Grid.ServiceDate,
    locators.Grid.Customer,
    locators.Grid.Address,
    locators.Grid.TechnicianName,
    locators.Grid.PaymentType,
    locators.Grid.ServiceType,
    locators.Grid.Amount,
    locators.Grid.Completed,
    locators.Grid.Action,
    locators.Grid.viewlink,
    locators.Grid.invoicelink
  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //verify buttons
  await expect(page.locator(locators.verifyserviceticket.pdfexportbutton)).toBeVisible();
  await expect(page.locator(locators.verifyserviceticket.addnewbutton)).toBeVisible();
  console.log('successfully verify Buttons');

  //search functionality
  await page.locator(locators.verifyserviceticket.datepicker).click();   //select date range
  const datepicker = '#ServiceTicketDateRangePickerForFilter';
  await page.fill(datepicker, ''); //code to clear the date
  await page.fill(datepicker, '01-01-2025 - 20-01-2025');
  await page.waitForTimeout(1000);
  await page.locator(locators.verifyserviceticket.searchbutton).click();   //click on search
  await page.waitForTimeout(1000);
  console.log(' Records for the selected date range was searched');

  //select customer & click search
  await page.locator(locators.verifyserviceticket.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.verifyserviceticket.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.locator(locators.verifyserviceticket.searchbutton).click();   //click on search
  console.log(' Records for the selected customer name was searched');

  //select Delivery Address
  await page.locator(locators.verifyserviceticket.resetbutton).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.verifyserviceticket.deliveryaddressdropdown).click();
  //await page.fill(locators.verifyserviceticket.entercustomername, DeliveryAddress);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item').nth(0).click();
  await page.locator(locators.verifyserviceticket.searchbutton).click();   //click on search
  console.log(' Records for the selected Delivery Address was searched');
  await page.waitForTimeout(2000);


  //Reset Functionality
  await page.locator(locators.verifyserviceticket.resetbutton).click();

  //PDF Export functionality
  await page.click(locators.verifyserviceticket.pdfexportbutton);
  console.log('PDF downloaded successfully');

  //Invoice Download Functionality
  /*********Scroll Right******************/
  const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  await page.evaluate((el) => {
    el.scrollLeft += 600; // Adjust this value to scroll further or slower
  }, divElement);

  //Locate and click the "Invoice" link
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  const invoicelink = await firstRow.locator('a#ServiceTicketInvoiceButton'); //Adjust this with the actual selector for the "Invoice"

  // Check if the "Invoice" link is visible
  const isVisible = await invoicelink.isVisible();
  if (isVisible) {
    console.log('Invoice button is visible. Proceeding with click.');
    await invoicelink.click();
    console.log(' Clicked on "Invoice" button.');
  } else {
    console.log('Invoice button is not found or not visible.');
  }

  //click on No in invoice
  await page.click(locators.Grid.invoiceno);
  await invoicelink.click();
  await page.click(locators.Grid.invoiceyes);
  await page.waitForTimeout(2000);
  console.log(' Invoice Downloaded successfully.');

  //click on add new service ticket
  await page.click(locators.verifyserviceticket.addnewbutton);
  await page.click(locators.Grid.entryClosebutton);


}



module.exports = { verifyserviceticket };
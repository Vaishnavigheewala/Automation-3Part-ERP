const { test, expect } = require('@playwright/test');
const locators = require('./VerifyDirectHufSale.json');

async function verifysalepage(page, customer) {
  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.directhufsalespage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'sales' })).toBeVisible();

  //verify search section
  await expect(page.locator(locators.verifysale.datepicker)).toBeVisible();
  await expect(page.locator(locators.verifysale.customerdropdown)).toBeVisible();
  console.log('successfully verify search section');

  //verify sale page Grid
  const columns = [
    locators.Grid.BillNo,
    locators.Grid.bill_date,
    locators.Grid.GstBillNo,
    locators.Grid.Customer,
    locators.Grid.brokername,
    locators.Grid.paymentType,
    locators.Grid.InvoiceType,
    locators.Grid.TaxMethod,
    locators.Grid.State,
    locators.Grid.TotalQty,
    locators.Grid.AddLes,
    locators.Grid.RoundOff,
    locators.Grid.NetAmount,
    locators.Grid.Action,
    locators.Grid.viewlink,
    locators.Grid.invoicelink
  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //verify buttons
  await expect(page.locator(locators.verifysale.pdfexportbutton)).toBeVisible();
  await expect(page.locator(locators.verifysale.addnewbutton)).toBeVisible();
  console.log('successfully verify Buttons');



  //select customer & click search
  await page.locator(locators.verifysale.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.locator(locators.verifysale.searchbutton).click();   //click on search
  console.log(' Records for the selected customer name was searched');

  //Reset Functionality
  await page.locator(locators.verifysale.resetbutton).click();
  await page.waitForTimeout(1000);

  //PDF Export functionality
  await page.click(locators.verifysale.pdfexportbutton);
  console.log('PDF downloaded successfully');

  //invoicedownload Functionality
  //   /*********Scroll Right******************/

  //   const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  //   await page.evaluate((el) => {
  //     el.scrollLeft += 600; // Adjust this value to scroll further or slower
  //   }, divElement);

  //   const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  //   const firstRow = await rows.nth(0); // Select the first row
  const invoicelink = await page.locator(locators.Grid.invoicelink).nth(0);

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

  // view link functionality
  const view = await page.$$(locators.Grid.viewlink);
  if (view.length > 1) {
    await view[0].click();
    console.log(' verify view link successfully.');
  }
  await page.click(locators.Grid.viewclosebutton);
  await page.waitForTimeout(1000);


  //Pagination verification
  await expect(page.locator(locators.verifysale.Pagination)).toBeVisible();
  console.log('successfully verify page viewer');

  // Huf cycle sale page verification
  await page.click(locators.transactionmenu);
  await page.click(locators.verifysale.sales);
  await page.click(locators.verifysale.hufcyclesale);
  console.log('successfully display Huf cycle sale page');

  const hufcycleinvoicelink = await page.locator(locators.Grid.hufcycleinvoicelink).nth(0);
  await hufcycleinvoicelink.click();
  await page.click(locators.Grid.hufcycleinvoiceno);
  await hufcycleinvoicelink.click();
  await page.click(locators.Grid.hufcycleinvoiceyes);
  await page.waitForTimeout(2000);
  console.log(' Invoice Downloaded successfully.');

}

module.exports = { verifysalepage };

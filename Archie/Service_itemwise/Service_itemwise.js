const { test, expect } = require('@playwright/test');
const locators = require('./Service_itemwise.json');

async function itemwise(page, Item) {
  console.log("==================")
  console.log("Archie Item wise");
  // Click on Reports -> Service
  await page.click(locators.servicemenu);
  //click on service itemwise page
  await page.click(locators.itemwisepage);
  await page.waitForTimeout(2000);

  // Verify Service itemwise Report Page buttons is displayed
  const backbutton = await page.isVisible(locators.backbutton);
  const PDFbutton = await page.isVisible(locators.pdfbutton);
  const filterbutton = await page.isVisible(locators.filterbutton);

  console.log(`Back Button is visible:${backbutton}`);
  console.log(`PDF Button is visible:${PDFbutton}`);
  console.log(`Filter Button report is visible:${filterbutton}`);

  // Verify default grouping by item
  const groupingLocator = await page.isVisible("span[aria-label='sort the grouped column']");
  console.log(`default grouping by item:${groupingLocator}`);

  // Remove grouping
  // Assuming there is a specific UI element or action to remove grouping
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
  await button.click();
  await page.waitForTimeout(2000);

  // Verify grid is displayed without grouping and item is added as a column
  const item = await page.isVisible(locators.item);
  console.log(`displayed without grouping and item is added as a column:${item}`);
  await page.waitForTimeout(2000);

  // Refresh the page
  await page.reload();

  //verify grid
  const columns = [
    locators.TicketNo,
    locators.servicedate,
    locators.customer,
    locators.item,
    locators.totalqty,
    locators.servicetype,
    locators.paymenttype,
    locators.technicianname,
    locators.completed,
    locators.Amount
  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //verify total and grand total
  const GrandTotal = await page.locator('td.e-summarycell[data-cell="Amount"]').textContent();
  console.log(`Grand total of all the records: ${GrandTotal}`);

  // Click on Filter button
  await page.click(locators.filterbutton);

  //verify grid
  const Filters = [
    locators.date,
    locators.customerdropdown,
    locators.TechnicianDropdown,
    locators.itemDropdown,
    locators.servicetypeDropdown,
    locators.CompletedDropdown
  ];

  for (const column of Filters) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //select item
  await page.waitForTimeout(1000);
  await page.locator(locators.itemDropdown).click();
  await page.fill(locators.entercustomername, Item);
  // Select the desired customer by its text
  await page.locator('li.e-list-item', { hasText: Item }).click();

  //click on search button
  await page.click(locators.searchbutton);

  // Click Back button and verify all records are displayed
  await page.click(locators.backbutton);
  await page.waitForTimeout(2000);

  // Export PDF and verify download
  await page.click(locators.pdfbutton);
  await page.waitForTimeout(2000);

  // Verify default sorting by TicketNo  in descending order
  await page.locator(locators.TicketNo).dblclick();
  await page.waitForTimeout(3000);
  await page.locator(locators.TicketNo).click();
  console.log(" Records are sorted by Ticket no")



}
module.exports = { itemwise };
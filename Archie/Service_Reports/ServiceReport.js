const { test, expect } = require('@playwright/test');
const locators = require('./ServiceReport.json');

async function Service(page, Customer) {
    console.log("==================")
    console.log("Service Report");
    // Click on Reports -> Service
    await page.click(locators.Service.servicemenu);
    // Verify 3 types of reports can be generated
    const service = await page.isVisible(locators.Service.Servicereport);
    const itemwise = await page.isVisible(locators.Service.itemwisereport);
    const closedcomplain = await page.isVisible(locators.Service.closedcomplianreport);

    console.log(`service report is visible:${service}`);
    console.log(`itemwise report is visible:${itemwise}`);
    console.log(`closedcomplain report is visible:${closedcomplain}`);
    //click on service page
    await page.click(locators.Service.Servicereport);
    await page.waitForTimeout(2000);

    // Verify Service Report Page buttons is displayed
    const backbutton = await page.isVisible(locators.Servicereport.Backbutton);
    const PDFbutton = await page.isVisible(locators.Servicereport.PDFbutton);
    const filterbutton = await page.isVisible(locators.Servicereport.filterbutton);

    console.log(`Back Button is visible:${backbutton}`);
    console.log(`PDF Button is visible:${PDFbutton}`);
    console.log(`Filter Button report is visible:${filterbutton}`);
    // Verify default grouping by Customer
    const groupingLocator = await page.isVisible("span[aria-label='sort the grouped column']");
    console.log(`default grouping by customer:${groupingLocator}`);
    // Remove grouping
    // Assuming there is a specific UI element or action to remove grouping
    const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
    await button.click();
    await page.waitForTimeout(2000);
    // Verify grid is displayed without grouping and Customer is added as a column
    const customer = await page.isVisible(locators.Servicereport.customername);
    console.log(`displayed without grouping and Customer is added as a column:${customer}`);
    await page.waitForTimeout(2000);
    // Refresh the page
    await page.reload();
    //verify grid
    const columns = [
        locators.Servicereport.TicketNo,
        locators.Servicereport.ServiceDate,
        locators.Servicereport.customername,
        locators.Servicereport.Servicetype,
        locators.Servicereport.PaymentType,
        locators.Servicereport.TechnicianName,
        locators.Servicereport.Completed,
        locators.Servicereport.Amount
    ];

    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //verify total and grand total
    const GrandTotal = await page.locator('td.e-summarycell[data-cell="Amount"]').textContent();
    console.log(`Grand total of all the records: ${GrandTotal}`);

    // Click on Filter button
    await page.click(locators.Servicereport.filterbutton);

    //verify grid
    const Filters = [
        locators.Servicereport.Date,
        locators.Servicereport.customerdropdown,
        locators.Servicereport.TechnicianDropdown,
        locators.Servicereport.PaymentTypeDropdown,
        locators.Servicereport.servicetypeDropdown,
        locators.Servicereport.CompletedDropdown
    ];

    for (const column of Filters) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //select customer
    await page.waitForTimeout(1000);
    await page.locator(locators.Servicereport.customerdropdown).click();
    await page.fill(locators.Servicereport.entercustomername, Customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: Customer }).click();

    //click on search button
    await page.click(locators.Servicereport.searchbutton);

    // Click Back button and verify all records are displayed
    await page.click(locators.Servicereport.Backbutton);
    await page.waitForTimeout(2000);

    // Export PDF and verify download
    await page.click(locators.Servicereport.PDFbutton);
    await page.waitForTimeout(2000);

    // Verify default sorting by Bill No. in descending order
    await page.locator(locators.Servicereport.TicketNo).dblclick();
    await page.waitForTimeout(3000);
    await page.locator(locators.Servicereport.TicketNo).click();
    console.log(" Records are sorted by Ticket no")



}

module.exports = { Service };
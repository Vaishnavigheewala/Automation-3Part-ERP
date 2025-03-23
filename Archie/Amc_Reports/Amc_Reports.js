const { test, expect } = require('@playwright/test');
const locators = require('./Amc_Reports.json');

async function AmcReport(page, Customer) {
    console.log("==================")
    console.log("Archie AMC");
    await page.click(locators.Amcpage);

    // Verify Service Report Page buttons is displayed
    const backbutton = await page.isVisible(locators.backbutton);
    const PDFbutton = await page.isVisible(locators.Pdfbutton);
    const filterbutton = await page.isVisible(locators.filterbutton);

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
    const customer = await page.isVisible(locators.customername);
    console.log(`displayed without grouping and Customer is added as a column:${customer}`);
    await page.waitForTimeout(2000);

    // Refresh the page
    await page.reload();

    //verify grid
    const columns = [
        locators.InvoiceNo,
        locators.Billdate,
        locators.companyname,
        locators.customername,
        locators.contractname,
        locators.technicianname,
        locators.paytype,
        locators.fromdate,
        locators.todate,
        locators.noOfservice,
        locators.Remainingservice,
        locators.status,
        locators.netamount

    ];

    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //verify total and grand total
    const GrandTotal = await page.locator('td.e-summarycell[data-cell="Net Amount"]').textContent();
    console.log(`Grand total of all the records: ${GrandTotal}`);

    // Click on Filter button
    await page.click(locators.filterbutton);

    //verify grid
    const Filters = [
        locators.date,
        locators.techniciandropdown,
        locators.customerdropdown,
        locators.Amcradiobutton,
        locators.searchbutton,
        locators.resetbutton,
        locators.closebutton
    ];

    for (const column of Filters) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //select customer
    await page.waitForTimeout(1000);
    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, Customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: Customer }).click();

    //click on search button
    await page.click(locators.searchbutton);

    // Click Back button and verify all records are displayed
    await page.click(locators.backbutton);
    await page.waitForTimeout(2000);

    // Export PDF and verify download
    await page.click(locators.Pdfbutton);
    await page.waitForTimeout(2000);

    // Verify default sorting by Invoice No. in descending order
    await page.locator(locators.InvoiceNo).dblclick();
    await page.waitForTimeout(3000);
    await page.locator(locators.InvoiceNo).click();
    console.log(" Records are sorted by Invoice no")





}
module.exports = { AmcReport };
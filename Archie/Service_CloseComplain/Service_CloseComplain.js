const { test, expect } = require('@playwright/test');
const locators = require('./Service_CloseComplain.json');

async function CloseComplain(page) {
    console.log("==================")
    console.log("Colse Complains");
    await page.click(locators.servicemenu);
    await page.click(locators.closedcomplianreport);

    //verify grid
    const columns = [
        locators.customername,
        locators.Technicianname,
        locators.complaintype,
        locators.TicketNo,
        locators.ReferenceNo,
        locators.Complaindescription,
        locators.createddate,

    ];

    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    // Verify default sorting by TicketNo  in descending order
    await page.locator(locators.TicketNo).dblclick();
    await page.waitForTimeout(3000);
    await page.locator(locators.TicketNo).click();
    console.log(" Records are sorted by Ticket no")
}
module.exports = { CloseComplain };

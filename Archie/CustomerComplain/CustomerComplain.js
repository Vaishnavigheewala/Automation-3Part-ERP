const { test, expect } = require('@playwright/test');
const locators = require('./CustomerComplain.json');

async function verifypage(page) {
    await page.click(locators.service);
    await page.click(locators.ComplainPage);

    // Verify Complaint Grid Columns
    const columns = [
        locators.grid.customername,
        locators.grid.technicianname,
        locators.grid.complaintype,
        locators.grid.ticketno,
        locators.grid.referenceno,
        locators.grid.referenceno,
        locators.grid.complaindate,
        locators.grid.Action
    ];
    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //verify date
    const date = await page.inputValue(locators.date);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    expect(date).toBe(formattedDate);
    console.log(`defaulting to current date: ${formattedDate}`);
    // Verify Complain Type Dropdown
    await page.click(locators.ComplainType);
    const CompanyComplain = await page.isVisible("//li[normalize-space()='Company Complain']");
    console.log(`Company Complain is visible: ${CompanyComplain}`);
    const AquaCareComplain = await page.isVisible("//li[normalize-space()='Aqua Care Complain']");
    console.log(`Aqua Care Complain is visible: ${AquaCareComplain}`);

    //verify customer dropdown
    const customerdropdown = page.isVisible(locators.customerdropdown);
    console.log(`customer dropdown is visible: ${customerdropdown}`);
    await page.click(locators.ComplainType);
    await page.click(locators.ComplainType);
    await page.click("//li[normalize-space()='Aqua Care Complain']");
    const description = await page.isVisible(locators.description);
    console.log(`description is visible: ${description}`);
    await page.waitForTimeout(3000);
    const Technician = await page.isVisible(locators.Technician);
    console.log(`Technician is visible: ${Technician}`);
    await page.waitForTimeout(3000);
    const product = await page.isVisible(locators.product);
    console.log(`product is visible: ${product}`);


    //verify buttons
    const submitbutton = await page.isVisible(locators.submitbutton);
    console.log(`submit button is visible: ${submitbutton}`);
    const resetbutton = await page.isVisible(locators.resetbutton);
    console.log(`reset button is visible: ${resetbutton}`);

    //page pagination

    await expect(page.locator(locators.pageno)).toBeVisible();
    //const pageno = await expect(page.locator(locators.pageno)).toContainText("1 of 3 pages");
    console.log("page No verified")

}

async function addcomplainforCompany(page , customer) {

    //select complain type
    await page.click(locators.ComplainType);
    await page.click("//li[normalize-space()='Company Complain']");

    //select customer
    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: customer }).click();
    await page.waitForTimeout(3000);
    //enter reference no
    await page.fill(locators.refernceno, "4521");

    //enter description
    await page.fill(locators.description, "demo");
    await page.waitForTimeout(3000);
    //click on submit button
    await page.click(locators.submitbutton);
    await page.waitForTimeout(3000);
    //verify data in grid
    // Verify data in grid
    const gridLocator = "#Grid";
    const customername = "zinal";
    const addServiceLinkLocator = locators.grid.addserviceticketlink;

    // Wait for the grid to be visible
    await page.waitForSelector(gridLocator);

    // Check if the record is present in the grid
    const isRecordPresent = await page.locator(gridLocator).locator('tr', { hasText: customer }).count() > 0;

    if (isRecordPresent) {
        console.log("Record successfully added to the grid.");

        // Check complaint type and visibility of the Add Service Ticket link
        const complaintType = await page.locator(locators.grid.complaintype).nth(1).innerText();
        const isServiceLinkVisible = await page.locator(gridLocator).locator(addServiceLinkLocator).nth(1).isVisible();

        if (complaintType === "Company Complain") {
            if (isServiceLinkVisible) {
                console.error("Add Service Ticket link should not be visible for Company Complaints.");
            } else {
                console.log("Add Service Ticket link is correctly hidden for Company Complaints.");
            }
            const viewButton = await page.locator(locators.grid.editlink).nth(0); //Adjust this with the actual selector for the "View"

            // Check if the "View" button is visible
            const isVisible = await viewButton.isVisible();
            if (isVisible) {
                console.log('View button is visible. Proceeding with click.');
                await viewButton.click();
                console.log(' Clicked on "View" button.');
            } else {
                console.log('View button is not found or not visible.');
            }
            await page.waitForTimeout(3000);

            // Simulate closing the complaint
            await page.click(locators.closeComplain);
            await page.click('//button[normalize-space()="OK"]');

            // Verify that the Add Service Ticket link is visible after closing the complaint
            const isLinkVisibleAfterClose = await page.locator(gridLocator).locator(addServiceLinkLocator).nth(1).isVisible();
            if (isLinkVisibleAfterClose) {
                console.log("Add Service Ticket link is visible after closing the complaint, as expected.");
            } else {
                console.error("Add Service Ticket link is not visible after closing the complaint.");
            }
        } else if (complaintType === "Aqua Care Complain") {
            if (isServiceLinkVisible) {
                console.log("Add Service Ticket link is correctly visible for Aqua Care Complaints.");
            } else {
                console.error("Add Service Ticket link should be visible for Aqua Care Complaints.");
            }
        }
    } else {
        console.error("Record not found in the grid.");
    }

}

async function addcomplainAquaCareComplain(page , customer , technician) {
    //select complain type
    await page.click(locators.ComplainType);
    await page.click("//li[normalize-space()='Aqua Care Complain']");

    //select customer
    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: customer }).click();
    await page.waitForTimeout(3000);

    //select Technician
    await page.locator(locators.Technician).click();
    await page.fill(locators.entercustomername, technician);
    // Select the desired customer by its text
    await page.locator('li.e-list-item', { hasText: technician }).click();

    //select product
    await page.locator(locators.product).click();
    await page.click("//li[normalize-space()='RO']");


    //enter description
    await page.fill(locators.description, "Ro Product");
    await page.waitForTimeout(3000);
    //click on submit button
     await page.click(locators.submitbutton);
     await page.waitForTimeout(3000);


}

async function editcomplain(page , technician) {
    const viewButton = await page.locator(locators.grid.editlink).nth(0); //Adjust this with the actual selector for the "View"

    // Check if the "View" button is visible
    const isVisible = await viewButton.isVisible();
    if (isVisible) {
        console.log('View button is visible. Proceeding with click.');
        await viewButton.click();
        console.log(' Clicked on "View" button.');
    } else {
        console.log('View button is not found or not visible.');
    }
    await page.waitForTimeout(1000);
    //Edit Technician
    await page.locator(locators.Technician).click();
    await page.fill(locators.entercustomername, technician);
    // Select the desired customer by its text
    await page.locator('li.e-list-item', { hasText: technician }).click();

    await page.click(locators.submitbutton);
    await page.waitForTimeout(3000);


    //verify data in grid

    const gridLocator = "#Grid";
    const customername = "VIJAYBHAI";
    // Wait for the grid to be visible
    await page.waitForSelector(gridLocator);

    // Check if the record is present in the grid
    const isRecordPresent = await page.locator(gridLocator).locator('tr', { hasText: customername }).count() > 0;

    if (isRecordPresent) {
        console.log("Record successfully updated to the grid.");
    } else {
        console.error("Record not found in the grid.");
    }

}

module.exports = { verifypage, addcomplainforCompany, addcomplainAquaCareComplain, editcomplain };
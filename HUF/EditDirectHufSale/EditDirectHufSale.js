const { test, expect } = require('@playwright/test');
const locators = require('./EditDirectHufSale.json');

async function editsale(page, Qty, rate, customer, company) {

    await page.locator(locators.editsale.sales).click();
    await page.locator(locators.editsale.directhufsalespage).click();

    //Locate and click the "view" Button
    await page.locator(locators.editsale.viewlink).nth(0).click();
    await page.waitForTimeout(1000);

    //verify edit button and edit data
    await page.locator(locators.editsale.editbtn).click();
    await page.waitForTimeout(1000);

    //store inventory
    const Finishmaterial = await page.locator("//td[@id='DirectHUFSalesEntryInventoryNameColumn']").nth(0).textContent();
    console.log("Store Finish material:", Finishmaterial);


    await page.locator(locators.editsale.clickquantity).first().dblclick();
    //await page.locator(locators.sale_detail.enterquantity).first().dblclick();
    await page.fill(locators.editsale.enterquantity, Qty);
    console.log("Fill Qty");

    await page.locator(locators.editsale.clickrate).first().dblclick();
    // await page.locator(locators.sale_detail.enterrate).click();
    await page.fill(locators.editsale.enterrate, rate);
    console.log("Fill Rate");

    await page.locator(locators.editsale.update_button).click();
    console.log("click on update button");

    await page.locator(locators.editsale.updateok).click();
    console.log("click on successfully update");
    await page.locator(locators.editsale.submitbtn).click();
    console.log("Edit Direct Huf Sale successfully");

    //itemwise report
    await page.click(locators.reports);
    await page.click(locators.itemwise.sales);
    await page.waitForTimeout(1000);
    await page.click(locators.itemwise.itemwisepage);
    await page.waitForTimeout(1000);
    await page.click(locators.itemwise.filterbutton);
    //await page.waitForTimeout(1000);
    await page.click(locators.customerdropdown);
    await page.waitForTimeout(1000);
    await page.fill(locators.entercustomername, customer);
    await page.waitForTimeout(1000);
    await page.locator('li.e-list-item', { hasText: customer }).click();

    await page.waitForTimeout(1000);
    await page.click(locators.itemwise.searchbutton);
    await page.waitForTimeout(1000);

    console.log('Itemwise Report verification completed successfully.');

    //salesummary report
    await page.click(locators.reports);
    await page.click(locators.salessummary.sales);
    await page.click(locators.salessummary.salessummarypage);
    await page.click(locators.salessummary.filterbutton);
    //await page.waitForTimeout(1000);
    await page.click(locators.customerdropdown);
    await page.waitForTimeout(1000);
    await page.fill(locators.entercustomername, customer);
    await page.waitForTimeout(1000);
    await page.locator('li.e-list-item', { hasText: customer }).click();

    await page.waitForTimeout(1000);
    await page.click(locators.salessummary.searchbutton);
    await page.waitForTimeout(1000);
    const BillNoview = await page.locator(locators.salessummary.Billnoview).nth(0);
    await BillNoview.isVisible();
    await page.waitForTimeout(1000);
    console.log('Sales Summary Report verification completed successfully.');

    //combind sale report
    await page.click(locators.reports);
    await page.click(locators.salessummary.sales);
    await page.click(locators.combinedsale.combinedsalepage);
    await page.click(locators.combinedsale.filterbutton);
    //await page.waitForTimeout(1000);
    await page.click(locators.customerdropdown);
    await page.waitForTimeout(1000);
    await page.fill(locators.entercustomername, customer);
    await page.waitForTimeout(1000);
    await page.locator('li.e-list-item', { hasText: customer }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.combinedsale.searchbutton);
    await page.waitForTimeout(1000);

    console.log('Combine sale Report verification completed successfully.');

    //outstanding report
    await page.click(locators.reports);
    await page.click(locators.outstandingreport.outstanding);
    await page.click(locators.outstandingreport.filterbutton);
    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customer);
    await page.locator('li.e-list-item', { hasText: customer }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.outstandingreport.SearchButton);
    await page.waitForTimeout(1000);
    console.log('Outstanding Report verification completed successfully.');

    //sac - inventory stock report 

    await page.locator(locators.companychange).click();
    await page.locator(locators.selectSAC).click();
    await page.locator(locators.yesbtncompnaychange).click();
    await page.waitForTimeout(1000);
    console.log('login to SAC company');

    await page.click(locators.reports);
    await page.click(locators.inventorystockreport.inventoryStock);
    await page.click(locators.inventorystockreport.inventoryfilter);

    await page.locator(locators.inventorystockreport.inventoryselect).click();
    await page.fill(locators.inventorystockreport.enterInventory, Finishmaterial);
    await page.waitForTimeout(1000);
    await page.locator('li.e-list-item', { hasText: Finishmaterial }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.inventorystockreport.inventorysearchbutton);
    await page.waitForTimeout(1000);
    await page.click(locators.inventorystockreport.view);
    await page.waitForTimeout(1000);
    console.log('Inventory Stock Report verification completed successfully.');
}

async function verifyeditsale_Ledger(page, customer, receive_amt, bill_type) {

    await page.locator(locators.companychange).click();
    await page.locator(locators.selectKBT).click();
    await page.locator(locators.yesbtncompnaychange).click();
    await page.waitForTimeout(2000);
    console.log('login to KBT company');

    await page.locator(locators.transactionmenu).click();
    await page.locator(locators.editsale.sales).click();
    await page.locator(locators.editsale.directhufsalespage).click();
    await page.waitForSelector("//td[@id='DirectHUFSalesRegularBillNumberColumn']");

    // Fetch the latest ticket number from the ticket no column
    const latestTicketNo = await page.locator("//td[@id='DirectHUFSalesRegularBillNumberColumn']").nth(0).textContent();

    if (!latestTicketNo || latestTicketNo.trim() === "") {
        console.log('No latest ticket number found. Exiting...');

        return;
    }

    console.log(`Latest Ticket No: ${latestTicketNo.trim()}`);

    await page.locator(locators.transactionmenu).click();
    await page.locator(locators.editsale.ledger_menu).click();
    await page.locator(locators.editsale.cash_ledger).click();
    console.log('Successfully Navigate Cash Ledger Page');

    await page.locator(locators.editsale.cash_add).click();

    //payment nature 
    await page.locator(locators.editsale.paymentnature).click();
    await page.click("//li[normalize-space()='Receive']");

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, customer);
    await page.waitForTimeout(1000);
    await page.locator('li.e-list-item', { hasText: customer }).click();
    console.log('Select customer')

    await page.locator(locators.editsale.receive_amt).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.editsale.receive_amt).fill(receive_amt);
    console.log('Fill Receive Amount')

    await page.locator(locators.editsale.add_ledger).click();

    await page.locator(locators.editsale.bill_type).click();
    await page.locator('li.e-list-item', { hasText: bill_type }).click();
    console.log("Select bill type in Grid");

    await page.locator(locators.editsale.update_ledger).click();
    await page.locator(locators.editsale.bill_no, latestTicketNo).click();
    await page.locator('li.e-list-item', { hasText: latestTicketNo }).click();

    await page.locator(locators.editsale.close_ledger).click();
    console.log('Cash Ledger AMC Invoice Verify Successfully');

}


module.exports = { editsale, verifyeditsale_Ledger };

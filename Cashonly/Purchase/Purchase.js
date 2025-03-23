const { test, expect } = require('@playwright/test');
const locators = require('./Purchase.json');
const { verify } = require('crypto');
const fs = require('fs');


async function selectsubmenu(page, menu) {
    if (menu == "Transaction") {
        await page.locator(locators.purchasemenu.purchase_menu).click();
        await page.locator(locators.purchasemenu.purchase).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Purchase' })).toBeVisible();
    }

}

async function verifypurchase(page, vendor) {

    await page.locator(locators.verify_purchase.vendordropdown).click();
    await page.waitForTimeout(2000);
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();

    await page.waitForTimeout(3000);
    await page.locator(locators.verify_purchase.purchase_search).click();
    console.log(' Search button clicked and results should be displayed');

    await page.locator(locators.verify_purchase.purchase_pdf).click();
    console.log('PDF Export click and pdf has been downloaded');

    await page.waitForTimeout(1000);

    await page.locator(locators.verify_purchase.purchase_reset).click();
    console.log('Reset button clicked and filters should be reset');

}


async function viewlink(page) {

    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });


    /*********Scroll Right******************/
    await page.waitForTimeout(3000);
    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);

    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0); // Select the first row
    //Locate and click the "view" Button
    const viewButton = await firstRow.locator('a#PurchaseViewButton'); //Adjust this with the actual selector for the "View"

    // Check if the "View" button is visible
    const isVisible = await viewButton.isVisible();
    if (isVisible) {
        console.log('View button is visible. Proceeding with click.');
        await viewButton.click();
        console.log('Clicked on "View" button.');
    } else {
        console.log('View button is not found or not visible.');
    }
    await page.waitForTimeout(1000);
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight, { timeout: 30000 }); });
    //await page.waitForTimeout(3000);
    await page.locator(locators.verify_purchase.purchase_close).click();
    //await page.waitForTimeout(5000);

}


async function AddPurchasePage(page) {

    console.log(' Clicking on Add New');
    await page.locator(locators.verify_purchase.purchase_add_button).click();  // Click "Add New" button

    // Verify Purchase Entry Section
    console.log(' Verifying Purchase Entry Section');
    const purchaseEntrySection = await page.locator(locators.verify_purchase.purchase_reg_section);
    await expect(purchaseEntrySection).toBeVisible();  // Ensure section is visible

    // Verify Purchase Detail Section
    console.log('Verifying Purchase Detail Section');
    const purchaseDetailSection = await page.locator(locators.verify_purchase.purchase_detail_section);
    await expect(purchaseDetailSection).toBeVisible();  // Ensure section is visible

    // Verify Text fields: Add/Less, Round Off, Net Amount
    console.log('Verifying text fields - Add/Less, Round Off, Net Amount');
    const addLessField = await page.locator(locators.verify_purchase.add_less_textbox);
    await expect(addLessField).toBeVisible();
    const roundOffField = await page.locator(locators.verify_purchase.round_off_textbox);
    await expect(roundOffField).toBeVisible();
    const netAmountField = await page.locator(locators.verify_purchase.net_amount_textbox);
    await expect(netAmountField).toBeVisible();

    // Verify Buttons: Reset, Close, Submit, Action
    console.log('Verifying Buttons');
    const resetButton = await page.locator(locators.verify_purchase.purchase_entry_reset_button);
    await expect(resetButton).toBeVisible();
    const closeButton = await page.locator(locators.verify_purchase.purchase_entry_close_button);
    await expect(closeButton).toBeVisible();
    const submitButton = await page.locator(locators.verify_purchase.purchase_entry_submit_button);
    await expect(submitButton).toBeVisible();
    const actionButton = await page.locator(locators.verify_purchase.action_button);
    await expect(actionButton).toBeVisible();

    console.log('All elements verified on Purchase Register Entry Page');
}

async function EditPurchasePage(page) {

    // console.log(' Clicking on Add New');
    // await page.locator(locators.verify_purchase.purchase_add_button).click();  // Click "Add New" button

    await page.locator(locators.verify_purchase.purchase_viewlink).nth(1).click();

    await page.locator(locators.verify_purchase.purchase_entry_Edit_button).click();

    // Verify Purchase Entry Section
    console.log(' Verifying Purchase Entry Section');
    const purchaseEntrySection = await page.locator(locators.verify_purchase.purchase_reg_section);
    await expect(purchaseEntrySection).toBeVisible();  // Ensure section is visible

    // Verify Purchase Detail Section
    console.log('Verifying Purchase Detail Section');
    const purchaseDetailSection = await page.locator(locators.verify_purchase.purchase_detail_section);
    await expect(purchaseDetailSection).toBeVisible();  // Ensure section is visible

    // Verify Text fields: Add/Less, Round Off, Net Amount
    console.log('Verifying text fields - Add/Less, Round Off, Net Amount');
    const addLessField = await page.locator(locators.verify_purchase.add_less_textbox);
    await expect(addLessField).toBeVisible();
    const roundOffField = await page.locator(locators.verify_purchase.round_off_textbox);
    await expect(roundOffField).toBeVisible();
    const netAmountField = await page.locator(locators.verify_purchase.net_amount_textbox);
    await expect(netAmountField).toBeVisible();

    // Verify Buttons: Reset, Close, Submit, Action
    console.log('Verifying Buttons');
    // const resetButton = await page.locator(locators.verify_purchase.purchase_entry_reset_button);
    // await expect(resetButton).toBeVisible();
    const closeButton = await page.locator(locators.verify_purchase.purchase_entry_close_button);
    await expect(closeButton).toBeVisible();
    const submitButton = await page.locator(locators.verify_purchase.purchase_entry_submit_button);
    await expect(submitButton).toBeVisible();
    // const actionButton = await page.locator(locators.verify_purchase.action_button);
    // await expect(actionButton).toBeVisible();

    console.log('All elements verified on Purchase Register Entry Page');
}

async function PurchaseEntry(page, vendorbillno, vendor) {

    await page.locator(locators.verify_purchase.vendorbillno).fill(vendorbillno);  // Fill the Vendor Bill No field
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase.vendordropdown).click();
    await page.waitForTimeout(2000);
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();

}

async function addpurchasedetails(page, inventorygroup, item, qty) {

    await page.locator(locators.verify_purchase.addinventoryonpurchasesdetails).click();
    await page.waitForTimeout(500);
    await page.locator(locators.verify_purchase.selectinventorygroup).click(); //Click on Inventory Group
    if (inventorygroup == "FinishMaterial") {
        await page.click(locators.verify_purchase.selectfinishmaterial);
    }
    else if (inventorygroup == "RawMaterial") {
        await page.click(locators.verify_purchase.selectrawmaterial);
    }
    // await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
    await page.locator(locators.verify_purchase.inventoryitem).click();
    await page.waitForTimeout(2000);
    await page.fill(locators.verify_purchase.entervendorname, item);
    await page.waitForTimeout(2000);
    await page.locator('li.e-list-item', { hasText: item }).click();
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase.clickquantity).nth(0).click();
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase.enterquantity).nth(0).fill(qty);
    await page.waitForTimeout(2000);


}
async function updatepurchasesdetails(page) {

    await page.locator(locators.verify_purchase.updatechangeswarningok).click();
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase.updateinventorypurchasesdetails).click();
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase.updateok).click();
    await page.waitForTimeout(2000);

}
async function storenetamount(page, selector) {

    await page.locator(selector).click();
    const value = await page.locator(selector);
    const rawNetAmount = await value.inputValue();
    const netAmount = parseFloat(rawNetAmount.replace(/,/g, ''));
    return netAmount;
}


async function submitbutton(page) {

    await page.locator(locators.verify_purchase.submitsales).click();

}

async function SelectItemwiseReport(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reportsmenu.purchase_menu).click();
        await page.locator(locators.reportsmenu.reportitemwise).click();
        // await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Item Wise Sales Report' })).toBeVisible();
        const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
        await button.click();
    }

}

async function selectfilteritemwise(page, vendor, date) {

    await page.locator(locators.Filterbtnpurchaseitemwisereport).click();
    await page.locator(locators.Filtervensitemwise).click();
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.Searchbtnpurchaseitemwise).click();

}



async function SelectsummaryReport(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reportsmenu.purchase_menu).click();
        await page.locator(locators.reportsmenu.reportsummary).click();
        // await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Item Wise Sales Report' })).toBeVisible();
        const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
        await button.click();
    }

}

async function selectfiltersummary(page, vendor, date) {

    await page.locator(locators.Filterbtnpurchasesummaryreport).click();
    await page.locator(locators.Filtervenpurchasesummary).click();
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.Searchbtnpurchasesummary).click();

}

async function verifydetailssummary(page) {
    /*****************Verify Vendor Name is Correct ************************/

    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0); // Select the first row
    const viewButton = await firstRow.locator('a#ViewVendorPurchaseButton'); //Adjust this with the actual selector for the "View" 

    // Check if the "View" button is visible
    const isVisible = await viewButton.isVisible();
    if (isVisible) {
        console.log('View button is visible. Proceeding with click.');
        await viewButton.click();
        console.log('Clicked on "View" button.');
    } else {
        console.log('View button is not found or not visible.');
    }
    await page.waitForTimeout(3000);
    console.log("successfully click on view link")

}


async function SelectpaybleReport(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reportsmenu.reportpayble).click();
        // await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Item Wise Sales Report' })).toBeVisible();
        const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
        await button.click();
    }

}

async function selectfilterpayble(page, vendor, date) {

    await page.locator(locators.FilterbtnpurchasePayblereport).click();
    await page.locator(locators.FiltervenpurchasePayble).click();
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.SearchbtnpurchasePayble).click();

}

async function SelectvendorledgerReport(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reportsmenu.accountledger).click();
        await page.locator(locators.reportsmenu.reportvendoraccountledger).click();
        // await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Item Wise Sales Report' })).toBeVisible();
        const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
        await button.click();
    }

}

async function selectfiltervendorledger(page, vendor, date) {

    await page.locator(locators.Filterbtnpurchasevendorledgerreport).click();
    await page.locator(locators.Filtervenpurchasevendorledger).click();
    await page.fill(locators.verify_purchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.Searchbtnpurchasevendorledger).click();

}

async function SelectInventorystockReport(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reportsmenu.reportinventorystock).click();
        // await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Item Wise Sales Report' })).toBeVisible();

    }
}
async function selectfilterInventorystock(page, inventoryName) {

    await page.locator(locators.FilterbtnpurchaseInventorystockreport).click();
    await page.click(locators.FilterInventorygroup);
    await page.click("//li[normalize-space()='FinishMaterial']");
    console.log("Selected inventory group.");
    await page.locator(locators.FilterInventoryItem).click();
    await page.fill(locators.enterInventory, inventoryName);
    await page.locator('li.e-list-item', { hasText: inventoryName }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.SearchbtnpurchaseInventorystock).click();

    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0); // Select the first row

    /*********Scroll Right******************/
    await page.waitForTimeout(3000);
    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);

    const viewButton = await page.locator('a#InventoryReportViewDetailedinventoryReportButton'); //Adjust this with the actual selector for the "View"

    // Check if the "View" button is visible
    const isVisible = await viewButton.isVisible();
    if (isVisible) {
        console.log('View button is visible. Proceeding with click.');
        await viewButton.click();
        console.log('Clicked on "View" button.');
    } else {
        console.log('View button is not found or not visible.');
    }
    await page.waitForTimeout(3000);

}




module.exports = {
    selectsubmenu, verifypurchase, viewlink, AddPurchasePage,
    PurchaseEntry, addpurchasedetails, updatepurchasesdetails,
    storenetamount, submitbutton, SelectItemwiseReport,
    selectfilteritemwise, SelectsummaryReport,
    selectfiltersummary, verifydetailssummary, SelectpaybleReport,
    selectfilterpayble, SelectvendorledgerReport, selectfiltervendorledger,
    SelectInventorystockReport, selectfilterInventorystock, EditPurchasePage
};

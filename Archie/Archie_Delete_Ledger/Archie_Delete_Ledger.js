const { test, expect } = require('@playwright/test');
const locators = require('./Archie_Delete_Ledger.json');


async function selectsubmenu(page, menu) {
    if (menu == "Transaction") {
        await page.locator(locators.Service_Menu).click();
        await page.locator(locators.Service_Ticket).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Service Tickets' })).toBeVisible();

    }

    else if (menu == "Reports") {
        await page.locator(locators.reports_menu.reports).click();
        await page.locator(locators.reports_menu.outstanding_menu).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Outstanding Report' })).toBeVisible();

    }
}

async function selectsubmenuofoutstanding(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reports_menu.reports).click();
        await page.locator(locators.reports_menu.outstanding_menu).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Outstanding Report' })).toBeVisible();

    }
}

async function selectfilterResetOutstanding(page, customername, date, companyname) {

    const backButton = page.locator('button:has-text("Back")');
    const pdfExportButton = page.locator('button:has-text("PDF Export")');
    const filterButton = page.locator('button:has-text("Filter")');

    await expect(backButton).toBeVisible();
    await expect(pdfExportButton).toBeVisible();
    await expect(filterButton).toBeVisible();

    const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
    await button.click();

    console.log(' Back, PDF Export, and Filter buttons are visible');

    await page.locator(locators.outstanding.outstanding_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customername);
    await page.waitForTimeout(1000);

    const datepicker = '#OutstandingReportDateRangePickerForFilter'; //code to clear the date
    await page.fill(datepicker, ''); //code to clear the date
    await page.fill(datepicker, date); //code to enter current data

    await page.locator(locators.companydropdown).click();
    await page.fill(locators.entercustomername, companyname);
    await page.waitForTimeout(1000);

    await page.locator(locators.outstanding.outstanding_reset).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.outstanding.outstanding_close).click();
}


async function selectfilterSearchOutstandingcust(page, customername, companyname) {
    await page.locator(locators.outstanding.outstanding_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.companydropdown).click();
    await page.fill(locators.entercustomername, companyname);
    await page.locator('li.e-list-item', { hasText: companyname }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.outstanding.outstanding_search).click();
    await page.waitForTimeout(1000);

}

async function selectfilterSearchOutstandingvendor(page, vendorname, companyname) {
    await page.locator(locators.outstanding.outstanding_filter).click();

    await page.locator(locators.vendordropdown1).click();
    await page.fill(locators.entercustomername, vendorname);
    await page.locator('li.e-list-item', { hasText: vendorname }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.companydropdown).click();
    await page.fill(locators.entercustomername, companyname);
    await page.locator('li.e-list-item', { hasText: companyname }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.outstanding.outstanding_search).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.outstanding.outstanding_back).click();
    await page.waitForTimeout(1000);
}

async function sorting(page) {
    await page.locator(locators.bill_no1).dblclick();
    await page.locator(locators.bill_no1).click();
    console.log(" Records are sorted by bill no");

}


async function selectsubmenuofaccountledger(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reports_menu.reports).click();
        await page.locator(locators.reports_menu.account_ledger).click();
        await page.locator(locators.reports_menu.customer_ledger).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Customer Account Ledger Report' })).toBeVisible();

    }
}



async function selectfilterResetvendor(page, vendorname, date) {

    await page.locator(locators.vendor_ledger.vendor_ledger_filter).click();

    await page.locator(locators.vendordropdown).click();
    await page.fill(locators.entercustomername, vendorname);
    await page.waitForTimeout(1000);

    const datepicker = '#VendorAccountLedgerReportDatePickerForFilter'; //code to clear the date
    await page.fill(datepicker, ''); //code to clear the date
    await page.fill(datepicker, date); //code to enter current data
    await page.locator(locators.vendor_ledger.vendor_ledger_reset).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.vendor_ledger.vendor_ledger_close).click();

}

async function selectfiltervendor(page, vendorname) {
    await page.locator(locators.vendor_ledger.vendor_ledger_filter).click();

    //await page.locator(locators.Itemwise_report.Itemwise_Filter).click();

    await page.locator(locators.vendordropdown).click();
    await page.fill(locators.entercustomername, vendorname);
    await page.locator('li.e-list-item', { hasText: vendorname }).click();
    await page.waitForTimeout(3000);

    await page.locator(locators.vendor_ledger.vendor_ledger_search).click();
    await page.waitForTimeout(1000);

}

async function selectfilterResetcustomer(page, customername, date) {

    await page.locator(locators.reports_menu.reports).click();
    await page.locator(locators.reports_menu.account_ledger).click();
    await page.locator(locators.reports_menu.customer_ledger).click();


    await page.locator(locators.customer_ledger.customer_ledger_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();

    //await page.waitForTimeout(1000);

    const datepicker = '#AccountLedgerReportDateRangePickerForFilter'; //code to clear the date
    await page.fill(datepicker, ''); //code to clear the date
    await page.fill(datepicker, date); //code to enter current data
    await page.locator(locators.customer_ledger.customer_ledger_reset).click();
    //await page.waitForTimeout(1000);
    await page.locator(locators.customer_ledger.customer_ledger_close).click();

}

async function selectfiltercustomer(page, customername) {

    await page.locator(locators.customer_ledger.customer_ledger_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();


    await page.locator(locators.customer_ledger.customer_ledger_search).click();


    await page.locator(locators.customer_ledger.customer_ledger_back).click();

}

async function selectfilterPayable(page, vendorname) {
    await page.locator(locators.payable.payable_filter).click();

    //await page.locator(locators.Itemwise_report.Itemwise_Filter).click();

    await page.locator(locators.payable.vendordropdown).click();
    await page.fill(locators.entercustomername, vendorname);
    await page.locator('li.e-list-item', { hasText: vendorname }).click();
    await page.waitForTimeout(3000);

    await page.locator(locators.payable.payable_search).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.payable.payable_back).click();
    await page.waitForTimeout(1000);

}

async function selectsubmenuofpayable(page, menu) {

    if (menu == "Reports") {
        await page.locator(locators.reports_menu.reports).click();
        await page.locator(locators.reports_menu.payable_menu).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Payable' })).toBeVisible();

    }
}

module.exports = { selectsubmenuofpayable, selectfilterPayable, selectsubmenu, selectsubmenuofoutstanding, selectfilterSearchOutstandingcust, selectsubmenuofaccountledger, selectfiltervendor, selectfilterResetvendor, selectfilterResetcustomer, selectfiltercustomer }
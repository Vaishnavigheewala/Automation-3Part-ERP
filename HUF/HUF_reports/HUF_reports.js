const { test, expect } = require('@playwright/test');
const locators = require('./HUF_reports.json');

async function navigatereportpage(page) {
  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.sales_menu).click();
  await page.locator(locators.reportsmenu.directHUF).click();

  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
  await button.click();

  const columns = [
    locators.direct_hufgrid.bill_no,
    locators.direct_hufgrid.customer,
    locators.direct_hufgrid.bill_date,
    locators.direct_hufgrid.broker_name,
    locators.direct_hufgrid.technician_name,
    locators.direct_hufgrid.qty,
    locators.direct_hufgrid.Gross_amt,
    locators.direct_hufgrid.Addless,
    locators.direct_hufgrid.Roundoff,
    locators.direct_hufgrid.net_amt,
    locators.direct_hufgrid.remark
    
  ];

  const disabledColumns = [];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    const isDisabled = await page.isDisabled(column);

    if (isDisabled) {
      disabledColumns.push(column);
    }

    console.log(`${column} - visible: ${isVisible}, disabled: ${isDisabled}`);
  }

  console.log("Disabled columns: ", disabledColumns);

}

async function filter_record(page,customer) {
    await page.locator(locators.direct_huf.directHUF_filter).click();

    await page.locator(locators.direct_huf.customerdropdown).click();
    await page.fill(locators.direct_huf.entercustomername,customer);
    await page.locator('li.e-list-item', { hasText: customer }).click();

    await page.locator(locators.direct_huf.technician).click();
    await page.fill(locators.direct_huf.entercustomername,customer);
    await page.locator('li.e-list-item').first().click();

}

async function reset_filter(page) {
    await page.locator(locators.direct_huf.filter_reset).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.direct_huf.filter_close).click();

}

async function search_filter(page) {
    await page.locator(locators.direct_huf.directHUF_search).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.direct_huf.huf_back).click();
    await page.locator(locators.direct_huf.huf_pdf).click();
}

module.exports = {navigatereportpage,filter_record,reset_filter,search_filter}

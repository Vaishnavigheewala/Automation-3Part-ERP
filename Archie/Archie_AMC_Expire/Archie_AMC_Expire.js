const { test, expect } = require('@playwright/test');
const locators = require('./Archie_AMC_Expire.json');
const { stat } = require('fs');

async function ExpireAmc(page) {

    await page.locator(locators.AMC_with_GST.Transactionmanu).click();
    await page.locator(locators.AMC_with_GST.AMC_with_GST_page).click();

    const customername = (await page.locator(locators.AMC_with_GST.customername).nth(0).textContent()).trim();
    await page.waitForTimeout(1000);
    console.log('CustomerName in AMcpage:', customername);

    //Expired Amc
    await page.locator(locators.AMC_with_GST.Expire).nth(0).click();
    console.log("Amc Expired sucessfully");

    //Verify in AMc Report
    await page.locator(locators.AMC_with_GST.Reportmenu).click();
    await page.locator(locators.reports.Amcreport).click();
    console.log('Successfully click on AMC Reports');

    await page.locator(locators.reports.filterbutton).click();
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername, customername);
    await page.waitForTimeout(3000);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    console.log('Select customer')

    await page.locator(locators.reports.searchbutton).click();
    console.log('Successfully working Search Functionallity')
    await page.waitForTimeout(1000);
    const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
    await button.click();
    console.log('Successfully working Ungrouping Functionallity')

    const AmcStatus = await page.locator(locators.reports.Amcstatus).nth(0).textContent();
    expect(AmcStatus).toBe('Expired');
    console.log('Successfully Verify that AMc is Expired')


    await page.locator(locators.AMC_with_GST.Toolsmenu).click();
    await page.locator(locators.AMC_with_GST.customerquickviewpage).click();
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername, customername);
    await page.waitForTimeout(3000);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    console.log('Select customer')
    await page.locator(locators.AMC_with_GST.search_custquickview).click();
    await page.waitForTimeout(2000);

}


async function ReactivateAmc(page) {

    await page.locator(locators.AMC_with_GST.Transactionmanu).click();
    await page.locator(locators.AMC_with_GST.AMC_with_GST_page).click();

    const customername = (await page.locator(locators.AMC_with_GST.customername).nth(0).textContent()).trim();
    await page.waitForTimeout(1000);
    console.log('CustomerName in AMcpage:', customername);

    //Expired Amc
    await page.locator(locators.AMC_with_GST.reactivate).nth(0).click();
    console.log("Amc Expired sucessfully");

    //Verify in AMc Report
    await page.locator(locators.AMC_with_GST.Reportmenu).click();
    await page.locator(locators.reports.Amcreport).click();
    console.log('Successfully click on AMC Reports');

    await page.locator(locators.reports.filterbutton).click();
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername, customername);
    await page.waitForTimeout(3000);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    console.log('Select customer')

    await page.locator(locators.reports.searchbutton).click();
    console.log('Successfully working Search Functionallity')
    await page.waitForTimeout(1000);
    const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
    await button.click();
    console.log('Successfully working Ungrouping Functionallity')

    const AmcStatus = await page.locator(locators.reports.Amcstatus).nth(0).textContent();
    expect(AmcStatus).toBe('Active');
    console.log('Successfully Verify that AMc is Expired')


    await page.locator(locators.AMC_with_GST.Toolsmenu).click();
    await page.locator(locators.AMC_with_GST.customerquickviewpage).click();
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername, customername);
    await page.waitForTimeout(3000);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    console.log('Select customer')
    await page.locator(locators.AMC_with_GST.search_custquickview).click();
    await page.waitForTimeout(2000);

}


module.exports = { ExpireAmc  , ReactivateAmc};
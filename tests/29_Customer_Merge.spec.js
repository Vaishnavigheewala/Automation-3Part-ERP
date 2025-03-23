const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Customer Merge/Customer_Merge.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, checkinput } = require('../Pages/Customer Merge/Customer_Merge.js');
/********************************************************************/


test('Customer Merge', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Tools"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Tools Menu');

    await page.locator(locators.Customer_merge_page).click();

    await checkinput(page);
    
    await page.locator(locators.keep_customer).nth(0).click();

    await page.locator(locators.select_cust).nth(2).click();

    await page.locator(locators.merge_btn).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.merge_cust_ok).click();


});
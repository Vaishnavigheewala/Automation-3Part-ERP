const { test, expect } = require('@playwright/test');
const locators = require('../Cashonly/HUF_Cycle_Sales/HUF_Cycle_Sales.json');
const fs = require('fs');
const path = require('path');



/******************Reusable functions imported***********************/
const { log_in, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Verify_HUF_Cycle } = require('../Cashonly/HUF_Cycle_Sales/HUF_Cycle_Sales.js');
/********************************************************************/
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Verify HUF Cycle page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); 
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');

    await page.locator(locators.HUF_Cycle_Sales.Sales_Menu).click();
    await page.locator(locators.HUF_Cycle_Sales.HUF_Cycle_Sales_Menu).click();

    await Verify_HUF_Cycle(page);
    await page.waitForTimeout(2000);

    await page.locator(locators.HUF_Cycle_Sales_Page.View_Link).nth(1).click();

    let Edit_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Edit_Button).isVisible();
    console.log("Edit Button is Visible:" , Edit_Button);
    await page.waitForTimeout(2000);

    await page.locator(locators.HUF_Cycle_Sales_Page.Close_Button).click();

    await Company_Change(page , "Shree Aqua Care");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Transaction");

    await page.locator(locators.HUF_Cycle_Sales.Sales_Menu).click();
    await page.locator("#NavbarTransactionMenuSalesModuleHUFCycleSalesPage_SACToHUFSales").click();

    await page.locator("#HUFCycleSalesViewButton").nth(1).click();

    Edit_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Edit_Button).isVisible();
    console.log("Edit Button is Visible:" , Edit_Button);
    await page.waitForTimeout(2000);

    await page.locator("#HUFCycleSalesViewCloseButton").click();



    await Company_Change(page , "Kishorbhai B Thakkar");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Transaction");

    await page.locator(locators.HUF_Cycle_Sales.Sales_Menu).click();
    await page.locator("#NavbarTransactionMenuSalesModuleHUFCycleSalesPage_HUFToCustomerSales").click();

    await page.locator("#HUFCycleSalesHUFCompanyViewButton").nth(1).click();

    Edit_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Edit_Button).isVisible();
    console.log("Edit Button is Visible:" , Edit_Button);
    await page.waitForTimeout(2000);

    await page.locator("#HUFCycleSalesHUFCompanyViewCloseButton").click();


    await Company_Change(page , "Cash Only");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator(locators.HUF_Cycle_Sales_Page.HUF_Cycle_Sales_Bill_Link).click();

    await page.locator("#HUFCycleSalesBillLinkReportViewCashToCustomerSalesButton").nth(1).click();

    let context = page.context();

    // Step 2: Click the element that opens the new tab and wait for the new tab to open
    let [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page event
    ]);

    await page.waitForTimeout(2000);

    await newPage.close();


    await Company_Change(page , "Kishorbhai B Thakkar");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator(locators.HUF_Cycle_Sales_Page.HUF_Cycle_Sales_Bill_Link).click();

    await page.locator("#HUFCycleSalesBillLinkReportViewHUFPurchaseFromSACButton").nth(0).click();

    context = page.context();

    // Step 2: Click the element that opens the new tab and wait for the new tab to open
    [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page event
    ]);

    await page.waitForTimeout(2000);

    await newPage.close();


    await Company_Change(page , "Shree Aqua Care");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator(locators.HUF_Cycle_Sales_Page.HUF_Cycle_Sales_Bill_Link).click();

    await page.locator("#HUFCycleSalesBillLinkReportViewSACToHUFSalesButton").nth(0).click();

    context = page.context();

    // Step 2: Click the element that opens the new tab and wait for the new tab to open
    [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page event
    ]);

    await page.waitForTimeout(2000);

    await newPage.close();


    await Company_Change(page, "Cash Only");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator(locators.HUF_Cycle_Sales_Page.Outstanding_Reports).click();

    await page.locator(locators.outstanding.outstanding_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customerName);
    await page.locator('li.e-list-item', { hasText: customerName }).click();
    await page.waitForTimeout(2000);

    await page.locator(locators.outstanding.outstanding_search).click();
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator(locators.reports_menu.Inventory_Reports).click();
    await page.locator(locators.Inventory.Inventory_filter).click();

    await page.locator(locators.Inventory.Inventory_item).click();
    await page.fill(locators.Inventory.enteritemname, "SNEH2");
    await page.locator('li.e-list-item', { hasText: "SNEH2" }).click();
    await page.waitForTimeout(2000);

    await page.locator(locators.Inventory.Inventory_search).click();
    await page.waitForTimeout(2000);


    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);

    await selectmenu(page, "Reports");

    await page.locator("#NavbarReportsMenuAccountLedgerModule").click();

    await page.locator("#NavbarReportsMenuAccountLedgerModuleCustomerAccountLedge").click();

    await page.locator(locators.customer_ledger.customer_ledger_filter).click();

    await page.locator(locators.customerdropdown).click();
    await page.fill(locators.entercustomername, customerName);
    await page.locator('li.e-list-item', { hasText: customerName }).click();

    await page.locator(locators.customer_ledger.customer_ledger_search).click();

});

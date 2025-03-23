const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Archie_Delete_Ledger/Archie_Delete_Ledger.json');


/******************Reusable functions imported***********************/
const { log_in, Variable_File_Path, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, selectsubmenuofpayable, selectsubmenuofoutstanding, selectfilterSearchOutstandingcust, selectsubmenuofaccountledger,
    selectfiltervendor, selectfilterResetvendor, selectfilterResetcustomer, selectfiltercustomer, selectfilterPayable } = require('../Archie/Archie_Delete_Ledger/Archie_Delete_Ledger.js');
/********************************************************************/
const fs = require('fs');
const { timeStamp } = require('console');

let filePath = Variable_File_Path();
let updatedVariables, Customer_Name, Ledger_Bill_Number, Part_Pay_Voucher_ID;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
Customer_Name = updatedVariables.Customer.Customer_Account_Name;
Ledger_Bill_Number = updatedVariables.Cash_Ledger.Voucher_No;
Part_Pay_Voucher_ID = updatedVariables.Cash_Ledger.Latest_Part_Voucher_No;

test('Delete Ledger', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);

    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');

    //await selectsubmenu(page, "Transaction");
    await page.waitForTimeout(1000);

    await page.locator(locators.View).nth(1).click();
    await page.waitForTimeout(1000);
    console.log('View Link Check');

    await page.locator(locators.Edit).click();
    await page.waitForTimeout(1000);
    console.log('Edit Button Check')
    if (await page.locator(locators.Edit_Ok).isVisible()) {
        await page.locator(locators.Edit_Ok).click();
        await page.waitForTimeout(1000);
        console.log('Popup Check')
    }
    await page.locator(locators.Close).click();
    await page.waitForTimeout(1000);

    await selectmenu(page, "Delete");
    console.log('Step 4: Sucessfully Clicked on Delete Menu');
    await page.locator(locators.Delete_Ledger).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.Ledger_No, Ledger_Bill_Number);
    console.log("Full Payment Ledger delete.");
    // await page.waitForEvent(1000);

    await page.locator(locators.Ledger_Radio).click();
    // await page.waitForEvent(1000);

    await page.locator(locators.Delete_Btn).click();
    // await page.waitForTimeout(1000);

    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(1000);
    await selectmenu(page, "Transaction");
    console.log('Step 5: Sucessfully Clicked on Transaction Menu');

    await page.locator(locators.AMC).click();

    await page.locator(locators.AMC_View).nth(1).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.AMC_Close).click();
    await page.waitForTimeout(2000);


    await selectmenu(page, "Delete");
    console.log('Step 6: Sucessfully Clicked on Delete Menu');
    await page.locator(locators.Delete_Ledger).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.Ledger_No, Part_Pay_Voucher_ID);
    console.log("Part Payment Ledger delete.");
    // await page.waitForEvent(1000);

    await page.locator(locators.Ledger_Radio).click();
    // await page.waitForEvent(1000);

    // await page.locator(locators.Delete_Btn).click();
    // await page.waitForTimeout(1000);

    await selectmenu(page, "Delete");
    console.log('Step 7: Sucessfully Clicked on Delete Menu');
    await page.locator(locators.Delete_Ledger).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.Ledger_No, "LM666");
    console.log("Ledger Part Payment Ledger delete.");
    // await page.waitForEvent(1000);

    await page.locator(locators.Ledger_Radio).click();
    // await page.waitForEvent(1000);

    // await page.locator(locators.Delete_Btn).click();
    // await page.waitForTimeout(1000);

    await selectmenu(page, "Delete");
    console.log('Step 8: Sucessfully Clicked on Delete Menu');
    await page.locator(locators.Delete_Ledger).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.Ledger_No, "LM666");
    // await page.waitForEvent(1000);

    await page.locator(locators.Ledger_Radio).click();
    // await page.waitForEvent(1000);

    // await page.locator(locators.Delete_Btn).click();
    // await page.waitForTimeout(1000);

    await selectmenu(page, "Transaction");
    console.log('Step 9: Sucessfully Clicked on Transaction Menu');

    await page.locator(locators.AMC).click();

    await page.locator(locators.AMC_View).nth(1).click();
    // await page.waitForTimeout(1000);

    await page.locator(locators.AMC_Close).click();
    await page.waitForTimeout(500);

    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 10: Sucessfully Clicked on Reports Menu');
    await selectsubmenuofoutstanding(page, "Reports");
    console.log('Step 11: Reports -  Outstanding Report - Outstanding Report Page is Displayed');
    await page.waitForTimeout(1000);
    await selectfilterSearchOutstandingcust(page, Customer_Name, "Archi Enterprice");
    await page.waitForTimeout(1000);

    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 12: Sucessfully Clicked on Reports Menu');
    await selectsubmenuofaccountledger(page, "Reports");
    console.log('Step 13: Reports -  Account Ledger -  Account Ledger Page is Displayed');
    await page.waitForTimeout(1000);
    await selectfiltervendor(page, Customer_Name);
    await page.waitForTimeout(1000)
    await selectfilterResetvendor(page, Customer_Name, "31-12-2023 - 31-12-2024");
    await page.waitForTimeout(1000);
    await selectfilterResetcustomer(page, Customer_Name, "31-12-2023 - 31-12-2024");
    await page.waitForTimeout(1000);
    await selectfiltercustomer(page, Customer_Name);
    //await page.waitForTimeout(1000);

    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 14: Sucessfully Clicked on Reports Menu');
    await selectsubmenuofpayable(page, "Reports");
    console.log('Step 15: Reports - Payable - Payable Page is Displayed');
    await page.waitForTimeout(500);
    await selectfilterPayable(page, Customer_Name);

});
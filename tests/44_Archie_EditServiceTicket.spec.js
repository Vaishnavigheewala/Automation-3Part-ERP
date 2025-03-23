const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Edit_Service_Ticket/Edit_Service_Ticket.json');
const fs = require('fs');
const path = require('path');


/******************Reusable functions imported***********************/
const { log_in, Get_Current_Date_Time, Generate_Unique_String, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {  Verify_Customer_Account_Ledger_Reports, Edit_Service_Ticket, Verify_SerVice_Ticket_Reports, Verify_SerVice_Ticket_Item_Wise_Reports, Verify_SerVice_Ticket_Outstanding_Reports, Verify_Inventory_Stock_Reports  } = require('../Archie/Edit_Service_Ticket/Edit_Service_Ticket.js')
/********************************************************************/


// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;

test('Edit Ledger', async ({ page }) => {

    console.log('Step 1: Login to Archie Company');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed!!!');
    await page.waitForTimeout(2000);

    await selectmenu(page, "Transaction");
    console.log('Step 3: Transaction Menu is Clicked!!!');
    await page.waitForTimeout(2000);
    await page.locator(locators.Service_Ticket.Service_Ticket_Menu).click();
    await page.waitForTimeout(2000);
    await page.locator(locators.Service_Ticket.Service_Ticket_Page).click();

    await Edit_Service_Ticket(page, "Free", "FreeRowInv", "10", "40000", "40000");

    // Verify Service Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Service_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Service_Report).click();
    await Verify_SerVice_Ticket_Reports(page, customerName);
    console.log("Step 4: Verify Service Reports!!!");

    // Verify Item Wise Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Service_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Item_Wise_Reports).click();
    await Verify_SerVice_Ticket_Item_Wise_Reports(page,customerName);
    console.log("Step 5: Verify Item Wise Reports!!!");
    
    // Verify Outstanding Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Outstanding).click();
    await Verify_SerVice_Ticket_Outstanding_Reports(page, customerName);
    console.log("Step 6: Verify Outstanding Reports!!!");

    // Verify Inventory Stock Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Inventory_Reports).click();
    await Verify_Inventory_Stock_Reports(page, "FreeRowInv");
    await page.waitForTimeout(2000);
    await page.locator("#InventoryReportActionColumn").nth(1).click();
    console.log("Step 7: Verify Inventory Stock Reports!!!");

    // Verify Customer Account Ledger
    await Company_Change(page, "Shree Aqua Care");
    await Verify_Customer_Account_Ledger_Reports(page, customerName);
    await page.dblclick("#AccountLedgerReportGridTransactionDateColumn");
    console.log("Step 8: Verify Customer Account Ledger Reports!!!");

});
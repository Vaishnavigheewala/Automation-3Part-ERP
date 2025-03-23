const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Chargeable Service Ticket/Chargeable_Service_Ticket.json');


/******************Reusable functions imported***********************/
const { log_in, Get_Current_Date_Time, Generate_Unique_String } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Add_New_Service_Ticket, Verify_SerVice_Ticket_Reports, Verify_SerVice_Ticket_Item_Wise_Reports, Verify_SerVice_Ticket_Outstanding_Reports, Verify_Inventory_Stock_Reports } = require('../Archie/Chargeable Service Ticket/Chargeable_Service_Ticket.js');
const {deleteservice}= require('../Archie/Delete_Service_Ticket/Delete_Service_Ticket.js');
/********************************************************************/
const fs = require('fs');
const path = require('path');
const { timeStamp } = require('console');
let Customer_Name;
let Vendor_Name;
let Ledger_Bill_Number = 1000;

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name

test('Chargeable Service Ticket', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed');
    // // await expect(page).toHaveURL('http://uat.aquacare.thinkhpconsultant.com/');
    await page.waitForTimeout(2000);

    // Add Service Ticket
    await page.locator(locators.Service_Ticket.Transection).click();
    await page.locator(locators.Service_Ticket.Service_Ticket_Menu).click();
    await page.locator(locators.Service_Ticket.Service_Ticket_Page).click();
    await Add_New_Service_Ticket(page, customerName, "RO", "ASHOKBHAI", "testinv with gst", "Chargeable", "VaishnaviGen 27-01", "5","50000"  );
    console.log("Step 3: New Service Ticket Added with Type Chargeable!!!")

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
    await Verify_SerVice_Ticket_Item_Wise_Reports(page, customerName);
    console.log("Step 5: Verify Item Wise Reports!!!");
    
    // Verify Outstanding Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Outstanding).click();
    await Verify_SerVice_Ticket_Outstanding_Reports(page, customerName);
    console.log("Step 6: Verify Outstanding Reports!!!");

    // Verify Inventory Stock Reports
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.locator(locators.Service_Ticket_Reports.Inventory_Reports).click();
    await Verify_Inventory_Stock_Reports(page, "VaishnaviGen 27-01");
    console.log("Step 7: Verify Inventory Stock Reports!!!");

});


test('delete service ticket without inventory',async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await deleteservice(page,"ChargableBoth",customerName,"fen01");
    
});




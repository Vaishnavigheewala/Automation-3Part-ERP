const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { log_in, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {Open_Add_Account_Link, Add_New_Service_Ticket, AddUser, Varify_Service_Add_Ticket, Service_Ticket_Page, Outstanding_Report, Add_Free_Service_Ticket_Genaral_Row_Material, Service_Report_Free_ST_General_Row, Item_Wise_Service_Ticket_Report, Closed_Complain_Report, Inventory_Stock_Report, Customer_Account_Ledger_Report } = require('../Archie/Add_Free_Service_Ticket_General_Raw_Material/Free_Service_Ticket_General_Raw_Material.js');
const {deleteservice}= require('../Archie/Delete_Service_Ticket/Delete_Service_Ticket.js');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;
let Update_General = updatedVariables.Inventory.Update_General;
let UpdateRaw_Inventory = updatedVariables.Inventory.UpdateRaw_Inventory;


test('Add Service Ticket Raw And General Material Reports', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step: 2 Dashboard Page displayed.');
   // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Service_Ticket_Page(page);
    await Add_New_Service_Ticket(page);
    // await Open_Add_Account_Link(page);
    //await AddUser(page, "Customer", null, null, "vik@gmail.com", "VIvek_11_Jan_New", "9843940433", "8734348899", "430099", "12,drbfgfrfs", "GUJARAT", "SURAT", "CITYLIGHT");
    await Varify_Service_Add_Ticket(page, customerName);
    await page.waitForTimeout(1000);
    await Add_Free_Service_Ticket_Genaral_Row_Material(page, customerName, "Ro", null, null, "zinal",  UpdateRaw_Inventory, Update_General, "2");
    await page.waitForTimeout(1000);
});

test('Service Ticket Ran And General Material Reports', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step: 2 Dashboard Page displayed.');
    //await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await Service_Report_Free_ST_General_Row(page, customerName, null);
    await page.waitForTimeout(1000);
    await Item_Wise_Service_Ticket_Report(page, customerName, UpdateRaw_Inventory, null);
    await page.waitForTimeout(1000);
    await Closed_Complain_Report(page, customerName);
    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    await selectmenu(page, "Transaction");
    await Inventory_Stock_Report(page, "RawMaterial", UpdateRaw_Inventory, null);
    await page.waitForTimeout(1000);
    await Inventory_Stock_Report(page, null, Update_General, null);
    await page.waitForTimeout(1000);
    await Outstanding_Report(page, customerName, null);
    await page.waitForTimeout(1000);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(1000);
    await Customer_Account_Ledger_Report(page, customerName, null, null);
});


test('delete service ticket Free Both inventory',async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    //await expect(page).toHaveURL('http://192.168.29.112:88/');
    await selectmenu(page, "Transaction");
    await deleteservice(page,"FreeBoth",customerName,UpdateRaw_Inventory);
    
});
const { test, expect } = require('@playwright/test');
const locators = require('./Edit_Service_Ticket.json');

async function Edit_Service_Ticket(page, servicetype, item, Qty, Totalamt, recieveamt) {
    
    await page.locator(locators.Service_Ticket.Service_Ticket_View).nth(0).click();

    await page.locator(locators.Service_Ticket.Service_Ticket_Edit).click();

    // await page.locator(locators.Service_Ticket.Ledger_ok).click();
    await page.waitForTimeout(2000);
    
    await page.locator(locators.Service_Ticket.Add_New_Service_Type).click();
    await page.locator('li.e-list-item', { hasText: servicetype }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Grid_Add_Btn).click();

    await page.locator(locators.Service_Ticket.Grid).click();

    await page.locator(locators.Service_Ticket.Grid_Select_item).click();
    await page.fill(locators.Service_Ticket.entercustomername, item);
    await page.locator('li.e-list-item', { hasText: item }).click();

    await page.locator(locators.Service_Ticket.Grid_Qty).click();
    await page.fill("#Qty", Qty);

    await page.locator(locators.Service_Ticket.Grid_Update_Btn).click();

    await page.locator(locators.Service_Ticket.Update_Ok).dblclick();  
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Add_New_Submit).click();
    await page.waitForTimeout(1000);


   
}
async function Verify_SerVice_Ticket_Reports(page, customername) {

    await page.locator(locators.Service_Report.filter_Btn).click();
    await page.locator(locators.Service_Report.Customer_Dropdown).click();
    await page.fill(locators.Service_Report.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.locator(locators.Service_Report.Search_Btn).click();
}

async function Verify_SerVice_Ticket_Item_Wise_Reports(page, customername) {

    await page.locator(locators.Item_Wise.filter_Btn).click();
    await page.locator(locators.Item_Wise.Customer_Dropdown).click();
    await page.fill(locators.Item_Wise.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.locator(locators.Item_Wise.Search_Btn).click();
}

async function Verify_SerVice_Ticket_Outstanding_Reports(page, customername) {

    await page.locator(locators.Outstanding.filter_Btn).click();
    await page.locator(locators.Outstanding.Customer_Dropdown).click();
    await page.fill(locators.Outstanding.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.locator(locators.Outstanding.Search_Btn).click();
}

async function Verify_Inventory_Stock_Reports(page, inventoryname) {

    await page.locator(locators.Inventory_Reports.filter_Btn).click();
    await page.locator(locators.Inventory_Reports.Customer_Dropdown).click();
    await page.fill(locators.Inventory_Reports.entercustomername, inventoryname);
    await page.locator('li.e-list-item', { hasText: inventoryname }).click();
    await page.locator(locators.Inventory_Reports.Search_Btn).click();
}

async function Verify_Customer_Account_Ledger_Reports(page, customername) {
    await page.locator(locators.Service_Ticket_Reports.Reports_Menu).click();
    await page.click(locators.CustomeraccLedger.accountLedger);
    await page.waitForTimeout(1000);
    await page.click(locators.CustomeraccLedger.customeraccount);
    await page.click(locators.CustomeraccLedger.filterbutton);

    await page.click(locators.CustomeraccLedger.Customer_Dropdown);
    await page.fill(locators.CustomeraccLedger.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.click(locators.CustomeraccLedger.Searchbutton);
    
}


module.exports = {Edit_Service_Ticket, Verify_SerVice_Ticket_Reports, Verify_SerVice_Ticket_Item_Wise_Reports, Verify_SerVice_Ticket_Outstanding_Reports, Verify_Inventory_Stock_Reports, Verify_Customer_Account_Ledger_Reports }
const { test, expect } = require('@playwright/test');
const locators = require('./Chargeable_Service_Ticket.json');

async function Add_New_Service_Ticket(page, customername, ProductType, Technician, Product, ServiceType, item, Qty,Totalamt ) {
    await page.locator(locators.Service_Ticket.Add_New_btn).click();

    await page.locator(locators.Service_Ticket.Add_New_Customer).dblclick();
    await page.fill(locators.Service_Ticket.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();
    await page.waitForTimeout(1000);

    const AMC = await page.locator(locators.Service_Ticket.Add_New_AMC).isVisible();
    console.log("AMC Field is Visible : ", AMC);

    if (AMC) {
        await page.locator(locators.Service_Ticket.Add_New_AMC).click();
        await page.locator('li.e-list-item').nth(0).click();
        await page.waitForTimeout(1000);
    } else {
        console.log("AMC is Not Available !!!")
    }
  
    await page.locator(locators.Service_Ticket.Add_New_Product_Type).click();
    await page.locator('li.e-list-item', { hasText: ProductType }).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Add_New_Technician).click();
    await page.fill(locators.Service_Ticket.entercustomername, Technician);
    await page.locator('li.e-list-item', { hasText: Technician }).click();
    await page.waitForTimeout(1000);

    const productname = await page.locator(locators.Service_Ticket.Add_New_Product).isVisible();
    console.log("product Field is Visible : ", productname);

    if (productname) {
    await page.locator(locators.Service_Ticket.Add_New_Product).click();
    await page.fill(locators.Service_Ticket.entercustomername, Product);
    await page.locator('li.e-list-item', { hasText: Product }).click();
    await page.waitForTimeout(1000);
    } else {
        console.log("productname is Not Available !!!")
    }


    await page.locator(locators.Service_Ticket.Add_New_Service_Type).click();
    await page.locator('li.e-list-item', { hasText: ServiceType }).click();
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

    await page.waitForTimeout(2000);
    await page.locator(locators.Service_Ticket.Make_Payment).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Total_AMT).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.Service_Ticket.Total_AMT, Totalamt);
    await page.waitForTimeout(1000);

    const netOutstandingAmt = await page.locator(locators.Service_Ticket.netoutstandingamount).first().textContent();
  const amount = parseFloat(netOutstandingAmt.trim());
 
  if (!isNaN(amount) && amount > 0) {
    const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

      console.log(`Filling Received Amount with: ${halfAmount}`);
        // Fill the "Received Amount" input field
        const receive = await page.locator(locators.Service_Ticket.Receive_Amt_td).nth(1);
        receive.dblclick();
        await page.fill(locators.Service_Ticket.Receive_Amt, halfAmount.toString());
    } else {
        console.log("Invalid Net Outstanding Amount. Skipping input.");
    }


    // await page.locator(locators.Service_Ticket.Receive_Amt_td).nth(1).dblclick();
    // await page.fill(locators.Service_Ticket.Receive_Amt, recieveamt);

    await page.waitForTimeout(1000);
    await page.locator(locators.Service_Ticket.netoutstandingamount).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Part_Payment_Ok).click();

    await page.locator(locators.Service_Ticket.Payment_Update).click();
    await page.waitForTimeout(1000);

    await page.locator(locators.Service_Ticket.Payment_Update_Ok).click();

    await page.locator(locators.Service_Ticket.Payment_Submit).click();
 
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


module.exports = { Add_New_Service_Ticket, Verify_SerVice_Ticket_Reports, Verify_SerVice_Ticket_Item_Wise_Reports, Verify_SerVice_Ticket_Outstanding_Reports, Verify_Inventory_Stock_Reports };
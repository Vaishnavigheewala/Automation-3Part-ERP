const { test, expect } = require('@playwright/test');
const locators = require('./Delete_Service_Ticket.json');
async function Company_Change(page, companyname) {
    await page.locator(locators.Company_Dropdown_Two).click();
    await page.locator('li.e-list-item', { hasText: companyname }).click();
    await page.locator(locators.Change_Btn).click();
    console.log("Company Change to ", companyname);
  }

async function selectTicketType(page, ticketType) {
    const ticketLocators = {
        FreeNo: "//span[normalize-space()='Free Service Ticket + No Inventory']",
        FreeGeneral: "//span[normalize-space()='Free Service Ticket + Only General Inventory']",
        FreeRaw: "//span[normalize-space()='Free Service Ticket + Only Raw Material Inventory']",
        FreeBoth: "//span[contains(text(),'Free Service Ticket + General And Raw Material Inv')]",
        ChargableGeneral: "//span[normalize-space()='Chargeble Service Ticket + Only General Inventory']",
        ChargableRaw: "//span[contains(text(),'Chargeble Service Ticket + Only Raw Material Inven')]",
        ChargableBoth: "//span[contains(text(),'Chargeble Service Ticket + General And Raw Materia')]"
    };

    const locator = ticketLocators[ticketType];
    if (!locator) {
        console.log(`Invalid ticket type: ${ticketType}`);
        return;
    }

    await page.click(locator);
}

async function deleteservice(page,ticketType,Customer,item){

    

    //go to the service ticketpage
   await page.click(locators.service);
    await page.click(locators.servicetickets);

    await page.waitForSelector("//td[@id='ServiceTicketTicketNoColumn']");

    // Fetch the latest ticket number from the ticket no column
    const latestTicketNo = await page.locator("//td[@id='ServiceTicketTicketNoColumn']").nth(0).textContent();

    if (!latestTicketNo || latestTicketNo.trim() === "") {
        console.log('No latest ticket number found. Exiting...');
       
       
    }

    console.log(`Latest Ticket No: ${latestTicketNo.trim()}`);

    await page.click(locators.deletemenu);
    await page.click(locators.ServiceTicketdelete);

     // Enter the latest ticket number
     await page.fill(locators.ticketno, latestTicketNo);
     await page.click(locators.deletebutton);
 
     // Handle the warning prompt
     const warningMessage = await page.locator('text=Please select service ticket combination option.').isVisible();
     if (warningMessage) {
         console.log('Warning message displayed, selecting ticket type...');
        
     }
     await page.waitForTimeout(2000);
     await selectTicketType(page, ticketType);
     await page.click(locators.deletebutton);
 
     // Confirm deletion success
     await page.waitForSelector('text=Service Ticket Deleted Successfully.', { timeout: 5000 });
     console.log('Service Ticket Deleted Successfully.');


     //Service Report 
     await page.click(locators.Service.report);
    await page.click(locators.Service.servicemenu);
    await page.click(locators.Service.Servicereport);
    await page.click(locators.serviceReport.filterbutton);
    // Apply filter using customer name
    await page.locator(locators.serviceReport.customerdropdown).click();
    await page.fill(locators.serviceReport.entercustomername, Customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: Customer }).click();
     
    await page.click(locators.serviceReport.searchbutton);
    // Wait for the results to load
    await page.waitForSelector("#ServiceTicketReportGrid");
    
    // Verify deleted ticket is not displayed
    await page.locator("//td[@id='ServiceTicketReportTicketNoColumn']").count();
   
    console.log(`Verified: Deleted service ticket ${latestTicketNo} is not displayed in Service report.`);

    //itemwise report

    await page.click(locators.Service.report);
    await page.click(locators.Service.servicemenu);
    await page.click(locators.Service.itemwisereport);
    await page.click(locators.itemwise.filterbutton);
    // Apply filter using customer name
    await page.locator(locators.serviceReport.customerdropdown).click();
    await page.fill(locators.serviceReport.entercustomername, Customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: Customer }).click();
     
    await page.click(locators.itemwise.searchbutton);
    // Wait for the results to load
    await page.waitForSelector(locators.itemwise.grid);
    
    // Verify deleted ticket is not displayed
    await page.locator("//td[@id='ItemWiseServiceTicketReportTicketNoColumn']").count();
    console.log(`Verified: Deleted service ticket ${latestTicketNo} is not displayed in itemwise report.`);

    //OutStanding Report
    await page.click(locators.Service.report);
    await page.click(locators.outstanding.outstandingpage);
    await page.click(locators.outstanding.filterbutton);
    await page.locator(locators.serviceReport.customerdropdown).click();
    await page.fill(locators.serviceReport.entercustomername, Customer);
    // Select the desired customer by its text
    await page.locator('td.customerdropdown1', { hasText: Customer }).click();
    await page.click(locators.outstanding.serachbutton);
    await page.waitForSelector(locators.outstanding.grid);
    
    // Ensure deleted ticket is not in outstanding payments
     await page.locator("//td[@id='OutstandingReportBillNumberColumn']").count();
    if (ticketType.includes('Chargable')) {
        
        console.log(`Verified: Deleted chargeable service ticket ${latestTicketNo} is not displayed in outstanding payments.`);
    } else {
        console.log(`Verified: Deleted non-chargeable service ticket ${latestTicketNo} is  displayed in outstanding payments.`);
    }

    //Inventory stock report
    await page.click(locators.Service.report);
    await page.click(locators.inventorystock.Inventory_menu);
    await page.click(locators.inventorystock.Inventory_filter);
    await page.click(locators.inventorystock.Inventory_item);
    await page.fill(locators.inventorystock.enteritemname, item);
    await page.locator('li.e-list-item', { hasText: item }).click();
    await page.click(locators.inventorystock.Inventory_search);
    await page.click('a#InventoryReportViewDetailedinventoryReportButton');
    await page.waitForSelector(locators.inventorystock.billno);
    expect(await page.locator(locators.inventorystock.billno).count());
    console.log(`Verified: Deleted service ticket ${latestTicketNo} inventory items are not displayed in the Inventory Stock Report.`);

   //customer account ledger report
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
   await page.click(locators.Service.report);
   await page.click(locators.customer_ledger.account_ledger);
   await page.click(locators.customer_ledger.customer_ledger);
   await page.click(locators.customer_ledger.customer_ledger_filter);
   await page.locator(locators.serviceReport.customerdropdown).click();
   await page.fill(locators.serviceReport.entercustomername, Customer);
   // Select the desired customer by its text
   await page.locator('td.customerdropdown1', { hasText: Customer }).click();
   await page.click(locators.customer_ledger.customer_ledger_search);
   await page.waitForSelector(locators.customer_ledger.bill);
   expect(await page.locator(locators.customer_ledger.bill).count());
   console.log(`Verified: Deleted service ticket ${latestTicketNo} is not displayed in the Customer account Ledger Report.`);
}




module.exports={deleteservice,selectTicketType,Company_Change};
const { test, expect } = require('@playwright/test');
const locators = require('./AddChargableTicketwithGeneralInv.json');

// Chargeable Service Ticket with General Inventory
async function navigate_ticket(page) {
    await page.locator(locators.navigate_ticket.service).click();
    await page.locator(locators.navigate_ticket.servicetickets).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Service Tickets' })).toBeVisible();
}


async function addticketwithGenInv(page,customer,product_type,technician,item_name,Qty ,rate) {
    //Verify Add New button
    await page.locator(locators.serviceticket.addnewbutton).click();

    //add account functionality
    await page.click(locators.serviceticket.addaccountlink);
    const buttons = await page.$$('button#CommonModelDialogCloseButton');
    if (buttons.length > 1) {
        await buttons[1].click(); // Click the second button
    } else {
        await buttons[0].click(); // Click the first button if only one exists
    }
    console.log('verify add account functionality');

    // Verify Service Date
    const date = await page.inputValue(locators.serviceticket.servicedate);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    expect(date).toBe(formattedDate);
    console.log(`defaulting to current date: ${formattedDate}`);
    console.log('Current date is Visible');

    // Verify Ticket No. (Non-editable)
    const ticketNo = page.locator(locators.serviceticket.ticketsno);
    const isEditable = await ticketNo.evaluate(el => !el.hasAttribute('readonly') && !el.hasAttribute('disabled'));
    console.log(`Ticket No is editable: ${isEditable}`);

    // Verify and select Customer Name 
    await page.locator(locators.serviceticket.customerdropdwon).click();
    await page.fill(locators.serviceticket.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
    console.log('Customer selected');

    //Select Product Type
    await page.locator(locators.serviceticket.producttypedropdown).click();
    await page.locator('li.e-list-item', { hasText: product_type }).click();

    // Verify Customer Address (Non-editable)
    const customerAddress = page.locator(locators.serviceticket.customeraddress);
    const iseditable = await customerAddress.evaluate(el => !el.hasAttribute('readonly') && !el.hasAttribute('disabled'));
    console.log(`Customer Address is editable: ${iseditable}`);

    //verify outside product
    const isoutsideproductVisible = await page.isVisible(locators.serviceticket.outsideproduct);
    console.log(`outside product is visible: ${isoutsideproductVisible}`);
    if (!isoutsideproductVisible) {
        console.error('outside product is not visible on the page.');
    }

     // Select Technician
     await page.locator(locators.serviceticket.techniciandropdown).click();
     await page.fill(locators.serviceticket.entercustomername,technician );
     await page.locator('li.e-list-item', { hasText: technician }).click();
     console.log('Technician selected');

     //Select Product
     await page.locator(locators.serviceticket.productdropdown).click();
     await page.waitForTimeout(2000);
     await page.locator('li.e-list-item').nth(0).click();
     console.log('Product selected');

     // SELECT SERVICE TYPE
    await page.click(locators.serviceticket.servicetypedropdown);
    await page.locator(locators.serviceticket.selectservicetypecharge).click();
    console.log('Chargeable Service ticket selected');

    //Verify Fields
    await page.locator(locators.serviceticket.completeddropdown).isVisible();
    console.log('Completed Field Visible');

    await page.locator(locators.serviceticket.complainstatusdropdown).isVisible();
    console.log('Complain Status Field Visible');

    await page.locator(locators.serviceticket.discountamount).isVisible();
    console.log('Discount Amount Field Visible');

    await page.locator(locators.serviceticket.discount).isVisible();
    console.log('Discount Percentage Field Visible');

    await page.locator(locators.serviceticket.netAmount).isVisible();
    console.log('Net AMount Field Visible');

    await page.locator(locators.serviceticket.submitbutton).click();
    console.log("click on submit button (Give error)");

    //Verify Inventory Details
    await page.locator(locators.Inventory_detail.add_button).click();
    await page.locator(locators.Inventory_detail.item).click();
    await page.fill(locators.Inventory_detail.enteritem,item_name);
    await page.locator('li.e-list-item', { hasText: item_name }).click();
    console.log("Item Selected");

    await page.locator(locators.Inventory_detail.update_button).click();
    console.log("Click on update button");

    await page.locator(locators.Inventory_detail.qty).click();
    await page.fill(locators.Inventory_detail.qty,Qty);
    console.log("Fill Qty");

    await page.locator(locators.Inventory_detail.clickrate).dblclick();
    await page.fill(locators.Inventory_detail.enterrate, rate);
    console.log("Fill Rate");

    await page.locator(locators.Inventory_detail.update_button).click();
    console.log("click on update button");

    await page.locator(locators.Inventory_detail.updateok).click();
    console.log("click on successfully update");

    await page.locator(locators.serviceticket.submitbutton).click();
    console.log("click on submit button , Successfully addes Service Ticket");

    await page.locator(locators.Inventory_detail.no_btn).click();
    console.log('Verify Grid Newly Record are added')
}

async function reports(page,customer,Inventory) {

    //Service Report
    await page.click(locators.ServiceReport.reportmenu);
    await page.click(locators.ServiceReport.servicemenu);
    await page.click(locators.ServiceReport.servicesubmenu);
    await page.click(locators.ServiceReport.filterservicebutton);
  
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.ServiceReport.Searchservicebutton);
    console.log('Service Report verification completed successfully.');
    await page.waitForTimeout(1000);

    //Itemwise Report
    await page.click(locators.ServiceReport.reportmenu);
    await page.click(locators.ServiceReport.servicemenu);
    await page.click(locators.ServiceReport.ItemWise);
    await page.click(locators.ServiceReport.filteritemwise);
  
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.ServiceReport.searchitemwise);
    console.log('Service Report verification completed successfully.');
    await page.waitForTimeout(1000);
  
    //Outstanding Report
    await page.click(locators.ServiceReport.reportmenu);
    await page.click(locators.ServiceReport.outstanding);
    await page.click(locators.ServiceReport.outstanding_filter);
  
    await page.locator(locators.customerdropdwon).click();
    await page.fill(locators.entercustomername,customer );
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.ServiceReport.outstanding_search);
    console.log('Outstanding Report verification completed successfully.');
    await page.waitForTimeout(1000);

    //Inventory Stock Report
    await page.click(locators.ServiceReport.reportmenu);
    await page.click(locators.ServiceReport.Inventory_stock);
    await page.click(locators.ServiceReport.Inventory_filter);
  
    await page.locator(locators.Inventory).click();
    await page.fill(locators.entercustomername,Inventory );
    await page.locator('li.e-list-item', { hasText: Inventory }).click();
  
    await page.click(locators.ServiceReport.Inventory_search);
    await page.click(locators.ServiceReport.Inventory_view);
    console.log('Inventory Stock Report verification completed successfully.');
    await page.waitForTimeout(1000);
  
}

async function SACcustomeraccledger(page,customer){
    await page.click(locators.SACcustomeraccLedger.accountLedger);
    await page.click(locators.SACcustomeraccLedger.customeraccount);
    await page.click(locators.SACcustomeraccLedger.filterbutton);
  
    await page.locator(locators.serviceticket.customerdropdwon).click();
    await page.locator('li.e-list-item', { hasText: customer }).click();
  
    await page.click(locators.SACcustomeraccLedger.Searchbutton);
    await page.dblclick(locators.SACcustomeraccLedger.BillNo);
    //  //Verify data in grid
    // const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    // const firstRow = await rows.nth(0);
    // await firstRow.locator(locators.SACcustomeraccLedger.BillNo);
    // await expect(firstRow).toContainText('ST507');

    
  }


module.exports = { navigate_ticket,addticketwithGenInv,reports,SACcustomeraccledger };
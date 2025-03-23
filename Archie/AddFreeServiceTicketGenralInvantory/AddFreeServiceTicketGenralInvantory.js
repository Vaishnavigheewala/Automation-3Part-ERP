const { test, expect } = require('@playwright/test');
const locators = require('./AddFreeServiceTicketGenralInvantory.json');

async function addserviceticket(page, customer, producttype, technician, itemname, Qty, rate) {
    await page.locator(locators.serviceticket.service).click();
    await page.locator(locators.serviceticket.servicetickets).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Service Tickets' })).toBeVisible();

    await expect(page.locator(locators.serviceticket.addnewbutton)).toBeVisible();
    console.log('Add New button visible');

    //click on add new
    await page.click(locators.serviceticket.addnewbutton);
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); // scroll down
    await page.waitForTimeout(1000);

    //verify service ticket entry page diplay with following :
    const columns = [
        locators.serviceticket.resetbutton,
        locators.serviceticket.closebutton,
        locators.serviceticket.submitbutton,
        locators.serviceticket.addaccountlink,
        locators.serviceticket.inventorysection,
        locators.serviceticket.receiptsection,

    ];

    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }

    //add account functionality
    await page.click(locators.serviceticket.addaccountlink);
    const buttons = await page.$$('button#CommonModelDialogCloseButton');
    if (buttons.length > 1) {
        await buttons[1].click(); // Click the second button
    } else {
        await buttons[0].click(); // Click the first button if only one exists
    }
    console.log(' verify add account functionality');

    // Verify Fields in Service Entry Section

    // Verify Service Date
    const date = await page.inputValue(locators.serviceticket.servicedate);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    expect(date).toBe(formattedDate);
    console.log(`defaulting to current date: ${formattedDate}`);

    await page.locator(locators.serviceticket.datepicker).click();
    const datepicker = '#CommonDatePicker'; //code to clear the date
    await page.fill(datepicker, ''); //code to clear the date
    await page.fill(datepicker, '06-01-2026');
    await page.locator(locators.serviceticket.producttypedropdown).click();
    const button = await page.$$('button#CommonModelDialogCloseButton');
    if (button.length > 1) {
        await button[0].click(); // Click the second button
    } else {
        await button[1].click(); // Click the first button if only one exists
    }
    console.log('Verify that user cannot select Future dates');

    // Verify Ticket No. (Non-editable)
    const ticketNo = page.locator(locators.serviceticket.ticketsno);
    await expect(ticketNo).toBeDisabled();
    console.log('Ticket No is Disabled ');


    // Verify and select Customer Name 
    await page.locator(locators.serviceticket.customerdropdwon).click();
    await page.fill(locators.serviceticket.entercustomername, customer);
    await page.locator('li.e-list-item', { hasText: customer }).click();
    console.log('Customer selected');
    await page.waitForTimeout(6000);


    // Verify AMC Dropdown
    const isamcdropdownVisible = await page.isVisible(locators.serviceticket.amcdropdown);
    if (isamcdropdownVisible) {
        console.log(`AMC Dropdown is visible: ${isamcdropdownVisible}`);
    } else {
        console.log('AMC Dropdown is Hidden ');

    }

    // Verify Customer Address (Non-editable)
    const customeraddress = page.locator(locators.serviceticket.customeraddress);
    await expect(customeraddress).toBeDisabled();
    console.log('customer Address is Disabled ');

    // Verify Technician Name Dropdown
    await expect(page.locator(locators.serviceticket.techniciandropdown)).toBeVisible();
    console.log('Technician Name dropdown is visible');

    //verify outside product
    const isoutsideproductVisible = await page.isVisible(locators.serviceticket.outsideproduct);
    console.log(`outside product is visible: ${isoutsideproductVisible}`);
    if (!isoutsideproductVisible) {
        console.error('outside product is not visible on the page.');
    }

    // Verify producttype  Dropdown
    await expect(page.locator(locators.serviceticket.producttypedropdown)).toBeVisible();
    console.log('producttype dropdown is visible');

    // Verify product  Dropdown
    await expect(page.locator(locators.serviceticket.productdropdown)).toBeVisible();
    console.log('product dropdown is visible');

    // Verify servicetype  Dropdown
    const servicetypedropdown = await expect(page.locator(locators.serviceticket.servicetypedropdown)).toBeVisible();
    console.log('servicetype dropdown is visible', servicetypedropdown);
    await page.click(locators.serviceticket.servicetypedropdown);
    await page.locator(locators.serviceticket.selectservicetypefree).click();
    await page.waitForTimeout(2000);


    // Verify paymenttype  Dropdown
    const paymenttype = page.locator(locators.serviceticket.PayType);
    await expect(paymenttype).toBeDisabled();
    console.log('paymenttype is Disabled ');

     // Verify completeddropdown  
     const completeddropdown = page.locator(locators.serviceticket.compltd);
     await expect(completeddropdown).toBeDisabled();
     console.log('completeddropdown is Disabled ');


    // Verify complainstatusdropdown  
    await expect(page.locator(locators.serviceticket.complainstatusdropdown)).toBeVisible();
    console.log('complainstatusdropdown  is visible');

    // Verify discountamount  
    const discountamount = page.locator(locators.serviceticket.discountamount);
    await expect(discountamount).toHaveAttribute('aria-disabled', 'false');
    console.log('discountamount is Disabled ');

    // Verify netAmount  
    const netAmount = page.locator(locators.serviceticket.netAmount);
    await expect(netAmount).toHaveAttribute('aria-disabled', 'false');
    console.log('netAmount is Disabled ');

    await page.click(locators.serviceticket.resetbutton);
    await page.waitForTimeout(1000);


    // Fill in all required fields

    //select Customer Name 
    await page.locator(locators.serviceticket.customerdropdwon).click();
    await page.fill(locators.serviceticket.entercustomername, customer);
    await page.locator('li.e-list-item', { hasText: customer }).click();
    console.log('Customer selected');
    await page.waitForTimeout(6000);

    // select AMC
    await page.locator(locators.serviceticket.amcdropdown).click();
    await page.waitForTimeout(2000);
    await page.locator('li.e-list-item').nth(0).click();
    console.log("AMC Selected");


    // select product type
    await page.locator(locators.serviceticket.producttypedropdown).click();
    await page.locator('li.e-list-item', { hasText: producttype }).click();
    console.log("product type Selected");


    // select Technician
    await page.locator(locators.serviceticket.techniciandropdown).click();
    await page.locator('li.e-list-item', { hasText: technician }).click();
    console.log("Technician Selected");


    // SELECT SERVICE TYPE
    await page.click(locators.serviceticket.servicetypedropdown);
    await page.locator(locators.serviceticket.selectservicetypefree).click();
    console.log("SERVICE TYPE Selected");


    // Add Inventory Details section
    await page.locator(locators.Inventory_detail.add_button).click();
    await page.locator(locators.Inventory_detail.item).click();
    await page.fill(locators.Inventory_detail.enteritem, itemname);
    await page.locator('li.e-list-item', { hasText: itemname }).click();
    console.log("Item Selected");


    await page.locator(locators.Inventory_detail.clickquantity).click();
    await page.fill(locators.Inventory_detail.enterquantity, Qty);
    console.log("Fill Qty");

    await page.locator(locators.Inventory_detail.clickrate).dblclick();
    await page.fill(locators.Inventory_detail.enterrate, rate);
    console.log("Fill Rate");

    await page.locator(locators.Inventory_detail.update_button).click();
    console.log("click on update button");

    await page.locator(locators.Inventory_detail.updateok).click();
    console.log("click on successfully update");
    await page.waitForTimeout(2000);

    
    const netAmountValue = (await netAmount.inputValue()).trim();
    expect(netAmountValue).toBe('0.00');
    console.log("Net amount remains :", netAmountValue);


    await page.locator(locators.serviceticket.submitbutton).click();
    console.log("click on submit button ");

    await page.locator('text=Gross Amount Should be 0 in Free Service Type').isVisible();
    console.log("Error msg diplayed ");

    const submitbutton = page.locator(locators.serviceticket.submitbutton);
    await expect(submitbutton).toBeDisabled();
    console.log('submitbutton is Disabled ');


    await page.locator(locators.Inventory_detail.clickrate).dblclick();
    await page.fill(locators.Inventory_detail.enterrate, "0");
    console.log("set Gross Rate to 0");

    await page.locator(locators.Inventory_detail.update_button).click();
    console.log("click on update button");

    await page.locator(locators.Inventory_detail.updateok).click();
    console.log("click on successfully update");
    await page.waitForTimeout(2000);

    await page.locator(locators.serviceticket.submitbutton).click();
    console.log("click on submit button ");

    //Verify data in grid
    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0);
    await firstRow.locator(locators.serviceticket.customeringrid);
    await expect(firstRow).toContainText(customer);
    console.log("Verify data in grid ");

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
    console.log('Itemwise verification completed successfully.');
    await page.waitForTimeout(1000);
  
    //Outstanding Report verification is not required in free service ticket
    // await page.click(locators.ServiceReport.reportmenu);
    // await page.click(locators.ServiceReport.outstanding);
    // await page.click(locators.ServiceReport.outstanding_filter);
  
    // await page.locator(locators.customerdropdwon).click();
    // await page.fill(locators.entercustomername,customer );
    // await page.locator('li.e-list-item', { hasText: customer }).click();
  
    // await page.click(locators.ServiceReport.outstanding_search);
    // console.log('Outstanding Report verification completed successfully.');
    // await page.waitForTimeout(1000);

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
     
  }

module.exports = { addserviceticket , reports , SACcustomeraccledger };

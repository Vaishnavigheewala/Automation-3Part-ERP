const { test, expect } = require('@playwright/test');
const locators = require('./Verifysale.json');

async function verifysalepage(page, customer) {
  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.salespage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'sales' })).toBeVisible();

  //verify search section
  await expect(page.locator(locators.verifysale.datepicker)).toBeVisible();
  await expect(page.locator(locators.verifysale.customerdropdown)).toBeVisible();
  console.log('successfully verify search section');

  //verify sale page Grid
  let columns = [
    locators.Grid.BillNo,
    locators.Grid.bill_date,
    locators.Grid.Customer,
    locators.Grid.brokername,
    locators.Grid.paymentType,
    locators.Grid.InvoiceType,
    locators.Grid.TaxMethod,
    locators.Grid.State,
    locators.Grid.TotalQty,
    locators.Grid.AddLes,
    locators.Grid.RoundOff,
    locators.Grid.NetAmount,
    locators.Grid.Action,
    locators.Grid.viewlink,
    locators.Grid.invoicelink
  ];

  for (let column of columns) {
    let isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //verify buttons
  await expect(page.locator(locators.verifysale.pdfexportbutton)).toBeVisible();
  await expect(page.locator(locators.verifysale.addnewbutton)).toBeVisible();
  console.log('successfully verify Buttons');



  //select customer & click search
  await page.locator(locators.verifysale.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.locator(locators.verifysale.searchbutton).click();   //click on search
  console.log(' Records for the selected customer name was searched');

  //Reset Functionality
  await page.locator(locators.verifysale.resetbutton).click();

  //PDF Export functionality
  await page.click(locators.verifysale.pdfexportbutton);
  console.log('PDF downloaded successfully');

  //invoicedownload Functionality
  /*********Scroll Right******************/

  let divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  await page.evaluate((el) => {
    el.scrollLeft += 600; // Adjust this value to scroll further or slower
  }, divElement);

  let rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  let firstRow = await rows.nth(0); // Select the first row
  let invoicelink = await firstRow.locator('a#SalesInvoiceDownloadPopupOpenButton');

  // Check if the "Invoice" link is visible
  let isVisible = await invoicelink.isVisible();
  if (isVisible) {
    console.log('Invoice button is visible. Proceeding with click.');
    await invoicelink.click();
    console.log(' Clicked on "Invoice" button.');
  } else {
    console.log('Invoice button is not found or not visible.');
  }

  //click on No in invoice
  await page.click(locators.Grid.invoiceno);
  await invoicelink.click();
  await page.click(locators.Grid.invoiceyes);
  await page.waitForTimeout(2000);
  console.log(' Invoice Downloaded successfully.');

  // view link functionality
  let button = await page.$$('a#SalesViewButton');
  if (button.length > 1) {
    await button[0].click();
    console.log(' verify view link successfully.');
  }
  await page.click(locators.Grid.viewclosebutton);


}

async function addsale(page, customer, Qty, rate, company) {
  // Navigate to Sales Page
  await page.waitForSelector(locators.verifysale.sales);
  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.salespage).click();
  await expect(page.locator(locators.verifysale.searchsection)).toBeVisible();
  await expect(page.locator(locators.verifysale.gridsection)).toBeVisible();

  // Open Add New Sale
  await page.locator(locators.addsale.addnewbtn).click();
  await expect(page.locator(locators.addsale.salesection)).toBeVisible();
  await expect(page.locator(locators.addsale.saledetailsection)).toBeVisible();

  // Verify necessary elements exist
  const columns = [
    locators.addsale.blankgrid,
    locators.addsale.addless,
    locators.addsale.roundoff,
    locators.addsale.netAmount,
    locators.addsale.resetbtn,
    locators.addsale.closebtn,
    locators.addsale.submitbtn,
    locators.addsale.actionbtn,
    locators.addsale.billno,
    locators.verifysale.salesdate,
    locators.verifysale.customerdropdown,
    locators.addsale.paymenttype,
    locators.addsale.brokerdropdown,
    locators.addsale.mobileno,
    locators.addsale.taxmethod,
    locators.addsale.techniciandropdown,
    locators.addsale.statedropdown,
    locators.addsale.posno,
    locators.addsale.address,
    locators.addsale.deliveryaddress,
    locators.addsale.invoicetype,
    locators.addsale.remark,
  ];

  let disabledColumns = [];

  for (let column of columns) {
    let isVisible = await page.isVisible(column);
    let isDisabled = await page.isDisabled(column);

    if (isDisabled) {
      disabledColumns.push(column);
    }

    console.log(`${column} - visible: ${isVisible}, disabled: ${isDisabled}`);
  }

  console.log("Disabled columns: ", disabledColumns);

  // Verify Date Field
  let date = await page.inputValue(locators.verifysale.salesdate);
  let currentDate = new Date();
  let formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);

  console.log(`Defaulting to current date: ${formattedDate}`);

  // Prevent Future Date Selection
  await page.locator(locators.verifysale.salesdate).click();
  await page.fill('#CommonDatePicker', '');
  await page.fill('#CommonDatePicker', '17-02-2026');
  await page.locator(locators.addsale.brokerdropdown).click();

  let buttons = await page.$$('button#CommonModelDialogCloseButton');
  if (buttons.length > 1) await buttons[0].click();
  else await buttons[1].click();

  console.log('Verified: User cannot select future dates.');

  // Set Sales Date to Sunday
  await page.locator(locators.verifysale.salesdate).click();
  await page.waitForTimeout(1000);
  await page.fill('#CommonDatePicker', '');
  await page.fill('#CommonDatePicker', '16-02-2025');
  await page.locator(locators.addsale.submitbtn).click();
  await page.waitForSelector(locators.addsale.holidayalertokbtn);
  await page.waitForTimeout(3000);
  await page.locator(locators.addsale.holidayalertokbtn).click();
  await page.locator(locators.addsale.resetbtn).click();
  console.log('Verified: Holiday alert popup.');

  // Select Customer
  await page.waitForTimeout(1000);
  await page.locator(locators.verifysale.customerdropdown).click();
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Customer selected.');

  // Select Broker
  await page.waitForTimeout(1000);
  await page.locator(locators.addsale.brokerdropdown).click();
  await page.waitForSelector('li.e-list-item');
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item').nth(0).click();
  console.log('Broker selected.');

  // Add Finish Material
  await page.waitForTimeout(2000);
  await page.locator(locators.sale_detail.add_button).click();
  await page.locator(locators.sale_detail.inventorygroup).click();
  await page.locator(locators.sale_detail.selectFinishinventorygroup).click();

  console.log("Finish inventory group selected.");
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Item_Column).click();
  await page.locator(locators.sale_detail.item).click();
  await page.locator('li.e-list-item').nth(0).click();
  await page.locator(locators.sale_detail.Qty_Column).click();
  await page.fill(locators.sale_detail.enterquantity, Qty);
  await page.locator(locators.sale_detail.Gross_Rate_Column).click();
  await page.fill(locators.sale_detail.enterrate, rate);

  console.log("Quantity and Rate Filled.");

  await page.locator(locators.addsale.submitbtn).click();
  await page.locator(locators.sale_detail.savechangesok).click();

  console.log("Submitted without update.");
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.update_button).click();
  await page.locator(locators.sale_detail.updateok).click();

  console.log("Finish Material Inventory Added.");

  // Duplicate Inventory Prevention
  await page.locator(locators.sale_detail.add_button).click();
  await page.waitForTimeout(2000);
  await page.locator(locators.sale_detail.inventorygroup).click();
  await page.locator(locators.sale_detail.selectFinishinventorygroup).click();
  await page.waitForTimeout(3000);
  await page.locator(locators.sale_detail.Item_Column).click();
  await page.locator(locators.sale_detail.item).click();
  await page.locator('li.e-list-item').nth(0).click();
  await page.locator(locators.sale_detail.add_button).click();

  console.log("Verified: Duplicate inventory prevention.");
  await page.locator(locators.sale_detail.cancel_button).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.updateok).click();


  // Add Raw Material
  await page.waitForTimeout(5000);
  await page.locator(locators.sale_detail.add_button).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.inventorygroup).click();
  await page.locator(locators.sale_detail.selectRowinventorygroup).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Item_Column).click();
  await page.locator(locators.sale_detail.item).click();
  await page.waitForTimeout(600);
  await page.locator('li.e-list-item').nth(0).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Qty_Column).click();
  await page.fill(locators.sale_detail.enterquantity, Qty);
  await page.waitForTimeout(3000);
  await page.locator(locators.sale_detail.Gross_Rate_Column).dblclick();
  await page.waitForTimeout(1000);
  await page.fill(locators.sale_detail.enterrate, rate);
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.update_button).click();
  await page.locator(locators.sale_detail.updateok).click();

  console.log("Raw Material Inventory Added.");
  await page.waitForTimeout(2000);
  // Add Inhouse Product
  await page.locator(locators.sale_detail.add_button).click();
  // await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.inventorygroup).click();
  await page.locator(locators.sale_detail.selectInhouseinventorygroup).click();
  // await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Item_Column).click();
  await page.locator(locators.sale_detail.item).click();
  await page.locator('li.e-list-item').nth(0).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Qty_Column).click();
  await page.fill(locators.sale_detail.enterquantity, Qty);
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.Gross_Rate_Column).click();
  await page.fill(locators.sale_detail.enterrate, rate);
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.update_button).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.updateok).click();

  console.log("Inhouse Inventory Added.");

  // Submit Sale
  await page.locator(locators.addsale.submitbtn).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.sale_detail.ewaybillalertokbtn).click();
  await page.locator(locators.sale_detail.invoiceDownloadYesbtn).click();

  console.log("Sale submitted successfully.");

  // Generate Reports (Omitted for Brevity)

  await page.waitForTimeout(7000);
  console.log("========== iem wise Repots ========");
  //itemwise report
  await page.click(locators.reports);
  await page.click(locators.itemwise.sales);
  await page.click(locators.itemwise.itemwisepage);
  await page.click(locators.itemwise.filterbutton);
  await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  //await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  // await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.waitForTimeout(1000);
  await page.click(locators.itemwise.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Itemwise Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== sales sumary Repots ========");
  //salesummary report
  await page.click(locators.reports);
  await page.click(locators.salessummary.sales);
  await page.click(locators.salessummary.salessummarypage);
  await page.click(locators.salessummary.filterbutton);
  //await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  //await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  // await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  //await page.waitForTimeout(1000);
  await page.click(locators.salessummary.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Sales Summary Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== combin sales Repots ========");
  //combind sale report
  await page.click(locators.reports);
  await page.click(locators.salessummary.sales);
  await page.click(locators.combinedsale.combinedsalepage);
  await page.click(locators.combinedsale.filterbutton);
  //await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  //await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  // await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  // await page.waitForTimeout(1000);
  await page.click(locators.combinedsale.companydropdown);
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, company);
  // await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: company }).click();
  //await page.waitForTimeout(1000);
  await page.click(locators.combinedsale.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Combine sale Report verification completed successfully.');
  await page.waitForTimeout(2000);
  console.log("========== Outstanding Repots ========");
  //outstanding report
  await page.click(locators.reports);
  await page.click(locators.outstandingreport.outstanding);
  await page.click(locators.outstandingreport.filterbutton);
  await page.click(locators.verifysale.customerdropdown);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  //await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.companydropdown);
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, company);
  // await page.waitForTimeout(2000);
  await page.locator('li.e-list-item', { hasText: company }).click();
  // await page.waitForTimeout(1000);
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(1000);
  console.log('Outstanding Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== inventory stock Repots ========");
  //inventory stock report 
  await page.click(locators.reports);
  await page.click(locators.inventorystockreport.inventoryStock);
  await page.click(locators.inventorystockreport.inventoryfilter);

  await page.locator(locators.inventorystockreport.inventoryselect).click();
  await page.fill(locators.inventorystockreport.enterInventory, Finishmaterial);
  //await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: Finishmaterial }).click();
  await page.click(locators.inventorystockreport.inventorysearchbutton);
  //await page.click(locators.inventorystockreport.Inventory_view);
  console.log('Inventory Stock Report verification completed successfully.');
  //await page.waitForTimeout(1000);

}

async function editsale(page, Qty, rate, customer, company) {

  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.salespage).click();

  //Locate and click the "view" Button
  await page.locator('a#SalesViewButton').nth(0).click();

  //verify edit button and edit data
  await page.locator(locators.editsale.editbtn).click();

  //store inventory
  let Finishmaterial = await page.locator("//td[@id='SalesEntryItemNameColumn']").nth(0).textContent();
  console.log("Store Finish material:", Finishmaterial);


  await page.locator(locators.sale_detail.clickquantity).first().dblclick();
  //await page.locator(locators.sale_detail.enterquantity).first().dblclick();
  await page.fill(locators.sale_detail.enterquantity, Qty);
  console.log("Fill Qty");

  await page.locator(locators.sale_detail.clickrate).first().dblclick();
  // await page.locator(locators.sale_detail.enterrate).click();
  await page.fill(locators.sale_detail.enterrate, rate);
  console.log("Fill Rate");

  await page.locator(locators.sale_detail.update_button).click();
  console.log("click on update button");

  await page.locator(locators.sale_detail.updateok).click();
  console.log("click on successfully update");
  await page.locator(locators.addsale.submitbtn).click();
  console.log("Edit Sale successfully");

  await page.waitForTimeout(2000);
  console.log("========== item wise Repots ========");
  //itemwise report
  await page.click(locators.reports);
  await page.click(locators.itemwise.sales);
  await page.waitForTimeout(1000);
  await page.click(locators.itemwise.itemwisepage);
  await page.waitForTimeout(1000);
  await page.click(locators.itemwise.filterbutton);
  //await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.waitForTimeout(1000);
  await page.click(locators.itemwise.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Itemwise Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== sales summary Repots ========");
  //salesummary report
  await page.click(locators.reports);
  await page.click(locators.salessummary.sales);
  await page.click(locators.salessummary.salessummarypage);
  await page.click(locators.salessummary.filterbutton);
  //await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.waitForTimeout(1000);
  await page.click(locators.salessummary.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Sales Summary Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== combine sales Repots ========");
  //combind sale report
  await page.click(locators.reports);
  await page.click(locators.salessummary.sales);
  await page.click(locators.combinedsale.combinedsalepage);
  await page.click(locators.combinedsale.filterbutton);
  //await page.waitForTimeout(1000);
  await page.click(locators.verifysale.customerdropdown);
  await page.waitForTimeout(1000);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  // await page.waitForTimeout(1000);
  await page.click(locators.combinedsale.companydropdown);
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, company);
  // await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: company }).click();
  await page.waitForTimeout(1000);
  await page.click(locators.combinedsale.searchbutton);
  await page.waitForTimeout(1000);

  console.log('Combine sale Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== outstanding Repots ========");
  //outstanding report
  await page.click(locators.reports);
  await page.click(locators.outstandingreport.outstanding);
  await page.click(locators.outstandingreport.filterbutton);
  await page.click(locators.verifysale.customerdropdown);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  //await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.companydropdown);
  await page.waitForTimeout(2000);
  await page.fill(locators.verifysale.entercustomername, company);
  // await page.waitForTimeout(2000);
  await page.locator('li.e-list-item', { hasText: company }).click();
  await page.waitForTimeout(1000);
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(1000);
  console.log('Outstanding Report verification completed successfully.');

  await page.waitForTimeout(2000);
  console.log("========== inventory stock Repots ========");
  //inventory stock report 
  await page.click(locators.reports);
  await page.click(locators.inventorystockreport.inventoryStock);
  await page.click(locators.inventorystockreport.inventoryfilter);

  await page.locator(locators.inventorystockreport.inventoryselect).click();
  await page.fill(locators.inventorystockreport.enterInventory, Finishmaterial);
  //await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: Finishmaterial }).click();
  await page.click(locators.inventorystockreport.inventorysearchbutton);
  await page.waitForTimeout(1000);
  console.log('Inventory Stock Report verification completed successfully.');
  //await page.waitForTimeout(1000);


}

async function verifyeditsale_Ledger(page, customer, receive_amt, bill_type) {

  await page.locator(locators.transactionmenu).click();
  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.salespage).click();
  await page.waitForSelector("//td[@id='SalesRegularBillNumberColumn']");

  // Fetch the latest ticket number from the ticket no column
  let latestTicketNo = await page.locator("//td[@id='SalesRegularBillNumberColumn']").nth(0).textContent();

  if (!latestTicketNo || latestTicketNo.trim() === "") {
    console.log('No latest ticket number found. Exiting...');

    return;
  }

  console.log(`Latest Ticket No: ${latestTicketNo.trim()}`);

  await page.locator(locators.editsale.transcation_menu).click();
  await page.locator(locators.editsale.ledger_menu).click();
  await page.locator(locators.editsale.cash_ledger).click();
  console.log('Successfully Navigate Cash Ledger Page');

  await page.locator(locators.editsale.cash_add).click();

  //payment nature 
  await page.locator(locators.editsale.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");

  await page.click(locators.verifysale.customerdropdown);
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer')

  await page.locator(locators.editsale.receive_amt).click();
  await page.locator(locators.editsale.receive_amt).fill(receive_amt);
  console.log('Fill Receive Amount')

  await page.waitForTimeout(1000);
  await page.locator(locators.editsale.add_ledger).click();

  await page.locator(locators.editsale.bill_type).click();
  await page.locator('li.e-list-item', { hasText: bill_type }).click();
  console.log("Select bill type in Grid");

  await page.locator(locators.editsale.update_ledger).click();
  await page.locator(locators.editsale.bill_no, latestTicketNo).click();
  await page.locator('li.e-list-item', { hasText: latestTicketNo }).click();

  await page.locator(locators.editsale.close_ledger).click();
  console.log('Cash Ledger AMC Invoice Verify Successfully');

}

async function DeleteCashSale(page, Payment, customer, recieve_amt, bill_type, item) {
  await page.waitForTimeout(2000);
  console.log("========== Delete ========");
  await page.locator(locators.delete_sale.transcation_menu).click();

  await page.locator(locators.verifysale.sales).click();
  await page.locator(locators.verifysale.salespage).click();

  await page.waitForSelector("//td[@id='SalesRegularBillNumberColumn']");

  // Fetch the latest ticket number from the ticket no column
  let latestTicketNo = await page.locator("//td[@id='SalesRegularBillNumberColumn']").nth(0).textContent();

  if (!latestTicketNo || latestTicketNo.trim() === "") {
    console.log('No latest Sale Bill number found. Exiting...');

    return;
  }

  console.log(`Latest Sale Bill No: ${latestTicketNo.trim()}`);

  await page.locator(locators.delete_sale.delete_menu).click();

  await page.locator(locators.delete_sale.delete_sale).click();
  await page.locator(locators.delete_sale.delete_cashSale).click();

  await page.locator(locators.delete_sale.sale_no).click();
  await page.fill(locators.delete_sale.sale_no, latestTicketNo);

  await page.locator(locators.delete_sale.radio_delete).check({ force: true });

  await page.locator(locators.delete_sale.delete_btn).click();

  await page.locator(locators.delete_sale.transcation_menu).click();
  await page.locator(locators.delete_sale.ledger).click();
  await page.locator(locators.delete_sale.cashLedger).click();
  console.log('Successfully Navigate Cash Ledger Page');

  await page.locator(locators.delete_sale.AddCashLedger).click();

  await page.locator(locators.PaymentNatureDropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.enterPaymentNature, Payment);
  await page.locator('li.e-list-item', { hasText: Payment }).click();
  console.log('Select Payment Nature')

  await page.locator(locators.verifysale.customerdropdown).click();
  await page.fill(locators.verifysale.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select Vendor')

  await page.locator(locators.delete_sale.recieve_amt).click();
  await page.locator(locators.delete_sale.recieve_amt).fill(recieve_amt);
  console.log('Fill Receive Amount')

  await page.waitForTimeout(1000);
  await page.locator(locators.AddbuttonCash).click();

  await page.locator(locators.selectbilltype).click();
  await page.locator('li.e-list-item', { hasText: bill_type }).click();
  console.log("Select bill type in Grid");

  await page.locator(locators.delete_sale.update_ledger).click();
  await page.locator(locators.delete_sale.bill_no).click();
  let billNumbers = await page.locator('li.e-list-item').allTextContents();
  let validBill = billNumbers.find(bill => !latestTicketNo.includes(bill));

  if (validBill) {
    await page.locator(`li.e-list-item >> text=${validBill}`).click();
    console.log(`Selected bill number: ${validBill}`);
  } else {
    console.error("No valid bill number available!");
  }

  //Item wise report
  await page.locator(locators.reports_menu.reports).click();
  await page.locator(locators.reports_menu.sales_menu).click();
  await page.locator(locators.reports_menu.reportitemwise).click();

  await page.locator(locators.Itemwise_report.Itemwise_Filter).click();

  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer for Itemwise Report')

  await page.locator(locators.Itemwise_report.searchbutton_Itemwise).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFounditem = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  let rowitem = await page.locator('tr[aria-rowindex]');
  let rowCountitem = await rowitem.count();
  console.log(` Total rows in grid: ${rowCountitem}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountitem; i++) {  // Loop through all available rows
    let currentRow = await rowitem.nth(i);
    let billNumberCell = await currentRow.locator("td#ItemWiseSalesReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestTicketNo) {
      billFounditem = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFounditem).toBe(false);
  if (!billFounditem) {
    console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the sales grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestTicketNo} was found in the sales grid.`);
  }

  //Sale Summary Report
  await page.locator(locators.reports_menu.reports).click();
  await page.locator(locators.reports_menu.sales_menu).click();
  await page.locator(locators.reports_menu.summaryvise).click();

  await page.locator(locators.sale_summary.fillterbuttonsummary).click();

  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer for Sale Summary Report')

  await page.locator(locators.sale_summary.searchbuttonsummary).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundsummary = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  let rowsummry = await page.locator('tr[aria-rowindex]');
  let rowCountsummry = await rowsummry.count();
  console.log(` Total rows in grid: ${rowCountsummry}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountsummry; i++) {  // Loop through all available rows
    let currentRow = await rowsummry.nth(i);
    let billNumberCell = await currentRow.locator("td#SalesSummaryReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestTicketNo) {
      billFoundsummary = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundsummary).toBe(false);
  if (!billFoundsummary) {
    console.log(`Successfully verified that deleted bill number ${latestTicketNo} is not present in the sales grid.`);
  } else {
    console.error(`  Error - Deleted bill number ${latestTicketNo} was found in the sales grid.`);
  }


  //Combine Sale Report
  await page.locator(locators.reports_menu.reports).click();
  await page.locator(locators.reports_menu.sales_menu).click();
  await page.locator(locators.reports_menu.Combinesales).click();

  await page.locator(locators.combine_summary.fillterbuttoncombine).click();

  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer for Combine Sale Report')

  await page.locator(locators.combine_summary.searchbuttoncombine).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundcombine = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  let rowscombine = await page.locator('tr[aria-rowindex]');
  let rowCountcombine = await rowscombine.count();
  console.log(` Total rows in grid: ${rowCountcombine}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountcombine; i++) {  // Loop through all available rows
    let currentRow = await rowsummry.nth(i);
    let billNumberCell = await currentRow.locator("td#CombinedSalesReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestTicketNo) {
      billFoundcombine = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundcombine).toBe(false);
  if (!billFoundcombine) {
    console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the sales grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestTicketNo} was found in the sales grid.`);
  }

  //Outstanding Report
  await page.locator(locators.reports_menu.reports).click();
  await page.locator(locators.reports_menu.sales_menu).click();
  await page.locator(locators.reports_menu.outstanding_menu).click();

  await page.locator(locators.outstanding.outstanding_filter).click();

  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer for Outstanding Report')

  await page.locator(locators.outstanding.outstanding_search).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  let billFoundout = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  let rowsout = await page.locator('tr[aria-rowindex]');
  let rowCountout = await rowsout.count();
  console.log(` Total rows in grid: ${rowCountout}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountout; i++) {  // Loop through all available rows
    let currentRow = await rowsout.nth(i);
    let billNumberCell = await currentRow.locator("td#OutstandingReportBillNumberColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestTicketNo) {
      billFoundout = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundout).toBe(false);
  if (!billFoundout) {
    console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in  grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestTicketNo} was found in  grid.`);
  }

  //Inventory Stock Report
  await page.locator(locators.reports_menu.reports).click();
  await page.locator(locators.reports_menu.Inventory_menu).click();

  await page.locator(locators.reports_menu.Inventory_filter).click();

  await page.locator(locators.reports_menu.Inventory_item).click();
  await page.fill(locators.reports_menu.enteritemname, item);
  await page.locator('li.e-list-item', { hasText: item }).click();
  console.log('Select Item for Inventory Stock Report')

  await page.locator(locators.reports_menu.Inventory_search).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.click('a#InventoryReportViewDetailedinventoryReportButton');

  let billFoundINV = false;

  // Get all rows in the grid
  await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
  let rowsINV = await page.locator('tr[aria-rowindex]');
  let rowCountINV = await rowsINV.count();
  console.log(` Total rows in grid: ${rowsINV}`);

  // Iterate through each row to check if the deleted bill number exists
  for (let i = 0; i < rowCountINV; i++) {  // Loop through all available rows
    let currentRow = await rowsINV.nth(i);
    let billNumberCell = await currentRow.locator("td#DetailedInventoryReportGridBillNoColumn").innerText();

    // Debug log for current amc number in grid
    console.log(`Row ${i + 1} Bill Number:`, billNumberCell);


    if (billNumberCell === latestTicketNo) {
      billFoundINV = true;
      break;
    }
  }

  // Assert that the deleted amc number is not found in the grid
  expect(billFoundINV).toBe(false);
  if (!billFoundINV) {
    console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in grid.`);
  } else {
    console.error(` Error - Deleted bill number ${latestTicketNo} was found in  grid.`);
  }




}



module.exports = {
  verifysalepage, addsale, editsale, verifyeditsale_Ledger, DeleteCashSale
};

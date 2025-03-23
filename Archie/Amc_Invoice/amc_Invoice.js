const { test, expect } = require('@playwright/test');
const locators = require('./amc_Invoice.json');


async function navigate_amc(page) {
    await page.locator(locators.navigate_amc.amc_invoice).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'AMC Invoice' })).toBeVisible();
}

async function verify_amc(page) {
    
    //verify search section
    await expect(page.locator(locators.verify_page.date)).toBeVisible();
    await expect(page.locator(locators.verify_page.customerdropdwon)).toBeVisible();
    console.log('successfully verify search section');

    //verify search section button
    await expect(page.locator(locators.verify_page.search)).toBeVisible();
    await expect(page.locator(locators.verify_page.reset)).toBeVisible();
    console.log('successfully verify search section Buttons');

    //verify buttons
    await expect(page.locator(locators.verify_page.pdf_export)).toBeVisible();
    await expect(page.locator(locators.verify_page.add_btn)).toBeVisible();
    console.log('successfully verify Buttons');

    //verify AMC Invoice Grid
  const columns = [
    locators.verify_page.regular_bill,
    locators.verify_page.Invoice_date,
    locators.verify_page.customer,
    locators.verify_page.contract,
    locators.verify_page.technician,
    locators.verify_page.contract_period,
    locators.verify_page.No_service,
    locators.verify_page.paymenttype,
    locators.verify_page.netAmount,
    locators.verify_page.outsideproduct,
    locators.verify_page.status,
    locators.verify_page.created_on,
    locators.verify_page.expire_amc,
    locators.verify_page.created_on,
    // locators.verify_page.viewlink,
    // locators.verify_page.Invoicelink

  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
    console.log('successfully verify AMC Invoice Grid');
  }
}

async function search_amc(page,customer) {
  //search functionality
  await page.locator(locators.verify_page.date).click();   //select date range
  console.log(' Records for the selected date range was searched');

  // //select customer & click search
  await page.locator(locators.verify_page.customerdropdwon).click();
  //await page.waitForTimeout(1000);
  await page.fill(locators.verify_page.entercustomername, customer);
  //await page.waitForTimeout(1000);
  //await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.locator(locators.verify_page.search).click();   //click on search
  console.log(' Records for the selected customer name was searched');

  await page.locator(locators.verify_page.pdf_export).click();
  console.log("Validate PDF Export button")

  await page.locator(locators.verify_page.add_btn).click();
  console.log("Validate Add New button");
  await page.locator(locators.verify_page.close_btn).click();
  console.log("Validate Close button");

}

async function reset_amc(page,customer) {
  //search functionality
  await page.locator(locators.verify_page.date).click();   //select date range
  console.log(' Records for the selected date range was searched');

  // //select customer & click search
  await page.locator(locators.verify_page.customerdropdwon).click();
  //await page.waitForTimeout(1000);
  await page.fill(locators.verify_page.entercustomername, customer);
 // await page.waitForTimeout(1000);
  //await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.locator(locators.verify_page.reset).click();   //click on search
  console.log(' Records for the selected customer name was searched');

}

async function Invoicelink_amc(page) {
  //Invoice Download Functionality
  /*********Scroll Right******************/
  const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  await page.evaluate((el) => {
    el.scrollLeft += 600; // Adjust this value to scroll further or slower
  }, divElement);

  //Locate and click the "Invoice" link
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  const invoicelink = await firstRow.locator('a#AmcInvoiceButton'); //Adjust this with the actual selector for the "Invoice"

  // Check if the "Invoice" link is visible
  const isVisible = await invoicelink.isVisible();
  if (isVisible) {
    console.log('Invoice button is visible. Proceeding with click.');
    await invoicelink.click();
    console.log(' Clicked on "Invoice" button.');
  } else {
    console.log('Invoice button is not found or not visible.');
  }


  await page.waitForTimeout(1000);
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight, { timeout: 30000 }); });
        //await page.waitForTimeout(3000);
        await page.locator(locators.verify_page.invoice_yes).click();


}

async function viewlink_amc(page) {
  //Invoice Download Functionality
  /*********Scroll Right******************/
  const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  await page.evaluate((el) => {
    el.scrollLeft += 600; // Adjust this value to scroll further or slower
  }, divElement);

  //Locate and click the "View" link
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  const viewlink = await firstRow.locator('a#AmcInvoiceViewButton'); //Adjust this with the actual selector for the "Invoice"

  // Check if the "View" link is visible
  const isVisible = await viewlink.isVisible();
  if (isVisible) {
    console.log('View button is visible. Proceeding with click.');
    await viewlink.click();
    console.log(' Clicked on "View" button.');
  } else {
    console.log('View button is not found or not visible.');
  }
        await page.waitForTimeout(1000);
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight, { timeout: 30000 }); });
        //await page.waitForTimeout(3000);
        await page.locator(locators.edit_amc.pdf_export).click();
        await page.locator(locators.verify_page.close_view).click();

}

async function verify_addAMC(page) {
  await page.locator(locators.verify_page.add_btn).click();

  //Verify AMC Entry
  const columns = [
    locators.add_amc.Invoice_no,
    locators.add_amc.Invoice_date,
    locators.add_amc.outside_product,
    locators.add_amc.remark,
    locators.add_amc.contract,
    locators.add_amc.technician,
    locators.add_amc.payment_type,
    locators.add_amc.billing_address,
    locators.add_amc.contract_period,
    locators.add_amc.service,
    locators.add_amc.product,
    locators.add_amc.mobile,
    locators.add_amc.address,
    locators.add_amc.addless,
    locators.add_amc.net_amount


  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
    console.log('successfully verify AMC Invoice Grid');
  }

   await expect(page.locator(locators.add_amc.submit_btn)).toBeVisible();
   await expect(page.locator(locators.add_amc.close_btn)).toBeVisible();

   await expect(page.locator(locators.add_amc.Reset_btn)).toBeVisible();
   await expect(page.locator(locators.add_amc.add_account)).toBeVisible();
   console.log('successfully verify Buttons');
    //add account functionality
    await page.click(locators.add_amc.add_account);
    await page.waitForTimeout(1000);
    const buttons = await page.$$('button#CommonModelDialogCloseButton');
    if (buttons.length > 1) {
        await buttons[1].click(); // Click the second button
    } else {
        await buttons[0].click(); // Click the first button if only one exists
    }
    console.log('verify add account functionality');


}

async function addamc(page,customer,contract,technician,paymenttype,no_service,product,item,qty,rate) {
  
  await page.locator(locators.add_amc.close_btn).click();
  console.log('Verify Close button')
  await page.locator(locators.verify_page.add_btn).click();
  console.log('verify add button')
  await page.locator(locators.customerdropdwon).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  //await page.keyboard.press('Enter');    
  console.log('Select customer')

  await page.locator(locators.add_amc.contract).click();
  await page.fill(locators.entercustomername, contract);
  await page.locator('li.e-list-item', { hasText: contract }).click();
  await page.keyboard.press('Enter');    
  console.log('Select contract')

  await page.locator(locators.add_amc.technician).click();
  await page.fill(locators.entercustomername, technician);
  await page.locator('li.e-list-item', { hasText: technician }).click();
  //await page.keyboard.press('Enter');    
  console.log('Select technician')

  await page.locator(locators.add_amc.payment_type).click();
  await page.fill(locators.entercustomername, paymenttype);
  await page.locator('li.e-list-item', { hasText: paymenttype }).click();
  //await page.keyboard.press('Enter');    
  console.log('Select Payment Type')

  await page.locator(locators.add_amc.service).click();
  await page.fill(locators.add_amc.service,no_service);
  console.log('Fill No of Services')

  await page.locator(locators.add_amc.product).click();
  await page.fill(locators.entercustomername, product);
  await page.locator('li.e-list-item', { hasText: product }).click();
  console.log('Select Product')

  await page.locator(locators.add_amc.add_btn).click();
  console.log('Verify Add button')

  await page.locator(locators.add_amc.item).click();
  await page.fill(locators.entercustomername, item);
  await page.locator('li.e-list-item', { hasText: item }).click();
  console.log("Select Inventory Items in Grid");
  console.log('Select Inventory Items')

  await page.waitForTimeout(1000);
  await page.locator(locators.add_amc.update_btn).click();
  console.log('Click on update button')
  await page.locator(locators.add_amc.qty).click();
  await page.locator(locators.add_amc.qty).fill(qty);
  console.log("Fill Qty")
  await page.locator(locators.add_amc.clickrate).click();
  await page.locator(locators.add_amc.rate).fill(rate);
  console.log("Fill Rate")
  await page.locator(locators.add_amc.update_btn).click();
  console.log("Click on update button")

}

async function resetamc(page) {

  await page.locator(locators.add_amc.Reset_btn).click();
  console.log("Reset Functionallity verify")
  
}

async function submitamc(page,amc_name) {
  await page.locator(locators.add_amc.updateok).click();
  await page.locator(locators.add_amc.submit_btn).click();
  console.log('Submit Functioannallity ... AMC Added Successfully')
  await page.locator(locators.add_amc.amc_name).click();
  await page.locator(locators.add_amc.amc_name).fill(amc_name);
  await page.locator(locators.add_amc.amc_yes).click();
  console.log('Fill AMC Name')

}

async function service_ticket(page) {
  await page.locator(locators.add_amc.open_service).click();
  await page.locator(locators.add_amc.close_service).click();
}

async function reports_amc(page,customer,company,Inventory) {
  await page.locator(locators.reports.reports).click();

  //AMC Report
  await page.locator(locators.reports.Amcpage).click();
  console.log('Successfully click on AMC Reports');

  await page.locator(locators.reports.filterbutton).click();
  await page.locator(locators.customerdropdwon).click();
  await page.fill(locators.entercustomername, customer);
  await page.waitForTimeout(3000);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer')

  await page.locator(locators.reports.searchbutton).click();
  console.log('Successfully working Search Functionallity')
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
  await button.click();
  console.log('Successfully working Ungrouping Functionallity')

  //Outstanding Report
  await page.locator(locators.reports.reports).click();
  await page.locator(locators.reports.outstanding).click();
  console.log('Successfully click on outstanding Reports');

  await page.locator(locators.reports.out_filter).click();
  await page.locator(locators.customerdropdwon).click();
  await page.fill(locators.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer')
  await page.locator(locators.company_name).click();
  await page.fill(locators.entercustomername, company);
  await page.locator('li.e-list-item', { hasText: company }).click();
  console.log('Select company')

  await page.locator(locators.reports.out_search).click();
  console.log('Successfully working Search Functionallity')
  const button2 = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
  await button2.click();
  console.log('Successfully working Ungrouping Functionallity')

  await page.locator(locators.reports.out_bill).dblclick();
  await page.locator(locators.reports.out_bill).click();

  //Inventory Stock Report
  await page.locator(locators.reports.reports).click();
  await page.locator(locators.reports.Inventory_Stock).click();
  console.log('Successfully click on Inventory Stock Reports');

  await page.locator(locators.reports.filter_inventory).click();
  await page.locator(locators.reports.Inventory).click();
  await page.fill(locators.entercustomername, Inventory);
  await page.locator('li.e-list-item', { hasText: Inventory }).click();
  console.log('Select Inventory')

  await page.locator(locators.reports.inventory_search).click();
  await page.waitForTimeout(2000);
  await page.locator(locators.reports.view_inventory).click();
  await page.waitForTimeout(2000);

}

async function SACcustomeraccledger(page,customer){
  await page.click(locators.SACcustomeraccLedger.accountLedger);
  await page.click(locators.SACcustomeraccLedger.customeraccount);
  await page.click(locators.SACcustomeraccLedger.filterbutton);

  await page.locator(locators.customerdropdwon).click();
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.click(locators.SACcustomeraccLedger.Searchbutton);
  await page.dblclick(locators.SACcustomeraccLedger.BillNo);
   
}

async function verify_edit(page,qty,rate) {

  const view_link = await page.locator(locators.edit_amc.viewlink).nth(0);
  await view_link.click();

  await page.locator(locators.edit_amc.edit_btn).click();

  await page.locator(locators.add_amc.clickqty).dblclick();
  await page.locator(locators.add_amc.qty).fill(qty);
  console.log("Fill Qty")
  await page.locator(locators.add_amc.clickrate).dblclick();
  await page.locator(locators.add_amc.rate).fill(rate);
  console.log("Fill Rate")
  await page.locator(locators.add_amc.update_btn).click();
  console.log("Click on update button")

}


async function verify_editAMC_Ledger(page,customer,receive_amt,bill_type) {
  await page.waitForSelector("//td[@id='AmcInvoiceRegularInvoiceNumberColumn']");

  // Fetch the latest ticket number from the ticket no column
  const latestTicketNo = await page.locator("//td[@id='AmcInvoiceRegularInvoiceNumberColumn']").nth(0).textContent();

  if (!latestTicketNo || latestTicketNo.trim() === "") {
      console.log('No latest ticket number found. Exiting...');
     
      return;
  }

  console.log(`Latest Ticket No: ${latestTicketNo.trim()}`);

  await page.locator(locators.edit_amc.transcation_menu).click();
  await page.locator(locators.edit_amc.ledger_menu).click();
  await page.locator(locators.edit_amc.cash_ledger).click();
  console.log('Successfully Navigate Cash Ledger Page');

  await page.locator(locators.edit_amc.cash_add).click();
  await page.waitForTimeout(1000);

  await page.locator(locators.customerdropdwon).click();
  await page.keyboard.press('Enter');    
  await page.fill(locators.entercustomername, customer);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  console.log('Select customer')

  await page.locator(locators.edit_amc.receive_amt).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.edit_amc.receive_amt).fill(receive_amt);
  console.log('Fill Receive Amount')

  await page.locator(locators.edit_amc.add_ledger).click();

  await page.locator(locators.edit_amc.bill_type).click();
  await page.locator('li.e-list-item', { hasText: bill_type }).click();
  console.log("Select bill type in Grid");

  await page.locator(locators.edit_amc.update_ledger).click();
  await page.locator(locators.edit_amc.bill_no , latestTicketNo).click();
  await page.locator('li.e-list-item', { hasText: latestTicketNo }).click();

  await page.locator(locators.edit_amc.close_ledger).click();
  console.log('Cash Ledger AMC Invoice Verify Successfully');


}

module.exports = { navigate_amc,verify_amc,search_amc,reset_amc,Invoicelink_amc,viewlink_amc,service_ticket,verify_addAMC,addamc,resetamc,submitamc,reports_amc,SACcustomeraccledger,verify_edit,verify_editAMC_Ledger };
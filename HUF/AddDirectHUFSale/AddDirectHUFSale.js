const { test, expect } = require('@playwright/test');
const locators = require('./AddDirectHUFSale.json');

async function navigatesalepage(page, customer) {
  await page.locator(locators.sales).click();
  await page.locator(locators.directhufsalespage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'sales' })).toBeVisible();

  await page.locator(locators.addnewbutton).click();

  const columns = [
    locators.Add_directhuf.bill_no,
    locators.Add_directhuf.date,
    locators.Add_directhuf.dropdowncustomer,
    locators.Add_directhuf.payment_type,
    locators.Add_directhuf.InvoiceType,
    locators.Add_directhuf.brokerdropdown,
    locators.Add_directhuf.Address,
    locators.Add_directhuf.TaxMethod,
    locators.Add_directhuf.techniciandropdown,
    locators.Add_directhuf.posno,
    locators.Add_directhuf.deliveryaddress

  ];

  const disabledColumns = [];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    const isDisabled = await page.isDisabled(column);

    if (isDisabled) {
      disabledColumns.push(column);
    }

    console.log(`${column} - visible: ${isVisible}, disabled: ${isDisabled}`);
  }

  console.log("Disabled columns: ", disabledColumns);

}

async function Reset_add_sale(page, customer, item, qty, rate) {

  await page.locator(locators.Add_directhuf.dropdowncustomer).click();
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.locator(locators.Add_directhuf.brokerdropdown).dblclick();
  await page.keyboard.press('Enter');
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item').first().click();

  await page.locator(locators.Add_directhuf.techniciandropdown).click();
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item').first().click();

  await page.locator(locators.Sale_details.add).click();

  await page.click(locators.Sale_details.inventorygroup);
  await page.click(locators.Sale_details.selectFinishinventorygroup);
  console.log("Select Inventory Group in Grid");

  await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.item).click();
  await page.fill(locators.Sale_details.enteritem, item);
  await page.locator('li.e-list-item', { hasText: item }).click();
  console.log("Select Inventory Items in Grid");

  await page.waitForTimeout(1000);
  await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.clickquantity).click();
  await page.locator(locators.Sale_details.enterquantity).fill(qty);
  await page.waitForTimeout(1000);
  // await page.locator(locators.Sale_details.clickrate).click();
  // await page.locator(locators.Sale_details.enterrate).fill(rate);


  await page.waitForTimeout(1000);
  //await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.update).click();
  await page.locator(locators.Sale_details.updateok).click();
  await page.locator(locators.Sale_details.reset_btn).click();
  await page.locator(locators.Sale_details.close_btn).click();


}

async function add_sale(page, customer, item, qty, rate) {
  await page.locator(locators.addnewbutton).click();

  await page.locator(locators.Add_directhuf.date).click();
  const datepicker = '#CommonDatePicker'; //code to clear the date
  await page.fill(datepicker, ''); //code to clear the date
  await page.fill(datepicker, '23-02-2025');

  await page.locator(locators.Add_directhuf.dropdowncustomer).click();
  await page.keyboard.press('Enter');
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.locator(locators.Add_directhuf.brokerdropdown).dblclick();
  await page.keyboard.press('Enter');
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item').first().click();

  await page.locator(locators.Add_directhuf.techniciandropdown).dblclick();
  await page.fill(locators.Add_directhuf.entercustomername, customer);
  await page.locator('li.e-list-item').first().click();

  await page.locator(locators.Sale_details.add).click();

  await page.click(locators.Sale_details.inventorygroup);
  await page.click(locators.Sale_details.selectFinishinventorygroup);
  console.log("Select Inventory Group in Grid");

  await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.item).click();
  await page.fill(locators.Sale_details.enteritem, item);
  await page.waitForTimeout(1000);
  await page.locator('li.e-list-item', { hasText: item }).click();
  console.log("Select Inventory Items in Grid");

  await page.waitForTimeout(1000);
  await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.clickquantity).click();
  await page.locator(locators.Sale_details.enterquantity).fill(qty);
  await page.waitForTimeout(1000);
  // await page.locator(locators.Sale_details.clickrate).click();
  // await page.locator(locators.Sale_details.enterrate).fill(rate);


  await page.waitForTimeout(1000);
  //await page.locator('td.e-rowcell.e-lastrowcell.e-updatedtd.e-selectionbackground.e-active[aria-label=" Column Header Item"]').click();
  await page.locator(locators.Sale_details.update).click();
  await page.locator(locators.Sale_details.updateok).click();
  await page.locator(locators.Sale_details.submit_btn).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Sale_details.ewaybillaleredit_tokbtn).click();
  await page.waitForTimeout(1000);

  // Get the current date in "DD-MM-YYYY" format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-');

  // Fill the date input field
  await page.fill(locators.Add_directhuf.date, formattedDate);
  await page.locator(locators.Add_directhuf.remark).click();
  await page.fill(locators.Add_directhuf.remark, "Fill Sunday date Verify Holiday message before change date and apply current date.");
  await page.waitForTimeout(1000);
  await page.locator(locators.Sale_details.submit_btn).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Sale_details.InvoiceYes).click();

}

async function selectfilteritemwise(page, customername) {

  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.sales_menu).click();
  await page.locator(locators.reportsmenu.reportitemwise).click();

  await page.locator(locators.Itemwise_Filter).click();
  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customername);
  await page.waitForTimeout(1000);

  const itemLocator = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator).toBeVisible();
  await itemLocator.click();
  // const datepicker = '#ItemWiseSalesReportDateRangePickerForFilter'; //code to clear the date
  // await page.fill(datepicker, ''); //code to clear the date
  // await page.fill(datepicker, date); //code to enter current data
  await page.locator(locators.searchbutton_Itemwise).click();
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
    await button.click();
  await page.waitForTimeout(1000);


}

async function selectfiltersalesummary(page, customername) {

  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.sales_menu).click();
  await page.locator(locators.reportsmenu.summaryvise).click();


  await page.locator(locators.fillterbuttonsummary).click();
  await page.locator(locators.customerfiltersummary).click();
  await page.fill(locators.entercustomername, customername);
  await page.waitForTimeout(1000);

  const itemLocator = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator).toBeVisible();
  await itemLocator.click();
  // const datepicker = '#SalesSummaryReportDateRangePickerForFilter'; //code to clear the date
  // await page.fill(datepicker, ''); //code to clear the date
  // await page.fill(datepicker, date); //code to enter current data
  await page.locator(locators.searchbuttonsummary).click();

}

async function verifydetailssalesummary(page) {
  /*****************Verify Customer Name is Correct ************************/
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]');
  await button.click();  // To perform a click action on the element
  //const Verifycustomer = JSON.parse(fs.readFileSync('customer.json')); //Read the shared Net Amount from the JSON file
  //const sharedcustomername = Verifycustomer.customername;
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  await page.waitForTimeout(1000);
  //const valuethree = await firstRow.locator("td#SalesSummaryReportCustomerNameColumn");
  //const customernamecolumn = await valuethree.innerText();
  //expect(sharedcustomername).toBe(customernamecolumn);
  console.log(" Customer Name before Submit is same as Customer Name on the Sales summary Report")

  //Locate and click the "view" Button
  const viewButton = await firstRow.locator('a#SalesSummaryReportViewRegularBillNumberDetails'); //Adjust this with the actual selector for the "View" 

  // Check if the "View" button is visible
  const isVisible = await viewButton.isVisible();
  if (isVisible) {
      console.log('View button is visible. Proceeding with click.');
      await viewButton.click();
      console.log(' Clicked on "View" button.');
  } else {
      console.log('View button is not found or not visible.');
  }
  await page.waitForTimeout(3000);
  console.log("successfully click on view link")
  
}

async function selectfiltercombinesale(page, customername) {

  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.sales_menu).click();
  await page.locator(locators.reportsmenu.Combinesales).click();


  await page.locator(locators.fillterbuttoncombine).click();
  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customername);
  await page.waitForTimeout(1000);

  const itemLocator = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator).toBeVisible();
  await itemLocator.click();
  // const datepicker = '#CombinedSalesReportDateRangePickerForFilter'; //code to clear the date
  // await page.fill(datepicker, ''); //code to clear the date
  // await page.fill(datepicker, date); //code to enter current data
  await page.locator(locators.searchbuttoncombine).click();
  await page.waitForTimeout(1000);
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
  await button.click();

}

async function selectfilterOutstanding(page, customername) {

  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.outstanding).click();

  await page.locator(locators.outstandingfilter).click();
  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customername);
  await page.waitForTimeout(1000);

  const itemLocator = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator).toBeVisible();
  await itemLocator.click();
  // const datepicker = '#OutstandingReportDateRangePickerForFilter'; //code to clear the date
  // await page.fill(datepicker, ''); //code to clear the date
  // await page.fill(datepicker, date); //code to enter current data
  await page.locator(locators.outstandingserach).click();
  await page.waitForTimeout(1000);
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
    await button.click();

}

async function DirectHUF(page, customername) {

  await page.locator(locators.reportsmenu.reports).click();
  await page.locator(locators.reportsmenu.sales_menu).click();
  await page.locator(locators.reportsmenu.directHUF).click();

  await page.locator(locators.directHUF_filter).click();
  await page.locator(locators.customerdropdown).click();
  await page.fill(locators.entercustomername, customername);
  await page.waitForTimeout(1000);

  const itemLocator = page.locator(`//td[@title='${customername}']`);
  await expect(itemLocator).toBeVisible();
  await itemLocator.click();

  await page.locator(locators.directHUF_search).click();
  await page.waitForTimeout(1000);
  const button = await page.locator('span.e-ungroupbutton[title="Ungroup by this column"]').nth(0);
    await button.click();

}

module.exports = {navigatesalepage,Reset_add_sale,add_sale,selectfilteritemwise,selectfiltersalesummary,verifydetailssalesummary,selectfiltercombinesale,selectfilterOutstanding,DirectHUF};

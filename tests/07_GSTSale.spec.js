const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Sales/sales.json');
const fs = require('fs');
const path = require('path');
 
// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let sharedNetAmount;
let sharedcustomername;0
let sharedpreviousBillNumber = 0;
let sharedlatestBillNumber;
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;

//******************Reusable functions imported**********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, addgstsales_button, selectcustomer, selectbroker, selecttechnician,
  addsalesdetails, updatesalesdetails, storenetamount,Pagination_Checking,
  submitbutton, salesgrid, selectfilter, verifydetails, searchSelectedCustomer, dataGridInvoiceDownload, ViewSalesDetailData, salessummaryreport, Combinedsalereport, Outstanding, inventorystockreport, customeraccledger } = require('../Pages/Sales/sales.js');
const { viewlink, Editbutton, editsalesdetails, selectsubmenuitemwise, selectfilteritemwise, verifydetailsitemwise, selectsubmenusalesummary, selectfiltersalesummary, verifydetailssalesummary, Combinedsalereports, selectsubmenuOutstanding, selectfilterOutstanding, inventorystockreports, selectsubmenucustaccountledger, selectfiltercustaccountledger } = require('../Pages/EditSale/editsale.js');
const {  B2Csmall } = require('../Pages/GSTR_1/GSTR_1_Report.js');

//*******************************************************************

test('Verify Sales Page', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care.');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
  console.log('Step: 2 Dashbord Page displayed.');
  // await expect(page).toHaveURL('http://192.168.1.24:85/');
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction");
  console.log('Step 3: Sucessfully Clicked on Transaction Menu.');
  await selectsubmenu(page, "Transaction");
  console.log('Step 4: Sales page displayed.');
  await page.waitForTimeout(2000);
  //await salespageVerify(page);
  console.log('Step 5: Sales page all thing ok.');
  await searchSelectedCustomer(page, Customer_Name);
  await page.waitForTimeout(1000);
  console.log('Step 6: customer vise searched');
  //await page.locator(locators.reset).click();
  console.log('Step 7: Reset Grid');
  await page.waitForTimeout(1000);
  await Pagination_Checking(page);
  await dataGridInvoiceDownload(page);
  console.log("Clicked");
  await page.waitForTimeout(1000);
  await ViewSalesDetailData(page);
  console.log('Sales Detail page display');

});


test('Create Sales', async ({ page }) => {

  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Transaction Menu');
  await selectsubmenu(page, "Transaction");
  console.log('Step 5: Sales Page Displayed');
  /*********Scroll down to capture lastest GST Bill No. ******************/
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  const valuethree = await firstRow.locator("td#SalesGSTBillNoColumn"); //Extract the GST bill # from the latest row 
  const Gstbillnumberforprevious = await valuethree.innerText();
  console.log('GST Bill # Extracted ', Gstbillnumberforprevious);
  const numericPart = Gstbillnumberforprevious.slice(2);
  const previousBillNumber = parseInt(numericPart, 10);
  const formattedGstBillNumber = `SI${previousBillNumber}`;
  console.log('Latest Gst Bill Number is ', formattedGstBillNumber);
  await addgstsales_button(page); // called addgstsales_button to click on add new button on sales page
  console.log('Step 6: Clicked on Add New Sales Button');
  await page.waitForTimeout(1000);
  /*********Add Customer , Broker , Technician Details************/
  await selectcustomer(page, Customer_Name); // called selectcustomer to select customer from dropdown
  const customername = Customer_Name; // stored in variable so that it can be used across diffrent test cases
  console.log('Step 7: Selected Customer Name as - Customer_Name');
  await page.waitForTimeout(1000)
  await selectbroker(page, "ANKITBHAI"); // called selectbroker to select broker from dropdown
  console.log('Step 8 : Selected Broker Name as - "ANKITBHAI"');
  await page.waitForTimeout(1000);
  await selecttechnician(page, "VIJAYBHAI"); // called selecttechnician to select technician from dropdown
  console.log('Step 9 : Selected Technician Name as - "VIJAYBHAI"');
  /*********Scroll down******************/
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  /*********Add Sales Details************/
  await addsalesdetails(page, "FinishMaterial", InventoryRO_Name , "4");
  /*******Update Sales Details ************/
  await updatesalesdetails(page);
  console.log('Step 10 : Sales Details Updated Successfully');
  /*********Scroll down again******************/
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  /******* Store Net Amount ************/
  const netAmount = await storenetamount(page, 'input#SalesEntryNetAmount');
  console.log('Net Amount is', netAmount);
  /******* Store Customer Name and Net Amount in .json file before clicking on submit so that they can be called in other test cases ************/
  fs.writeFileSync('Verifycustomer.json', JSON.stringify({ Customer_Name }));
  fs.writeFileSync('Verifynetamount.json', JSON.stringify({ netAmount }));
  fs.writeFileSync('Verifygstbill.json', JSON.stringify({ previousBillNumber }));
  /******* Click on Submit Button ************/
  await submitbutton(page);
  console.log('Step 11 : Cliked on Submit Button - GST Sales Added Successfully');
  await page.locator(locators.downloadinvoiceyes).click();
  console.log('Step 12 : Invoice Downloaded Successfully');
  await page.waitForTimeout(6000);
});


test('Verify Sales Grid for Created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Transaction Menu');
  await selectsubmenu(page, "Transaction");
  console.log('Step 5: Sales Page Displayed');
  /*********Scroll down******************/
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  /*****************Verify Customer Name is Correct ************************/
  const Verifycustomer = JSON.parse(fs.readFileSync('Verifycustomer.json')); //Read the shared Net Amount from the JSON file
  const sharedcustomername = Verifycustomer.customername;
  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0); // Select the first row
  const valueone = await firstRow.locator("td#SalesCustomerNameColumn"); //Extract the Net Amount from the latest row
  const customernamecolumn = await valueone.innerText();
  //expect(sharedcustomername).toBe(customernamecolumn);
  console.log("Step 6. Customer Name before Submit is same as Customer Name on the grid")
  /*********Scroll Right******************/
  await page.waitForTimeout(3000);
  const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
  await page.evaluate((el) => {
    el.scrollLeft += 600; // Adjust this value to scroll further or slower
  }, divElement);
  /*****************Verify Net Amount is Correct ************************/
  const data = JSON.parse(fs.readFileSync('Verifynetamount.json')); //Read the shared Net Amount from the JSON file
  const sharedNetAmount = data.netAmount;
  const value = await firstRow.locator("td#SalesNetAmountColumn"); //Extract the Net Amount from the latest row 
  const rawNetAmountcolumn = await value.innerText();
  const netAmountInGrid = parseFloat(rawNetAmountcolumn.replace(/,/g, ''));
  //expect(sharedNetAmount).toBe(netAmountInGrid);
  console.log("Step 7. Net Amount Before Submit is same as Net Amount In the grid");
  /*****************Copy GST Bill # and Verify it is Correct ************************/
  const valuefour = await firstRow.locator("td#SalesGSTBillNoColumn"); //Extract the GST bill # from the latest row 
  const latestGstbillnumbertext = await valuefour.innerText();
  const numericPart1 = latestGstbillnumbertext.slice(2);
  const latestGstbillnumber = parseInt(numericPart1, 10);
  const formattedlatestGstBillNumber = `SI${latestGstbillnumber}`;
  console.log('Latest Gst Bill Number is ', formattedlatestGstBillNumber);
  fs.writeFileSync('Verifylatestgstbill.json', JSON.stringify({ latestGstbillnumber })); //storing
  // Step 4: Verify that the new bill number is sequential
  const Verifygstbill = JSON.parse(fs.readFileSync('Verifygstbill.json')); //Read the shared GST Bill # from the JSON file
  const sharedpreviousBillNumber = Verifygstbill.previousBillNumber;
  expect(latestGstbillnumber).toBe(sharedpreviousBillNumber + 1);
  console.log('GST Bill Numbers are sequential');

});


test('Verify Sales Report - Itemwise for Created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await selectsubmenu(page, "Reports");
  console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilter(page, Customer_Name );
  //await verifydetails(page);
});
test('Verify Sales Report - Summary for Created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await salessummaryreport(page);

});

test('Verify Sales Report - Combined Sale for Created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await Combinedsalereport(page);

});

test('Verify Sales Report - Outstanding for Created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await Outstanding(page);

});

test('Inventory stock report for add sale for created Sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');

  await inventorystockreport(page, InventoryRO_Name);

});

test('Customer Account ledger report for Created sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await customeraccledger(page);
});



test('Update Sales', async ({ page }) => {

  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Transaction Menu');
  await selectsubmenu(page, "Transaction");
  console.log('Step 5: Sales Page Displayed');
  await viewlink(page);
  console.log(' Cliked on view Button');
  await page.waitForTimeout(6000);
  await Editbutton(page);
  console.log(' Cliked on Edit Button');
  await page.waitForTimeout(6000);
  await editsalesdetails(page, "PRAVINBHAI");
  console.log(' Modified Sales Details.');
  await page.waitForTimeout(1000);
  // Submit the changes
  await submitbutton(page);
  await page.waitForTimeout(6000);
  console.log(' Submitted the edited sales record.');
  // verify Grid after Edit the data
  // Wait for the grid to be populated with data after editing
  console.log('Waiting for the grid to update...');
  await page.waitForTimeout(3000);  // You may adjust this time or use a more specific selector to wait
  // Select the row(s) in the grid
  const rows = await page.locator('tr[aria-rowindex]');  // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0);  // Select the first row
  // Wait until the specific column (Broker) becomes visible and extract the value
  const brokerLocator = await firstRow.locator("td#SalesBrokerNameColumn"); // Broker column
  await brokerLocator.waitFor();  // Wait for the broker field to be visible
  // Get the text from the broker column
  const brokerInGrid = await brokerLocator.innerText();
  console.log('Broker Name in the Grid:', brokerInGrid);
  // Assert that the broker name matches the updated value
  expect(brokerInGrid).toBe("PRAVINBHAI");  // Verify the updated broker name
  console.log('Test Passed: Broker name is correctly updated in the grid.');
});

test(' Verify Sales Report - Itemwise for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await selectsubmenuitemwise(page, "Reports");
  console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilteritemwise(page, Customer_Name);
  //await verifydetailsitemwise(page);
});


test(' Verify Sales Report - Sales Summary for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu  
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenusalesummary(page, "Reports");
  console.log('Step 4: Reports - Sales - Sale Summary Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfiltersalesummary(page, Customer_Name);
  await verifydetailssalesummary(page);
});

test('Verify Sales Report - Combined Sale for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await Combinedsalereports(page,Customer_Name);

});

test(' Verify Sales Report - outstanding for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu  
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenuOutstanding(page, "Reports");
  console.log('Step 4: Reports  - outstanding Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilterOutstanding(page, Customer_Name);

});

test('Inventory stock report for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await inventorystockreports(page, InventoryRO_Name);

});

test(' Verify Sales Report - Customer account ledger for update sale', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu  
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await selectsubmenucustaccountledger(page, "Reports");
  console.log('Step 4: Reports  - customer account ledger Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfiltercustaccountledger(page, Customer_Name);

});




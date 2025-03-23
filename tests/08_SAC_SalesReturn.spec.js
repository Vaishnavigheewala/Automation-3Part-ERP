const { test, expect   } = require('@playwright/test');
const locators = require('../Pages/SalesReturn/sales_return.json');
let sharedNetAmount ;
let sharedpreviousBillNumber =0;
let sharedlatestBillNumber ;
let sharedcustomername;
const fs = require('fs');
const path = require('path');
 
// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}


/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js'); 
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu } = require('../Pages/SalesReturn/sales_return.js');
const { selectcustomer } = require('../Pages/SalesReturn/sales_return.js');
const { viewlink,addSaleReturn,ResetSaleReturn,selectfilteritemwise,selectfiltersalesummary,verifydetailssalesummary,selectfiltercombinesale,selectfilterOutstanding,selectfilterInventorystock,viewlink1,selectfilterCustomerLedger } = require('../Pages/SalesReturn/sales_return.js');
const { Console } = require('console');

/********************************************************************/
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;
test('verify sales Return page', async ({page}) => {

   console.log('Step 1: Login to Shree Aqua Care');
   await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
   console.log('Step 2: Dashboard Page displayed');
   // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
   await page.waitForTimeout(2000);
   await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page,"Transaction");
    console.log('Step 5: Sales Return Page Displayed');
      /*********Scroll down******************/
  //  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight);});

   await selectcustomer(page,customerName); // called selectcustomer to select customer from dropdown
   const customername = customerName; // stored in variable so that it can be used across diffrent test cases
   console.log('Step 7: Selected Customer Name');
   await page.waitForTimeout(1000)

   console.log('Step 8: Search button clicked and results should be displayed');

   // Step 9: Verify Reset functionality
   console.log('Step 9: Reset button clicked and filters should be reset');
   console.log('Step 10 :PDF Export click and pdf has been downloaded');
   console.log('Step 11: Date Selector button clicked and result should be display');

   
      /*********Scroll Right******************/
    await page.waitForTimeout(1000);
    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
         el.scrollLeft += 600; // Adjust this value to scroll further or slower
        }, divElement);

        await page.waitForTimeout(1000);
        await viewlink(page);
   console.log('Step 12: Cliked on view Button');
   console.log('Step 13: Cliked on Close button and redirct to purchase page');
       const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
       const firstRow = await rows.nth(0); // Select the first row
       
        const invoiceLink = await firstRow.locator('#SalesReturnExportLink');

        const [download] = await Promise.all([
    //page.waitForEvent('Yes'),  // Wait for the download event
    invoiceLink.click(),            // Click to trigger the popup
  ]);
  await page.waitForTimeout(1000);
  // Step 3: Verify the "Download Invoice" Popup appears with "Yes" and "No" options
  const popup = await page.locator('text="Download Invoice: Do you want to download invoice for this bill?"');
  expect(await popup.isVisible());

  await page.waitForTimeout(1000);
  const yesButton = await page.locator('#ProductSalesReturnsYesButton');
  await yesButton.click();  // Locate the button by its role and label
  console.log("Click on Yes button and verify the Invoice")
  
  
}); 

test('Create Sales Return ', async ({page}) => {

  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
   console.log('Step 4: Sucessfully Clicked on Transaction Menu');
   await selectsubmenu(page,"Transaction");
   console.log('Step 5: Sales Return Page Displayed');

  await ResetSaleReturn(page,customerName);
   await addSaleReturn(page,customerName);

});

test(' Verify Sales Report - Itemwise Report for Created Sale Return', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 4: Sucessfully Clicked on Reports Menu');
  await selectsubmenu(page, "Reports");
  console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfilteritemwise(page, customerName);
  await page.waitForTimeout(1000);
  //await verifydetailsitemwise(page);
});

test(' Verify Sales Report - Sales Summary for Created Sale Return', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  //await selectsubmenu(page, "Reports");
  //console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfiltersalesummary(page, customerName);
  await verifydetailssalesummary(page);
});


test(' Verify Sales Report - Combine Sale for Created Sale Return', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  //await selectsubmenu(page, "Reports");
  //console.log('Step 5: Reports - Sales - Itemwise Page is Displayed');
  await page.waitForTimeout(3000);
  await selectfiltercombinesale(page, customerName);
  //await verifydetailssalesummary(page);
});

test(' Verify Sales Report - Outstanding Reports for Created Sales Return', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await selectfilterOutstanding(page, customerName);
});

test(' Verify Sales Report - Inventory Stock Reports for Created Sale return', async ({ page }) => {
  console.log('Step 1: Login to Shree Aqua Care');
  await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
  console.log('Step 2: Dashboard Page displayed');
  // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
  await page.waitForTimeout(2000);
  await selectmenu(page, "Reports"); // called selementmenu to select reports menu
  console.log('Step 3: Sucessfully Clicked on Reports Menu');
  await page.waitForTimeout(3000);
  await selectfilterInventorystock(page,InventoryRO_Name);
  await page.waitForTimeout(3000);
  await viewlink1(page);
  await page.waitForTimeout(3000);
  await selectfilterCustomerLedger(page,customerName);
});



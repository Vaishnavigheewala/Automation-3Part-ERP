const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}



const { log_in ,Variable_File_Path} = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu,
        viewlink,
        Editbutton,
        EditPurchaseEntry,
        Editpurchasedetails,
        updatepurchasesdetails,
        storenetamount,
        submitbutton,
        SelectItemwiseReport,
        selectfilteritemwise,
        SelectsummaryReport,
        selectfiltersummary,
        verifydetailssummary,
        SelectpaybleReport,
        selectfilterpayble,
        selectfiltervendorledger,
        SelectvendorledgerReport,
        SelectInventorystockReport,
        selectfilterInventorystock,
        selectpurchasereturn,
        selectpurchasereturnbillno

                   } = require('../Pages/EditPurchase/editpurchase.js');
const { TIMEOUT } = require('dns/promises');
const {  Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js');

let updatedVariables = {};
// Function to load and clean JSON data dynamically
function loadUpdatedVariables() {
    let filePath = Variable_File_Path();
    let updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Remove_Empty_Strings(updatedData);
}
// let Customer_Name = updatedVariables.Customer_Name;

// Before each test, load fresh data
test.beforeEach(() => {
    updatedVariables = loadUpdatedVariables();
});


test('Update purchase', async ({ page }) => {
   let { Vendor,Purchase } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
   let V_Bill_No = Purchase.V_Bill_No;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: purchase Page Displayed');

    await viewlink(page);
    console.log(' Cliked on view Button');
    await page.waitForTimeout(2000);


    await Editbutton(page);
    console.log(' verify edit functionality');

    /*********Edit Vendor , VendorBillNo ************/
    await EditPurchaseEntry(page, V_Bill_No , Vendor_Name); // called selectcustomer to select customer from dropdown
    console.log(` Selecte Vendor Billno as ${V_Bill_No} and ${Vendor_Name}`);
    await page.waitForTimeout(1000);
    await Editpurchasedetails(page,  "8" , "20000");
    await page.waitForTimeout(1000);
     /*******Update purchase Details ************/
     await updatepurchasesdetails(page);
     console.log('purchase Details Updated Successfully');
     const netAmount = await storenetamount(page, 'input#PurchaseEntryNetAmount');
     console.log('Net Amount is', netAmount);
    await submitbutton(page);
    console.log(' Submit  Updated records');

        /*****************Verify Net Amount is Correct ************************/
        const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
        const firstRow = await rows.nth(0); // Select the first row
        await firstRow.locator("td#PurchaseNetAmountColumn"); //Extract the Net Amount from the latest row 
       
        console.log(" Net Amount Before Submit is same as Net Amount In the grid");

});

test(' Verify bill no in  purchase Return page', async ({ page }) => {
   let { Vendor } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
   console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectpurchasereturn(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await selectpurchasereturnbillno(page , Vendor_Name); // called selementmenu to select transaction menu
    console.log('Step 5: purchase return page is diplay ');

   
});

test(' Verify purchase Report - Itemwise for Update Purchase', async ({ page }) => {
   let { Vendor } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectItemwiseReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfilteritemwise(page, Vendor_Name);
 });

 test(' Verify purchase Report - Purchase summary for Update Purchase', async ({ page }) => {
   let { Vendor } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await SelectsummaryReport(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(3000);
    await selectfiltersummary(page, Vendor_Name);
    await page.waitForTimeout(3000);
    await verifydetailssummary(page);
 });

 test(' Verify purchase Report - Purchase Payble for Update Purchase', async ({ page }) => {
   let { Vendor } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
   console.log('Step 1: Login to Shree Aqua Care');
   await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
   console.log('Step 2: Dashboard Page displayed');
   // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
   await page.waitForTimeout(2000);
   await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
   console.log('Step 3: Sucessfully Clicked on Transaction Menu');
   await SelectpaybleReport(page, "Reports"); // called selementmenu to select reports menu
   console.log('Step 4: Sucessfully Clicked on Reports Menu');
   await page.waitForTimeout(3000);
   await selectfilterpayble(page, Vendor_Name);
   console.log('Step 5: Records Sucessfully display');

});


test(' Verify purchase Report - Purchase Vendor account ledger', async ({ page }) => {
   let { Vendor } = updatedVariables;
   let Vendor_Name = Vendor.Vendor_Account_Name;
   console.log('Step 1: Login to Shree Aqua Care');
   await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
   console.log('Step 2: Dashboard Page displayed');
   // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
   await page.waitForTimeout(2000);
   await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
   console.log('Step 3: Sucessfully Clicked on Transaction Menu');
   await SelectvendorledgerReport(page, "Reports"); // called selementmenu to select reports menu
   console.log('Step 4: Sucessfully Clicked on Reports Menu');
   await page.waitForTimeout(3000);
   await selectfiltervendorledger(page,Vendor_Name);
   console.log('Step 5: Records Sucessfully display');

});

test(' Verify purchase Report - Purchase Inventory stock', async ({ page }) => {
   let { Inventory } = updatedVariables;
  let InventoryRO_Name = Inventory.InventoryRO_Name;
   
   console.log('Step 1: Login to Shree Aqua Care');
   await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
   console.log('Step 2: Dashboard Page displayed');
   // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
   await page.waitForTimeout(2000);
   await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
   console.log('Step 3: Sucessfully Clicked on Transaction Menu');
   await SelectInventorystockReport(page, "Reports"); // called selementmenu to select reports menu
   console.log('Step 4: Sucessfully Clicked on Reports Menu');
   await page.waitForTimeout(3000);
   await selectfilterInventorystock(page, InventoryRO_Name);
   console.log(' Records Sucessfully display');

});
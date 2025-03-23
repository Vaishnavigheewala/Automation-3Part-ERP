const { test, expect } = require('@playwright/test');
const locators = require('../Pages/DeletePurchase/deletepurchase.json');
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
const { 
        DeletePage , 
        } = require('../Pages/DeletePurchase/deletepurchase.js');
        const {
            selectsubmenu,            
            AddPurchasePage,
            PurchaseEntry,
            addpurchasedetails,
            updatepurchasesdetails,
            storenetamount,
            submitbutton,
           
        } = require('../Pages/Purchase/purchase.js');
        const { Generate_Variable, Generate_Unique_Vendor_Bill } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js');
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name;
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;

let V_Bill_No;
test('Add Purchase', async ({ page }) => {
    let { Vendor,Inventory } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
   let InventoryRO_Name = Inventory.InventoryRO_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 4: Purchase Page is Displayed');
    await page.waitForTimeout(1000);
    await AddPurchasePage(page);
    console.log(' Add Purchase page is Displayed');
    //*********Add Vendor , VendorBillNo ************/
    V_Bill_No = await Generate_Variable('Purchase.V_Bill_No', async () => `VB${await Generate_Unique_Vendor_Bill()}`);
    await PurchaseEntry(page, V_Bill_No, Vendor_Name); // called selectcustomer to select customer from dropdown
    await page.waitForTimeout(1000);
    //*********Scroll down******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    //*********Add purchase Details************/
    await addpurchasedetails(page, "FinishMaterial", InventoryRO_Name, "4");
    await page.waitForTimeout(1000);
    await submitbutton(page);
    console.log(' Submit without Update');
    await page.waitForTimeout(1000);
    //*******Update purchase Details ************/
    await updatepurchasesdetails(page);
    console.log('purchase Details Updated Successfully');
    //*********Scroll down again******************/
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    //******* Store Net Amount ************/
    const netAmount = await storenetamount(page, 'input#PurchaseEntryNetAmount');
    console.log('Net Amount is', netAmount);
    await page.waitForTimeout(1000);
    //******* Submit Details ************/
    await submitbutton(page);
    await page.waitForTimeout(2000);
   
});

test('Delete purchase', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.23:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete");
    await DeletePage(page,Vendor_Name,"Payable",InventoryRO_Name);
   
});








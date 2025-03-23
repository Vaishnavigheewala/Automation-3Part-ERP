const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Purchase Return/Purchase_Return.json');
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
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu, selectvendor, addnewpurchase, addsalesdetails, selectsubmenudelete, updatesalesdetails, deletepurchase, Purchase_Return_Bill_From_Grid, Purchase_Return_Qty_chage } = require('../Pages/Purchase Return/Purchase_Return.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { VerifyAccountPage, Pagination_Checking, AccountMenuSelected, AddUser, EditUser, Reset_Demo, Area, ViewVendor,
    ViewCustomer, AMC_With_GST_Customer, Sales_Return_Customer, Bank_Ledger, Purchase_Return, Cash_Ledger, Debit_Note,
    Customer_Search_CreditNote, User_GST_State_Edit_By_Enterin_Name } = require('../Pages/Account/Account.js');
const { Apply_Date_Filter_To_Current_Month, GSTR_2_Menu_Selection, B2B_Invoices_3_4A, Close_Popup, B2BUR_4B,
    UnRegistered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_UnRegistered_6C,
    Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C,
    Credit_Debit_Notes_Registered_6C, Credit_Debit_Notes_Unregistered_6C, User_Data_Verification_In_GSTR_2_S_B2BUR__4B, User_Data_Verification_In_GSTR_2_S_B2B_Invoice_4A } = require('../Pages/GSTR_2/GSTR_2_Report.js');
//********************************************************************/
// let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
// let Vendor_Name = updatedVariables.Vendor_Name; // Get the latest Customer_Name

let updatedVariables = {};
// Function to load and clean JSON data dynamically
function loadUpdatedVariables() {
    let filePath = Variable_File_Path();
    let updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Remove_Empty_Strings(updatedData);
}
// Before each test, load fresh data
test.beforeEach(() => {
    updatedVariables = loadUpdatedVariables();
});

test('Verify Purchase Return page', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Purchase Return Page is Displayed');
    await page.waitForTimeout(2000);
    await selectvendor(page, Vendor_Name);
    await page.waitForTimeout(5000);
    await page.locator(locators.verify_purchase_returnpage.view_btn).nth(0).click();
    await page.waitForTimeout(5000);
    await page.locator(locators.verify_purchase_returnpage.cancle_btn).click();
    await page.waitForTimeout(3000);
    await page.locator(locators.verify_purchase_returnpage.export_pdf).nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.verify_purchase_returnpage.download_pdf_no).click();

});

test('Create Purchase Return', async ({ page }) => {
    let { Vendor, Purchase } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let PR_Bill_No = Purchase.Regular_Bill_No;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Purchase Return Page is Displayed');
    await page.waitForTimeout(2000);
    await page.locator(locators.verify_purchase_returnpage.add_btn).click();
    // await addnewpurchase(page, Vendor_Name, PR_Bill_No);
    // await page.locator(locators.addnew_page.reset_btn).click();
    await addnewpurchase(page, Vendor_Name, PR_Bill_No);
    console.log('Step 6: Purchase vendor and bill selected');
    await Purchase_Return_Qty_chage(page, "1");
    console.log('Step 7: Qty add and update and submites');
    await Purchase_Return_Bill_From_Grid(page, Vendor_Name);
    console.log('Step 7: Qty add and update and submites');
    await page.waitForTimeout(3000);
});

test('Verify item wise report For Create Purchase Return', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.locator(locators.reportsmenu.purchase_menu).click();
  await page.locator(locators.reportsmenu.reportitemwise).click();
  await page.locator(locators.Itemwise.Filterbtnpurchaseitemwisereport).click();
  await page.locator(locators.Itemwise.Filtervensitemwise).click();
  await page.fill(locators.addnew_page.nameinput, Vendor_Name);
  await page.locator('li.e-list-item', { hasText: Vendor_Name }).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Itemwise.Searchbtnpurchaseitemwise).click();
    await page.waitForTimeout(2000);
});

test('Verify Purchase Summary report  For Create Purchase Return', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.locator(locators.reportsmenu.purchase_menu).click();
  await page.locator(locators.reportsmenu.reportsummary).click();
  await page.locator(locators.Purchasesummary.Filterbtnpurchasesummaryreport).click();
  await page.locator(locators.Purchasesummary.Filtervenpurchasesummary).click();
  await page.fill(locators.addnew_page.nameinput, Vendor_Name);
  await page.locator('li.e-list-item', { hasText: Vendor_Name }).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Purchasesummary.Searchbtnpurchasesummary).click();
    await page.waitForTimeout(1000);
});

test('Verify Payable report For Create Purchase Return', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.locator(locators.reportsmenu.reportpayble).click();
    await page.locator(locators.Payble.FilterbtnpurchasePayblereport).click();
    await page.locator(locators.Payble.FiltervenpurchasePayble).click();
    await page.fill(locators.addnew_page.nameinput, Vendor_Name);
    await page.locator('li.e-list-item', { hasText: Vendor_Name }).click();
    await page.locator(locators.Payble.SearchbtnpurchasePayble).click();
    await page.waitForTimeout(2000);
});

test('Verify Inventory Stock report For Create Purchase Return', async ({ page }) => {
    let { Inventory } = updatedVariables;
   let InventoryRO_Name = Inventory.InventoryRO_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');
    await page.locator(locators.reportsmenu.reportinventorystock).click();
  await page.locator(locators.InventoryStock.FilterbtnpurchaseInventorystockreport).click();
  await page.click(locators.InventoryStock.FilterInventorygroup);
  await page.click("//li[normalize-space()='FinishMaterial']");
  console.log(`Selected inventory group.`);
  await page.locator(locators.InventoryStock.FilterInventoryItem).click();
  await page.fill(locators.InventoryStock.enterInventory, InventoryRO_Name);
  await page.locator('li.e-list-item', { hasText: InventoryRO_Name }).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.InventoryStock.SearchbtnpurchaseInventorystock).click();
    await page.waitForTimeout(2000);
});


test('Verify Vendor Account Ledger report', async ({ page }) => {
    let { Vendor } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Reports Menu');

    await page.locator(locators.reportsmenu.accountledger).click();
    await page.locator(locators.reportsmenu.reportvendoraccountledger).click();
    await page.locator(locators.VendorLedger.Filterbtnpurchasevendorledgerreport).click();
    await page.locator(locators.VendorLedger.Filtervenpurchasevendorledger).click();
    await page.fill(locators.addnew_page.nameinput, Vendor_Name);
    await page.locator('li.e-list-item', { hasText: Vendor_Name }).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.VendorLedger.Searchbtnpurchasevendorledger).click();
    await page.waitForTimeout(2000);
});

test('UnRegister Purechase Return Details in GSTR Report ', async ({ page }) => {
    let { Vendor, Customer, SAC_Company } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let Invoice_Id = SAC_Company.Purchase_Return.Bill_No;
    let Purchase_Net_Amount = SAC_Company.Purchase_Return.Net_Amount;
    let GST_No_Gujarat = Customer.GUJARAT_GST;
    let GST_No_OOG = Customer.OOG_GST_No;
    let OOG_State = Customer.Out_Of_Gujarat;
    let G_State = Customer.State;
    console.log("==== GSTR 2 Report ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
   // await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, null, G_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await B2BUR_4B(page);
    await User_Data_Verification_In_GSTR_2_S_B2BUR__4B(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, null, OOG_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await B2BUR_4B(page);
    await User_Data_Verification_In_GSTR_2_S_B2BUR__4B(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
});

test('Register Purechase Return Details in GSTR Report ', async ({ page }) => {
    let { Vendor, Customer, SAC_Company } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let Invoice_Id = SAC_Company.Purchase_Return.Bill_No;
    let Purchase_Net_Amount = SAC_Company.Purchase_Return.Net_Amount;
    let GST_No_Gujarat = Customer.GUJARAT_GST;
    let GST_No_OOG = Customer.OOG_GST_No;
    let OOG_State = Customer.Out_Of_Gujarat;
    let G_State = Customer.State;
    console.log("==== GSTR 2 Report ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, GST_No_OOG, OOG_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Registered_6C(page);
    await Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, GST_No_Gujarat, G_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Registered_6C(page);
    await Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
});


test('Delete Purchase Return', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(1000);
    await selectmenu(page, "Delete"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Delete Menu');
    await selectsubmenudelete(page, "Delete")
    await deletepurchase(page, Vendor_Name, "vaishnavi automation");
});
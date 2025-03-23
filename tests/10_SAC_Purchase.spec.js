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



const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectsubmenu } = require('../Pages/Purchase/purchase.js');
const { verifypurchase } = require('../Pages/Purchase/purchase.js');
const { viewlink } = require('../Pages/Purchase/purchase.js');
const {
    AddPurchasePage,
    PurchaseEntry,
    addpurchasedetails,
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
    SelectvendorledgerReport,
    selectfiltervendorledger,
    SelectInventorystockReport,
    selectfilterInventorystock,
    Net_Amount,Purchase_Bill_No_From_Grid
} = require('../Pages/Purchase/purchase.js');
const { TIMEOUT } = require('dns/promises');

const { Apply_Date_Filter_To_Current_Month, GSTR_2_Menu_Selection, B2B_Invoices_3_4A, Close_Popup, B2BUR_4B,
    UnRegistered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_UnRegistered_6C,
    Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C,
    Credit_Debit_Notes_Registered_6C, Credit_Debit_Notes_Unregistered_6C, User_Data_Verification_In_GSTR_2_S_B2BUR__4B,
    User_Data_Verification_In_GSTR_2_S_B2B_Invoice_4A } = require('../Pages/GSTR_2/GSTR_2_Report.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings, Generate_Unique_Vendor_Bill } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { VerifyAccountPage, Pagination_Checking, AccountMenuSelected, AddUser, EditUser, Reset_Demo, Area, ViewVendor,
    ViewCustomer, AMC_With_GST_Customer, Sales_Return_Customer, Bank_Ledger, Purchase_Return, Cash_Ledger, Debit_Note,
    Customer_Search_CreditNote, User_GST_State_Edit_By_Enterin_Name } = require('../Pages/Account/Account.js');

let updatedVariables = {};
let V_Bill_No;
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


test('verify Purchase page', async ({ page }) => {
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
    console.log('Step 5: Purchase Page is Displayed');

    /*********Scroll down******************/
    //  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight);});

    await verifypurchase(page, Vendor_Name); // called selectcustomer to select customer from dropdown
    await viewlink(page);

    console.log('Successfully verify purchase page');
    //await page.waitForTimeout(3000);


});

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
    console.log('Submit Data');
    await page.waitForTimeout(1000);
    await Purchase_Bill_No_From_Grid(page, Vendor_Name);
});

test(' Verify purchase Report - Itemwise', async ({ page }) => {
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
    console.log('Step 5: Sucessfully verify itemwise Reports ');


});

test(' Verify purchase Report - Purchase summary', async ({ page }) => {
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
    await verifydetailssummary(page);
    console.log('Step 5: Sucessfully verify summary Reports ');

});

test(' Verify purchase Report - Purchase Payble', async ({ page }) => {
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
    console.log('Step 5: Sucessfully verify Payble Reports');

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
    await selectfiltervendorledger(page, Vendor_Name);
    console.log('Step 5: Sucessfully verify Vendor account ledger Reports');

});

test(' Verify purchase Report - Purchase Inventory stock', async ({ page }) => {
    let { Inventory} = updatedVariables;
    InventoryRO_Name = Inventory.InventoryRO_Name;
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

test('Unregister Purechase Details in GSTR Report ', async ({ page }) => {
    let { Vendor, Purchase } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let Invoice_Id = Purchase.Bill_No;
    let Purchase_Net_Amount = Purchase.Net_Amount;
    let GST_No_Gujarat = Vendor.GUJARAT_GST;
    let GST_No_OOG = Vendor.OOG_GST_No;
    let OOG_State = Vendor.Out_Of_Gujarat;
    let G_State = Vendor.State;
    console.log("==== GSTR 2 Report Unregister Purechase====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
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

test('Register Purechase Details in GSTR Report ', async ({ page }) => {
    let { Vendor, Purchase } = updatedVariables;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let Invoice_Id = Purchase.Bill_No;
    let Purchase_Net_Amount = Purchase.Net_Amount;
    let GST_No_Gujarat = Vendor.GUJARAT_GST;
    let GST_No_OOG = Vendor.OOG_GST_No;
    let OOG_State = Vendor.Out_Of_Gujarat;
    let G_State = Vendor.State;
    console.log("==== GSTR 2 Report Register Purechase ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
   // await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, GST_No_Gujarat, G_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await B2B_Invoices_3_4A(page);
    await User_Data_Verification_In_GSTR_2_S_B2B_Invoice_4A(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Vendor_Name, GST_No_OOG, OOG_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await B2B_Invoices_3_4A(page);
    await User_Data_Verification_In_GSTR_2_S_B2B_Invoice_4A(page, Invoice_Id, Purchase_Net_Amount, null);
    await Close_Popup(page);
});
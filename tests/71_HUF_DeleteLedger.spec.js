const { test, expect } = require('@playwright/test');
const locators = require('../Cashonly/Delete_Cash_Ledger/Delete_Cash_Ledger.json');
const fs = require('fs');

// ====================
const { log_in, Company_Change, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { Sales_page_Navigation, Sales_Page_View_N_Edit, Select_Customer, Purchase_page_Navigation, Select_Vendor,
    Delete_Ledger_Menu_Click, Purchase_Page_View_N_Edit, Delete_Ledger, Outstanding_Report_DL,
    Customer_Account_Ledger_Report_DL, Cash_Ledger_Report_DL, Payble_Reoprt_Vendor_DL, Vendor_Account_Ledger_Report_DL,
    Getting_Voucher_No_From_Cash_Ledger_Grid, Delete_Multiple_Bill_No_From_Ledger, First_Try_Delete_Multiple_Bill,
    Cash_Ledger_Navigation, Bank_Ledger_Navigation } = require('../Cashonly/Delete_Cash_Ledger/Delete_Cash_Ledger.js');
//=====================
// Global variable for updated JSON data
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

// updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


test('HUF Customer Cash Ledger Dalete Full Payment', async ({ page }) => {
    console.log("==== HUF Compnay Cash Ledger Dalete Customer Multiple bill's Voucher ====");
    let { HUF_Company, Customer, Vendor } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    let Voucher_No = HUF_Company.Delete_Ledger.Voucher_No;

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Cash_Ledger_Navigation(page);
    await First_Try_Delete_Multiple_Bill(page, Customer_Name, null);
    await selectmenu(page, "Transaction");
    await Cash_Ledger_Navigation(page);
    await Getting_Voucher_No_From_Cash_Ledger_Grid(page, Customer_Name, null);
    await Delete_Multiple_Bill_No_From_Ledger(page);
    // console.log('=== Reports Befor the deletetion of Full ===');
    // await Outstanding_Report_DL(page, Customer_Name, Voucher_No);
    // await Cash_Ledger_Report_DL(page, Customer_Name, null, Voucher_No);
    // await Company_Change(page, "Shree Aqua Care");
    // await page.waitForTimeout(2000);
    // await Customer_Account_Ledger_Report_DL(page, Customer_Name, Voucher_No);
    // console.log('=== multiple bill Edited to single bill After Delete ledger ===');
    await Delete_Ledger(page, Voucher_No);
    console.log('=== Reports the deletetion ===');
    await Outstanding_Report_DL(page, Customer_Name, Voucher_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Voucher_No);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(1000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Voucher_No);

});
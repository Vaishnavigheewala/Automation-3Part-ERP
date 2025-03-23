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

//     ******************Reusable functions imported***********************
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Credit_Note_Menu, VerifyCreditNotePage, CustomerSearchCreditNote, PDFExport, ADD_EDIT, Add_Credit_Note, VerifyAddCreditNotePage,
    Report_Credit_Note, Customer_Account_Ledger_Report, Outstanding_Reports, Open_Edit_Credit_Note_Link, Newly_Added_Data_check_In_Grid,
    Edit_Credit_Note_Page_Verfication, Edit_Credit_Note } = require('../Pages/Credit Note/Credit_Note.js');
const { Apply_Date_Filter_To_Current_Month, GSTR_2_Menu_Selection, B2B_Invoices_3_4A, Close_Popup, B2BUR_4B, 
    UnRegistered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_UnRegistered_6C,
    Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C,
    Credit_Debit_Notes_Registered_6C, Credit_Debit_Notes_Unregistered_6C, User_Data_Verification_In_GSTR_2_S_B2BUR__4B,User_Data_Verification_In_GSTR_2_S_B2B_Invoice_4A } = require('../Pages/GSTR_2/GSTR_2_Report.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { VerifyAccountPage, Pagination_Checking, AccountMenuSelected, AddUser, EditUser, Reset_Demo, Area, ViewVendor,
    ViewCustomer, AMC_With_GST_Customer, Sales_Return_Customer, Bank_Ledger, Purchase_Return, Cash_Ledger, Debit_Note,
    Customer_Search_CreditNote, User_GST_State_Edit_By_Enterin_Name } = require('../Pages/Account/Account.js');

let updatedVariables = {};
let Customer_Name = updatedVariables.Customer_Name;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Global variable for updated JSON data
let updatedVariables_UptoDate = {};

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

test('Verify Credit Note Page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Credit_Note_Menu(page);
    console.log('Navigat to Credit Note');
    await VerifyCreditNotePage(page);
    await page.waitForTimeout(500);
    await CustomerSearchCreditNote(page, Customer_Name, null);
    await page.waitForTimeout(500);
    await PDFExport(page);
    await page.waitForTimeout(500);
    await ADD_EDIT(page);
    console.log('ADD and Edit checked.');
});


test('Create Credit Note', async ({ page }) => {
    let { Customer } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let General_Inventory = updatedVariables.Inventory.General_Inventory;  
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");

    await Credit_Note_Menu(page);
    console.log('Navigat to Credit Note');
    //await VerifyAddCreditNotePage(page);
    console.log('Verified ADD Credit Note Page');
    await Add_Credit_Note(page, Customer_Name, General_Inventory, "4", "105400");
    await CustomerSearchCreditNote(page, Customer_Name, null);
    await Newly_Added_Data_check_In_Grid(page);
});

test('Credit Note Report in Grid ', async ({ page }) => {
    let { Customer } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    await page.waitForTimeout(1000);
    await Report_Credit_Note(page, Customer_Name);
    console.log('Credit Note Reoprts.');

});

test('Outstanding Report For Created Credit Note', async ({ page }) => {
    let { Customer } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");

    await Outstanding_Reports(page, Customer_Name);
    console.log('Outstanding Reoprts.');

});

test('Customer Account Ledger  For Created Credit Note', async ({ page }) => {
    let { Customer } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    await page.waitForTimeout(1000);
    await Customer_Account_Ledger_Report(page, Customer_Name);
    console.log('Customer Account Ledger Reoprts.');

});

test('Edit User with Empty GST no filed & Unregistered User Credit Note Data Checking in GSTR 2', async ({ page }) => {
    let { Customer, Credit_Note } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Credit_Note_Net_Amt = Credit_Note.Net_Amount;
    let Credit_Note_Invoice_Id = Credit_Note.Bill_No;
    let GST_No_Gujarat = Customer.GUJARAT_GST;
    let GST_No_OOG = Customer.OOG_GST_No;
    let OOG_State = Customer.Out_Of_Gujarat;

    console.log("==== GSTR 2 Report Registerd ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Customer_Name, null, null);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Unregistered_6C(page);
    await UnRegistered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_UnRegistered_6C(page, Credit_Note_Invoice_Id, Credit_Note_Net_Amt, null);
    await Close_Popup(page);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Customer_Name, null, OOG_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Unregistered_6C(page);
    await UnRegistered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_UnRegistered_6C(page, Credit_Note_Invoice_Id, Credit_Note_Net_Amt, null);
    await Close_Popup(page);
});

test('Edit User with GST no filed & Registered User Credit Note Data Checking in GSTR 2', async ({ page }) => {
    let { Customer, Credit_Note } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Credit_Note_Net_Amt = Credit_Note.Net_Amount;
    let Credit_Note_Invoice_Id = Credit_Note.Bill_No;
    let GST_No_Gujarat = Customer.GUJARAT_GST;
    let GST_No_OOG = Customer.OOG_GST_No;
    let OOG_State = Customer.Out_Of_Gujarat;
    let G_State = Customer.State;

    console.log("==== GSTR 2 Report Unregister ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Customer_Name, GST_No_OOG, null);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Registered_6C(page);
    await Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C(page, Credit_Note_Invoice_Id, Credit_Note_Net_Amt, null);
    await Close_Popup(page);
    await selectmenu(page, "Master");
    await AccountMenuSelected(page);
    await User_GST_State_Edit_By_Enterin_Name(page, Customer_Name, GST_No_Gujarat, G_State);
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await Credit_Debit_Notes_Registered_6C(page);
    await Registered_User_Data_Verification_In_GSTR_2_S_Credit_Debit_Notes_Registered_6C(page, Credit_Note_Invoice_Id, Credit_Note_Net_Amt, null);
    await Close_Popup(page);
});

test('Updated Credit Note  For Created Credit Note', async ({ page }) => {
    let { Customer } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let General_Inventory = updatedVariables.Inventory.General_Inventory;  
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Credit_Note_Menu(page);
    console.log('Navigat to Credit Note');
    await CustomerSearchCreditNote(page, Customer_Name, null);
    console.log('Customer Searched');
    await Open_Edit_Credit_Note_Link(page);
    console.log('Edit Link Opend');
    await Edit_Credit_Note_Page_Verfication(page);
    console.log('Credit Note Edit Page Disable fileds checked');
    await Edit_Credit_Note(page,General_Inventory, "5", "2000000");
    await selectmenu(page, "Reports");
    await page.waitForTimeout(200);
    await Report_Credit_Note(page, Customer_Name);
    await selectmenu(page, "Reports");
    await page.waitForTimeout(200);
    await Outstanding_Reports(page, Customer_Name, "Yes");
    await selectmenu(page, "Reports");
    await page.waitForTimeout(200);
    await Customer_Account_Ledger_Report(page, Customer_Name, "Yes");

});
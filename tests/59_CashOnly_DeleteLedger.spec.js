const { test, expect } = require('@playwright/test');
const locators = require('../Cashonly/Delete_Cash_Ledger/Delete_Cash_Ledger.json');
const fs = require('fs');

// ====================
const { log_in, Company_Change, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { Sales_page_Navigation, Sales_Page_View_N_Edit, Select_Customer, Purchase_page_Navigation, Select_Vendor, Delete_Ledger_Menu_Click,
    Purchase_Page_View_N_Edit, Delete_Ledger, Outstanding_Report_DL, Customer_Account_Ledger_Report_DL, Cash_Ledger_Report_DL, Payble_Reoprt_Vendor_DL,
    Vendor_Account_Ledger_Report_DL } = require('../Cashonly/Delete_Cash_Ledger/Delete_Cash_Ledger.js');
//=====================
let filePath = Variable_File_Path();
let Customer_Name, updatedVariables, Vendor_Name, Full_Payment_Bill_No, Part_Payment_Bill_No, Latest_Part_Payment_Bill_No, Purchase_Ledger_Part_Pay;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
Customer_Name = updatedVariables.Customer.Customer_Account_Name;
Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name;
Full_Payment_Bill_No = updatedVariables.Cash_Ledger.Voucher_No;
Part_Payment_Bill_No = updatedVariables.Cash_Ledger.Part_Voucher_No;
Latest_Part_Payment_Bill_No = updatedVariables.Cash_Ledger.Latest_Part_Voucher_No;
Purchase_Ledger_Part_Pay = updatedVariables.Cash_Ledger.Purchase_Ledger_Part_Pay;

test('Cash Only Customer Cash Ledger Dalete Full Payment', async ({ page }) => {
    console.log("==== Cash Only Cash Ledger Dalete Full Payment ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Sales_page_Navigation(page);
    await Select_Customer(page, Customer_Name);
    await Sales_Page_View_N_Edit(page);
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await Purchase_page_Navigation(page);
    await Select_Vendor(page, Vendor_Name);
    await Purchase_Page_View_N_Edit(page);
    console.log('=== Reports Befor the deletetion of Full ===');
    await Outstanding_Report_DL(page, Customer_Name, Full_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Full_Payment_Bill_No);
    await page.waitForTimeout(2000);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Full_Payment_Bill_No);
    await Company_Change(page, "Cash Only");
    console.log('Delete Ledger Full, Part & Latest Part.');
    await selectmenu(page, "Delete");
    await Delete_Ledger_Menu_Click(page);
    await Delete_Ledger(page, Full_Payment_Bill_No);
    console.log('=== Reports After the deletetion ===');
    await Outstanding_Report_DL(page, Customer_Name, Full_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Full_Payment_Bill_No);
    await page.waitForTimeout(2000);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Full_Payment_Bill_No);
});

test('Cash Only Customer  Cash Ledger Dalete Mid Part Payment', async ({ page }) => {
    console.log("==== Cash Only Cash Ledger Dalete Mid part Payment ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    console.log('=== Reports Befor the deletetion of Full ===');
    await Outstanding_Report_DL(page, Customer_Name, Part_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Part_Payment_Bill_No);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Part_Payment_Bill_No);
    await Company_Change(page, "Cash Only");
    console.log('Delete Ledger Full, Part & Latest Part.');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete");
    await page.waitForTimeout(2000);
    await Delete_Ledger_Menu_Click(page);
    await Delete_Ledger(page, Part_Payment_Bill_No);
    console.log('=== Reports After the deletetion ===');
    await Outstanding_Report_DL(page, Customer_Name, Part_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Part_Payment_Bill_No);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Part_Payment_Bill_No);
});

test('Cash Only Customer  Cash Ledger Dalete Latest Part Payment', async ({ page }) => {
    console.log("===== Cash Only Cash Ledger Dalete Latest Part Payment ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    console.log('=== Reports Befor the deletetion of Full ===');
    await Outstanding_Report_DL(page, Customer_Name, Latest_Part_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Latest_Part_Payment_Bill_No);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Latest_Part_Payment_Bill_No);
    await Company_Change(page, "Cash Only");
    console.log('Delete Ledger Full, Part & Latest Part.');
    await selectmenu(page, "Delete");
    await Delete_Ledger_Menu_Click(page);
    await Delete_Ledger(page, Latest_Part_Payment_Bill_No);
    console.log('=== Reports After the deletetion ===');
    await Outstanding_Report_DL(page, Customer_Name, Latest_Part_Payment_Bill_No);
    await Cash_Ledger_Report_DL(page, Customer_Name, null, Latest_Part_Payment_Bill_No);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Customer_Account_Ledger_Report_DL(page, Customer_Name, Latest_Part_Payment_Bill_No);
});

test('Cash Only Vendor Cash Ledger Dalete Latest Part Payment', async ({ page }) => {
    console.log("===== Cash Only Vendor Cash Ledger Dalete Latest Part Payment ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    console.log('=== Reports Befor the deletetion of Full ===');
    await Payble_Reoprt_Vendor_DL(page, Vendor_Name, null, Purchase_Ledger_Part_Pay)
    await Cash_Ledger_Report_DL(page, null, Vendor_Name, Purchase_Ledger_Part_Pay);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Vendor_Account_Ledger_Report_DL(page, Vendor_Name, null, Purchase_Ledger_Part_Pay);
    await Company_Change(page, "Cash Only");
    console.log('Delete Ledger Full, Part & Latest Part.');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Delete");
    await page.waitForTimeout(2000);
    await Delete_Ledger_Menu_Click(page);
    await Delete_Ledger(page, Purchase_Ledger_Part_Pay);
    console.log('=== Reports After the deletetion ===');
    await Payble_Reoprt_Vendor_DL(page, Vendor_Name, null, Purchase_Ledger_Part_Pay);
    await Cash_Ledger_Report_DL(page, null, Vendor_Name, Purchase_Ledger_Part_Pay);
    await Company_Change(page, "Shree Aqua Care");
    await page.waitForTimeout(2000);
    await Vendor_Account_Ledger_Report_DL(page, Vendor_Name, null, Purchase_Ledger_Part_Pay);
});
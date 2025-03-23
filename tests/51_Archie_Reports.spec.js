const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Service_Reports/ServiceReport.json');
const fs = require('fs');
const path = require('path');

const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Service } = require('../Archie/Service_Reports/ServiceReport.js');
const { itemwise } = require('../Archie/Service_itemwise/Service_itemwise.js');
const { CloseComplain } = require('../Archie/Service_CloseComplain/Service_CloseComplain.js');
const { AmcReport } = require('../Archie/Amc_Reports/Amc_Reports.js');
const { Verify_Bank_Ledger, Verify_Cash_Ledger } = require('../Archie/Ledger Reports/Ledger_Reports.js');
const {Verify_Page, Grid_Verify, Customer_Account_Ledger_Report_Menu, Select_Customer, PDF_Export} = require('../Archie/Customer_Account_Ledger_Report/Customer_Account_Ledger_Report.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

// Define the file path for the variable storage
let filePath = Variable_File_Path();
let updatedVariables, Customer_Name, Dynamic_Bill_No;
// Reload fresh variables from the file
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
Customer_Name = updatedVariables.Customer.Customer_Account_Name;
Dynamic_Bill_No = updatedVariables.Bill_No;
let UpdateRaw_Inventory = updatedVariables.Inventory.UpdateRaw_Inventory;


test('Service Report', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // Call login function
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 3: Successfully Clicked on Reports Menu');
    await Service(page, Customer_Name);
});

test('Service itemwise Report', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // Call login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 3: Successfully Clicked on Reports Menu');
    await itemwise(page, UpdateRaw_Inventory    );
});


test('Service Closed Complain Report', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // Call login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 3: Successfully Clicked on Reports Menu');
    await page.waitForTimeout(1000);
    await CloseComplain(page);
});


test('Amc Report', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // Call login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports");
    console.log('Step 3: Successfully Clicked on Reports Menu');
    await page.waitForTimeout(1000);
    await AmcReport(page, Customer_Name);
});

test('Ledger', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice");
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);   
    console.log('Step 3: Verify Bank Ledger');
    await selectmenu(page, "Reports");
    await Verify_Bank_Ledger(page, Customer_Name);
    console.log('Step 4: Verify Cash Ledger');
    await selectmenu(page, "Reports");
    await page.waitForTimeout(1000);
    await Verify_Cash_Ledger(page, Customer_Name);

});

test('Verify Account Ledger Reports - Account Ledger', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    //  await expect(page).toHaveURL("http://192.168.29.112:85/"); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select reports menu
    console.log('Step 3: Sucessfully Clicked on Reports Menu');
    await page.waitForTimeout(1000);
    await Customer_Account_Ledger_Report_Menu(page);
    await Verify_Page(page);
    await Grid_Verify(page);
    await Select_Customer(page, Customer_Name);
    await PDF_Export(page);
  });
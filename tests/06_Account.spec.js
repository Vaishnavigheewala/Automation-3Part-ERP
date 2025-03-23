const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Account/Account.json');
const fs = require('fs');
const path = require('path');

//     ******************Reusable functions imported***********************
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { VerifyAccountPage, Pagination_Checking, AccountMenuSelected, AddUser, EditUser, Reset_Demo, Area, ViewVendor, ViewCustomer, AMC_With_GST_Customer, Sales_Return_Customer, Bank_Ledger, Purchase_Return, Cash_Ledger, Debit_Note, Customer_Search_CreditNote, User_GST_State_Edit_By_Enterin_Name } = require('../Pages/Account/Account.js');
const { fstat } = require('fs');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No ,Remove_Empty_Strings} = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

// Define the file path for the variable storage
let filePath = Variable_File_Path();

let updatedVariables;
let Customer_Name, Customer_Address, Customer_Mobile_No, Customer_Alter_Mobile_No, Customer_Email, Customer_Client_Code, Customer_GSTI_No, Customer_Pincode, Customer_Area, City, State;
let Vendor_Name, Vendor_Address, Vendor_Mobile_No, Vendor_Alter_Mobile_No, Vendor_Email, Vendor_Client_Code, Vendor_GSTI_No, Vendor_Pincode, Broker_Mobile;

// Global variable for updated JSON data
let updatedVariablesJSON = {};

// Function to load and clean JSON data dynamically
function loadUpdatedVariables() {
    let filePath = Variable_File_Path();
    let updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    return Remove_Empty_Strings(updatedData);
}

// Before each test, load fresh data
test.beforeEach(() => {
    updatedVariablesJSON = loadUpdatedVariables();
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

test('Verify Account Page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await AccountMenuSelected(page);
    console.log('Step 3: Sucessfully Clicked on Account Menu.');
    await VerifyAccountPage(page);
    await Pagination_Checking(page);
});

test('Reset Functionality for Account page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    //// await expect(page).toHaveURL('http://192.168.1.24:85/');
    await page.waitForTimeout(2000);
    await AccountMenuSelected(page);
    console.log('Step 3: Sucessfully Clicked on Account Menu.');
    await Reset_Demo(page);
    console.log('Step 4: Sucessfully Clicked on Account Menu.');
});
// Reload fresh variables from the file
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

test('Create Customer', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    await page.waitForTimeout(2000);

    await AccountMenuSelected(page);
    console.log('Step 3: Sucessfully Clicked on Account Menu.');
    Customer_Name = await Generate_Variable('Customer.Customer_Account_Name', async () => `${await Get_Current_Date_Time()}_Customer`);
    Customer_Address = await Generate_Variable('Address_User', async () => `Address_${await Generate_Unique_Address()}`);
    Customer_Mobile_No = await Generate_Variable('Customer_User_Mobile', async () => await Generate_Random_Mobile_No());
    Customer_Alter_Mobile_No = await Generate_Variable('Customer_User_Alter_Mobile', async () => await Generate_Random_Mobile_No());
    Customer_GSTI_No = updatedVariables.Customer.Customer_GSTI_No;
    Customer_Client_Code = updatedVariables.Customer.Customer_Client_Code;
    Customer_Email = updatedVariables.Customer.Customer_Email;
    Customer_Pincode = updatedVariables.Customer_Pincode;
    Customer_Area = updatedVariables.Customer.Area;
    City = updatedVariables.Customer.City;
    State = updatedVariables.Customer.State;

    await page.waitForTimeout(800);
    await AddUser(page, "Customer", Customer_GSTI_No, Customer_Client_Code, Customer_Email, Customer_Name, Customer_Mobile_No, Customer_Alter_Mobile_No, Customer_Pincode, Customer_Address, State, City, Customer_Area);
    await page.waitForTimeout(2000);
    console.log('Step 4: Sucessfully Created Customer Account.');
});

test('View Customer', async ({ page }) => {
    let { Customer } = updatedVariablesJSON;
    let Customer_Name = Customer.Customer_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000);
    await ViewCustomer(page, Customer_Name); // in sales page
    await page.waitForTimeout(800);
    await Sales_Return_Customer(page, Customer_Name);
    await Bank_Ledger(page, "Customer", Customer_Name);
    await Cash_Ledger(page, "Customer", Customer_Name);
    await Customer_Search_CreditNote(page, Customer_Name);
   // await AMC_With_GST_Customer(page, Customer_Name);
});

test('Update Customer', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000);
    await AccountMenuSelected(page);
    console.log('Step 3: Clicked on Account Menu.');
    await EditUser(page, Customer_Name, null, null, null, Broker_Mobile, null, null, "Gujarat", );
    console.log('Step 3: Sucessfully EDIT user.');
    await page.waitForTimeout(2000);
});

test('View Updated Customer', async ({ page }) => {
    let { Customer } = updatedVariablesJSON;
    let Customer_Name = Customer.Customer_Account_Name;

    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000)

    await ViewCustomer(page, Customer_Name);// in sales page
    await page.waitForTimeout(800);
    await Sales_Return_Customer(page, Customer_Name);
    await Bank_Ledger(page, "Customer", Customer_Name);
    await Cash_Ledger(page, "Customer", Customer_Name);
    await Customer_Search_CreditNote(page, Customer_Name);
  //  await AMC_With_GST_Customer(page, Customer_Name);
});

test('Create Vendor', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    Vendor_Name = await Generate_Variable('Vendor.Vendor_Account_Name', async () => `${await Get_Current_Date_Time()}_Vendor`);
    Vendor_Address = await Generate_Variable('Address_Vendor', async () => `Address_${await Generate_Unique_Address()}`);
    Vendor_Mobile_No = await Generate_Variable('Vendor_User_Mobile', async () => await Generate_Random_Mobile_No());
    Vendor_Alter_Mobile_No = await Generate_Variable('Vendor_User_Alter_Mobile', async () => await Generate_Random_Mobile_No());
    Vendor_GSTI_No = updatedVariables.Vendor.Vendor_GSTI_No;
    Vendor_Client_Code = updatedVariables.Vendor.Vendor_Client_Code;
    Vendor_Email = updatedVariables.Vendor.Vendor_Email;
    Vendor_Pincode = updatedVariables.Customer_Pincode;
   // Vendor_Area = updatedVariables.Vendor.Area;
    City = updatedVariables.Vendor.City;
    State = updatedVariables.Vendor.State;
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000);
    await AccountMenuSelected(page);
    console.log('Step 3: Sucessfully Clicked on Account Menu.');
    await AddUser(page, "Vendor", null, null, "vendor@gmail.com", Vendor_Name, Vendor_Mobile_No, Vendor_Alter_Mobile_No, Vendor_Pincode, Vendor_Address, State, City);
    await page.waitForTimeout(2000);
    console.log('Step 4: Sucessfully Created Vendor Account.');
});

test('View Vendor', async ({ page }) => {
    let { Vendor } = updatedVariablesJSON;
    let Vendor_Name = Vendor.Vendor_Account_Name;

    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000)

    await ViewVendor(page, Vendor_Name);// in Purches page
    await page.waitForTimeout(800);
    await Purchase_Return(page, Vendor_Name);
    await Bank_Ledger(page, "Vendor", null, Vendor_Name);
    await Cash_Ledger(page, "Vendor", null, Vendor_Name);
    await Debit_Note(page, Vendor_Name);
});

test('Update Vendor', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    // await expect(page).toHaveURL('http://dev.aquacare.thinkhpconsultant.com:8080/');
    await page.waitForTimeout(2000);
    await AccountMenuSelected(page);
    console.log('Step 3: Clicked on Account Menu.');
    await EditUser(page, Vendor_Name, null, null, "vik7362@gmail.com", Broker_Mobile, null, null, "Gujarat");
    console.log('Step 3: Sucessfully EDIT user.');
    await page.waitForTimeout(2000);
});

test('View Updated Vendor', async ({ page }) => {
    let { Vendor } = updatedVariablesJSON;
    let Vendor_Name = Vendor.Vendor_Account_Name;
    console.log('Step 1: Login to Shree Aqua Care.');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step: 2 Dashbord Page displayed.');
    await page.waitForTimeout(2000)

    await ViewVendor(page, Vendor_Name);// in sales page
    await page.waitForTimeout(800);
    await Purchase_Return(page, Vendor_Name);
    await Bank_Ledger(page, "Vendor", null, Vendor_Name);
    await Cash_Ledger(page, "Vendor", null, Vendor_Name);
    await Debit_Note(page, Vendor_Name);
});
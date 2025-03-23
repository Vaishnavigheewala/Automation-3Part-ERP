const { test, expect } = require('@playwright/test');
const locators = require('../Cashonly/Add_New_HUF_Cycle_Sales/Add_New_HUF_Cycle_Sales.json');
const fs = require('fs');

// ====================
const { log_in, Company_Change, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { CashOnly_Add_HUF_Sales_Page_Verification, CashOnly_HUF_Sales, Cashonly_Add_New_Click, CashOnly_Add_New_HUF_Sales,
    CashOnly_HUF_Newly_Data_checkIn_Grid, HUF_Cycle_Sales_Link_Report, SAC_HUF_Cycle_Menu, SAC_Add_New_Sales_Btn, SAC_Add_New_Cycle_Sales,
    SAC_Add_New_Sales_Page_Verification, SAC_HUF_Cycle_Sales_Newly_Add_Data_In_Grid,
    HUF_Company_HUF_Cycle_Menu, Add_HUF_Company_HUF_Cycle_Sales, HUF_Add_New_Btn_click, HUF_Company_HUF_Cycle_Sales_Newly_Add_Data_In_Grid } = require('../Cashonly/Add_New_HUF_Cycle_Sales/Add_New_HUF_Cycle_Sales.js')

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

test('Cash Only HUF Cycle Sales', async ({ page }) => {
    console.log("==== Cash Only HUF Sales Cycle ====");

    // Extract required variables
    let { Customer, Technician, Broker, HUF_Sales_Cycle, Inventory } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Technician_Name = Technician.Technician_Name;
    let Broker_Name = Broker.Broker_Name;
    let Inventory_Group = HUF_Sales_Cycle.Inventory_Group;
    let Item = Inventory.Inventory_Name;
    let Qut = HUF_Sales_Cycle.Qut;
    let Add_Less = HUF_Sales_Cycle.Add_Less;
    let Round_Off = HUF_Sales_Cycle.Round_Off;

    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await CashOnly_HUF_Sales(page);
    await Cashonly_Add_New_Click(page);
    await CashOnly_Add_HUF_Sales_Page_Verification(page);
    await CashOnly_Add_New_HUF_Sales(page, Customer_Name, Broker_Name, Technician_Name, Inventory_Group, Item, Qut, Round_Off, Add_Less);
    await CashOnly_HUF_Newly_Data_checkIn_Grid(page);
    await HUF_Cycle_Sales_Link_Report(page, Customer_Name);
});

test('SAC HUF Cycle Sales', async ({ page }) => {
    console.log("==== SAC HUF Sales Cycle ====");

    // Extract required variables
    let { Customer, HUF_Sales_Cycle, Inventory } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Inventory_Group = HUF_Sales_Cycle.Inventory_Group;
    let Item = Inventory.Inventory_Name;
    let Qut = HUF_Sales_Cycle.Qut;
    let Add_Less = HUF_Sales_Cycle.Add_Less;
    let Round_Off = HUF_Sales_Cycle.Round_Off;
    let CO_Bill_No = HUF_Sales_Cycle.CashOnly_Bill_No;

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await SAC_HUF_Cycle_Menu(page);
    await SAC_Add_New_Sales_Btn(page);
    await SAC_Add_New_Sales_Page_Verification(page);
    await SAC_Add_New_Cycle_Sales(page, CO_Bill_No, Inventory_Group, Item, Qut, Add_Less, Round_Off);
    await SAC_HUF_Cycle_Sales_Newly_Add_Data_In_Grid(page);
    await HUF_Cycle_Sales_Link_Report(page, Customer_Name);
});

test('HUF Company HUF Cycle Sales', async ({ page }) => {
    console.log("==== HUF Company HUF Sales Cycle ====");

    // Extract required variables
    let { Customer, HUF_Sales_Cycle, Inventory } = updatedVariables;
    let Customer_Name = Customer.Customer_Account_Name;
    let Item = Inventory.Inventory_Name;
    let Qut = HUF_Sales_Cycle.Qut;
    let CO_Bill_No = HUF_Sales_Cycle.CashOnly_Bill_No;
    
    console.log('Step 1: Login to HUF Company');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar");
    // await expect(page).toHaveURL('http://192.168.29.112:85/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    await HUF_Company_HUF_Cycle_Menu(page);
    await HUF_Add_New_Btn_click(page);
    await Add_HUF_Company_HUF_Cycle_Sales(page, Customer_Name, CO_Bill_No, Item, Qut);
    await HUF_Company_HUF_Cycle_Sales_Newly_Add_Data_In_Grid(page);
    await HUF_Cycle_Sales_Link_Report(page, Customer_Name);
});
